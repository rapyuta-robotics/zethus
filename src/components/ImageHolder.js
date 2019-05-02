import React from 'react';
import _ from 'lodash';
import { MESSAGE_TYPE_IMAGE } from 'amphion/src/utils/constants';
import DraggableImage from './DraggableImage';

function extractImageVizTypes(props) {
  const { visualizations } = props;
  const imageVizTypes = [];

  _.forEach(visualizations, viz => {
    const { type } = viz;
    if (type === MESSAGE_TYPE_IMAGE) {
      imageVizTypes.push(viz);
    }
  });

  return imageVizTypes;
}

const ImageHolder = props => {
  const imageVizTypes = extractImageVizTypes(props);

  return imageVizTypes.map(imageViz => {
    const { id } = imageViz;
    return <DraggableImage key={id} viz={imageViz} {...props} />;
  });
};

export default ImageHolder;
