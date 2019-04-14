import React from 'react';
import * as THREE from 'three';
import _ from 'lodash';
import ROSLIB from 'roslib';
import { MESSAGE_TYPE_TF, MESSAGE_TYPE_TF2 } from 'amphion/src/utils/constants';

class GlobalOptions extends React.Component {
  constructor(props) {
    super(props);

    this.getTFMessages = this.getTFMessages.bind(this);
    this.state = {
      framesList: [],
      selectedFrame: '',
    };

    this.changeFrame = this.changeFrame.bind(this);
    this.setFrameTransform = this.setFrameTransform.bind(this);
  }

  componentDidMount() {
    const { ros } = this.props;

    this.tfTopic = new ROSLIB.Topic({
      ros,
      name: '/tf',
      messageType: MESSAGE_TYPE_TF,
    });
    this.tf2Topic = new ROSLIB.Topic({
      ros,
      name: '/tf',
      messageType: MESSAGE_TYPE_TF2,
    });
    this.tfStaticTopic = new ROSLIB.Topic({
      ros,
      name: '/tf_static',
      messageType: MESSAGE_TYPE_TF,
    });
    this.tf2StaticTopic = new ROSLIB.Topic({
      ros,
      name: '/tf_static',
      messageType: MESSAGE_TYPE_TF2,
    });

    this.tfTopic.subscribe(this.getTFMessages);
    this.tf2Topic.subscribe(this.getTFMessages);
    this.tfStaticTopic.subscribe(this.getTFMessages);
    this.tf2StaticTopic.subscribe(this.getTFMessages);
  }

  resetFrameTransform() {
    const { vizWrapper } = this.props;

    vizWrapper.position.set(0, 0, 0);
    vizWrapper.quaternion.set(0, 0, 0, 1);
  }

  setFrameTransform() {
    const { vizWrapper } = this.props;
    const { selectedFrame } = this.state;
    const currentFrameObject = vizWrapper.getObjectByName(selectedFrame);

    if (currentFrameObject) {
      this.resetFrameTransform();
      vizWrapper.updateMatrixWorld();

      const worldPos = new THREE.Vector3();
      const worldQuat = new THREE.Quaternion();

      // currentFrameObject.getWorldQuaternion(worldQuat);
      currentFrameObject.getWorldQuaternion(worldQuat);
      const { x: quatx, y: quaty, z: quatz, w: quatw } = worldQuat;
      vizWrapper.quaternion.set(-quatx, -quaty, -quatz, quatw);

      vizWrapper.updateMatrixWorld();

      currentFrameObject.getWorldPosition(worldPos);
      const oppPos = worldPos.negate();
      vizWrapper.position.set(oppPos.x, oppPos.y, oppPos.z);
    }
  }

  getTFMessages({ transforms }) {
    const { framesList, selectedFrame } = this.state;
    const { vizWrapper } = this.props;

    _.each(
      transforms,
      ({
        header: { frame_id: parentFrameId },
        child_frame_id: childFrameId,
      }) => {
        _.each([parentFrameId, childFrameId], frame => {
          if (!_.includes(framesList, frame)) {
            this.setState({
              framesList: [...framesList, frame],
            });
          }
        });

        if (selectedFrame === '') {
          return;
        }

        if (selectedFrame === childFrameId || selectedFrame === parentFrameId) {
          this.setFrameTransform();
          return;
        }

        const parentFrameObject = vizWrapper.getObjectByName(parentFrameId);
        const childFrameObject = vizWrapper.getObjectByName(childFrameId);

        if (
          parentFrameObject.getObjectByName(selectedFrame) ||
          childFrameObject.getObjectByName(selectedFrame)
        ) {
          this.setFrameTransform();
        }
      },
    );
  }

  changeFrame(event) {
    this.setState({ selectedFrame: event.target.value });
    this.resetFrameTransform();
  }

  render() {
    const { framesList, selectedFrame } = this.state;

    return (
      <React.Fragment>
        {framesList.length > 0 ? (
          <div className="display-type-form-content">
            <div className="dislay-type-form-wrapper">
              <div className="display-type-form-content">
                Fixed Frame:
                <select onChange={this.changeFrame} value={selectedFrame}>
                  {_.map(framesList, frame => (
                    <option key={frame} value={frame}>
                      {frame}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default GlobalOptions;
