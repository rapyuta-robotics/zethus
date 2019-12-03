import styled from 'styled-components';
import React, { Component } from 'react';
import { ButtonOutline, Flex } from './styled';
import { downloadFile } from '../utils';

const Wrapper = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 200px;
`;

const Icon = styled.svg`
  width: 200px;
  height: 200px;
`;

const Heading = styled.h1`
  font-size: 20px;
  margin-bottom: 0;
`;

const ButtonsWrapper = styled(Flex)`
  ${ButtonOutline} {
    margin: 0 10px;
  }
`;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };

    this.downloadConfig = this.downloadConfig.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
  }

  downloadConfig() {
    const { configuration } = this.props;
    downloadFile(JSON.stringify(configuration, null, 2), 'zethus_config.json');
  }

  render() {
    const { error } = this.state;
    const { children, resetReload } = this.props;
    if (error) {
      return (
        <Wrapper>
          <Icon
            height="300px"
            width="300px"
            viewBox="0 0 48 48"
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M29.86,33.51A1,1,0,0,1,29,34a1,1,0,0,1-.51-.14,8.72,8.72,0,0,0-9,0,1,1,0,0,1-1-1.72,10.69,10.69,0,0,1,11,0A1,1,0,0,1,29.86,33.51ZM18.71,23.29l-.3-.29.3-.29a1,1,0,0,0-1.42-1.42l-.29.3-.29-.3a1,1,0,0,0-1.42,1.42l.3.29-.3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l.29-.3.29.3a1,1,0,0,0,1.42,0A1,1,0,0,0,18.71,23.29Zm14-2a1,1,0,0,0-1.42,0l-.29.3-.29-.3a1,1,0,0,0-1.42,1.42l.3.29-.3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l.29-.3.29.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-.3-.29.3-.29A1,1,0,0,0,32.71,21.29ZM48,9V39a3,3,0,0,1-3,3H3a3,3,0,0,1-3-3V9A3,3,0,0,1,3,6H45A3,3,0,0,1,48,9ZM2,9v5H46V9a1,1,0,0,0-1-1H3A1,1,0,0,0,2,9ZM46,39V16H2V39a1,1,0,0,0,1,1H45A1,1,0,0,0,46,39ZM5,12H7a1,1,0,0,0,0-2H5a1,1,0,0,0,0,2Zm6,0h2a1,1,0,0,0,0-2H11a1,1,0,0,0,0,2Zm6,0h2a1,1,0,0,0,0-2H17a1,1,0,0,0,0,2Z" />
          </Icon>
          <Heading>We&apos;re sorry — something&apos;s gone wrong</Heading>
          <p>{error.message || 'An unknown error occured'}</p>
          <ButtonsWrapper>
            <ButtonOutline onClick={this.downloadConfig}>
              Download config
            </ButtonOutline>
            <ButtonOutline onClick={resetReload}>
              Reset and reload
            </ButtonOutline>
          </ButtonsWrapper>
        </Wrapper>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
