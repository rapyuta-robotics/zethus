import ROSLIB from 'roslib';
import { TOOL_TYPE_POINT } from './common';

export default class ToolPublisher {
  constructor(ros) {
    this.ros = ros;
    this.seq = {
      [TOOL_TYPE_POINT]: 0,
    };

    this.pointToolPublisher = new ROSLIB.Topic({
      ros: this.ros,
      name: '/clicked_point',
      messageType: 'geometry_msgs/PointStamped',
    });

    this.publishPointToolMessage = this.publishPointToolMessage.bind(this);
  }

  publishPointToolMessage(point, frameId) {
    const message = new ROSLIB.Message({
      header: {
        seq: this.seq[TOOL_TYPE_POINT],
        stamp: {
          secs: Math.floor(Date.now() / 1000),
          nsecs: 0,
        },
        frame_id: frameId,
      },
      point,
    });
    this.pointToolPublisher.publish(message);
  }
}
