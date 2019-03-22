import React from 'react';

class VizListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { details: { type } } = this.props;
    return (
      <h3>{ type }</h3>
    );
    // <select>{this.props.data.map((x,y) => <option key={y}>{x}</option>)}</select>;
  }
}

export default VizListItem;
