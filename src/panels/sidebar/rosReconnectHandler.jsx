import React from 'react';
import { includes } from 'lodash';

import { ROS_SOCKET_STATUSES } from '../../utils';

// In seconds
const MIN_TIMER_TIME = 0;
const MAX_TIMER_TIME = 100;
const TIMER_INCREMENT = 5;
const ONE_SECOND = 1000;

class RosReconnectHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,
    };
    this.retryTime = MIN_TIMER_TIME;
    this.timerInstance = null;

    this.onTick = this.onTick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidUpdate() {
    const { rosStatus } = this.props;
    switch (rosStatus) {
      case ROS_SOCKET_STATUSES.CONNECTED:
        this.retryTime = MIN_TIMER_TIME;
        break;
      case ROS_SOCKET_STATUSES.CONNECTING:
        this.stopTimer();
        break;
      case ROS_SOCKET_STATUSES.CONNECTION_ERROR:
      case ROS_SOCKET_STATUSES.INITIAL:
      default:
        if (!this.timerInstance && this.retryTime < MAX_TIMER_TIME) {
          this.retryTime += TIMER_INCREMENT;
          this.startTimer();
        }
    }
  }

  onTick() {
    const { timer } = this.state;
    const { connectRos } = this.props;
    if (timer === 0) {
      this.timerInstance = null;
      connectRos();
    } else {
      this.setState({
        timer: timer - 1,
      });
      this.timerInstance = setTimeout(this.onTick, ONE_SECOND);
    }
  }

  startTimer() {
    this.setState({
      timer: this.retryTime,
    });
    this.timerInstance = setTimeout(this.onTick, ONE_SECOND);
  }

  stopTimer() {
    if (this.timerInstance) {
      clearTimeout(this.timerInstance);
      this.timerInstance = null;
      this.setState({
        timer: 0,
      });
    }
  }

  render() {
    const { timer } = this.state;
    const { rosStatus } = this.props;
    if (
      includes(
        [ROS_SOCKET_STATUSES.CONNECTING, ROS_SOCKET_STATUSES.CONNECTED],
        rosStatus,
      )
    ) {
      return null;
    }
    return timer > 0 ? `Reconnecting in ${timer} seconds` : null;
  }
}

export default RosReconnectHandler;
