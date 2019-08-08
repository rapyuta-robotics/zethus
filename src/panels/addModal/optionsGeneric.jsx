import React from 'react';
import {
  ButtonPrimary,
  FlexGrow,
  Input,
  InputLabel,
  InputWrapper,
} from '../../components/styled';
import { ModalActions } from '../../components/styled/modal';

class GenericOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.selectedViz.vizType,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  updateName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { selectedViz, addVisualization } = this.props;
    const { name } = this.state;
    addVisualization({
      ...selectedViz,
      name,
    });
  }

  render() {
    const { name } = this.state;
    const { back } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <InputWrapper>
          <InputLabel>Visualization name</InputLabel>
          <Input value={name} onChange={this.updateName} />
        </InputWrapper>

        <ModalActions>
          <FlexGrow />
          <ButtonPrimary type="submit">Add visualization</ButtonPrimary>
          <ButtonPrimary type="button" onClick={back}>
            Back
          </ButtonPrimary>
        </ModalActions>
      </form>
    );
  }
}

export default GenericOptions;
