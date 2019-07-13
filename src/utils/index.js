import {
  MESSAGE_TYPE_TF,
  MESSAGE_TYPE_POSESTAMPED,
  MESSAGE_TYPE_POINTCLOUD2,
  MESSAGE_TYPE_MARKERARRAY,
  MESSAGE_TYPE_LASERSCAN,
  MESSAGE_TYPE_OCCUPANCYGRID,
  MESSAGE_TYPE_ODOMETRY,
  // MESSAGE_TYPE_POINTCLOUD,
  MESSAGE_TYPE_ROBOT_MODEL,
  MESSAGE_TYPE_POSEARRAY,
  MESSAGE_TYPE_PATH,
  MESSAGE_TYPE_IMAGE,
  MESSAGE_TYPE_MARKER,
  MESSAGE_TYPE_TF2,
  OBJECT_TYPE_ARROW,
  // MESSAGE_TYPE_INTERACTIVEMARKER,
} from 'amphion/src/utils/constants';

import { DEFAULT_COLOR_X_AXIS } from 'amphion/src/utils/defaults';
import { COLOR_SCHEMES } from 'amphion/src/viz/Map';
import {
  COLOR_TRANSFORMERS,
  INTENSITY_CHANNEL_OPTIONS,
  STYLE,
  AXIS_OPTIONS,
} from 'amphion/src/viz/LaserScan';

import { ARROW_OPTIONS_DEFAULTS } from '../views/sidebar/sidebarOptions/arrow';
import { AXES_OPTIONS_DEFAULTS } from '../views/sidebar/sidebarOptions/axes';
import { FLAT_ARROW_OPTIONS_DEFAULTS } from '../views/sidebar/sidebarOptions/flatArrow';

export const ROS_SOCKET_STATUSES = {
  INITIAL: 'Idle. Not Connected',
  CONNECTING: 'Connecting',
  CONNECTED: 'Connected successfully',
  CONNECTION_ERROR: 'Error in connection',
};

export const LINE_STYLES = {
  LINES: 'Lines',
  BILLBOARDS: 'Billboards',
};

const intensityOptions = {
  channelName: INTENSITY_CHANNEL_OPTIONS.INTENSITY,
  useRainbow: false,
  invertRainbow: false,
  minColor: '#000000',
  maxColor: '#ffffff',
  autocomputeIntensityBounds: false,
  maxIntensity: 3730,
  minIntensity: 388,
};

const axisColorOptions = {
  axis: AXIS_OPTIONS.X,
  autocomputeValueBounds: false,
  useFixedFrame: false,
  minAxisValue: 0,
  maxAxisValue: 0,
};

const DOCS_ROOT_URL = 'https://zethus.rapyuta.io/docs/';

