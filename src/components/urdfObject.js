import _ from 'lodash';

const { THREE, URDFLoader } = window;

const excludedObjects = [
  'PerspectiveCamera',
  'OrthographicCamera',
  'AmbientLight',
  'DirectionalLight',
  'HemisphereLight',
  'Light',
  'RectAreaLight',
  'SpotLight',
  'PointLight',
];

const removeExcludedObjects = (mesh) => {
  const objectArray = [mesh];
  while (_.size(objectArray) > 0) {
    const currentItem = objectArray.shift();
    _.each(currentItem.children, (child) => {
      if (!child) {
        return;
      }
      if (_.includes(excludedObjects, child.type)) {
        const { parent } = child;
        parent.children = _.filter(parent.children, c => c !== child);
      } else {
        objectArray.push(child);
      }
    });
  }
};

class UrdfObject {
  constructor(config, robotCallback) {
    this.instance = new THREE.Object3D();
    this.config = config;
    this._loadModel(config.urdf, config.packages, this.instance, robotCallback);
    this._setUp(this.up);
  }

  get up() {
    return this.config.up || '+Z';
  }

  set up(val) {
    this.config.up = val;
  }

  _setUp(up) {
    if (!up) up = '+Z';
    up = up.toUpperCase();
    const sign = up.replace(/[^-+]/g, '')[0] || '+';
    const axis = up.replace(/[^XYZ]/gi, '')[0] || 'Z';

    const { PI } = Math;
    const HALFPI = PI / 2;
    if (axis === 'X') { this.instance.rotation.set(0, 0, sign === '+' ? HALFPI : -HALFPI); }
    if (axis === 'Z') { this.instance.rotation.set(sign === '+' ? -HALFPI : HALFPI, 0, 0); }
    if (axis === 'Y') this.instance.rotation.set(sign === '+' ? 0 : PI, 0, 0);
  }

  _loadModel(urdfContent, packages, world, robotCallback) {
    const manager = new THREE.LoadingManager();
    const loader = new URDFLoader(manager);
    loader.parse(
      urdfContent,
      packages,
      (robot) => {
        removeExcludedObjects(robot);
        this.robot = robot;
        world.add(robot);
        robotCallback(robot);
      },
      {
        loadMeshCb: (path, ext, done) => {
          loader.defaultMeshLoader(path, ext, (mesh) => {
            removeExcludedObjects(mesh);
            done(mesh);
          });
        },
        fetchOptions: { mode: 'cors', credentials: 'same-origin' },
      },
    );
  }

  setAngle(jointname, angle) {
    if (!this.robot) return;

    const joint = this.robot.joints[jointname];
    if (joint && joint.angle !== angle) {
      joint.setAngle(angle);
    }
  }
}

export default UrdfObject;
