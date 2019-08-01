import React from 'react';
import {
  OBJECT_TYPE_ARROW,
  OBJECT_TYPE_AXES,
  OBJECT_TYPE_FLAT_ARROW,
} from 'amphion/src/utils/constants';

import Arrow from './arrow';
import FlatArrow from './flatArrow';
import Axes from './axes';

class ShapeOptions extends React.PureComponent {
  render() {
    const {
      options,
      options: { type: shapeType },
      updateOptions,
    } = this.props;

    switch (shapeType) {
      case OBJECT_TYPE_ARROW:
        return <Arrow updateOptions={updateOptions} options={options} />;
      case OBJECT_TYPE_FLAT_ARROW:
        return <FlatArrow updateOptions={updateOptions} options={options} />;
      case OBJECT_TYPE_AXES:
        return <Axes updateOptions={updateOptions} options={options} />;
      default:
        return null;
    }
  }
}

export default ShapeOptions;
