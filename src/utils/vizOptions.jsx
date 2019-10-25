import React from 'react';
import { CONSTANTS } from 'amphion';

const {
  MESSAGE_TYPE_IMAGE,
  VIZ_TYPE_WRENCH,
  MESSAGE_TYPE_INTERACTIVEMARKER_FEEDBACK,
  MESSAGE_TYPE_INTERACTIVEMARKER_UPDATE,
  MESSAGE_TYPE_LASERSCAN,
  MESSAGE_TYPE_MARKER,
  MESSAGE_TYPE_MARKERARRAY,
  MESSAGE_TYPE_OCCUPANCYGRID,
  MESSAGE_TYPE_ODOMETRY,
  MESSAGE_TYPE_PATH,
  MESSAGE_TYPE_POINTCLOUD2,
  MESSAGE_TYPE_POINTSTAMPED,
  MESSAGE_TYPE_POSEARRAY,
  MESSAGE_TYPE_POSESTAMPED,
  MESSAGE_TYPE_RANGE,
  MESSAGE_TYPE_ROBOT_MODEL,
  MESSAGE_TYPE_TF,
  MESSAGE_TYPE_INTERACTIVEMARKER,
  MESSAGE_TYPE_WRENCHSTAMPED,
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
  MESSAGE_TYPE_TF2,
} = CONSTANTS;

const iconLineStyle = {
  fill: 'none',
  stroke: '#dc1d30',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: '1.5px',
};

const iconFillStyle = {
  fill: '#dc1d30',
};

export const TF_MESSAGE_TYPES = [MESSAGE_TYPE_TF, MESSAGE_TYPE_TF2];

const DOCS_ROOT_URL = 'https://github.com/rapyuta-robotics/zethus/wiki/';

const markerArrayIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect
      style={iconLineStyle}
      x="32.1"
      y="15.05"
      width="18.75"
      height="36.66"
      transform="translate(74.85 -8.1) rotate(90)"
    />
    <rect
      style={iconLineStyle}
      x="53.84"
      y="35.93"
      width="24.72"
      height="24.72"
    />
    <circle style={iconLineStyle} cx="35.51" cy="46.59" r="14.07" />
    <rect
      style={iconLineStyle}
      x="41.05"
      y="51.28"
      width="24.72"
      height="24.72"
    />
  </svg>
);

