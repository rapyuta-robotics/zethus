import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import { VIZ_TYPE_ROBOTMODEL, VIZ_TYPE_TF } from 'amphion/src/utils/constants';
import VizSpecificOptions from './vizSpecificOption';

class VizOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  }

  render() {
    const {
      data: { vizType, name, visible, display },
      data,
      topics,
      vizObject: { icon },
    } = this.props;
    const { collapsed } = this.state;

    if (_.isBoolean(display) && !display) {
      return null;
    }
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
          {name}
        </div>
        {!collapsed && (
          <div className="vizItemContent">
            {!_.includes([VIZ_TYPE_ROBOTMODEL, VIZ_TYPE_TF], vizType) && (
              <div className="optionRow" onClick={this.getTopics}>
                <div className="halfWidth">Topic:</div>
                <div className="halfWidth">
                  <select className="input" value={name} onChange={() => {}}>
                    {_.map(topics, topic => (
                      <option key={topic.name}>{topic.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <VizSpecificOptions data={data} />
            <div className="vizItemActions">
              <button>Delete</button>
              {visible ? <button>Hide</button> : <button>Show</button>}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default VizOptions;
