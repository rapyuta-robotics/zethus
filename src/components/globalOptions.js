import React from 'react';
import Amphion from 'amphion';
import * as THREE from 'three';

import { FIXED_FRAME } from '../utils';
import { MESSAGE_TYPE_TF } from 'amphion/src/utils/constants';

class GlobalOptions extends React.Component {
  constructor(props) {
    super(props);

    const { scene } = props;
    this.frameGroup = scene.getObjectByName(FIXED_FRAME);
    this.getTFMessages = this.getTFMessages.bind(this);
    this.tempFixedFrame = 'rotating_frame';
    this.state = {
      frameMap: {},
    };

    this.changeFrame = this.changeFrame.bind(this);
  }

  componentDidMount() {
    const { ros } = this.props;

    this.frameMap = {};
    this.tfGlobal = new Amphion.Tf(
      ros,
      '/tf',
      { messageType: MESSAGE_TYPE_TF },
      this.getTFMessages,
    );
    this.tfStaticGlobal = new Amphion.Tf(ros, '/tf_static', this.getTFMessages);
    this.tfGlobal.subscribe();
    this.tfStaticGlobal.subscribe();
  }

  getTFMessages(message) {
    const { transforms } = message;
    const { frameMap } = this.state;
    const currentMap = { ...frameMap };
    const tempArr = [];

    transforms.forEach(
      ({
        header: { frame_id: parentFrameId },
        child_frame_id: childFrameId,
      }) => {
        if (!this.frameMap.hasOwnProperty(parentFrameId)) {
          tempArr.push(parentFrameId);
        }
        if (!this.frameMap.hasOwnProperty(childFrameId)) {
          tempArr.push(childFrameId);
        }
      },
    );

    tempArr.forEach(id => {
      currentMap[id] = true;
    });

    if (tempArr.length > 0) {
      this.setState({ frameMap: currentMap });
    }

    if (!this.allow) {
      return;
    }

    const { scene } = this.props;
    const frameObject = scene.getObjectByName(FIXED_FRAME);
    const currentFrameObject = frameObject.getObjectByName(this.currentFrame);
    const zeroVector = new THREE.Vector3();
    const oppPos = zeroVector.sub(currentFrameObject.position);
    const {
      x: quatx,
      y: quaty,
      z: quatz,
      w: quatw,
    } = currentFrameObject.quaternion;

    frameObject.position.set(oppPos.x, oppPos.y, oppPos.z);
    frameObject.quaternion.set(-quatx, -quaty, -quatz, quatw);
  }

  changeFrame(event) {
    event.persist();
    this.currentFrame = event.target.value;

    const { scene } = this.props;
    const frameObject = scene.getObjectByName(FIXED_FRAME);
    frameObject.position.set(0, 0, 0);
    frameObject.quaternion.set(0, 0, 0, 1);
    this.allow = true;
  }

  render() {
    const { frameMap } = this.state;

    return (
      <div>
        <select onChange={this.changeFrame}>
          {Object.keys(frameMap).map(frame => (
            <option key={frame} value={frame}>
              {frame}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default GlobalOptions;
