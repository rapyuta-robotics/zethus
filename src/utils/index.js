import {
  MESSAGE_TYPE_TF,
  MESSAGE_TYPE_POSESTAMPED,
  MESSAGE_TYPE_DISPLAYJOINTSTATE,
  MESSAGE_TYPE_POINTCLOUD2,
  MESSAGE_TYPE_MARKERARRAY,
  MESSAGE_TYPE_LASERSCAN,
  MESSAGE_TYPE_OCCUPANCYGRID,
  MESSAGE_TYPE_ODOMETRY,
  MESSAGE_TYPE_POINTCLOUD,
  // MESSAGE_TYPE_DISPLAYTF,
  MESSAGE_TYPE_ROBOT_MODEL,
  MESSAGE_TYPE_POSEARRAY,
  MESSAGE_TYPE_PATH,
  MESSAGE_TYPE_IMAGE,
  MESSAGE_TYPE_MARKER,
  MESSAGE_TYPE_TF2,
  OBJECT_TYPE_ARROW,
} from 'amphion/src/utils/constants';

import { DEFAULT_COLOR_X_AXIS } from 'amphion/src/utils/defaults';
import { COLOR_SCHEMES } from 'amphion/src/viz/Map';
import {
  COLOR_TRANSFORMERS,
  INTENSITY_CHANNEL_OPTIONS,
  STYLE,
  AXIS_OPTIONS,
} from 'amphion/src/viz/LaserScan';

import { ARROW_OPTIONS_DEFAULTS } from '../components/sidebarOptions/ArrowOptions';
import { AXES_OPTIONS_DEFAULTS } from '../components/sidebarOptions/AxesOptions';
import { FLAT_ARROW_OPTIONS_DEFAULTS } from '../components/sidebarOptions/FlatArrowOptions';

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

export const vizOptions = [
  {
    name: 'Image',
    messageTypes: [MESSAGE_TYPE_IMAGE],
    description: 'Lorem ipsum',
    exampleLink: '',
    docsLink: '',
  },
  {
    name: 'Laser Scan',
    messageTypes: [MESSAGE_TYPE_LASERSCAN],
    description: ``,
    exampleLink: '',
    docsLink: '',
    defaultOptions: {
      unreliable: false,
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
    messageTypes: [MESSAGE_TYPE_OCCUPANCYGRID],
    description: 'Lorem ipsum',
    exampleLink: '',
    docsLink: '',
    defaultOptions: {
      unreliable: false,
      alpha: 1,
      colorScheme: COLOR_SCHEMES.MAP,
      drawBehind: false,
    },
  },
  {
    name: 'Marker',
    messageTypes: [MESSAGE_TYPE_MARKER],
    description: 'Lorem ipsum',
    exampleLink: '',
    docsLink: '',
    defaultOptions: {
      unreliable: false,
      queueSize: 100,
      namespaces: [],
    },
  },
  {
    name: 'Marker array',
    messageTypes: [MESSAGE_TYPE_MARKERARRAY],
    description: 'Lorem ipsum',
    exampleLink: '',
    docsLink: '',
    defaultOptions: {
      unreliable: false,
      queueSize: 100,
      namespaces: [],
    },
  },
  {
    name: 'Odometry',
    messageTypes: [MESSAGE_TYPE_ODOMETRY],
    description: 'Lorem ipsum',
    exampleLink: '',
    docsLink: '',
    isDisplay: false,
    defaultOptions: {
      unreliable: false,
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
    messageTypes: [MESSAGE_TYPE_PATH],
    description: 'Lorem ipsum',
    exampleLink: '',
    docsLink: '',
    defaultOptions: {
      unreliable: false,
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
    name: 'Point Cloud',
    messageTypes: [MESSAGE_TYPE_POINTCLOUD2, MESSAGE_TYPE_POINTCLOUD],
    description: 'Lorem ipsum',
    exampleLink: '',
    docsLink: '',
  },
  {
    name: 'Pose',
    messageTypes: [MESSAGE_TYPE_POSESTAMPED],
    description: 'Lorem ipsum',
    exampleLink: '',
    docsLink: '',
    defaultOptions: {
      color: DEFAULT_COLOR_X_AXIS,
      alpha: 1,
      ...ARROW_OPTIONS_DEFAULTS,
      ...AXES_OPTIONS_DEFAULTS,
      type: OBJECT_TYPE_ARROW,
      unreliable: false,
    },
  },
  {
    name: 'Pose Array',
    messageTypes: [MESSAGE_TYPE_POSEARRAY],
    description: 'Lorem ipsum',
    exampleLink: '',
    docsLink: '',
    defaultOptions: {
      color: DEFAULT_COLOR_X_AXIS,
      alpha: 1,
      ...ARROW_OPTIONS_DEFAULTS,
      ...AXES_OPTIONS_DEFAULTS,
      ...FLAT_ARROW_OPTIONS_DEFAULTS,
      type: OBJECT_TYPE_ARROW,
      unreliable: false,
    },
  },
  {
    name: 'Robot Model',
    messageTypes: [MESSAGE_TYPE_ROBOT_MODEL],
    description: 'Lorem ipsum',
    exampleLink: '',
    docsLink: '',
  },
  {
    name: 'Tf',
    messageTypes: [MESSAGE_TYPE_TF, MESSAGE_TYPE_TF2],
    description: 'Lorem ipsum',
    exampleLink: '',
    docsLink: '',
  },
  // {
  //   name: 'Display Joint state',
  //   messageTypes: [MESSAGE_TYPE_DISPLAYJOINTSTATE],
  //   description: 'Lorem ipsum',
  //   exampleLink: '',
  //   docsLink: '',
  //   isDisplay: true,
  // },
  // {
  //   name: 'Display Tf',
  //   messageTypes: [MESSAGE_TYPE_DISPLAYTF],
  //   description: 'Lorem ipsum',
  //   exampleLink: '',
  //   docsLink: '',
  //   isDisplay: true,
  // },
];
