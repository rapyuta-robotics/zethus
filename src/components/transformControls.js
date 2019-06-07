import React from 'react';
import Mousetrap from 'mousetrap';
import undoManager from '../utils/UndoManager';

const getMousePosition = (dom, clientX, clientY) => {
  const rect = dom.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  return [
    ((x * devicePixelRatio) / rect.width) * 2 - 1,
    -((y * devicePixelRatio) / rect.height) * 2 + 1,
  ];
};

const { THREE } = window;

const onDownPosition = new THREE.Vector2();
const onUpPosition = new THREE.Vector2();

const MODE_KEY_MAP = {
  transform: {
    name: 'translate',
    key: 'w',
  },
  rotate: {
    name: 'rotate',
    key: 'e',
  },
  scale: {
    name: 'scale',
    key: 'r',
  },
};
const Raycaster = new THREE.Raycaster();

class ViewPortTransformControls extends React.Component {
  constructor(props) {
    super(props);
    this.selectionBox = null;
    this.transformControls = null;
    this.currentObject = null;

    this.onMouseDownInViewPort = this.onMouseDownInViewPort.bind(this);
    this.onMouseUpInViewPort = this.onMouseUpInViewPort.bind(this);
  }

  componentDidMount() {
    const { viewportRef } = this.props;

    this.initSelectionBox();
    this.initTransformControls();
    this.addKeyboardEvents();

    viewportRef.current.addEventListener(
      'mousedown',
      this.onMouseDownInViewPort,
    );
    viewportRef.current.addEventListener('mouseup', this.onMouseUpInViewPort);
  }

  componentWillUnmount() {
    // this.removeTransformEvents();
    // this.removeKeyBoardEvents();
  }

  handleClick() {
    const { camera, scene } = this.props;
    const interactiveMarkerObject = scene.getObjectByName('InteractiveMarker');

    if (
      onDownPosition.distanceTo(onUpPosition) < 0.01 &&
      interactiveMarkerObject
    ) {
      Raycaster.setFromCamera(onDownPosition, camera);
      const intersects = Raycaster.intersectObjects(
        interactiveMarkerObject.children,
      );

      if (intersects.length) {
        const { object } = intersects[0];

        this.currentObject = object;
        this.transformControls.attach(object);
      } else if (this.currentObject) {
        this.transformControls.detach(this.currentObject);
      }
    }
  }

  onMouseUpInViewPort(event) {
    const { viewportRef } = this.props;
    const container = viewportRef.current;
    const array = getMousePosition(container, event.clientX, event.clientY);

    onUpPosition.fromArray(array);
    this.handleClick();
    container.removeEventListener('mouseup', this.onMouseUpInViewPort, false);
  }

  onMouseDownInViewPort(event) {
    event.preventDefault();

    const { viewportRef } = this.props;
    const array = getMousePosition(
      viewportRef.current,
      event.clientX,
      event.clientY,
    );

    onDownPosition.fromArray(array);
    viewportRef.current.addEventListener(
      'mouseup',
      this.onMouseUpInViewPort,
      false,
    );
  }

  initSelectionBox() {
    const { scene } = this.props;
    const selectionBox = new THREE.BoxHelper();

    selectionBox.material.depthTest = false;
    selectionBox.material.transparent = true;
    selectionBox.visible = false;

    this.selectionBox = selectionBox;
    scene.add(this.selectionBox);
  }

  initTransformControls() {
    const {
      camera,
      scene,
      viewportRef,
      updateObjectChangedId,
      disableEditorControls,
      enableEditorControls,
    } = this.props;

    const transformControls = new THREE.TransformControls(
      camera,
      viewportRef.current,
    );

    let objectPositionOnDown = null;
    let objectRotationOnDown = null;
    let objectScaleOnDown = null;

    transformControls.addEventListener('change', () => {
      const { object } = transformControls;

      if (object) {
        this.selectionBox.setFromObject(object);
      }
    });
    transformControls.addEventListener('mouseDown', () => {
      const { object } = transformControls;

      disableEditorControls();
      objectPositionOnDown = object.position.clone();
      objectRotationOnDown = object.rotation.clone();
      objectScaleOnDown = object.scale.clone();
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
      enableEditorControls();
    });

    this.transformControls = transformControls;
    scene.add(this.transformControls);
  }

  focusObject(object) {
    this.transformControls.focus(object);
  }

  setTransformMode(mode) {
    this.transformControls.setMode(mode);
  }

  addKeyboardEvents() {
    const { viewportRef } = this.props;

    this.editorMousetrap = new Mousetrap(viewportRef.current);
    this.editorMousetrap = new Mousetrap();

    this.editorMousetrap.bind(MODE_KEY_MAP.transform.key, () =>
      this.setTransformMode(MODE_KEY_MAP.transform.name),
    );
    this.editorMousetrap.bind(MODE_KEY_MAP.rotate.key, () =>
      this.setTransformMode(MODE_KEY_MAP.rotate.name),
    );
    this.editorMousetrap.bind(MODE_KEY_MAP.scale.key, () =>
      this.setTransformMode(MODE_KEY_MAP.scale.name),
    );
    this.editorMousetrap.bind('mod+z', e => {
      e.preventDefault();
      undoManager.undo();
    });
    this.editorMousetrap.bind('shift+z', e => {
      e.preventDefault();
      undoManager.redo();
    });
  }

  render() {
    return null;
  }
}

export default ViewPortTransformControls;
