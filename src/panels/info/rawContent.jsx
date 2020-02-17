import React from 'react';
import { isNil, omit, size } from 'lodash';
import { AutoSizer, List } from 'react-virtualized';
import { RawContentRow, RawContentWrapper } from '../../components/styled';

class RawContent extends React.Component {
  constructor(props) {
    super(props);

    this.rowRenderer = this.rowRenderer.bind(this);
  }

  static noRowsRenderer() {
    return null;
  }

  rowRenderer({ index }) {
    const { messages, selected } = this.props;
    if (isNil(messages[index])) {
      return null;
    }

    return (
      <RawContentRow key={messages[index].timestamp}>
        {size(selected.keys) === 1
          ? messages[index][selected.keys[0]]
          : JSON.stringify(omit(messages[index], ['timestamp']))}
      </RawContentRow>
    );
  }

  render() {
    const { messages } = this.props;
    const rowHeight = 200;
    return (
      <RawContentWrapper>
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              style={{ outline: 'none' }}
              height={size(messages) * rowHeight + rowHeight}
              overscanRowCount={20}
              noRowsRenderer={RawContent.noRowsRenderer}
              rowCount={size(messages)}
              rowHeight={rowHeight}
              rowRenderer={this.rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
      </RawContentWrapper>
    );
  }
}

export default RawContent;
