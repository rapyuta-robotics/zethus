import React from 'react';
import Stats from 'stats-js';
import Mousetrap from 'mousetrap';
import _ from 'lodash';
import UndoManager from 'undo-manager';

let undoManager;

if (!undoManager) {
  undoManager = new UndoManager();
}

const { THREE } = window;
console.log(THREE);

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const box = new THREE.Box3();
const onDownPosition = new THREE.Vector2();
const onUpPosition = new THREE.Vector2();
const onDoubleClickPosition = new THREE.Vector2();

const getMousePosition = (dom, x, y) => {
  const rect = dom.getBoundingClientRect();
  return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
};

const isUrdfLink = j => j.isURDFLink;

const findNearestUrdfLink = (m) => {
  let curr = m;
  while (curr) {
    if (isUrdfLink(curr)) {
      break;
    }
    curr = curr.parent;
  }
  return curr;
};

class Viewport extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();

    this.previousWidth = 0;
    this.previousHeight = 0;

    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getIntersects = this.getIntersects.bind(this);
    this.animate = this.animate.bind(this);
    this.initSelectionBox = this.initSelectionBox.bind(this);
    this.initRenderer = this.initRenderer.bind(this);
    this.initGrid = this.initGrid.bind(this);
    this.initStats = this.initStats.bind(this);
    this.initTransformControls = this.initTransformControls.bind(this);
    this.addKeyboardEvents = this.addKeyboardEvents.bind(this);
  }

  componentDidMount() {
    const {
      editor: { camera },
      editable,
    } = this.props;
    const container = this.container.current;

    this.initStats();
    this.initRenderer();
    this.initGrid();

    this.initSelectionBox();
    this.initTransformControls();

    container.addEventListener('mousedown', this.onMouseDown, false);
    container.addEventListener('touchstart', this.onTouchStart, false);
    container.addEventListener('dblclick', this.onDoubleClick, false);

    this.controls = new THREE.EditorControls(camera, container);
    this.controls.addEventListener('change', () => {
      this.transformControls.updateMatrixWorld();
    });
    window.addEventListener('resize', this.onWindowResize);
    requestAnimationFrame(this.animate);
    if (editable) {
      this.addKeyboardEvents();
    }
    this.onWindowResize();
  }

  componentDidUpdate(prevProps) {
    const {
      editor: {
        selectedObject, focusedObject, transformMode, objectChangedId
      },
    } = this.props;
    if (prevProps.selectedObject !== selectedObject) {
      this.selectionBox.visible = false;
      this.transformControls.detach();
      if (selectedObject) {
        box.setFromObject(selectedObject);
        if (box.isEmpty() === false) {
          this.selectionBox.setFromObject(selectedObject);
          this.selectionBox.visible = true;
        }
        this.transformControls.attach(selectedObject);
      }
    }
    if (prevProps.transformMode !== transformMode) {
      this.transformControls.setMode(transformMode);
    }
    if (focusedObject && prevProps.focusedObject !== focusedObject) {
      this.controls.focus(focusedObject);
    }
    if (prevProps.objectChangedId !== objectChangedId) {
      if (selectedObject) {
        this.selectionBox.setFromObject(selectedObject);
        this.transformControls.updateMatrixWorld();
      }
    }
  }

  componentWillUnmount() {
    const container = this.container.current;
    container.removeEventListener('mousedown', this.onMouseDown, false);
    container.removeEventListener('touchstart', this.onTouchStart, false);
    container.removeEventListener('dblclick', this.onDoubleClick, false);
    window.removeEventListener('resize', this.onWindowResize);
  }

  onDoubleClick(event) {
    const container = this.container.current;
    const {
      editor: { focusObject, objects },
      editable,
    } = this.props;
    if (!editable) {
      return;
    }
    const array = getMousePosition(container, event.clientX, event.clientY);
    onDoubleClickPosition.fromArray(array);
    const intersects = this.getIntersects(onDoubleClickPosition, objects);
    if (intersects.length > 0) {
      focusObject(findNearestUrdfLink(intersects[0].object));
    }
  }

  onTouchStart(event) {
    const container = this.container.current;
    const touch = event.changedTouches[0];
    const array = getMousePosition(container, touch.clientX, touch.clientY);
    onDownPosition.fromArray(array);
    container.addEventListener('touchend', this.onTouchEnd, false);
  }

  onTouchEnd(event) {
    const container = this.container.current;
    const touch = event.changedTouches[0];
    const array = getMousePosition(container, touch.clientX, touch.clientY);
    onUpPosition.fromArray(array);
    this.handleClick();
    container.removeEventListener('touchend', this.onTouchEnd, false);
  }

  onMouseUp(event) {
    const container = this.container.current;
    const array = getMousePosition(container, event.clientX, event.clientY);
    onUpPosition.fromArray(array);
    this.handleClick();
    container.removeEventListener('mouseup', this.onMouseUp, false);
  }

  onMouseDown(event) {
    event.preventDefault();
    const container = this.container.current;
    const array = getMousePosition(container, event.clientX, event.clientY);
    onDownPosition.fromArray(array);
    container.addEventListener('mouseup', this.onMouseUp, false);
  }

  onWindowResize() {
    const {
      editor: {
        camera,
        defaultPerspectiveCamera,
        // defaultOrthographicCamera,
      },
    } = this.props;
    const container = this.container.current;
    const { offsetWidth, offsetHeight } = container;
    if (
      Math.abs(offsetWidth - this.previousWidth) > 10
      || Math.abs(offsetHeight - this.previousHeight) > 10
    ) {
      defaultPerspectiveCamera.aspect = container.offsetWidth / container.offsetHeight;
      defaultPerspectiveCamera.updateProjectionMatrix();

      // defaultOrthographicCamera.left = -offsetWidth/200;
      // defaultOrthographicCamera.right = offsetWidth/200;
      // defaultOrthographicCamera.top = offsetHeight/200;
      // defaultOrthographicCamera.bottom = -offsetHeight/200;
      // defaultOrthographicCamera.updateProjectionMatrix();

      if (camera.type === 'PerspectiveCamera') {
        camera.aspect = container.offsetWidth / container.offsetHeight;
      } else {
        // camera.left = -offsetWidth/200;
        // camera.right = offsetWidth/200;
        // camera.top = offsetHeight/200;
        // camera.bottom = -offsetHeight/200;
      }
      camera.updateProjectionMatrix();

      this.renderer.setSize(container.offsetWidth, container.offsetHeight);
      this.previousWidth = offsetWidth;
      this.previousHeight = offsetHeight;
    }
  }

  getIntersects(point, objects) {
    const {
      editor: { camera },
    } = this.props;

    const meshes = [];
    _.each(objects, (o) => {
      o.traverse(c => c.type === 'Mesh' && meshes.push(c));
    });

    mouse.set(point.x * 2 - 1, -(point.y * 2) + 1);
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects(meshes);
  }

  handleClick() {
    const {
      editor: { objects, selectObject },
      editable,
    } = this.props;
    if (!editable) {
      return;
    }
    if (onDownPosition.distanceTo(onUpPosition) === 0) {
      const intersects = this.getIntersects(onUpPosition, objects);
      if (intersects.length > 0) {
        selectObject(findNearestUrdfLink(intersects[0].object));
      } else {
        selectObject(null);
      }
    }
  }

  animate() {
    const {
      editor: { sceneHelpers, scene, camera },
    } = this.props;
    this.stats.begin();
    sceneHelpers.updateMatrixWorld();
    scene.updateMatrixWorld();

    this.renderer.render(scene, camera);
    this.renderer.render(sceneHelpers, camera);
    this.stats.end();
    requestAnimationFrame(this.animate);
  }

  initSelectionBox() {
    const {
      editor: { sceneHelpers },
    } = this.props;
    const selectionBox = new THREE.BoxHelper();
    selectionBox.material.depthTest = false;
    selectionBox.material.transparent = true;
    selectionBox.visible = false;
    this.selectionBox = selectionBox;
    sceneHelpers.add(this.selectionBox);
  }

  initRenderer() {
    const container = this.container.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.autoClear = false;
    renderer.autoUpdateScene = false;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    this.renderer = renderer;
    container.appendChild(this.renderer.domElement);
  }

  initGrid() {
    const {
      editor: { sceneHelpers },
    } = this.props;
    const grid = new THREE.GridHelper(30, 30, 0x333333, 0x222222);
    grid.geometry.rotateX(Math.PI / 2);
    sceneHelpers.add(grid);
    const { array } = grid.geometry.attributes.color;
    for (let i = 0; i < array.length; i += 60) {
      for (let j = 0; j < 12; j++) {
        array[i + j] = 0.26;
      }
    }
  }

  initStats() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    this.stats.dom.id = 'viewportStats';
    this.container.current.appendChild(this.stats.dom);
  }

  initTransformControls() {
    const {
      editor,
      editor: { camera, updateObjectChangedId },
      editable,
    } = this.props;
    const container = this.container.current;
    let objectPositionOnDown = null;
    let objectRotationOnDown = null;
    let objectScaleOnDown = null;

    const transformControls = new THREE.TransformControls(camera, container);
    if (!editable) {
      transformControls.enabled = false;
    }
    transformControls.addEventListener('change', () => {
      const { object } = transformControls;
      if (object) {
        this.selectionBox.setFromObject(object);
      }
    });
    transformControls.addEventListener('mouseDown', () => {
      const { object } = transformControls;

      objectPositionOnDown = object.position.clone();
      objectRotationOnDown = object.rotation.clone();
      objectScaleOnDown = object.scale.clone();

      this.controls.enabled = false;
    });
    transformControls.addEventListener('mouseUp', () => {
      const { object } = transformControls;
      if (object !== undefined) {
        switch (transformControls.getMode()) {
          case 'translate':
          default:
            if (!objectPositionOnDown.equals(object.position)) {
              const oldPosition = objectPositionOnDown.clone();
              const newPosition = object.position.clone();
              undoManager.add({
                undo: () => {
                  object.position.set(
                    oldPosition.x,
                    oldPosition.y,
                    oldPosition.z,
                  );
                  updateObjectChangedId();
                },
                redo: () => {
                  object.position.set(
                    newPosition.x,
                    newPosition.y,
                    newPosition.z,
                  );
                  updateObjectChangedId();
                },
              });
              updateObjectChangedId();
            }
            break;
          case 'rotate':
            if (!objectRotationOnDown.equals(object.rotation)) {
              const oldRotation = objectRotationOnDown.clone();
              const newRotation = object.rotation.clone();
              undoManager.add({
                undo: () => {
                  object.rotation.set(
                    oldRotation.x,
                    oldRotation.y,
                    oldRotation.z,
                  );
                  updateObjectChangedId();
                },
                redo: () => {
                  object.rotation.set(
                    newRotation.x,
                    newRotation.y,
                    newRotation.z,
                  );
                  updateObjectChangedId();
                },
              });
              updateObjectChangedId();
            }
            break;
          case 'scale':
            if (!objectScaleOnDown.equals(object.scale)) {
              const oldScale = objectScaleOnDown.clone();
              const newScale = object.scale.clone();
              undoManager.add({
                undo: () => {
                  object.scale.set(oldScale.x, oldScale.y, oldScale.z);
                  updateObjectChangedId();
                },
                redo: () => {
                  object.scale.set(newScale.x, newScale.y, newScale.z);
                  updateObjectChangedId();
                },
              });
              updateObjectChangedId();
            }
            break;
        }
      }
      this.controls.enabled = true;
    });
    this.transformControls = transformControls;
    editor.sceneHelpers.add(this.transformControls);
  }

  addKeyboardEvents() {
    const {
      editor: {
        setTransformMode,
        cloneSelectedObject,
        deleteSelectedObject,
        selectedObject,
        focusObject,
      },
    } = this.props;
    this.editorMousetrap = new Mousetrap(this.container.current);
    this.editorMousetrap = new Mousetrap();
    this.editorMousetrap.bind('mod+c', cloneSelectedObject);
    this.editorMousetrap.bind(['backspace', 'delete'], deleteSelectedObject);
    this.editorMousetrap.bind('w', () => setTransformMode('translate'));
    this.editorMousetrap.bind('e', () => setTransformMode('rotate'));
    this.editorMousetrap.bind('r', () => setTransformMode('scale'));
    this.editorMousetrap.bind('mod+z', (e) => {
      e.preventDefault();
      undoManager.undo();
    });
    this.editorMousetrap.bind('shift+z', (e) => {
      e.preventDefault();
      undoManager.redo();
    });
    this.editorMousetrap.bind('f', () => {
      focusObject(selectedObject);
    });
  }

  render() {
    return <div ref={this.container} className="Panel" id="viewport" />;
  }
}

export default Viewport;
