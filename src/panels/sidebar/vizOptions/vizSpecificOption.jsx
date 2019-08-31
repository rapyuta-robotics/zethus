import React from 'react';
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
  VIZ_TYPE_POLYGON,
  VIZ_TYPE_POSE,
  VIZ_TYPE_POSEARRAY,
  VIZ_TYPE_ROBOTMODEL,
  VIZ_TYPE_TF,
} from 'amphion/src/utils/constants';
import LaserScanOptions from './laserScan';
import MapOptions from './map';
import MarkerOptions from './marker';
import OdometryOptions from './odometry';
import PathOptions from './path';
import PoseOptions from './pose';
import PointCloudOptions from './pointcloud';
import PointOptions from './point';
import InteractiveMarkerOptions from './interactiveMarkerOptions';

const VizSpecificOptions = ({
  options: { vizType },
  options,
  topics,
  updateVizOptions,
}) => {
  switch (vizType) {
    case VIZ_TYPE_INTERACTIVEMARKER:
      return (
        <InteractiveMarkerOptions
          options={options}
          topics={topics}
          updateVizOptions={updateVizOptions}
        />
      );
    case VIZ_TYPE_IMAGE:
      return null;
    case VIZ_TYPE_LASERSCAN:
      return (
        <LaserScanOptions
          options={options}
          updateVizOptions={updateVizOptions}
        />
      );
    case VIZ_TYPE_MAP:
      return (
        <MapOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_MARKER:
      return (
        <MarkerOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_MARKERARRAY:
      return null;
    case VIZ_TYPE_ODOMETRY:
      return (
        <OdometryOptions
          options={options}
          updateVizOptions={updateVizOptions}
        />
      );
    case VIZ_TYPE_PATH:
      return (
        <PathOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_POINT:
      return (
        <PointOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_POINTCLOUD:
      return (
        <PointCloudOptions
          options={options}
          updateVizOptions={updateVizOptions}
        />
      );
    case VIZ_TYPE_POLYGON:
      return null;
    case VIZ_TYPE_POSE:
      return (
        <PoseOptions options={options} updateVizOptions={updateVizOptions} />
      );
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
