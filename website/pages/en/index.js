const React = require('react');
// const Particles = require('particlesjs/src/particles');

class Index extends React.Component {
  render() {
    return (
      <div id="home">
        <div className="homeContainer">
          <div className="homeSplashFade" id="particles-js">
            <div className="wrapper homeWrapper">
              <div className="inner">
                <h2 className="projectTitle">
                  Zethus is now open-source
                  {/* <small>A website for testing</small> */}
                </h2>
                <div className="section promoSection">
                  <div className="promoRow">
                    <div className="pluginRowBlock">
                      <div className="pluginWrapper buttonWrapper">
                        Checkout <a href="/demo/">the demo</a> or view the{' '}
                        <a href="#try">documentation</a> to get started
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mainContainer">
          <div className="container lightBackground">
            <div className="wrapper">
              <div className="gridBlock" id="homeGridBlock">
                <div className="blockElement">
                  <div className="blockContent">
                    <div>
                      <span>
                        <p>
                          Find the latest developments in the{' '}
                          <a
                            href="https://github.com/rapyuta-robotics/zethus"
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            GitHub repo
                          </a>
                          .
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flexGap" />
                <a
                  className="github-button"
                  href={this.props.config.repoUrl}
                  data-icon="octicon-star"
                  data-count-href="/rapyuta-robotics/zethus/stargazers"
                  data-show-count="true"
                  data-count-aria-label="# stargazers on GitHub"
                  aria-label="Star this project on GitHub"
                >
                  Star
                </a>
              </div>
            </div>
          </div>

          <div className="wrapper">
            <div className="gridBlock">
              <div className="blockElement threeByGridBlock">
                <div className="blockContent">
                  <div className="homeBlockIcon" />
                  <h2>
                    <div>
                      <span>
                        <p>Built with Javascript</p>
                      </span>
                    </div>
                  </h2>
                  <div>
                    <span>
                      <p>
                        Zethus is written entirely in Javascript, and runs on
                        any modern browser. It uses{' '}
                        <a href="https://threejs.org/">three.js</a> to render
                        GPU accelerated 3D graphics in the browser.
                      </p>
                    </span>
                  </div>
                </div>
              </div>
              <div className="blockElement threeByGridBlock">
                <div className="blockContent">
                  <div className="homeBlockIcon" />
                  <h2>
                    <div>
                      <span>
                        <p>Platform agnostic</p>
                      </span>
                    </div>
                  </h2>
                  <div>
                    <span>
                      <p>Can run on a Mac, Windows or a Linux PC</p>
                    </span>
                  </div>
                </div>
              </div>
              <div className="blockElement threeByGridBlock">
                <div className="blockContent">
                  <div className="homeBlockIcon" />
                  <h2>
                    <div>
                      <span>
                        <p>No installation</p>
                      </span>
                    </div>
                  </h2>
                  <div>
                    <span>
                      <p>
                        No need to install ROS locally to see the data. Can also
                        visualize ROS sensor data from any remote node
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Index;
