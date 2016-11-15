import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import SnoozeIcon from 'material-ui/svg-icons/action/schedule';
import DoneIcon from 'material-ui/svg-icons/action/done';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';

const RightButtons = (props) => {
  return (<div>
    <IconButton
      tooltip="more"
      tooltipPosition="bottom-left"
      onTouchTap={props.onSnooze}
    >
      <SnoozeIcon color={grey400} />
    </IconButton><IconButton
      tooltip="more"
      tooltipPosition="bottom-left"
      onTouchTap={props.onDone}
    >
      <DoneIcon color={grey400} />
    </IconButton>
  </div>);
}

class TabsList extends Component {
  constructor(props) {
    super(props);
  }
  
  getTabsListItem(openedTabs) {
    let first=true;

    if (!openedTabs) return null;

    return Object.keys(openedTabs).map((key) => {
      let curTab = openedTabs[key];
      let DividerAfterFirst;

      if (first) {
        first = false;
      } else {
        DividerAfterFirst = <Divider />
      }

      return (
        <div key={key}>
          {DividerAfterFirst}
          <ListItem
            leftAvatar={<Avatar src={curTab.favIconUrl} />}
            primaryText={curTab.title}
            secondaryText={curTab.url}
            onTouchTap={() => this.props.onOpen(curTab)}
            rightIconButton={
              RightButtons({
                onSnooze: () => this.props.onSnooze(curTab),
                onDone: () => this.props.onDone(curTab),
              })}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <List>
        <Subheader>Opened Tabs</Subheader>
        {this.getTabsListItem(this.props.tabs)}
      </List>
    );
  }
}

export default TabsList;