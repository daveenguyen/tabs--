import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import SnoozeIcon from 'material-ui/svg-icons/action/schedule';
import DoneIcon from 'material-ui/svg-icons/action/done';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


const RightButtons = (props) => {
  return (<div>
    {snoozeIconMenu(props)}
    <IconButton
      touch={true}
      tooltip="Done"
      tooltipPosition="bottom-left"
      onTouchTap={props.onDone}
    >
      <DoneIcon color={grey400} />
    </IconButton>
  </div>);
}


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="Snooze"
    tooltipPosition="bottom-left"
  >
    <SnoozeIcon color={grey400} />
  </IconButton>
);



const snoozeIconMenu = (props) => (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem onTouchTap={props.onSnooze}>10 seconds</MenuItem>
    <MenuItem onTouchTap={props.onSnooze}>Tomorrow</MenuItem>
    <MenuItem onTouchTap={props.onSnooze}>This weekend</MenuItem>
    <MenuItem onTouchTap={props.onSnooze}>Next week</MenuItem>
  </IconMenu>
);

class TabsList extends Component {
  constructor(props) {
    super(props);
  }

  getKeyCounts(tabs) {
    return Object.keys(tabs).length || 0;
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
    if (this.getKeyCounts(this.props.tabs) === 0)
      return null;

    return (
      <List>
        <Subheader>{this.props.title}</Subheader>
        {this.getTabsListItem(this.props.tabs)}
      </List>
    );
  }
}

export default TabsList;