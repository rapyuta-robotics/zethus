import React from 'react';
import Amphion from 'amphion';

import {
  VIZ_TYPE_LASERSCAN,
  VIZ_TYPE_MAP,
  VIZ_TYPE_MARKER,
  VIZ_TYPE_MARKERARRAY,
  VIZ_TYPE_ODOMETRY,
  VIZ_TYPE_PATH,
  VIZ_TYPE_POINTCLOUD,
  VIZ_TYPE_POSE,
  VIZ_TYPE_POSEARRAY,
  VIZ_TYPE_ROBOTMODEL,
  VIZ_TYPE_TF,
} from 'amphion/src/utils/constants';
import _ from 'lodash';
import { getTfTopics } from '../../utils';

class Visualization extends React.PureComponent {
  constructor(props) {
    super(props);
    this.vizInstance = null;
    this.resetVisualization = this.resetVisualization.bind(this);
  }

  static getNewViz(vizType, ros, topicName, options) {
    switch (vizType) {
      case VIZ_TYPE_LASERSCAN:
        return new Amphion.LaserScan(ros, topicName, options);
      case VIZ_TYPE_MAP:
        return new Amphion.Map(ros, topicName, options);
      case VIZ_TYPE_MARKER:
        return new Amphion.Marker(ros, topicName, options);
      case VIZ_TYPE_MARKERARRAY:
        return new Amphion.MarkerArray(ros, topicName, options);
      case VIZ_TYPE_ODOMETRY:
        return new Amphion.Odometry(ros, topicName, options);
      case VIZ_TYPE_PATH:
        return new Amphion.Path(ros, topicName, options);
      case VIZ_TYPE_POINTCLOUD:
        return new Amphion.PointCloud(ros, topicName, options);
      case VIZ_TYPE_POSE:
        return new Amphion.Pose(ros, topicName, options);
      case VIZ_TYPE_POSEARRAY:
        return new Amphion.PoseArray(ros, topicName, options);
      case VIZ_TYPE_ROBOTMODEL:
        return new Amphion.RobotModel(ros, topicName, options);
      case VIZ_TYPE_TF:
        return new Amphion.Tf(ros, topicName, options);
      default:
        return null;
    }
  }

  componentDidMount() {
    this.resetVisualization();
  }

  componentDidUpdate(prevProps) {
    const {
      options: { vizType, topicName, visible },
      options,
      rosTopics,
    } = this.props;
    if (vizType !== prevProps.options.vizType) {
      this.resetVisualization();
    }
    if (vizType === VIZ_TYPE_TF) {
      const currentTfTopics = getTfTopics(rosTopics);
      const prevTfTopics = getTfTopics(prevProps.rosTopics);
      if (
        _.join(_.sortBy(_.map(currentTfTopics, 'name'))) !==
        _.join(_.sortBy(_.map(prevTfTopics, 'name')))
      ) {
        this.vizInstance.changeTopic(currentTfTopics);
      }
    } else if (
      topicName !== prevProps.topicName &&
      this.vizInstance.changeTopic
    ) {
      this.vizInstance.changeTopic(topicName);
    }
    if (this.vizInstance) {
      this.vizInstance.updateOptions(options);
    }
    if (visible !== prevProps.options.visible) {
      this.updateVisibility(visible);
    }
  }

  resetVisualization() {
    const {
      options,
      options: { vizType, topicName, visible },
      viewer,
      rosInstance,
      rosTopics,
    } = this.props;
    if (this.vizInstance) {
      this.vizInstance.destroy();
    }
    this.vizInstance = Visualization.getNewViz(
      vizType,
      rosInstance,
      vizType === VIZ_TYPE_TF ? getTfTopics(rosTopics) : topicName,
      options,
    );
    if (!this.vizInstance) {
      return;
    }
    if (vizType === VIZ_TYPE_ROBOTMODEL) {
      viewer.addRobot(this.vizInstance);
    } else {
      viewer.addVisualization(this.vizInstance);
      this.vizInstance.subscribe();
    }
    this.updateVisibility(!_.isBoolean(visible) || visible);
  }

  updateVisibility(visible) {
    if (visible) {
      this.vizInstance.show();
    } else {
      this.vizInstance.hide();
    }
  }

  componentWillUnmount() {
    if (this.vizInstance) {
      this.vizInstance.destroy();
    }
  }

  render() {
    return null;
  }
}

export default Visualization;
