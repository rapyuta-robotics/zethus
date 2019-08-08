import React from 'react';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';

import { vizOptions } from '../../utils';
import { Anchor } from '../../components/styled';

class VizTypeDetails extends React.PureComponent {
  render() {
    const { vizType } = this.props;
    const { description, docsLink, type } = _.find(
      vizOptions,
      v => v.type === vizType,
    );
    return (
      <React.Fragment>
        <h4>{type}</h4>
        <ReactMarkdown source={description} />
        <Anchor href={docsLink}>View docs</Anchor>
      </React.Fragment>
    );
  }
}

export default VizTypeDetails;
