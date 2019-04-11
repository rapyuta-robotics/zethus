import React from 'react';
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

  getTFMessages({ transforms }) {
    const { framesList, selectedFrame } = this.state;

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
      },
    );

    // const { scene } = this.props;
    // const frameObject = scene.getObjectByName(FIXED_FRAME);
    // const currentFrameObject = frameObject.getObjectByName(this.currentFrame);

    // if (currentFrameObject) {
    //   const zeroVector = new THREE.Vector3();
    //   const oppPos = zeroVector.sub(currentFrameObject.position);
    //   const {
    //     x: quatx,
    //     y: quaty,
    //     z: quatz,
    //     w: quatw,
    //   } = currentFrameObject.quaternion;
    //
    //   frameObject.position.set(oppPos.x, oppPos.y, oppPos.z);
    //   frameObject.quaternion.set(-quatx, -quaty, -quatz, quatw);
    // }
  }

  changeFrame(event) {
    this.currentFrame = event.target.value;

    const { vizWrapper } = this.props;
    vizWrapper.position.set(0, 0, 0);
    vizWrapper.quaternion.set(0, 0, 0, 1);
  }

  render() {
    const { framesList, selectedFrame } = this.state;

    return (
      <div>
        {selectedFrame ? (
          <select onChange={this.changeFrame} value={selectedFrame}>
            {_.map(framesList, frame => (
              <option key={frame} value={frame}>
                {frame}
              </option>
            ))}
          </select>
        ) : null}
      </div>
    );
  }
}

export default GlobalOptions;
