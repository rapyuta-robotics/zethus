/* eslint import/no-webpack-loader-syntax: off */
import _ from 'lodash';
import Amphion from 'amphion';
import ROSLIB from 'roslib';
import PointCloudWorker from 'worker-loader!../utils/rosWorker';
import React from 'react';
import Viewport from '../viewport';
import UrdfObject from '../urdfObject';
import {
  rosEndpoint,
  MAX_POINTCLOUD_POINTS,
  boundingBoxTransform,
  boundingBoxColor,
} from '../config';

const { THREE } = window;

class Simulation extends React.Component {
  constructor(props) {
    super(props);

    this.DEFAULT_CAMERA = new THREE.PerspectiveCamera(50, 1, 0.01, 1000);
    this.DEFAULT_CAMERA.name = 'Camera';
    this.DEFAULT_CAMERA.position.set(0, 5, 10);
    this.DEFAULT_CAMERA.up.set(0, 0, 1);
    this.DEFAULT_CAMERA.lookAt(new THREE.Vector3());

    this.camera = this.DEFAULT_CAMERA.clone();

    this.scene = new THREE.Scene();
    this.sceneHelpers = new THREE.Scene();

    this.ros = new ROSLIB.Ros();
    this.markersTopic = new ROSLIB.Topic({
      ros: this.ros,
      name: '/box_array',
      messageType: 'visualization_msgs/MarkerArray',
    });
    this.jointStateTopic = new ROSLIB.Topic({
      ros: this.ros,
      name: '/joint_states',
      messageType: 'sensor_msgs/JointState',
    });
    this.boundingBoxTopic = new ROSLIB.Topic({
      ros: this.ros,
      name: '/pickit/roi_box',
      messageType: 'im_pickit_msgs/BoundingBox',
    });
    this.tfStaticTopic = new ROSLIB.Topic({
      ros: this.ros,
      name: '/tf_static',
      messageType: 'tf2_msgs/TFMessage',
    });
    this.amphionTf = new Amphion.DisplayTf(
      this.ros,
      this.scene,
      '/tf',
    );
    this.planningSceneTopic = new ROSLIB.Topic({
      ros: this.ros,
      name: '/bin_picking/monitored_planning_scene',
      messageType: 'moveit_msgs/PlanningScene',
    });

    const cloudMaterial = new THREE.PointsMaterial({
      size: 0.01,
      vertexColors: THREE.VertexColors,
    });
    const pointCloudGeometry = new THREE.BufferGeometry();
    pointCloudGeometry.addAttribute(
      'position',
      new THREE.BufferAttribute(
        new Float32Array(MAX_POINTCLOUD_POINTS * 3),
        3,
      ).setDynamic(true),
    );
    pointCloudGeometry.addAttribute(
      'color',
      new THREE.BufferAttribute(
        new Float32Array(MAX_POINTCLOUD_POINTS * 3),
        3,
      ).setDynamic(true),
    );
    pointCloudGeometry.setDrawRange(0, 0);
    this.pointCloud = new THREE.Points(pointCloudGeometry, cloudMaterial);
    // this.pointCloud.name = 'CAM_90273/CAM_90273_rgb_optical_frame';
    this.pointCloud.frustumCulled = false;
    this.scene.add(this.pointCloud);

    const cameraFrame = new THREE.Mesh(
      new THREE.Geometry(),
      new THREE.MeshBasicMaterial(),
    );
    cameraFrame.name = 'CAM_90273/CAM_90273_rgb_optical_frame';
    this.scene.add(cameraFrame);

    const boundingBoxMaterial = new THREE.MeshBasicMaterial({
      color: boundingBoxColor,
      transparent: true,
      opacity: 0.2,
    });
    const boundingBoxGeometry = new THREE.BoxGeometry();
    const boundingBoxEdges = new THREE.EdgesGeometry(boundingBoxGeometry);
    this.boundingBoxLines = new THREE.LineSegments(
      boundingBoxEdges,
      new THREE.LineBasicMaterial({
        color: boundingBoxColor,
        transparent: true,
        opacity: 1,
      }),
    );
    this.boundingBoxLines.visible = false;
    this.boundingBox = new THREE.Mesh(boundingBoxGeometry, boundingBoxMaterial);
    this.boundingBox.visible = false;
    const boundingBoxGroup = new THREE.Group();
    boundingBoxGroup.name = 'pickit/reference';
    boundingBoxGroup.add(this.pointCloud);
    boundingBoxGroup.add(this.boundingBox);
    boundingBoxGroup.add(this.boundingBoxLines);
    this.scene.add(boundingBoxGroup);

    const planningBoxMaterial = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
    });
    const planningBoxGeometry = new THREE.BoxGeometry();
    this.planningBox = new THREE.Mesh(planningBoxGeometry, planningBoxMaterial);
    this.planningBox.name = 'planningBox23%rE2';
    this.planningBox.visible = false;
    this.scene.add(this.planningBox);

    this.markerArray = [];

    this.updateJointPositions = this.updateJointPositions.bind(this);
  }

  componentDidMount() {
    const {
      compositionDetails: { urdf, packages },
    } = this.props;
    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach((positions) => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
      [directionalLight.position.x, directionalLight.position.y] = positions;
      directionalLight.position.z = 1;
      this.scene.add(directionalLight);
    });
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(ambientLight);

    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    this.model = new UrdfObject({ urdf, packages }, (robot) => {
      this.scene.add(robot);
      this.amphionTf.update(boundingBoxTransform);
    });

    window.scene = this.scene;

    setTimeout(() => {
      this.pointCloudWorker = new PointCloudWorker();
      this.pointCloudWorker.addEventListener(
        'message',
        ({ data: { type }, data }) => {
          switch (type) {
            case 'UPDATE_POINTCLOUD_GEOMETRY':
              this.updatePointCloudGeometry(
                new Float32Array(data.positions),
                new Float32Array(data.colors),
                data.frame,
              );
              break;
            default:
          }
        },
      );
    }, 5000);
    this.ros.on('connection', () => {
      // this.jointStateTopic.subscribe(this.updateJointPositions);
      // this.jointStateTopic.subscribe(message => {
      //   console.log(message);
      // });
      this.planningSceneTopic.subscribe((message) => {
        const collisionObjects = message.robot_state.attached_collision_objects;
        if (
          _.size(collisionObjects)
          && _.get(collisionObjects, '[0].object.operation') === 0
        ) {
          const object = _.get(collisionObjects, '[0].object');
          this.planningBox.scale.set(...object.primitives[0].dimensions);
          this.planningBox.visible = true;
          this.amphionTf.update({
            transforms: [
              {
                header: {
                  frame_id: 'schmalz_gripper_link',
                },
                child_frame_id: 'planningBox23%rE2',
                transform: {
                  translation: object.primitive_poses[0].position,
                  rotation: object.primitive_poses[0].orientation,
                },
              },
            ],
          });
        } else {
          this.planningBox.visible = false;
        }
      });
      // this.boxMarkerTopic.subscribe(message => {
      //   console.log('Box marker', JSON.stringify(message));
      // });

      this.boundingBoxTopic.subscribe(
        ({
          x_min: xm,
          x_max: xM,
          y_min: ym,
          y_max: yM,
          z_min: zm,
          z_max: zM,
        }) => {
          _.each([this.boundingBox, this.boundingBoxLines], (mesh) => {
            mesh.position.set((xm + xM) / 2, (ym + yM) / 2, (zm + zM) / 2);
            mesh.scale.x = xM - xm;
            mesh.scale.y = yM - ym;
            mesh.scale.z = zM - zm;
            mesh.visible = true;
          });
        },
      );

      this.markersTopic.subscribe(({ markers }) => {
        const previousMarkerLength = this.markerArray.length;
        const markerLength = markers.length;
        if (previousMarkerLength > markerLength) {
          for (let i = markerLength; i < previousMarkerLength; i++) {
            if (this.markerArray[i].parent) {
              this.markerArray[i].parent.remove(this.markerArray[i]);
            }
          }
          this.markerArray.splice(-1, previousMarkerLength - markerLength);
        }
        if (previousMarkerLength < markerLength) {
          for (let i = previousMarkerLength; i < markerLength; i++) {
            const marker = new THREE.Line(
              new THREE.Geometry(),
              new THREE.LineBasicMaterial(),
            );
            this.markerArray.push(marker);
          }
        }
        for (let i = 0; i < markerLength; i++) {
          const {
            points,
            color: { r: cr, g: cg, b: cb },
            header: { frame_id: parentFrame },
            pose: {
              orientation: {
                w: rw, x: rx, y: ry, z: rz
              },
              position: { x, y, z },
            },
          } = markers[i];
          const object = this.markerArray[i];
          object.geometry.vertices = _.map(
            points,
            p => new THREE.Vector3(p.x, p.y, p.z),
          );
          object.position.set(x, y, z);
          object.quaternion.set(rx, ry, rz, rw);
          object.material.color.setRGB(cr, cg, cb);
          const parentObject = this.scene.getObjectByName(parentFrame);

          if (parentObject) {
            parentObject.add(object);
          }
        }
      });
      this.amphionTf.subscribe();
    });

    this.ros.connect(rosEndpoint);
  }

  componentWillUnmount() {
    this.ros && this.ros.close();
    this.pointCloudWorker
      && this.pointCloudWorker.postMessage({
        type: 'TERMINATE',
      });
  }

  updatePointCloudGeometry(positions, colors, frame) {
    const { geometry } = this.pointCloud;
    const l = Math.min(MAX_POINTCLOUD_POINTS, positions.length);
    geometry.setDrawRange(0, l);
    const geoPositions = geometry.attributes.position.array;
    const geoColors = geometry.attributes.color.array;

    for (let i = 0, arrayLength = l * 3; i < arrayLength; i++) {
      geoPositions[i] = positions[i] || 0;
      geoColors[i] = colors[i] || 0;
    }
    for (let i = l * 3; i < MAX_POINTCLOUD_POINTS; i++) {
      geoPositions[i] = 0;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  }

  updateJointPositions(message) {
    _.each(message.name, (jointName, index) => {
      this.model.setAngle(jointName, message.position[index]);
    });
  }

  render() {
    const { compositionDetails, toggleUiState } = this.props;
    const editor = {
      camera: this.camera,
      defaultPerspectiveCamera: this.DEFAULT_CAMERA,
      sceneHelpers: this.sceneHelpers,
      scene: this.scene,
    };

    return (
      <div id="simContents">
        <Viewport editor={editor} />
      </div>
    );
  }
}

export default Simulation;
