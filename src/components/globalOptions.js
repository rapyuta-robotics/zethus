import React from 'react';
import _ from 'lodash';
import Amphion from 'amphion';
import * as THREE from 'three';
import { FIXED_FRAME } from '../utils';

class GlobalOptions extends React.Component {
  constructor(props) {
    super(props);

    const { scene } = props;
    this.frameGroup = scene.getObjectByName(FIXED_FRAME);
    this.getTFMessages = this.getTFMessages.bind(this);
    this.state = {
      frameMap: {},
    };

    this.changeFrame = this.changeFrame.bind(this);
  }

  componentDidMount() {
    const { ros } = this.props;

    ros.getTopics(rosTopics => {
      const { topics, types: messageTypes } = rosTopics;
      const tfTopicIndex = _.findIndex(topics, topic => topic === '/tf');
      const tfStaticTopicIndex = _.findIndex(
        topics,
        topic => topic === '/tf_static',
      );

      this.initFrameListing(
        messageTypes[tfTopicIndex],
        messageTypes[tfStaticTopicIndex],
      );
    });
  }

  initFrameListing(tfMsgType, tfStaticMsgType) {
    const { ros } = this.props;

    this.frameMap = {};
    this.tfGlobal = new Amphion.Tf(
      ros,
      '/tf',
      { messageType: tfMsgType },
      this.getTFMessages,
    );
    this.tfGlobal.subscribe();

    this.tfStaticGlobal = new Amphion.Tf(
      ros,
      '/tf_static',
      { messageType: tfStaticMsgType },
      this.getTFMessages,
    );
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

    if (!currentFrameObject) {
      console.warn(`${this.currentFrame}: Frame is misssing in the 3D Scene`);
      return;
    }

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
      <div className="display-type-form-content">
        <div className="dislay-type-form-wrapper">
          <div className="display-type-form-content">
            Fixed Frame:
            <select onChange={this.changeFrame}>
              {Object.keys(frameMap).map(frame => (
                <option key={frame} value={frame}>
                  {frame}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default GlobalOptions;