export const vizOptions = [
  {
    name: 'Image',
    icon: '/image/icons/icon_image.svg',
    messageTypes: [MESSAGE_TYPE_IMAGE],
    description: `Creates a container to visualize the image data represented by a sensor_msgs/Image topic.
    ![](/image/viz/viz-image.png "")`,
    docsLink: `${DOCS_ROOT_URL}visualizations-image`,
    defaultOptions: {
      queueSize: 100,
    },
  },
  {
    name: 'Laser Scan',
    icon: '/image/icons/icon_laser_scan.svg',
    messageTypes: [MESSAGE_TYPE_LASERSCAN],
    description: `Adds a visualization represented by a sensor_msgs/LaserScan topic to the scene.
    ![](/image/viz/viz-laserscan.png "")`,
    docsLink: `${DOCS_ROOT_URL}visualizations-laser-scan`,
    defaultOptions: {
      selectable: false,
      style: STYLE.FLAT_SQUARES,
      size: 0.01,
      alpha: 1,
      decayTime: 0,
      queueSize: 10,
      colorTransformer: COLOR_TRANSFORMERS.INTENSITY,
      flatColor: '#ffffff',
      ...intensityOptions,
      ...axisColorOptions,
    },
  },
  {
    name: 'Map',
    icon: '/image/icons/icon_map.svg',
    messageTypes: [MESSAGE_TYPE_OCCUPANCYGRID],
    description: `Adds a visualization represented by a nav_msgs/OccupancyGrid topic to the scene.
    ![](/image/viz/viz-map.png "")`,
    docsLink: `${DOCS_ROOT_URL}visualizations-map`,
    defaultOptions: {
      alpha: 1,
      colorScheme: COLOR_SCHEMES.MAP,
      drawBehind: false,
    },
  },
  {
    name: 'Marker',
    icon: '/image/icons/icon_marker.svg',
    messageTypes: [MESSAGE_TYPE_MARKER],
    description: `Adds a visualization represented by a visualization_msgs/Marker or visualization_msgs/MarkerArray topic to the scene.
    ![](/image/viz/viz-marker.png "")`,
    docsLink: `${DOCS_ROOT_URL}visualizations-marker`,
    defaultOptions: {
      queueSize: 100,
      namespaces: [],
    },
  },
  {
    name: 'Marker Array',
    icon: '/image/icons/icon_marker_array.svg',
    messageTypes: [MESSAGE_TYPE_MARKERARRAY],
    description: `Adds a visualization represented by a visualization_msgs/Marker or visualization_msgs/MarkerArray topic to the scene.
    ![](/image/viz/viz-markerarray.png "")`,
    docsLink: `${DOCS_ROOT_URL}visualizations-marker-array`,
    defaultOptions: {
      queueSize: 100,
      namespaces: [],
    },
  },
  {
    name: 'Odometry',
    icon: '/image/icons/icon_odometry.svg',
    messageTypes: [MESSAGE_TYPE_ODOMETRY],
    description: `Adds a visualization represented by a nav_msgs/Odometry topic to the scene.
    ![](/image/viz/viz-odometry.png "")`,
    docsLink: `${DOCS_ROOT_URL}visualizations-odometry`,
    isDisplay: false,
    defaultOptions: {
      type: OBJECT_TYPE_ARROW,
      color: DEFAULT_COLOR_X_AXIS,
      alpha: 1,
      ...ARROW_OPTIONS_DEFAULTS,
      ...AXES_OPTIONS_DEFAULTS,
      ...FLAT_ARROW_OPTIONS_DEFAULTS,
      positionTolerance: 0.1,
      angleTolerance: 0.1,
      keep: 100,
    },
  },
  {
    name: 'Path',
    icon: '/image/icons/icon_path.svg',
    messageTypes: [MESSAGE_TYPE_PATH],
    description: `Adds a visualization represented by a nav_msgs/Path topic to the scene.
    ![](/image/viz/viz-path.png "")`,
    docsLink: `${DOCS_ROOT_URL}visualizations-path`,
    defaultOptions: {
      lineStyle: LINE_STYLES.LINES,
      color: '#ffffff',
      alpha: 1,
      poseStyle: 'None',
      bufferLength: 0,
      ...AXES_OPTIONS_DEFAULTS,
      ...ARROW_OPTIONS_DEFAULTS,
    },
  },
  {
    name: 'Point Cloud 2',
    icon: '/image/icons/icon_pointcloud_2.svg',
    messageTypes: [MESSAGE_TYPE_POINTCLOUD2],
    description: `Adds a visualization represented by a sensor_msgs/PointCloud2 topic to the scene.
    ![](/image/viz/viz-pointcloud.png "")`,
    docsLink: `${DOCS_ROOT_URL}visualizations-point-cloud2`,
  },
  {
    name: 'Pose',
    icon: '/image/icons/icon_pose.svg',
    messageTypes: [MESSAGE_TYPE_POSESTAMPED],
    description: `Adds a visualization represented by a geometry_msgs/PoseStamped topic to the scene.
    ![](/image/viz/viz-pose.png "")`,
    docsLink: `${DOCS_ROOT_URL}visualizations-pose`,
    defaultOptions: {
      color: DEFAULT_COLOR_X_AXIS,
      alpha: 1,
      ...ARROW_OPTIONS_DEFAULTS,
      ...AXES_OPTIONS_DEFAULTS,
      type: OBJECT_TYPE_ARROW,
    },
  },
  {
    name: 'Pose Array',
    icon: '/image/icons/icon_pose_array.svg',
    messageTypes: [MESSAGE_TYPE_POSEARRAY],
    description: `Adds a visualization represented by a geometry_msgs/PoseArray topic to the scene. An array of pose is added to the scene based on the Shape type selected.
    ![](/image/viz/viz-posearray.png "")`,
    docsLink: `${DOCS_ROOT_URL}visualizations-pose-array`,
    defaultOptions: {
      color: DEFAULT_COLOR_X_AXIS,
      alpha: 1,
      ...ARROW_OPTIONS_DEFAULTS,
      ...AXES_OPTIONS_DEFAULTS,
      ...FLAT_ARROW_OPTIONS_DEFAULTS,
      type: OBJECT_TYPE_ARROW,
    },
  },
  {
    name: 'Robot Model',
    icon: '/image/icons/icon_robot_model.svg',
    messageTypes: [MESSAGE_TYPE_ROBOT_MODEL],
    description: `Adds a robot model to the scene from a ros parameter.
    ![](/image/viz/viz-robotmodel.png "")`,
    docsLink: `${DOCS_ROOT_URL}visualizations-robot-model`,
  },
  {
    name: 'Tf',
    icon: '/image/icons/icon_tf.svg',
    messageTypes: [MESSAGE_TYPE_TF, MESSAGE_TYPE_TF2],
    description: `Adds a visualization represented by a tf/tfMessage and tf2_msgs/TFMessage topic to the scene.
    ![](/image/viz/viz-tf.png "")`,
    docsLink: `${DOCS_ROOT_URL}visualizations-tf`,
  },
];
