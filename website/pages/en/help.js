/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;

function Help(props) {
  const { config: siteConfig, language = '' } = props;
  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = ''; // `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      content: `Learn more using the [documentation on this site.]`,
      title: 'Getting started',
    },
    {
      content: 'Ask questions about the documentation and project',
      title: 'Join the community',
    },
    {
      content: "Find out what's new with this project",
      title: 'Stay up to date',
    },
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Need help?</h1>
          </header>
          <p>
            Reach out to us at{' '}
            <a href="mailto:zethus@rapyuta.io">zethus@rapyuta.io</a> and we will
            help you with any clarifications required
          </p>
          <div className="gridBlock">

            <div className="blockElement">
              <div className="blockContent">
                <h2>Getting started</h2>
                <div>
                  <span>
                    <p>
                      Learn more using the{' '}
                      <a href={docUrl('usage-getting-started')}>
                        documentation
                      </a>{' '}
                      on this site.
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="gridBlock">
            <div className="blockElement">
              <div className="blockContent">
                <h2>Join the community</h2>
                <div>
                  <span>
                    <p>
                      We have a <a href="https://discordapp.com/channels/572418205176430602/">discord chat group</a> where you could reach out to the community and get your queries answered quickly<br />
                      You could also post a question on <a href="http://stackoverflow.com/questions/tagged/zethus">stackoverflow</a> with the tag 'zethus'
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="gridBlock">
            <div className="blockElement threeByGridBlock">
              <div className="blockContent">
                <h2>Stay up to date</h2>
                <div>
                  <span>
                    <p>
                      Follow the repository on{' '}
                      <a href="https://github.com/rapyuta-robotics/zethus">
                        github
                      </a>{' '}
                      for the latest features and releases
                      <br />
                      Also please consider{' '}
                      <a href={docUrl('misc-contribution-guidelines')}>
                        contributing
                      </a>{' '}
                      to the project
                      <br />
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
