import React from 'react';

class VizListItem extends React.Component {
  constructor(props) {
    super(props);

    const { details: { type } } = this.props;
    this.state = {
      type,
      topicTypes: []
    };
    this.changeTopic = this.changeTopic.bind(this);
  }

  componentDidMount() {
    const { details: { type } } = this.props;
    this.props.ros.getTopicsForType(type, (data) => {
      this.setState({
        topicTypes: [...data]
      });
    });
  }

  changeTopic(event) {
    const selectedTopic = event.target.value;
    const { details: { rosObject } } = this.props;
    rosObject.changeTopic(selectedTopic);
  }

  render() {
    const { details: { displayName } } = this.props;
    const { topicTypes } = this.state;

    return (
      <React.Fragment>
        <h3>{ displayName }</h3>
        <select onChange={this.changeTopic}>
          { topicTypes.map(topic => <option>{topic}</option>)}
        </select>
      </React.Fragment>
    );
  }
}

export default VizListItem;
