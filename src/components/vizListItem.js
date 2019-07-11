import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import { MESSAGE_TYPE_ROBOT_MODEL } from 'amphion/src/utils/constants';
import VizOptionsMap from '../views/sidebar/sidebarOptions';
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
      details: { displayName, name, options, rosObject, visible, type, icon },
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
      <div className="vizItem">
        <div className="optionRow">
          <button
            className={classNames('vizItemCollapse', {
              collapsed,
            })}
            onClick={this.toggleCollapsed}
          >
            <img src="./image/chevron.svg" alt="" />
          </button>
          <img className="vizItemIcon" src={icon} alt="" />
          {displayName}
        </div>
        {!collapsed && (
          <div className="vizItemContent">
            {type !== MESSAGE_TYPE_ROBOT_MODEL && (
              <div className="optionRow" onClick={this.getTopics}>
                <div className="halfWidth">Topic:</div>
                <div className="halfWidth">
                  <select
                    className="input"
                    onChange={this.changeTopic}
                    value={name}
                  >
                    {_.map(supportedAvailableTopics, topic => (
                      <option key={topic}>{topic}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {vizComp}
            <div className="vizItemActions">
              <button onClick={this.delete}>Delete</button>
              {visible ? (
                <button onClick={this.hide}>Hide</button>
              ) : (
                <button onClick={this.show}>Show</button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default VizListItem;
