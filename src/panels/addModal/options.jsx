import React from 'react';

import { VIZ_TYPE_ROBOTMODEL } from 'amphion/src/utils/constants';
import RobotModelOptions from './optionsRobotModel';
import GenericOptions from './optionsGeneric';

class SelectedVizOptionsForm extends React.PureComponent {
  render() {
    const {
      selectedViz: { vizType: type },
      selectedViz,
      back,
      ros,
      addVisualization,
    } = this.props;
    if (type === VIZ_TYPE_ROBOTMODEL) {
      return (
        <RobotModelOptions
          addVisualization={addVisualization}
          ros={ros}
          selectedViz={selectedViz}
          back={back}
        />
      );
    }
    return (
      <GenericOptions
        addVisualization={addVisualization}
        selectedViz={selectedViz}
        back={back}
      />
    );
  }
}

export default SelectedVizOptionsForm;
