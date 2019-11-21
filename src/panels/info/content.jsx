import React from 'react';
import { isNil, omit, size, map } from 'lodash';
import FormattedContent from './formattedContent';
import { FilteredKeys, InfoPanelNoMessage } from '../../components/styled';
import RawContent from './rawContent';

const CONTENT_MANUAL_UPDATE_RATE = 500;

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.forceUpdateId = null;
  }

  componentDidMount() {
    this.forceUpdateId = setInterval(() => {
      this.forceUpdate();
    }, CONTENT_MANUAL_UPDATE_RATE);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateId);
  }

  shouldComponentUpdate(nextProps) {
    const { raw, selected } = this.props;
    return nextProps.selected !== selected || nextProps.raw !== raw;
  }

  render() {
    const { messageBuffers, raw, selected } = this.props;

    const lastMessage =
      size(messageBuffers[selected.name]) === 0
        ? null
        : messageBuffers[selected.name][0];

    if (isNil(selected.name)) {
      return (
        <InfoPanelNoMessage>
          Add an info panel to receive messages.
        </InfoPanelNoMessage>
      );
    }

    if (size(messageBuffers[selected.name]) === 0) {
      return <InfoPanelNoMessage>waiting for messages...</InfoPanelNoMessage>;
    }

    const bufferClone = raw ? [...messageBuffers[selected.name]] : [];
    return (
      <>
        {size(selected.keys) > 0 && (
          <FilteredKeys>
            {map(selected.keys, key => (
              <span key={key}>{key}</span>
            ))}
          </FilteredKeys>
        )}
        {raw ? (
          <RawContent messages={bufferClone} />
        ) : (
          <FormattedContent message={omit(lastMessage, ['timestamp'])} />
        )}
      </>
    );
  }
}

export default Content;
