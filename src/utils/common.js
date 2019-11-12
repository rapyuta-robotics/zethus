export const iconLineStyle = {
  fill: 'none',
  stroke: '#dc1d30',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: '1px',
};

export const iconFillStyle = {
  fill: '#dc1d30',
};

export const TOOL_TYPE_CONTROLS = 'TOOL_TYPE_CONTROLS';
export const TOOL_TYPE_POINT = 'TOOL_TYPE_POINT';
export const TOOL_TYPE_NAV_GOAL = 'TOOL_TYPE_NAV_GOAL';
export const TOOL_TYPE_POSE_ESTIMATE = 'TOOL_TYPE_POSE_ESTIMATE';

export const MESSAGE_TYPE_TOOL_POINT = 'geometry_msgs/PoseStamped';
export const MESSAGE_TYPE_TOOL_NAV_GOAL = 'geometry_msgs/PoseStamped';
export const MESSAGE_TYPE_TOOL_POSE_ESTIMATE =
  'geometry_msgs/PoseWithCovarianceStamped';
