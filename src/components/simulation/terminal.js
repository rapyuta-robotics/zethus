import React from 'react';
import _ from 'lodash';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prism-themes/themes/prism-xonokai.css';

const getCommandResponse = command => new Promise((resolve, reject) => {
  resolve({
    stdout: '#!/bin/bash',
  });
});

class Terminal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commandInput: '',
      commandHistory: [
        //         {
        //           timestamp: new Date(),
        //           command: 'sample command',
        //           response: `#!/bin/bash
        // # declare STRING variable
        // STRING="Hello World"
        // #print variable on a screen
        // echo $STRING`,
        //         },
      ],
    };
    this.updateCommand = this.updateCommand.bind(this);
    this.executeCommand = this.executeCommand.bind(this);
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  componentDidUpdate(prevProps, prevState) {
    const { commandHistory } = this.state;
    if (prevState.commandHistory !== commandHistory) {
      Prism.highlightAll();
    }
  }

  updateCommand(e) {
    this.setState({ commandInput: e.target.value || '' });
  }

  async executeCommand(e) {
    e.preventDefault();
    const { commandInput, commandHistory } = this.state;
    try {
      const commandResponse = await getCommandResponse(commandInput);
      this.setState({
        commandInput: '',
        commandHistory: [
          {
            timestamp: new Date(),
            command: commandInput,
            response: commandResponse.stdout,
          },
          ...commandHistory,
        ],
      });
    } catch (err) {
      console.log('Error occured');
    }
  }

  render() {
    const { commandInput, commandHistory } = this.state;
    return (
      <div className="cdDsl cdSection">
        <div className="cdSectionHeader">
          <h4>Terminal</h4>
          <div className="border" />
        </div>
        <form onSubmit={this.executeCommand}>
          <input
            type="text"
            className="cdCommandInput"
            value={commandInput}
            onChange={this.updateCommand}
          />
        </form>
        {_.map(commandHistory, c => (
          <div key={c.timestamp} className="cdCommandItem">
            <pre className="language-bash">
              <code className="language-bash">{c.command}</code>
            </pre>
            <pre className="language-bash">
              <code className="language-bash">{c.response}</code>
            </pre>
          </div>
        ))}
      </div>
    );
  }
}

export default Terminal;
