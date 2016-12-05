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

function getTomorrow() {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(8);
  date.setMinutes(0);
  date.setSeconds(0);

  return date.getTime();
}

function getThisWeekend() {
  let date = new Date();
  let day = date.getDay();
  let offset = 5 - day;

  if (day == 5) {
    offset = 7;
  } else if (day == 6) {
    offset = 6;
  }

  date.setDate(date.getDate() + offset);
  date.setHours(8);
  date.setMinutes(0);
  date.setSeconds(0);

  return date.getTime();
}

function getNextMinute() {
  let date = new Date();
  date.setMinutes(date.getMinutes() + 1);
  date.setSeconds(0);

  return date.getTime();
}

function getNextWeek() {
  let date = new Date();
  date.setDate(date.getDate() + 7);
  date.setHours(8);
  date.setMinutes(0);
  date.setSeconds(0);

  return date.getTime();
}

const snoozeIconMenu = (props) => (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem onTouchTap={() => props.onSnooze(Date.now() + 2000)}>10 seconds</MenuItem>
    <MenuItem onTouchTap={() => props.onSnooze(getNextMinute())}>Next Minute</MenuItem>
    <MenuItem onTouchTap={() => props.onSnooze(getTomorrow())}>Tomorrow</MenuItem>
    <MenuItem onTouchTap={() => props.onSnooze(getThisWeekend())}>This weekend</MenuItem>
    <MenuItem onTouchTap={() => props.onSnooze(getNextWeek())}>Next week</MenuItem>
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
                onSnooze: (time) => this.props.onSnooze(curTab, time),
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