import React from 'react';
import {
  iconLineStyle,
  MESSAGE_TYPE_TOOL_NAV_GOAL,
  MESSAGE_TYPE_TOOL_POINT,
  MESSAGE_TYPE_TOOL_POSE_ESTIMATE,
  TOOL_TYPE_CONTROLS,
  TOOL_TYPE_NAV_GOAL,
  TOOL_TYPE_POINT,
  TOOL_TYPE_POSE_ESTIMATE,
} from './common';

const activeStyle = {
  ...iconLineStyle,
  strokeWidth: '1px',
};
const inactiveStyle = {
  ...activeStyle,
  stroke: '#000000',
};

export const TOOL_TYPE = {
  [TOOL_TYPE_CONTROLS]: TOOL_TYPE_CONTROLS,
  [TOOL_TYPE_POINT]: TOOL_TYPE_POINT,
  [TOOL_TYPE_NAV_GOAL]: TOOL_TYPE_NAV_GOAL,
  [TOOL_TYPE_POSE_ESTIMATE]: TOOL_TYPE_POSE_ESTIMATE,
};

export const toolOptions = [
  {
    name: 'Controls',
    type: TOOL_TYPE_CONTROLS,
    icon: active => (
      <svg viewBox="0 0 20 20" style={{ height: '20px', marginRight: '2px' }}>
        <g>
          <path
            d="M15.43,6.09a.53.53,0,0,0-.72,0,.51.51,0,0,0-.15.36V8H12V5.44h1.52a.5.5,0,0,0,.5-.51.54.54,0,0,0-.14-.36L10.36,1a.53.53,0,0,0-.72,0h0L6.09,4.57a.52.52,0,0,0,0,.72.55.55,0,0,0,.36.15H8V8H5.44V6.45A.5.5,0,0,0,4.93,6a.54.54,0,0,0-.36.14L1,9.64a.53.53,0,0,0,0,.72H1l3.56,3.55a.5.5,0,0,0,.71,0,.47.47,0,0,0,.15-.35V12H8v2.53H6.45a.5.5,0,0,0-.5.51.54.54,0,0,0,.14.36L9.64,19a.51.51,0,0,0,.72,0l3.55-3.55a.52.52,0,0,0,0-.72.5.5,0,0,0-.35-.14H12V12h2.53v1.52a.5.5,0,0,0,.51.5.54.54,0,0,0,.36-.14L19,10.36a.53.53,0,0,0,0-.72h0Zm.14,6.23v-.8a.5.5,0,0,0-.5-.5H11.52a.5.5,0,0,0-.51.5v3.55a.51.51,0,0,0,.51.51h.8L10,17.9,7.68,15.58h.8a.5.5,0,0,0,.5-.51V11.52a.5.5,0,0,0-.5-.51H4.93a.51.51,0,0,0-.51.51v.8L2.1,10,4.42,7.68v.8A.51.51,0,0,0,4.93,9H8.48A.5.5,0,0,0,9,8.48V4.93a.5.5,0,0,0-.5-.51h-.8L10,2.1l2.32,2.32h-.8a.5.5,0,0,0-.5.51V8.48a.5.5,0,0,0,.5.51h3.55a.52.52,0,0,0,.51-.51v-.8L17.9,10Z"
            style={active ? activeStyle : inactiveStyle}
          />
        </g>
      </svg>
    ),
  },
  {
    name: 'Pose Estimate',
    type: TOOL_TYPE_POSE_ESTIMATE,
    icon: active => (
      <svg viewBox="0 0 20 20" style={{ height: '20px', marginRight: '2px' }}>
        <g>
          <line
            x1="1.93"
            y1="18.07"
            x2="17.43"
            y2="2.57"
            style={active ? activeStyle : inactiveStyle}
          />
          <path
            d="M13.93,2.07h4v4"
            style={active ? activeStyle : inactiveStyle}
          />
        </g>
      </svg>
    ),
    messageType: MESSAGE_TYPE_TOOL_POSE_ESTIMATE,
  },
  {
    name: 'Nav Goal',
    type: TOOL_TYPE_NAV_GOAL,
    icon: active => (
      <svg viewBox="0 0 20 20" style={{ height: '20px', marginRight: '2px' }}>
        <g>
          <line
            x1="1.93"
            y1="18.07"
            x2="17.43"
            y2="2.57"
            style={active ? activeStyle : inactiveStyle}
          />
          <path
            d="M13.93,2.07h4v4"
            style={active ? activeStyle : inactiveStyle}
          />
        </g>
      </svg>
    ),
    messageType: MESSAGE_TYPE_TOOL_NAV_GOAL,
  },
  {
    name: 'Point',
    type: TOOL_TYPE_POINT,
    icon: active => (
      <svg viewBox="0 0 20 20" style={{ height: '20px', marginRight: '2px' }}>
        <g>
          <path
            d="M10,17.47c2.16-2.41,5.85-6.8,5.85-9.34A5.83,5.83,0,0,0,10,2.28h0A5.83,5.83,0,0,0,4.15,8.1v0C4.15,10.67,7.84,15.06,10,17.47ZM10,5.52a2.63,2.63,0,0,1,2.67,2.59v0A2.69,2.69,0,0,1,10,10.8,2.65,2.65,0,0,1,7.39,8.14h0A2.59,2.59,0,0,1,9.94,5.52Z"
            style={active ? activeStyle : inactiveStyle}
          />
        </g>
      </svg>
    ),
    messageType: MESSAGE_TYPE_TOOL_POINT,
  },
];