export const vizOptions = [
  {
    type: VIZ_TYPE_IMAGE,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect
          style={iconLineStyle}
          x="17.5"
          y="30"
          width="65"
          height="40"
          rx="2"
        />
        <polyline
          style={iconLineStyle}
          points="18 67.5 46 49.5 52 55.5 71 42.5 82.5 49.29"
        />
        <circle style={iconFillStyle} cx="62" cy="40.5" r="2.5" />
      </svg>
    ),
    messageTypes: [MESSAGE_TYPE_IMAGE],
    description: `Creates a container to visualize the image data represented by a sensor_msgs/Image topic.
    ![](/image/viz/viz-image.png "")`,
    docsLink: `${DOCS_ROOT_URL}Image`,
  },
  {
    type: VIZ_TYPE_LASERSCAN,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path
          style={iconLineStyle}
          d="M20,53.9C33.44,53.23,56.29,43.82,67.05,25"
        />
        <circle style={iconFillStyle} cx="77.5" cy="72.5" r="2.5" />
        <line style={iconLineStyle} x1="70.67" y1="31.28" x2="77" y2="66.57" />
        <line
          style={iconLineStyle}
          x1="60.71"
          y1="43.05"
          x2="74.29"
          y2="67.47"
        />
        <line
          style={iconLineStyle}
          x1="43.52"
          y1="53.9"
          x2="72.48"
          y2="69.28"
        />
        <line style={iconLineStyle} x1="27.24" y1="59.33" x2="71.57" y2="72" />
      </svg>
    ),
    messageTypes: [MESSAGE_TYPE_LASERSCAN],
    description: `Adds a visualization represented by a sensor_msgs/LaserScan topic to the scene.
    ![](/image/viz/viz-laserscan.png "")`,
    docsLink: `${DOCS_ROOT_URL}Laser-Scan`,
  },
  {
    type: VIZ_TYPE_MAP,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <polygon
          style={iconLineStyle}
          points="24.83 26.16 75.17 26.27 84 74.73 16 74.73 24.83 26.16"
        />
        <polyline
          style={iconLineStyle}
          points="22.9 36.8 61 36.8 55 43 55 54 35 54"
        />
        <line style={iconLineStyle} x1="77.29" y1="37.89" x2="36" y2="50" />
        <polyline
          style={iconLineStyle}
          points="78.21 42.94 64 49 64 62 43 62 43 74.73"
        />
        <polyline
          style={iconLineStyle}
          points="80.45 55.26 73 68 55 70 55 74.73"
        />
        <polyline style={iconLineStyle} points="30.4 74.73 33 67 17.77 64.99" />
        <polyline
          style={iconLineStyle}
          points="31.07 36.8 38 46 33 57 23 57 25 49"
        />
        <line
          style={iconLineStyle}
          x1="20.23"
          y1="51.47"
          x2="35.69"
          y2="42.94"
        />
        <line style={iconLineStyle} x1="35.69" y1="26.18" x2="38" y2="36.8" />
        <line
          style={iconLineStyle}
          x1="51.91"
          y1="26.16"
          x2="46.37"
          y2="36.8"
        />
        <line style={iconLineStyle} x1="61" y1="37" x2="59.67" y2="26.24" />
        <polyline style={iconLineStyle} points="67.73 26.16 71 35 76.5 33.57" />
      </svg>
    ),
    messageTypes: [MESSAGE_TYPE_OCCUPANCYGRID],
    description: `Adds a visualization represented by a nav_msgs/OccupancyGrid topic to the scene.
    ![](/image/viz/viz-map.png "")`,
    docsLink: `${DOCS_ROOT_URL}Map`,
  },
  {
    type: VIZ_TYPE_MARKER,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect style={iconLineStyle} x="24" y="17" width="22" height="43" />
        <circle style={iconLineStyle} cx="48.5" cy="53.5" r="16.5" />
        <rect style={iconLineStyle} x="51" y="50" width="29" height="29" />
      </svg>
    ),
    messageTypes: [MESSAGE_TYPE_MARKER],
    description: `Adds a visualization represented by a visualization_msgs/Marker or visualization_msgs/MarkerArray topic to the scene.
    ![](/image/viz/viz-marker.png "")`,
    docsLink: `${DOCS_ROOT_URL}Marker`,
  },
  {
    type: VIZ_TYPE_MARKERARRAY,
    icon: markerArrayIcon,
    messageTypes: [MESSAGE_TYPE_MARKERARRAY],
    description: `Adds a visualization represented by a visualization_msgs/Marker or visualization_msgs/MarkerArray topic to the scene.
    ![](/image/viz/viz-markerarray.png "")`,
    docsLink: `${DOCS_ROOT_URL}Marker-Array`,
  },
  {
    type: VIZ_TYPE_INTERACTIVEMARKER,
    icon: markerArrayIcon,
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
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <polyline style={iconLineStyle} points="27 32 32 29 20 74" />
        <line style={iconLineStyle} x1="35" y1="34" x2="32" y2="29" />
        <polyline
          style={iconLineStyle}
          points="44.16 27.83 49.85 26.56 24.3 65.5"
        />
        <line
          style={iconLineStyle}
          x1="51.13"
          y1="32.25"
          x2="49.85"
          y2="26.56"
        />
        <polyline
          style={iconLineStyle}
          points="63.41 27.33 69.22 27.79 33.34 57.47"
        />
        <line
          style={iconLineStyle}
          x1="68.76"
          y1="33.6"
          x2="69.22"
          y2="27.79"
        />
        <polyline
          style={iconLineStyle}
          points="78.81 31.24 84.36 33.01 42.66 53.74"
        />
        <line
          style={iconLineStyle}
          x1="82.59"
          y1="38.57"
          x2="84.36"
          y2="33.01"
        />
      </svg>
    ),
    messageTypes: [MESSAGE_TYPE_ODOMETRY],
    description: `Adds a visualization represented by a nav_msgs/Odometry topic to the scene.
    ![](/image/viz/viz-odometry.png "")`,
    docsLink: `${DOCS_ROOT_URL}Odometry`,
    isDisplay: false,
  },
  {
    type: VIZ_TYPE_PATH,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path style={iconLineStyle} d="M25,77c-5-21-5-47,15-38s38,10,40-8" />
        <line style={iconLineStyle} x1="77" y1="21" x2="83.5" y2="27.5" />
        <line style={iconLineStyle} x1="83.5" y1="21" x2="77" y2="27.5" />
      </svg>
    ),
    messageTypes: [MESSAGE_TYPE_PATH],
    description: `Adds a visualization represented by a nav_msgs/Path topic to the scene.
    ![](/image/viz/viz-path.png "")`,
    docsLink: `${DOCS_ROOT_URL}Path`,
  },
  {
    type: VIZ_TYPE_POINT,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <circle style={iconLineStyle} cx="49.4" cy="49.6" r="30.3" />
      </svg>
    ),
    messageTypes: [MESSAGE_TYPE_POINTSTAMPED],
    description: `Adds a visualization represented by a geometry_msgs/PointStamped topic to the scene.
    ![](/image/viz/viz-point.png "")`,
    docsLink: `${DOCS_ROOT_URL}Point`,
  },
  {
    type: VIZ_TYPE_POINTCLOUD,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path
          style={iconLineStyle}
          d="M42.68,38s-4.29-5.07-13-2.12-8.24,10-8.24,10S13.16,53.09,16,59.07s7.55,6.33,9.89,6.33h5.62"
        />
        <path
          style={iconLineStyle}
          d="M81.33,58.72c0-6.24-8.06-9.62-12.14-8.93,0,0-2.25-9.88-12.66-8.15a13.12,13.12,0,0,0-14-3.12C34,41.47,34.33,48.58,34.33,48.58S26,55.69,28.87,61.67,36.41,68,38.76,68H81.85"
        />
      </svg>
    ),
    messageTypes: [MESSAGE_TYPE_POINTCLOUD2],
    description: `Adds a visualization represented by a sensor_msgs/PointCloud2 topic to the scene.
    ![](/image/viz/viz-pointcloud.png "")`,
    docsLink: `${DOCS_ROOT_URL}Point-Cloud-2`,
  },
  {
    type: VIZ_TYPE_POSE,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect
          style={iconLineStyle}
          x="17.72"
          y="63.34"
          width="11.42"
          height="11.42"
        />
        <line
          style={iconLineStyle}
          x1="35.84"
          y1="58.49"
          x2="78.2"
          y2="32.71"
        />
        <polyline
          style={iconLineStyle}
          points="69.2 29.92 79.32 31.85 77.4 41.96"
        />
      </svg>
    ),
    messageTypes: [MESSAGE_TYPE_POSESTAMPED],
    description: `Adds a visualization represented by a geometry_msgs/PoseStamped topic to the scene.
    ![](/image/viz/viz-pose.png "")`,
    docsLink: `${DOCS_ROOT_URL}Pose`,
  },
  {
    type: VIZ_TYPE_POSEARRAY,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <rect
          style={iconLineStyle}
          x="23.14"
          y="76.1"
          width="11.42"
          height="11.42"
        />
        <line
          style={iconLineStyle}
          x1="41.65"
          y1="73.36"
          x2="83.62"
          y2="45.47"
        />
        <polyline
          style={iconLineStyle}
          points="74.62 42.67 84.74 44.6 82.81 54.72"
        />
        <line
          style={iconLineStyle}
          x1="23.45"
          y1="56.06"
          x2="35.99"
          y2="16.59"
        />
        <polyline
          style={iconLineStyle}
          points="27.16 19.86 36.35 15.22 41 24.4"
        />
        <circle style={iconLineStyle} cx="21.12" cy="64.75" r="5.04" />
      </svg>
    ),
    messageTypes: [MESSAGE_TYPE_POSEARRAY],
    description: `Adds a visualization represented by a geometry_msgs/PoseArray topic to the scene. An array of pose is added to the scene based on the Shape type selected.
    ![](/image/viz/viz-posearray.png "")`,
    docsLink: `${DOCS_ROOT_URL}Pose-Array`,
  },
  {
    type: VIZ_TYPE_RANGE,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <polygon
          style={iconLineStyle}
          points="83.7,58 18.2,74.8 18.2,29.5 83.6,46.2 "
        />
      </svg>
    ),
    messageTypes: [MESSAGE_TYPE_RANGE],
    description: `Adds a visualization represented by a sensor_msgs/Range topic to the scene.
    ![](/image/viz/viz-range.png "")`,
    docsLink: `${DOCS_ROOT_URL}Range`,
  },
  {
    type: VIZ_TYPE_ROBOTMODEL,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <g>
          <rect
            style={iconLineStyle}
            x="23.39"
            y="38.67"
            width="53.21"
            height="36.09"
            rx="7.08"
          />
        </g>
        <g>
          <circle style={iconFillStyle} cx="35.09" cy="53.4" r="3.31" />
          <circle style={iconFillStyle} cx="64.91" cy="53.4" r="3.31" />
        </g>
        <circle style={iconFillStyle} cx="50" cy="28.55" r="3.31" />
        <g>
          <line
            style={iconLineStyle}
            x1="81.76"
            y1="46.36"
            x2="81.76"
            y2="63.76"
          />
          <line
            style={iconLineStyle}
            x1="18.24"
            y1="64.18"
            x2="18.24"
            y2="46.78"
          />
        </g>
        <line style={iconLineStyle} x1="50" y1="38.08" x2="50" y2="31.45" />
        <g>
          <path
            style={iconFillStyle}
            d="M38.12,65.42a22.94,22.94,0,0,0,23.76,0"
          />
        </g>
      </svg>
    ),
    messageTypes: [MESSAGE_TYPE_ROBOT_MODEL],
    description: `Adds a robot model to the scene from a ros parameter.
    ![](/image/viz/viz-robotmodel.png "")`,
    docsLink: `${DOCS_ROOT_URL}Robot-Model`,
  },
  {
    type: VIZ_TYPE_TF,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <line
          style={iconLineStyle}
          x1="27.34"
          y1="72.45"
          x2="12.63"
          y2="80.75"
        />
        <polyline
          style={iconLineStyle}
          points="27.34 43.45 27.34 72.45 55.38 72.45"
        />
        <line
          style={iconLineStyle}
          x1="65.33"
          y1="38.54"
          x2="77.6"
          y2="44.07"
        />
        <polyline
          style={iconLineStyle}
          points="49.35 16.48 65.33 38.54 78.74 22.09"
        />
        <line style={iconLineStyle} x1="27.34" y1="72.45" x2="63" y2="39.54" />
        <polyline
          style={iconLineStyle}
          points="56.15 39.2 63.38 39.2 62.43 47.7"
        />
      </svg>
    ),
    messageTypes: TF_MESSAGE_TYPES,
    description: `Adds a visualization represented by a tf/tfMessage and tf2_msgs/TFMessage topic to the scene.
    ![](/image/viz/viz-tf.png "")`,
    docsLink: `${DOCS_ROOT_URL}Tf`,
  },
  {
    type: VIZ_TYPE_WRENCH,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <line
          x1="30.74"
          y1="72.45"
          x2="72.42"
          y2="16.7"
          style={iconLineStyle}
        />
        <polyline
          points="63.04 17.46 73.14 15.47 75.13 25.58"
          style={iconLineStyle}
        />
        <path
          d="M29.85,56.69a42.48,42.48,0,0,1,8.32,3.72c10.54,6.09,16.7,15.16,13.75,20.27S38,85,27.49,78.9,10.79,63.74,13.74,58.63a6.59,6.59,0,0,1,4.18-2.92"
          style={iconLineStyle}
        />
        <line
          x1="30.5"
          y1="68.57"
          x2="33.08"
          y2="49.47"
          style={iconLineStyle}
        />
        <polyline
          points="27.92 52.19 33.16 48.05 37.04 52.96"
          style={iconLineStyle}
        />
      </svg>
    ),
    messageTypes: [MESSAGE_TYPE_WRENCHSTAMPED],
    description: `Adds a visualization represented by a geometry_msgs/WrenchStamped topic to the scene.
    ![](/image/viz/viz-wrench.png "")`,
    docsLink: `${DOCS_ROOT_URL}Wrench`,
  },
];
