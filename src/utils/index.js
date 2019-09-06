import {
  DEFAULT_OPTIONS_SCENE,
  MESSAGE_TYPE_IMAGE,
  MESSAGE_TYPE_INTERACTIVEMARKER,
  MESSAGE_TYPE_INTERACTIVEMARKER_FEEDBACK,
  MESSAGE_TYPE_INTERACTIVEMARKER_UPDATE,
  MESSAGE_TYPE_LASERSCAN,
  MESSAGE_TYPE_MARKER,
  MESSAGE_TYPE_MARKERARRAY,
  MESSAGE_TYPE_OCCUPANCYGRID,
  MESSAGE_TYPE_ODOMETRY,
  MESSAGE_TYPE_POSEARRAY,
  MESSAGE_TYPE_PATH,
  MESSAGE_TYPE_POINTCLOUD2,
  MESSAGE_TYPE_POINTSTAMPED,
  MESSAGE_TYPE_POSESTAMPED,
  MESSAGE_TYPE_RANGE,
  MESSAGE_TYPE_ROBOT_MODEL,
  MESSAGE_TYPE_TF,
  MESSAGE_TYPE_TF2,
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
} from 'amphion/src/utils/constants';
import _ from 'lodash';

export const ROS_SOCKET_STATUSES = {
  INITIAL: 'Idle. Not Connected',
  CONNECTING: 'Connecting',
  CONNECTED: 'Connected successfully',
  CONNECTION_ERROR: 'Error in connection',
};

const DOCS_ROOT_URL = 'https://github.com/rapyuta-robotics/zethus/wiki/';

export const TF_MESSAGE_TYPES = [MESSAGE_TYPE_TF, MESSAGE_TYPE_TF2];

export const getTfTopics = rosTopics =>
  _.filter(rosTopics, t => _.includes(TF_MESSAGE_TYPES, t.messageType));

