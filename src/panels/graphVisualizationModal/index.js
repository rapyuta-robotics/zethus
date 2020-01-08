import React from 'react';
import styled from 'styled-components';

import {
  ModalWrapper,
  ModalContents,
  ModalTitle,
} from '../../components/styled/modal';
import { stopPropagation, generateGraph } from '../../utils';
import { drawGraph } from './d3graph';

const GraphContainer = styled.div`
  border: 1px solid red;
  display: flex;
  height: 90%;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  & > svg {
    width: 100%;
    height: 100%;
    z-index: 10 !important;
  }
`;

const ResetButton = styled.button`
  font-weight: normal;
  font-size: 0.8rem;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;
const ModalHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

class ConfigurationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.graphRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createGraph = this.createGraph.bind(this);
    this.refreshGraph = this.refreshGraph.bind(this);
  }

  createGraph() {
    const { ros } = this.props;
    const p = generateGraph(ros);
    p.then(graph => {
      drawGraph(graph, this.graphRef);
    }).catch(err => console.error(err));
  }

  refreshGraph(e) {
    e.preventDefault();
    this.graphRef.current.innerHTML = '';
    this.createGraph();
  }

  componentDidMount() {
    this.createGraph();
  }

  handleSubmit() {
    const { updateConfiguration } = this.props;
    const config = this.jsonEditor.get();
    updateConfiguration(config);
  }

  render() {
    const { closeModal } = this.props;

    return (
      <ModalWrapper onClick={closeModal}>
        <ModalContents onClick={stopPropagation}>
          <ModalHeading>
            <ModalTitle>Graph </ModalTitle>
            <ResetButton onClick={this.refreshGraph}>Reset</ResetButton>
          </ModalHeading>
          <GraphContainer id="graph" ref={this.graphRef} />
        </ModalContents>
      </ModalWrapper>
    );
  }
}

export default ConfigurationModal;
