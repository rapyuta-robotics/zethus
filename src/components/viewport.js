import React from 'react';
import Stats from 'stats-js';
import Arrow from 'amphion/src/primitives/Arrow';

const { THREE } = window;

class Viewport extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();

    this.previousWidth = 0;
    this.previousHeight = 0;

    this.intersetPoint = new THREE.Vector3();
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)

    this.onWindowResize = this.onWindowResize.bind(this);
    this.animate = this.animate.bind(this);
    this.initRenderer = this.initRenderer.bind(this);
    this.initGrid = this.initGrid.bind(this);
    this.initStats = this.initStats.bind(this);
  }

  componentDidMount() {
    const { camera } = this.props;
    const container = this.container.current;

    this.initStats();
    this.initRenderer();
    this.initGrid();

    new THREE.EditorControls(camera, container);
    window.addEventListener('resize', this.onWindowResize);
    requestAnimationFrame(this.animate);
    this.onWindowResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
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
      for (let j = 0; j < 12; j++) {
        array[i + j] = 0.26;
      }
    }
  }

  setMouse(event) {
    this.mouse.x = ( event.nativeEvent.offsetX / this.renderer.domElement.width ) * 2 - 1;
    this.mouse.y = - ( event.nativeEvent.offsetY / this.renderer.domElement.height ) * 2 + 1;
  }

  castRay() {
    const { camera } = this.props;

    // update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera( this.mouse, camera );

    // calculate objects intersecting the picking ray
    this.raycaster.ray.intersectPlane(this.plane, this.intersetPoint);
  }

  _onMouseMove(event) {
    event.persist();

    if (!this.canSetNav2D) {
      return;
    }

    this.setMouse(event);
    this.castRay();

    const direction = this.intersetPoint.sub(this.arrow.position);
    this.arrow.lookAt(direction);
  }

  _onMouseClick(event) {
    const { scene } = this.props;

    event.persist();
    this.setMouse(event);
    this.castRay();

    if (this.intersetPoint) {
      scene.add(this.getArrow());
      this.arrow.position.set(this.intersetPoint.x, this.intersetPoint.y, 0)
    }

    this.canSetNav2D = true;
  }

  _onMouseUp(event) {
    event.persist();
    this.arrow.visible = false;
    this.canSetNav2D = false;
  }

  getArrow() {
    if (!this.arrow) {
      this.arrow = new Arrow();
    }
    this.arrow.visible = true;
    return this.arrow;
  }

  initStats() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    this.stats.dom.id = 'viewportStats';
    this.container.current.appendChild(this.stats.dom);
  }

  render() {
    return <div ref={this.container}
      onMouseMove={this._onMouseMove.bind(this)}
      onMouseDown={this._onMouseClick.bind(this)}
      onMouseUp={this._onMouseUp.bind(this)}
      className="Panel" id="viewport" />;
  }
}

export default Viewport;