export const vizOptions = [
  {
    type: VIZ_TYPE_IMAGE,
    icon: '/image/icons/icon_image.svg',
    messageTypes: [MESSAGE_TYPE_IMAGE],
    description: `Creates a container to visualize the image data represented by a sensor_msgs/Image topic.
    ![](/image/viz/viz-image.png "")`,
    docsLink: `${DOCS_ROOT_URL}Image`,
  },
  {
    type: VIZ_TYPE_LASERSCAN,
    icon: '/image/icons/icon_laser_scan.svg',
    messageTypes: [MESSAGE_TYPE_LASERSCAN],
    description: `Adds a visualization represented by a sensor_msgs/LaserScan topic to the scene.
    ![](/image/viz/viz-laserscan.png "")`,
    docsLink: `${DOCS_ROOT_URL}Laser-Scan`,
  },
  {
    type: VIZ_TYPE_MAP,
    icon: '/image/icons/icon_map.svg',
    messageTypes: [MESSAGE_TYPE_OCCUPANCYGRID],
    description: `Adds a visualization represented by a nav_msgs/OccupancyGrid topic to the scene.
    ![](/image/viz/viz-map.png "")`,
    docsLink: `${DOCS_ROOT_URL}Map`,
  },
  {
    type: VIZ_TYPE_MARKER,
    icon: '/image/icons/icon_marker.svg',
    messageTypes: [MESSAGE_TYPE_MARKER],
    description: `Adds a visualization represented by a visualization_msgs/Marker or visualization_msgs/MarkerArray topic to the scene.
    ![](/image/viz/viz-marker.png "")`,
    docsLink: `${DOCS_ROOT_URL}Marker`,
  },
  {
    type: VIZ_TYPE_MARKERARRAY,
    icon: '/image/icons/icon_marker_array.svg',
    messageTypes: [MESSAGE_TYPE_MARKERARRAY],
    description: `Adds a visualization represented by a visualization_msgs/Marker or visualization_msgs/MarkerArray topic to the scene.
    ![](/image/viz/viz-markerarray.png "")`,
    docsLink: `${DOCS_ROOT_URL}Marker-Array`,
  },
  {
    type: VIZ_TYPE_INTERACTIVEMARKER,
    icon: '/image/icons/icon_marker_array.svg',
    messageTypes: [MESSAGE_TYPE_INTERACTIVEMARKER],
    additionalMessageTypes: [
      MESSAGE_TYPE_INTERACTIVEMARKER_UPDATE,
      MESSAGE_TYPE_INTERACTIVEMARKER_FEEDBACK,
    ],
    description: `Adds an interactive visualization represented by a visualization_msgs/InteractiveMarker topic to the scene.
    ![](/image/viz/viz-markerarray.png "")`,
    docsLink: `${DOCS_ROOT_URL}Interactive-Marker`,
  },
  {
    type: VIZ_TYPE_ODOMETRY,
    icon: '/image/icons/icon_odometry.svg',
    messageTypes: [MESSAGE_TYPE_ODOMETRY],
    description: `Adds a visualization represented by a nav_msgs/Odometry topic to the scene.
    ![](/image/viz/viz-odometry.png "")`,
    docsLink: `${DOCS_ROOT_URL}Odometry`,
    isDisplay: false,
  },
  {
    type: VIZ_TYPE_PATH,
    icon: '/image/icons/icon_path.svg',
    messageTypes: [MESSAGE_TYPE_PATH],
    description: `Adds a visualization represented by a nav_msgs/Path topic to the scene.
    ![](/image/viz/viz-path.png "")`,
    docsLink: `${DOCS_ROOT_URL}Path`,
  },
  {
    type: VIZ_TYPE_POINT,
    icon: '/image/icons/icon_point.svg',
    messageTypes: [MESSAGE_TYPE_POINTSTAMPED],
    description: `Adds a visualization represented by a geometry_msgs/PointStamped topic to the scene.
    ![](/image/viz/viz-point.png "")`,
    docsLink: `${DOCS_ROOT_URL}Point`,
  },
  {
    type: VIZ_TYPE_POINTCLOUD,
    icon: '/image/icons/icon_pointcloud_2.svg',
    messageTypes: [MESSAGE_TYPE_POINTCLOUD2],
    description: `Adds a visualization represented by a sensor_msgs/PointCloud2 topic to the scene.
    ![](/image/viz/viz-pointcloud.png "")`,
    docsLink: `${DOCS_ROOT_URL}Point-Cloud-2`,
  },
  {
    type: VIZ_TYPE_POSE,
    icon: '/image/icons/icon_pose.svg',
    messageTypes: [MESSAGE_TYPE_POSESTAMPED],
    description: `Adds a visualization represented by a geometry_msgs/PoseStamped topic to the scene.
    ![](/image/viz/viz-pose.png "")`,
    docsLink: `${DOCS_ROOT_URL}Pose`,
  },
  {
    type: VIZ_TYPE_POSEARRAY,
    icon: '/image/icons/icon_pose_array.svg',
    messageTypes: [MESSAGE_TYPE_POSEARRAY],
    description: `Adds a visualization represented by a geometry_msgs/PoseArray topic to the scene. An array of pose is added to the scene based on the Shape type selected.
    ![](/image/viz/viz-posearray.png "")`,
    docsLink: `${DOCS_ROOT_URL}Pose-Array`,
  },
  {
    type: VIZ_TYPE_RANGE,
    icon: '/image/icons/icon_range.svg',
    messageTypes: [MESSAGE_TYPE_RANGE],
    description: `Adds a visualization represented by a sensor_msgs/Range topic to the scene.
    ![](/image/viz/viz-range.png "")`,
    docsLink: `${DOCS_ROOT_URL}Range`,
  },
  {
    type: VIZ_TYPE_ROBOTMODEL,
    icon: '/image/icons/icon_robot_model.svg',
    messageTypes: [MESSAGE_TYPE_ROBOT_MODEL],
    description: `Adds a robot model to the scene from a ros parameter.
    ![](/image/viz/viz-robotmodel.png "")`,
    docsLink: `${DOCS_ROOT_URL}Robot-Model`,
  },
  {
    type: VIZ_TYPE_TF,
    icon: '/image/icons/icon_tf.svg',
    messageTypes: TF_MESSAGE_TYPES,
    description: `Adds a visualization represented by a tf/tfMessage and tf2_msgs/TFMessage topic to the scene.
    ![](/image/viz/viz-tf.png "")`,
    docsLink: `${DOCS_ROOT_URL}Tf`,
  },
];

export const DEFAULT_CONFIG = {
  panels: {
    sidebar: {
      display: true,
    },
  },
  ros: {
    endpoint: 'ws://localhost:9090',
  },
  visualizations: [],
  globalOptions: {
    display: true,
    backgroundColor: {
      display: true,
      value: DEFAULT_OPTIONS_SCENE.backgroundColor,
    },
    fixedFrame: {
      display: true,
      value: 'world',
    },
    grid: {
      display: true,
      size: DEFAULT_OPTIONS_SCENE.gridSize,
      divisions: DEFAULT_OPTIONS_SCENE.gridDivisions,
      color: DEFAULT_OPTIONS_SCENE.gridColor,
      centerlineColor: DEFAULT_OPTIONS_SCENE.gridCenterlineColor,
    },
  },
  tools: {
    mode: 'controls',
    controls: {
      display: false,
      enabled: true,
    },
    measure: {
      display: false,
    },
    custom: [
      {
        name: 'Nav goal',
        type: 'publishPose',
        topic: '/navgoal',
      },
      {
        name: 'Nav goal',
        type: 'publishPoseWithCovariance',
        topic: 'initialpose',
      },
    ],
  },
};

export function updateOptionsUtil(e) {
  const {
    options: { key },
    updateVizOptions,
  } = this.props;
  const {
    checked,
    dataset: { id: optionId },
    value,
  } = e.target;
  updateVizOptions(key, {
    [optionId]: _.has(e.target, 'checked') ? checked : value,
  });
}
