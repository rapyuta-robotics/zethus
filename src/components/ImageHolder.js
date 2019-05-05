import React from 'react';
import _ from 'lodash';
import { MESSAGE_TYPE_IMAGE } from 'amphion/src/utils/constants';
import DraggableImage from './DraggableImage';

const ImageHolder = ({ visualizations, updateVisibilty }) => {
  const imageVisualizations = _.filter(
    visualizations,
    viz => viz.type === MESSAGE_TYPE_IMAGE,
  );

  return _.map(imageVisualizations, imageViz => (
    <DraggableImage
      key={imageViz.id}
      viz={imageViz}
      updateVisibilty={updateVisibilty}
    />
  ));
};

export default ImageHolder;
