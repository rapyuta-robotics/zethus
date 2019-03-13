/* global THREE */

import ROSLIB from 'roslib';
import _ from 'lodash';
import { cloudEndpoint } from '../config';

importScripts('/three.js');

const ros = new ROSLIB.Ros();

const pointcloudTopic = new ROSLIB.Topic({
  ros,
  name: '/pickit/clouds/pp_scene_cloud',
  messageType: 'sensor_msgs/PointCloud2',
});
const tfClientTopic = new ROSLIB.TFClient({
  ros,
  fixedFrame: 'world',
  angularThres: 0.01,
  transThres: 0.01,
});
// const tfTopic = new ROSLIB.Topic({
//   ros,
//   name: '/tf_static',
//   messageType: 'tf2_msgs/TFMessage'
// });

let previousFrame = null;
const previousTransform = null;

const readPoint = (offsets, dataView, index, isBigendian, pointStep) => {
  const baseOffset = index * pointStep;
  const rgb = dataView.getUint32(baseOffset + offsets.rgb, !isBigendian);
  const hex = rgb.toString(16).substring(2);
  return {
    x: dataView.getFloat32(baseOffset + offsets.x, !isBigendian),
    y: dataView.getFloat32(baseOffset + offsets.y, !isBigendian),
    z: dataView.getFloat32(baseOffset + offsets.z, !isBigendian),
    hex,
  };
};

const BASE64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
function decode64(x) {
  const a = [];
  let z = 0;


  let bits = 0;

  for (let i = 0, len = x.length; i < len; i++) {
    z += BASE64.indexOf(x[i]);
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      a.push(z >> bits);
      z &= ((2 ** bits) - 1);
    }
    z <<= 6;
  }
  return a;
}

const editPointCloudPoints = function (message) {
  const positions = [];
  const colors = [];
  if (message) {
    const offsets = _.mapValues(
      _.keyBy(message.fields, f => f.name),
      v => v.offset,
    );
    const n = message.height * message.width;
    const uint8Buffer = Uint8Array.from(decode64(message.data)).buffer;
    const dataView = new DataView(uint8Buffer);
    for (let i = 0; i < n; i++) {
      const pt = readPoint(
        offsets,
        dataView,
        i,
        message.is_bigendian,
        message.point_step,
      );
      if (pt.x && pt.y && pt.z) {
        positions.push(pt.x, pt.y, pt.z);
        const color = new THREE.Color(`#${pt.hex}`);
        colors.push(color.r, color.g, color.b);
      }
    }
  }
  return {
    positions: Float32Array.from(positions).buffer,
    colors: Float32Array.from(colors).buffer,
    frame: _.trimStart(message.header.frame_id, '/'),
  };
  // const positionBuffer = new Float32Array(
  //    new SharedArrayBuffer(Float32Array.BYTES_PER_ELEMENT * 3 * n));
  // positionBuffer.set(positions, 0);
  // const colorsBuffer = new Float32Array(
  //    new SharedArrayBuffer(Float32Array.BYTES_PER_ELEMENT * 3 * n));
  // colorsBuffer.set(colors, 0);
};

ros.on('connection', () => {
  // tfTopic.subscribe(message => {
  //   console.log(message);
  // });
  pointcloudTopic.subscribe((message) => {
    const { positions, colors, frame } = editPointCloudPoints(message);
    window.self.postMessage(
      {
        type: 'UPDATE_POINTCLOUD_GEOMETRY',
        positions,
        colors,
        frame,
      },
      [positions, colors],
    );
    if (frame !== previousFrame) {
      if (previousFrame) {
        tfClientTopic.unsubscribe(previousFrame);
      }
      previousFrame = frame;
      tfClientTopic.subscribe(frame, (tf) => {
        window.self.postMessage({
          type: 'UPDATE_POINTCLOUD_TRANSFORM',
          tf,
        });
      });
    }
  });
});

window.self.onmessage = ({ data }) => {
  switch (data.type) {
    case 'TERMINATE':
      ros.socket.close();
      setTimeout(() => {
        window.self.close();
      }, 100);
  }
};

ros.connect(cloudEndpoint);
