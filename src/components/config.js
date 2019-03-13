export const rosEndpoint = 'ws://10.91.1.107:9090';
export const cloudEndpoint = 'ws://10.91.1.107:9090'; // 'ws://10.91.1.107:9090'; // 'ws://10.81.1.94:9092'; // 'ws://10.81.1.116:9091';

export const MAX_POINTCLOUD_POINTS = 500000;
export const boundingBoxColor = 0xff0000;

export const boundingBoxTransform = {
  transforms: [
    {
      header: {
        frame_id: 'japanpost_environment',
      },
      child_frame_id: 'pickit/reference',
      transform: {
        translation: {
          x: -0.806,
          y: -0.79,
          z: 0.482,
        },
        rotation: {
          x: 0.012,
          y: 0.005,
          z: 0.698,
          w: 0.716,
        },
      },
    },
  ],
};

export const pointCloudBaseLinkTransform = {
  transforms: [
    {
      header: {
        frame_id: 'base_link',
      },
      child_frame_id: 'CAM_90273/CAM_90273_rgb_optical_frame',
      transform: {
        translation: {
          x: 0.225,
          y: 1.007,
          z: 1.425,
        },
        rotation: {
          x: 0.999,
          y: 0.005,
          z: -0.018,
          w: 0.033,
        },
      },
    },
  ],
};
