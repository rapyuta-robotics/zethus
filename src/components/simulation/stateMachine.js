import React from 'react';
import ROSLIB from 'roslib';
import _ from 'lodash';
import classNames from 'classnames';
import { injectIntl } from 'react-intl';

const armStates = {
  armWait: 'waiting',
  armError: 'error',
  armDepalletize: 'arm.depalletize',
  armDepalletizeCompleted: 'arm.depalletizeCompleted',
};

const agvStates = {
  agvWait: 'waiting',
  agvError: 'error',
  agvMove: 'agv.moving',
  agvCompleted: 'agv.completed',
};

const agvMoveStates = {
  lifting: 'agv.lifiting',
  relative_moving: 'agv.relativeMoving',
  unlifting: 'agv.unlifting',
  navigation: 'agv.navigation',
};

class StateMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      armTask: armStates.armWait,
      agvTask: agvStates.agvWait,
      agvMoveState: '',
      armAlive: false,
      agvAlive: false,
      cameraAlive: false,
    };
    this.sendRosTopic = this.sendRosTopic.bind(this);
    this.dSetArmNotAlive = _.debounce(this.setArmNotAlive, 5000);
    this.dSetAgvNotAlive = _.debounce(this.setAgvNotAlive, 5000);
    this.dSetCameraNotAlive = _.debounce(this.setCameraNotAlive, 5000);
  }

  componentDidMount() {
    const { ros } = this.props;
    const stateMachineTopic = new ROSLIB.Topic({
      ros,
      name: '/AlicaEngine/AlicaEngineInfo',
      messageType: 'alica_msgs/AlicaEngineInfo',
    });
    const agvStateTopic = new ROSLIB.Topic({
      ros,
      name: '/agv1/move_state',
      messageType: 'std_msgs/String',
    });
    const cameraHeartbeatTopic = new ROSLIB.Topic({
      ros,
      name: '/pickit/heartbeat',
      messageType: 'std_msgs/Empty',
    });
    const armHeartbeatTopic = new ROSLIB.Topic({
      ros,
      name: '/bin_picking_heartbeat',
      messageType: 'std_msgs/Empty',
    });
    const agvHeartbeatTopic = new ROSLIB.Topic({
      ros,
      name: '/odom',
      messageType: 'nav_msgs/Odometry',
    });

    stateMachineTopic.subscribe((message) => {
      const { current_task: task, current_state: state } = message;
      this.setState({
        [task]: armStates[state] || agvStates[state],
      });
    });
    agvStateTopic.subscribe(({ data }) => {
      this.setState({
        agvMoveState: agvMoveStates[_.trim(data)],
      });
    });
    cameraHeartbeatTopic.subscribe(() => {
      const { cameraAlive } = this.state;
      if (!cameraAlive) {
        this.setState({
          cameraAlive: true,
        });
      }
      this.dSetCameraNotAlive();
    });
    armHeartbeatTopic.subscribe(() => {
      const { armAlive } = this.state;
      if (armAlive) {
        this.setState({
          armAlive: true,
        });
      }
      this.dSetArmNotAlive();
    });
    agvHeartbeatTopic.subscribe(() => {
      const { agvAlive } = this.state;
      if (!agvAlive) {
        this.setState({
          agvAlive: true,
        });
      }
      this.dSetAgvNotAlive();
    });
  }

  setArmNotAlive() {
    this.setState({
      armAlive: false,
    });
  }

  setAgvNotAlive() {
    this.setState({
      agvAlive: false,
    });
  }

  setCameraNotAlive() {
    this.setState({
      cameraAlive: false,
    });
  }

  getTopicData(messageType) {
    const { ros } = this.props;
    switch (messageType) {
      case 1:
        return {
          topic: new ROSLIB.Topic({
            ros,
            name: '/bin_picking/bin_pick_sequencer/cancel',
            messageType: 'actionlib_msgs/GoalID',
          }),
          data: {
            stamp: {
              secs: 0,
              nsecs: 0,
            },
            id: '',
          },
        };
      case 2:
        return {
          topic: new ROSLIB.Topic({
            ros,
            name: '/arm1/arm_wait',
            messageType: 'std_msgs/Empty',
          }),
          data: {},
        };
      case 3:
      default:
        return {
          topic: new ROSLIB.Topic({
            ros,
            name: '/arm1/arm_depaletize',
            messageType: 'std_msgs/Empty',
          }),
          data: {},
        };
    }
  }

  sendRosTopic(messageType) {
    const { topic, data } = this.getTopicData(messageType);
    topic.publish(data);
  }

  render() {
    const {
      armTask,
      agvTask,
      agvMoveState,
      armAlive,
      agvAlive,
      cameraAlive,
    } = this.state;
    const { intl } = this.props;
    const { stateMachine: translations } = intl.messages;
    return (
      <div className="cdDsl cdSection">
        <div className="cdSectionHeader">
          <h4>Arm state</h4>
          <div className="border" />
        </div>
        <div className="smWrapper">
          <div className="smFlex">
            {_.map(armStates, state => (
              <div
                key={state}
                className={classNames({
                  smItem: true,
                  current: state === armTask,
                })}
              >
                {_.get(translations, state)}
              </div>
            ))}
          </div>
        </div>

        <div className="cdSectionHeader">
          <h4>AGV state</h4>
          <div className="border" />
        </div>
        <div className="smWrapper">
          <div className="smFlex">
            {_.map(agvStates, state => (
              <div
                key={state}
                className={classNames({
                  smItem: true,
                  current: state === agvTask,
                })}
              >
                {_.get(translations, state)}
                {agvTask === agvStates.agvMove
                    && agvMoveState
                    && state === agvStates.agvMove
                    && ` (${_.get(translations, agvMoveState)})`}
              </div>
            ))}
          </div>
        </div>

        <div className="cdSectionHeader">
          <h4>Status</h4>
          <div className="border" />
        </div>
        <div className="smWrapper">
          <p className="smSatuses">
            <span
              className={classNames({
                aliveIcon: true,
                alive: armAlive,
              })}
            />
            {' '}
            Arm
            <br />
            <span
              className={classNames({
                aliveIcon: true,
                alive: agvAlive,
              })}
            />
            {' '}
            AGV
            <br />
            <span
              className={classNames({
                aliveIcon: true,
                alive: cameraAlive,
              })}
            />
            {' '}
            Camera
          </p>
        </div>

        <div className="cdSectionHeader">
          <h4>Actions</h4>
          <div className="border" />
        </div>
        <div className="smWrapper">
          {armTask === armStates.armWait && (
            <button type="button" className="blueButton" onClick={() => this.sendRosTopic(3)}>
              Depalletize
            </button>
          )}
          {armTask === armStates.armDepalletize && (
            <button type="button" className="blueButton" onClick={() => this.sendRosTopic(1)}>
              Cancel depalletize
            </button>
          )}
          {_.includes(
            [armStates.armDepalletizeCompleted, armStates.armError],
            armTask,
          ) && (
            <button type="button" className="blueButton" onClick={() => this.sendRosTopic(2)}>
              Go to wait state
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default injectIntl(StateMachine);
