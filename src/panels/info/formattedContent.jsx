import React from 'react';
import { JsonEditor } from 'jsoneditor-react';
import { isNil } from 'lodash';

class FormattedContent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.jsonEditor = null;
    this.setRef = this.setRef.bind(this);
  }

  setRef(instance) {
    if (instance) {
      const { jsonEditor } = instance;
      this.jsonEditor = jsonEditor;
    }
  }

  componentDidUpdate(prevProps) {
    const { message } = this.props;
    if (!isNil(message) && prevProps.message !== message && this.jsonEditor) {
      this.jsonEditor.update(message);
    }
  }

  render() {
    const { message } = this.props;
    if (isNil(message)) {
      return null;
    }
    return (
      <JsonEditor
        value={message}
        ref={this.setRef}
        navigationBar={false}
        statusBar={false}
        search={false}
        history={false}
        mode="view"
      />
    );
  }
}

export default FormattedContent;
