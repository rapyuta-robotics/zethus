import * as THREE from 'three';
import { TOOL_TYPE } from './toolbar';

export default class Raycaster extends THREE.Raycaster {
  constructor(camera, scene, domElement) {
    super();
    this.fixedFrame = 'base_link';
    this.mouse = new THREE.Vector2();
    this.camera = camera;
    this.scene = scene;
    this.domElement = domElement;
    this.activePlane = new THREE.Plane();
    this.intersection = new THREE.Vector3();
    this.mouseDown = new THREE.Vector3();
    this.tool = { name: 'Controls', type: TOOL_TYPE.TOOL_TYPE_CONTROLS };
    this.eventListeners = {};
    this.arrowHelper = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0),
      this.scene.position,
      1,
      0xffff00,
      0.2,
      0.2,
    );
    this.dirv1Cache = new THREE.Vector3(0, 1, 0);
    this.dirv2Cache = new THREE.Vector3();
    this.quaternionCache = new THREE.Quaternion();
    this.arrowHelper.line.material.linewidth = 2;

    this.addOrReplaceEventListener = this.addOrReplaceEventListener.bind(this);
    this.mouseUpListener = this.mouseUpListener.bind(this);
    this.mouseMoveListener = this.mouseMoveListener.bind(this);
    this.mouseDownListener = this.mouseDownListener.bind(this);
    this.translateToFixedFrame = this.translateToFixedFrame.bind(this);

    this.domElement.addEventListener('mouseup', this.mouseUpListener, false);
    this.domElement.addEventListener(
      'mousedown',
      this.mouseDownListener,
      false,
    );
  }

  addOrReplaceEventListener(name, cb) {
    this.eventListeners[name] = cb;
  }

  setRayDirection(event) {
    const rect = this.domElement.getBoundingClientRect();
    const { clientHeight, clientWidth } = this.domElement;
    this.mouse.x = ((event.clientX - rect.left) / clientWidth) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / clientHeight) * 2 + 1;
    this.setFromCamera(this.mouse, this.camera);
  }

  mouseDownListener(event) {
    this.setRayDirection(event);
    this.activePlane.setFromNormalAndCoplanarPoint(
      this.camera.up,
      this.scene.position,
    );
    this.ray.intersectPlane(this.activePlane, this.intersection);
    if (!(this.intersection && this.eventListeners[this.tool.name])) {
      return;
    }
    this.translateToFixedFrame(this.intersection);
    this.mouseDown.copy(this.intersection);

    switch (this.tool.type) {
      case TOOL_TYPE.TOOL_TYPE_POSE_ESTIMATE:
      case TOOL_TYPE.TOOL_TYPE_NAV_GOAL: {
        this.arrowHelper.position.copy(this.intersection);
        this.arrowHelper.quaternion.set(0, 0, 0, 1);
        this.scene.add(this.arrowHelper);
        this.domElement.addEventListener(
          'mousemove',
          this.mouseMoveListener,
          false,
        );
        break;
      }
      default:
    }
  }

  mouseMoveListener(event) {
    this.setRayDirection(event);
    this.ray.intersectPlane(this.activePlane, this.intersection);
    if (!(this.intersection && this.eventListeners[this.tool.name])) {
      return;
    }
    this.translateToFixedFrame(this.intersection);
    this.dirv2Cache
      .copy(this.intersection)
      .sub(this.mouseDown)
      .normalize();
    this.quaternionCache.setFromUnitVectors(this.dirv1Cache, this.dirv2Cache);

    this.arrowHelper.quaternion.copy(this.quaternionCache);
  }

  mouseUpListener() {
    this.domElement.removeEventListener(
      'mousemove',
      this.mouseMoveListener,
      false,
    );
    this.scene.remove(this.arrowHelper);

    switch (this.tool.type) {
      case TOOL_TYPE.TOOL_TYPE_POINT: {
        this.eventListeners[this.tool.name](this.intersection, this.fixedFrame);
        break;
      }
      case TOOL_TYPE.TOOL_TYPE_POSE_ESTIMATE:
      case TOOL_TYPE.TOOL_TYPE_NAV_GOAL: {
        const { position, quaternion } = this.arrowHelper;
        const quaternionTransform = new THREE.Quaternion().setFromAxisAngle(
          this.camera.up,
          Math.PI / 2,
        );
        quaternion.premultiply(quaternionTransform);
        this.eventListeners[this.tool.name](
          position,
          quaternion,
          this.fixedFrame,
        );
        break;
      }
      case TOOL_TYPE.TOOL_TYPE_CONTROLS:
      default:
    }
  }

  translateToFixedFrame(point) {
    const frame = this.scene.getObjectByName(this.fixedFrame);
    if (frame) {
      frame.worldToLocal(point);
    }
  }
}
