import React from 'react';
import { isNil, map, size } from 'lodash';
import FormattedContent from './formattedContent';
import { InfoPanelNoMessage } from '../../components/styled';

const CONTENT_MANUAL_UPDATE_RATE = 1000;

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
      size(messageBuffers[selected]) === 0
        ? null
        : messageBuffers[selected].slice(-1)[0];

    if (isNil(selected)) {
      return (
        <InfoPanelNoMessage>
          Add an info panel to receive messages.
        </InfoPanelNoMessage>
      );
    }

    if (size(messageBuffers[selected]) === 0) {
      return <InfoPanelNoMessage>waiting for messages...</InfoPanelNoMessage>;
    }

    return (
      <>
        {raw ? (
          map(messageBuffers[selected], (message, index) => (
            <div key={index}>{JSON.stringify(message)}</div>
          ))
        ) : (
          <FormattedContent message={lastMessage} />
        )}
      </>
    );
  }
}

export default Content;
