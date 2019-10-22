import React from 'react';
import { Rnd } from 'react-rnd';
import Amphion from 'amphion';
import {
  VIZ_TYPE_IMAGE,
  VIZ_TYPE_INTERACTIVEMARKER,
  VIZ_TYPE_LASERSCAN,
  VIZ_TYPE_MAP,
  VIZ_TYPE_MARKER,
  VIZ_TYPE_MARKERARRAY,
  VIZ_TYPE_ODOMETRY,
  VIZ_TYPE_PATH,
  VIZ_TYPE_POINT,
  VIZ_TYPE_POINTCLOUD,
  VIZ_TYPE_POSE,
  VIZ_TYPE_POSEARRAY,
  VIZ_TYPE_RANGE,
  VIZ_TYPE_ROBOTMODEL,
  VIZ_TYPE_TF,
  VIZ_TYPE_WRENCH,
} from 'amphion/src/utils/constants';
import _ from 'lodash';
import { getTfTopics } from '../../utils';
import { VizImageContainer, VizImageHeader } from '../../components/styled/viz';

class Visualization extends React.PureComponent {
  constructor(props) {
    super(props);
    this.vizInstance = null;
    this.imageDomRef = React.createRef();
    this.resetVisualization = this.resetVisualization.bind(this);
  }

  static getNewViz(vizType, ros, topicName, viewer, options) {
    switch (vizType) {
      case VIZ_TYPE_INTERACTIVEMARKER:
        return new Amphion.InteractiveMarkers(ros, topicName, viewer, options);
      case VIZ_TYPE_IMAGE:
        return new Amphion.Image(ros, topicName, options);
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
      case VIZ_TYPE_POINT:
        return new Amphion.Point(ros, topicName, options);
      case VIZ_TYPE_POINTCLOUD:
        return new Amphion.PointCloud(ros, topicName, options);
      case VIZ_TYPE_POSE:
        return new Amphion.Pose(ros, topicName, options);
      case VIZ_TYPE_POSEARRAY:
        return new Amphion.PoseArray(ros, topicName, options);
      case VIZ_TYPE_RANGE:
        return new Amphion.Range(ros, topicName, options);
      case VIZ_TYPE_ROBOTMODEL:
        return new Amphion.RobotModel(ros, topicName, options);
      case VIZ_TYPE_TF:
        return new Amphion.Tf(ros, topicName, options);
      case VIZ_TYPE_WRENCH:
        return new Amphion.Wrench(ros, topicName, options);
      default:
        return null;
    }
  }

  componentDidMount() {
    this.resetVisualization();
  }

  componentDidUpdate(prevProps) {
    const {
      options: { topicName, visible, vizType },
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
      topicName !== prevProps.options.topicName &&
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
      options: { topicName, visible, vizType },
      rosInstance,
      rosTopics,
      viewer,
    } = this.props;
    if (this.vizInstance) {
      this.vizInstance.destroy();
    }

    this.vizInstance = Visualization.getNewViz(
      vizType,
      rosInstance,
      vizType === VIZ_TYPE_TF ? getTfTopics(rosTopics) : topicName,
      viewer,
      options,
    );
    if (!this.vizInstance) {
      return;
    }
    if (vizType === VIZ_TYPE_ROBOTMODEL) {
      viewer.addRobot(this.vizInstance);
    } else if (vizType === VIZ_TYPE_IMAGE) {
      this.imageDomRef.current.appendChild(this.vizInstance.object);
      this.vizInstance.subscribe();
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
    const {
      options: { topicName, visible, vizType },
    } = this.props;

    if (vizType === VIZ_TYPE_IMAGE) {
      return (
        <Rnd
          style={{
            visibility: visible ? 'visible' : 'hidden',
          }}
          default={{
            x: window.innerWidth - 320 - 30, // imageDefaultWidth: 320, imageRight: 30
            y: 30, // imageTop: 30
            width: 320,
            height: 265, // imageDefaultHeight: 240 + 25px header padding,
          }}
          bounds="window"
          onResizeStop={(e, direction, ref) => {
            this.vizInstance.updateDimensions(
              Number.parseInt(ref.style.width, 10),
              Number.parseInt(ref.style.height, 10) - 25, // -25px for header padding
            );
          }}
        >
          <VizImageContainer ref={this.imageDomRef}>
            <VizImageHeader>Image - {topicName}</VizImageHeader>
          </VizImageContainer>
        </Rnd>
      );
    }
    return null;
  }
}

export default Visualization;
