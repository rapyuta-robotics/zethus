import React from 'react';
import {
  VIZ_TYPE_IMAGE,
  VIZ_TYPE_LASERSCAN,
  VIZ_TYPE_MAP,
  VIZ_TYPE_MARKER,
  VIZ_TYPE_MARKERARRAY,
  VIZ_TYPE_ODOMETRY,
  VIZ_TYPE_PATH,
  VIZ_TYPE_POINTCLOUD,
  VIZ_TYPE_POLYGON,
  VIZ_TYPE_POSE,
  VIZ_TYPE_POSEARRAY,
  VIZ_TYPE_ROBOTMODEL,
  VIZ_TYPE_TF,
} from 'amphion/src/utils/constants';

const VizSpecificOptions = ({ data: { vizType } }) => {
  switch (vizType) {
    case VIZ_TYPE_IMAGE:
      return null;
    case VIZ_TYPE_LASERSCAN:
      return null;
    case VIZ_TYPE_MAP:
      return null;
    case VIZ_TYPE_MARKER:
      return null;
    case VIZ_TYPE_MARKERARRAY:
      return null;
    case VIZ_TYPE_ODOMETRY:
      return null;
    case VIZ_TYPE_PATH:
      return null;
    case VIZ_TYPE_POINTCLOUD:
      return null;
    case VIZ_TYPE_POLYGON:
      return null;
    case VIZ_TYPE_POSE:
      return null;
    case VIZ_TYPE_POSEARRAY:
      return null;
    case VIZ_TYPE_ROBOTMODEL:
      return null;
    case VIZ_TYPE_TF:
      return null;
    default:
      return null;
  }
};

export default VizSpecificOptions;
