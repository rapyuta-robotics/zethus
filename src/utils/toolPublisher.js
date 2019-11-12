import ROSLIB from 'roslib';
import {
  TOOL_TYPE_NAV_GOAL,
  TOOL_TYPE_POINT,
  TOOL_TYPE_POSE_ESTIMATE,
} from './common';

export default class ToolPublisher {
  constructor(ros) {
    this.ros = ros;
    this.seq = {
      [TOOL_TYPE_POINT]: 0,
      [TOOL_TYPE_NAV_GOAL]: 0,
      [TOOL_TYPE_POSE_ESTIMATE]: 0,
    };

    this.pointToolPublisher = new ROSLIB.Topic({
      ros: this.ros,
      name: '/clicked_point',
      messageType: 'geometry_msgs/PointStamped',
    });
    this.navGoalToolPublisher = new ROSLIB.Topic({
      ros: this.ros,
      name: '/move_base_simple/goal',
      messageType: 'geometry_msgs/PoseStamped',
    });
    this.poseEstimateToolPublisher = new ROSLIB.Topic({
      ros: this.ros,
      name: '/initialpose',
      messageType: 'geometry_msgs/PoseWithCovarianceStamped',
    });

    this.publishPointToolMessage = this.publishPointToolMessage.bind(this);
    this.publishNavGoalToolMessage = this.publishNavGoalToolMessage.bind(this);
    this.publishPoseEstimateToolMessage = this.publishPoseEstimateToolMessage.bind(
      this,
    );
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

  publishNavGoalToolMessage(pose, frameId) {
    const message = new ROSLIB.Message({
      header: {
        seq: this.seq[TOOL_TYPE_NAV_GOAL],
        stamp: {
          secs: Math.floor(Date.now() / 1000),
          nsecs: 0,
        },
        frame_id: frameId,
      },
      pose,
    });
    this.navGoalToolPublisher.publish(message);
  }

  publishPoseEstimateToolMessage(pose, frameId) {
    // covariance being published here is meaningless
    // but we keep the same covariance as rviz does
    // for compatibility
    const covariance = new Array(36).fill(0);
    covariance[0] = 0.5 * 0.5;
    covariance[6 + 1] = 0.5 * 0.5;
    covariance[6 * 6 - 1] = ((Math.PI / 12.0) * Math.PI) / 12.0;

    const message = new ROSLIB.Message({
      header: {
        seq: this.seq[TOOL_TYPE_POSE_ESTIMATE],
        stamp: {
          secs: Math.floor(Date.now() / 1000),
          nsecs: 0,
        },
        frame_id: frameId,
      },
      pose: {
        pose,
        covariance,
      },
    });
    this.poseEstimateToolPublisher.publish(message);
  }
}
