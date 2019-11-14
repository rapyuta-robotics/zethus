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
    this.previousScreenPoint = new THREE.Vector2();
    this.currentScreenPoint = new THREE.Vector2();
    this.tool = { name: 'Controls', type: TOOL_TYPE.TOOL_TYPE_CONTROLS };
    this.eventListeners = {};

    this.addOrReplaceEventListener = this.addOrReplaceEventListener.bind(this);
    this.mouseUpListener = this.mouseUpListener.bind(this);
    this.mouseUpListener = this.mouseUpListener.bind(this);

    this.domElement.addEventListener('mouseup', this.mouseUpListener, false);
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

  mouseUpListener(event) {
    this.setRayDirection(event);
    this.previousScreenPoint.set(event.clientX, event.clientY);

    const intersection = this.intersectObjects(this.scene.children, true)[0];
    if (!(intersection && this.eventListeners[this.tool.name])) {
      return;
    }

    const frame = this.scene.getObjectByName(this.fixedFrame);
    if (frame) {
      frame.worldToLocal(intersection.point);
    }

    switch (this.tool.type) {
      case TOOL_TYPE.TOOL_TYPE_POINT: {
        this.eventListeners[this.tool.name](
          intersection.point,
          this.fixedFrame,
        );
        break;
      }
      case TOOL_TYPE.TOOL_TYPE_CONTROLS:
      default:
    }
  }
}
