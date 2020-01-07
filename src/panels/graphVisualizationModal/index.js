import React from 'react';
import styled from 'styled-components';

import Graph from './Graph';
import {
  ModalWrapper,
  ModalContents,
  ModalTitle,
} from '../../components/styled/modal';
import { stopPropagation, generateGraph } from '../../utils';
import API_CALL_STATUS from '../../utils/constants';

const GraphContainer = styled.div`
  border: 1px solid red;
  display: flex;
  flex: 0 1 auto;
  height: 100%;
  justify-content: center;
  align-items: center;
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
    this.state = {
      graph: null,
      status: API_CALL_STATUS.FETCHING,
    };

    this.graphRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createGraph = this.createGraph.bind(this);
    this.refreshGraph = this.refreshGraph.bind(this);
  }

  createGraph() {
    const { ros } = this.props;
    const p = generateGraph(ros);
    p.then(graph => {
      this.setState({
        graph,
        status: API_CALL_STATUS.SUCCESSFUL,
      });
    }).catch(err =>
      this.setState({
        status: API_CALL_STATUS.ERROR,
      }),
    );
  }

  refreshGraph(e) {
    e.preventDefault();
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
    const { graph, status } = this.state;

    let conditionalData = null;

    if (status === API_CALL_STATUS.FETCHING) {
      conditionalData = <p>Loading</p>;
    } else if (status === API_CALL_STATUS.ERROR) {
      conditionalData = <p>Error</p>;
    } else {
      conditionalData = graph ? (
        <Graph graph={graph} />
      ) : (
        <p>No network present.</p>
      );
    }

    return (
      <ModalWrapper onClick={closeModal}>
        <ModalContents onClick={stopPropagation}>
          <ModalHeading>
            <ModalTitle>Graph </ModalTitle>
            <ResetButton onClick={this.refreshGraph}>Reset</ResetButton>
          </ModalHeading>
          <GraphContainer>{conditionalData}</GraphContainer>
        </ModalContents>
      </ModalWrapper>
    );
  }
}

export default ConfigurationModal;
