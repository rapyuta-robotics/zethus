import React from 'react';
import _ from 'lodash';

import { MESSAGE_TYPE_ROBOT_MODEL } from 'amphion/src/utils/constants';

const getOptionsForMessageType = messageType => {
  switch (messageType) {
    case MESSAGE_TYPE_ROBOT_MODEL:
      return {
        packages: [],
      };
    default:
      return {};
  }
};

const getDefaultArrayItem = (type, defaultValue) => {
  // switch(type) {
  //   case ''
  // }
  return null;
};

class SelectedVizOptionsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: getOptionsForMessageType(props.selectedViz.messageTypes[0]),
    };
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(updateKey, value) {
    const { options } = this.state;
    const tempOptions = {
      ...options,
    };

    _.set(tempOptions, updateKey, value);

    this.setState({
      options: tempOptions,
    });
  }
  handleAdd(e, arrayKey, typeKey, defaultValue) {
    if (e) e.preventDefault();
    const tempData = getDefaultArrayItem(typeKey, defaultValue);
    // const tempManifest = {
    //   ...this.state.manifest,
    // };
    // let tempArray = _.get(tempManifest, arrayKey);
    // tempArray = [tempData, ...tempArray];
    // _.set(tempManifest, arrayKey, tempArray);
    // this.setState({
    //   manifest: tempManifest,
    // });
  }
  handleRemove(e, arrayKey, removeKey) {
    // e.preventDefault();
    // const tempManifest = {
    //   ...this.state.manifest,
    // };
    // const tempArray = _.get(tempManifest, arrayKey);
    // _.remove(tempArray, i => i.key === removeKey);
    // _.set(tempManifest, arrayKey, tempArray);
    // this.setState({
    //   manifest: tempManifest,
    // });
  }
  render() {
    const {
      selectedViz: {
        messageTypes: [type],
      },
      selectedViz,
    } = this.props;
    console.log(selectedViz);
    if (type === MESSAGE_TYPE_ROBOT_MODEL) {
      return <div className="type-container">Options</div>;
    }
    return null;
  }
}

export default SelectedVizOptionsForm;
