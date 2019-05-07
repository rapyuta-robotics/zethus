import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import { MESSAGE_TYPE_ROBOT_MODEL } from 'amphion/src/utils/constants';
import VizOptionsMap from './sidebarOptions';
import { vizOptions } from '../utils';

class VizListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
    this.changeTopic = this.changeTopic.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.delete = this.delete.bind(this);
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  changeTopic(event) {
    const {
      updateTopic,
      details: { id },
    } = this.props;
    const selectedTopic = event.target.value;
    const {
      details: { rosObject },
    } = this.props;
    updateTopic(id, selectedTopic);
    rosObject.changeTopic(selectedTopic);
  }

  delete() {
    const {
      details: { id },
    } = this.props;
    const { removeDisplayType } = this.props;

    removeDisplayType(id);
  }

  hide() {
    const {
      details: { rosObject, id },
      updateVisibilty,
    } = this.props;

    updateVisibilty(id, false);
    rosObject.hide();
  }

  show() {
    const {
      details: { rosObject, id },
      updateVisibilty,
    } = this.props;

    updateVisibilty(id, true);
    rosObject.show();
  }

  toggleCollapsed() {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  }

  updateOptions(options) {
    const {
      details: { id },
    } = this.props;
    const { updateOptions } = this.props;
    updateOptions(id, options);
  }

  render() {
    const {
      rosTopics: { topics: availableTopics, types: availableTopicTypes },
      details: { displayName, name, options, rosObject, visible, type },
    } = this.props;
    const { collapsed } = this.state;

    const vizType = _.find(vizOptions, vo => vo.name === displayName);
    const supportedAvailableTopics = _.filter(availableTopics, (topic, index) =>
      _.includes(vizType.messageTypes, availableTopicTypes[index]),
    );

    const newProps = {
      rosObject,
      options,
      updateOptions: this.updateOptions,
    };
    const vizComp = VizOptionsMap(newProps)[displayName];

    return (
      <div className="display-type-form-wrapper">
        <div className="display-type-form-header">
          <button
            className={classNames({
              'display-type-collapse': true,
              collapsed,
            })}
            onClick={this.toggleCollapsed}
          >
            <img src="/image/chevron.png" alt="" />
          </button>
          <span className="type-image" />
          {displayName}
        </div>
        {!collapsed && (
          <div className="display-type-form-content">
            {type !== MESSAGE_TYPE_ROBOT_MODEL && (
              <div className="option-section" onClick={this.getTopics}>
                <span>Topic:</span>
                <span>
                  <select onChange={this.changeTopic} value={name}>
                    {_.map(supportedAvailableTopics, topic => (
                      <option key={topic}>{topic}</option>
                    ))}
                  </select>
                </span>
              </div>
            )}
            {vizComp}
            <div className="display-type-form-button-section">
              <button type="button" onClick={this.delete}>
                <i className="fa fa-trash" aria-hidden="true" />
                Delete
              </button>
              {visible ? (
                <button type="button" onClick={this.hide}>
                  <i className="fa fa-eye-slash" aria-hidden="true" />
                  Hide
                </button>
              ) : (
                <button type="button" onClick={this.show}>
                  <i className="fa fa-eye" aria-hidden="true" />
                  Show
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default VizListItem;
