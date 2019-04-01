import React from 'react';
import Stats from 'stats-js';

const { THREE } = window;

class Viewport extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();

    this.previousWidth = 0;
    this.previousHeight = 0;

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

  initStats() {
    this.stats = new Stats();
    this.stats.showPanel(0);
    this.stats.dom.id = 'viewportStats';
    this.container.current.appendChild(this.stats.dom);
  }

  render() {
    return <div ref={this.container} className="Panel" id="viewport" />;
  }
}

export default Viewport;
