import React from 'react';
import Stats from 'stats-js';
import Arrow from 'amphion/src/primitives/Arrow';
import {
  MESSAGE_TYPE_POSESTAMPED,
  MESSAGE_TYPE_POSECOVARIANCE,
} from 'amphion/src/utils/constants';

const { THREE } = window;

const SIDEBAR_WIDTH = 400;

class Viewport extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();

    this.previousWidth = 0;
    this.previousHeight = 0;

    this.controls = null;
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.rayIntersection = new THREE.Vector3();
    this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    this.arrow = new Arrow();

    this.onWindowResize = this.onWindowResize.bind(this);
    this.animate = this.animate.bind(this);
    this.initRenderer = this.initRenderer.bind(this);
    this.initGrid = this.initGrid.bind(this);
    this.initStats = this.initStats.bind(this);

    this.setMouse = this.setMouse.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  componentDidMount() {
    const { camera } = this.props;
    const container = this.container.current;

    this.initStats();
    this.initRenderer();
    this.initGrid();

    this.controls = new THREE.EditorControls(camera, container);
    // this.controls.enabled = false;
    window.addEventListener('resize', this.onWindowResize);
    requestAnimationFrame(this.animate);
    this.onWindowResize();

    this.props.onRef(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    this.props.onRef(undefined);
  }

  onWindowResize() {
    const { camera } = this.props;
    const container = this.container.current;
    const { offsetWidth, offsetHeight } = container;
    if (
      Math.abs(offsetWidth - this.previousWidth) > 10 ||
      Math.abs(offsetHeight - this.previousHeight) > 10
    ) {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      this.renderer.setSize(container.offsetWidth, container.offsetHeight);
      this.previousWidth = offsetWidth;
      this.previousHeight = offsetHeight;
    }
  }

  animate() {
    const { scene, camera } = this.props;
    this.stats.begin();
    scene.updateMatrixWorld();

    this.renderer.render(scene, camera);
    this.stats.end();
    requestAnimationFrame(this.animate);
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
    const { scene } = this.props;
    const grid = new THREE.GridHelper(30, 30, 0x333333, 0x222222);
    grid.geometry.rotateX(Math.PI / 2);
    scene.add(grid);
    const { array } = grid.geometry.attributes.color;
    for (let i = 0; i < array.length; i += 60) {
      for (let j = 0; j < 12; j += 1) {
        array[i + j] = 0.26;
      }
    }
  }

  setMouse({ clientX, clientY }) {
    const { width, height } = this.renderer.domElement;
    this.mouse.x = ((clientX - SIDEBAR_WIDTH) / width) * 2 - 1;
    this.mouse.y = -(clientY / height) * 2 + 1;
  }

  castRay() {
    const { camera } = this.props;
    this.raycaster.setFromCamera(this.mouse, camera);
    return this.raycaster.ray.intersectPlane(this.plane, this.rayIntersection);
  }

  onMouseMove(event) {
    this.setMouse(event);
    this.castRay();
    this.arrow.lookAt(this.rayIntersection);
    this.arrow.rotateY(-Math.PI / 2);
  }

  publishNavMsg() {
    const { position, quaternion } = this.arrow;
    const { publishNavMessages } = this.props;

    const pose = {
      pose: {
        position: { x: position.x, y: position.y, z: position.z },
        orientation: {
          x: quaternion.x,
          y: quaternion.y,
          z: quaternion.z,
          w: quaternion.w,
        },
      },
    };

    if (this.currentNavTopicType === '/move_base_simple/goal') {
      publishNavMessages(
        { header: { frame_id: 'world' }, ...pose },
        this.currentNavTopicType,
        MESSAGE_TYPE_POSESTAMPED,
      );
    } else {
      const arr = new Array(12).fill(0);
      publishNavMessages(
        { ...pose, covariance: arr },
        this.currentNavTopicType,
        MESSAGE_TYPE_POSECOVARIANCE,
      );
    }
  }

  onMouseDown(event) {
    if (this.controls.enabled) {
      return;
    }

    const { scene } = this.props;
    this.setMouse(event);
    const mousePos = this.castRay();
    if (mousePos) {
      this.arrow.position.set(mousePos.x, mousePos.y, 0);
      scene.add(this.arrow);
      window.addEventListener('mousemove', this.onMouseMove);
    }
  }

  onMouseUp() {
    const { scene } = this.props;

    window.removeEventListener('mousemove', this.onMouseMove);
    scene.remove(this.arrow);

    console.log(this.currentNavTopicType);
    if (this.currentNavTopicType) {
      this.publishNavMsg();
    }

    this.currentNavTopicType = null;
  }

  disableEditorControls(topicName) {
    this.controls.enabled = false;
    this.currentNavTopicType = topicName;
  }

  enableEditorControls() {
    this.controls.enabled = true;
  }

  initStats() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    this.stats.dom.id = 'viewportStats';
    this.container.current.appendChild(this.stats.dom);
  }

  render() {
    return (
      <div
        ref={this.container}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        className="Panel"
        id="viewport"
      />
    );
  }
}

export default Viewport;
