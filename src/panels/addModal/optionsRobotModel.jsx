import React from 'react';
import Amphion from 'amphion';
import _ from 'lodash';
import {
  Button,
  ButtonPrimary,
  FlexGrow,
  Input,
  InputLabel,
  InputWrapper,
  Paragraph,
} from '../../components/styled';
import { ModalActions, TypeHeading } from '../../components/styled/modal';

const statuses = {
  loading: 0,
  loaded: 1,
  error: 2,
};

class RobotModelOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.selectedViz.vizType,
      packages: {},
      status: statuses.loading,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.getPackages = this.getPackages.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatePackage = this.updatePackage.bind(this);
  }

  componentDidMount() {
    this.getPackages();
  }

  updateName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  getPackages() {
    const {
      ros,
      selectedViz: { topicName },
    } = this.props;
    try {
      const robotInstance = new Amphion.RobotModel(ros, topicName);
      robotInstance.getPackages(packages => {
        this.setState({
          packages: _.mapValues(_.keyBy(packages), p => `/${p}`),
          status: statuses.loaded,
        });
      });
    } catch (e) {
      this.setState({
        status: statuses.error,
      });
    }
  }

  updatePackage(e) {
    const {
      dataset: { id: packageId },
      value,
    } = e.target;
    const { packages } = this.state;
    this.setState({
      packages: {
        ...packages,
        [packageId]: value,
      },
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { addVisualization, selectedViz } = this.props;
    const { name, packages } = this.state;
    addVisualization({
      ...selectedViz,
      name,
      packages,
    });
  }

  render() {
    const { name, packages, status } = this.state;
    const { back } = this.props;
    if (status === statuses.loading) {
      return <Paragraph>Loading list of packages...</Paragraph>;
    }
    if (status === statuses.error) {
      return (
        <Paragraph>
          Error occured while fetching packages. Please{' '}
          <Button onClick={this.getPackages}>try again</Button>
        </Paragraph>
      );
    }
    return (
      <form onSubmit={this.onSubmit}>
        <InputWrapper>
          <InputLabel>Visualization name</InputLabel>
          <Input value={name} onChange={this.updateName} />
        </InputWrapper>
        <TypeHeading>Packages</TypeHeading>
        {_.map(packages, (path, packageName) => (
          <InputWrapper key={packageName}>
            <InputLabel>{packageName}</InputLabel>
            <Input
              data-id={packageName}
              value={path}
              onChange={this.updatePackage}
              required
            />
          </InputWrapper>
        ))}
        <ModalActions>
          <FlexGrow />
          <ButtonPrimary type="submit">Add Robot model</ButtonPrimary>
          <ButtonPrimary type="button" onClick={back}>
            Back
          </ButtonPrimary>
        </ModalActions>
      </form>
    );
  }
}

export default RobotModelOptions;
