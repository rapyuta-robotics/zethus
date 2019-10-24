import React from 'react';
import { CONSTANTS } from 'amphion';
import RobotModelOptions from './optionsRobotModel';
import GenericOptions from './optionsGeneric';

const { VIZ_TYPE_ROBOTMODEL } = CONSTANTS;

class SelectedVizOptionsForm extends React.PureComponent {
  render() {
    const {
      addVisualization,
      back,
      ros,
      selectedViz: { vizType: type },
      selectedViz,
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
