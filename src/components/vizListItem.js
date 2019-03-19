import React from 'react';

class VizListItem extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <h3>Type Holder</h3>
    );
    // <select>{this.props.data.map((x,y) => <option key={y}>{x}</option>)}</select>;
  }
}

export default VizListItem;
