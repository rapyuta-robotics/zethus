import React from 'react';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';

import { vizOptions } from '../../utils';

class VizTypeDetails extends React.PureComponent {
  render() {
    const { vizType } = this.props;
    const { type, description, docsLink } = _.find(
      vizOptions,
      v => v.type === vizType,
    );
    return (
      <React.Fragment>
        <h4>{type}</h4>
        <ReactMarkdown source={description} />
        <a href={docsLink}>View docs</a>
      </React.Fragment>
    );
  }
}

export default VizTypeDetails;
