import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import OptionRow from '../../components/optionRow';
import { Container, Input, Select, TextButton } from '../../components/styled';

const EditConfigButton = styled(TextButton)`
  font-size: 14px;
`;

class GlobalOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateOptions = this.updateOptions.bind(this);
  }

  updateOptions(e) {
    const { updateGlobalOptions } = this.props;
    const {
      dataset: { id: optionId },
      value,
    } = e.target;
    updateGlobalOptions(optionId, value);
  }

  render() {
    const {
      framesList,
      globalOptions: {
        backgroundColor: {
          display: displayBackgroundColor,
          value: valueBackgroundColor,
        },
        display: displayOptions,
        fixedFrame: { display: displayFixedFrame, value: valueFixedFrame },
        grid: { display: displayGrid, size: valueGrid },
      },
      toggleConfigurationModal,
    } = this.props;
    if (!displayOptions) {
      return null;
    }
    return (
      <Container>
        <EditConfigButton onClick={toggleConfigurationModal}>
          Edit Configuration
        </EditConfigButton>
        {displayBackgroundColor && (
          <OptionRow label="Background Color">
            <Input
              type="color"
              data-id="backgroundColor.value"
              value={valueBackgroundColor}
              onChange={this.updateOptions}
            />
          </OptionRow>
        )}
        {displayGrid && <OptionRow label="Grid size">{valueGrid}</OptionRow>}
        {displayFixedFrame && (
          <OptionRow label="Fixed frame">
            <Select
              value={valueFixedFrame}
              data-id="fixedFrame.value"
              onChange={this.updateOptions}
            >
              {_.map(framesList, f => (
                <option key={f} value={f}>
                  {f.replace('-tf-connector', '')}
                </option>
              ))}
            </Select>
          </OptionRow>
        )}
      </Container>
    );
  }
}

export default GlobalOptions;
