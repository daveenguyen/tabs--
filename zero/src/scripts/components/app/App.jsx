import React, {Component} from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import SnoozeIcon from 'material-ui/svg-icons/action/schedule';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

const SnoozeButton = (onTouchTap) => {
  return <div><IconButton
    tooltip="more"
    tooltipPosition="bottom-left"
    onTouchTap={onTouchTap}
  >
    <SnoozeIcon color={grey400} />
  </IconButton><IconButton
    tooltip="more"
    tooltipPosition="bottom-left"
    onTouchTap={onTouchTap}
  >
    <SnoozeIcon color={grey400} />
  </IconButton></div>
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  getTabsListItem() {
    let openedTabs = this.props.openedTabs;
    if (openedTabs) {
      let first=true;

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
              onTouchTap={() => this.dispatchOpenAlias(curTab)}
              rightIconButton={SnoozeButton(() => this.dispatchSnoozeAlias(curTab))}
            />
          </div>
        );
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <Paper>
            <List>
              <Subheader>Opened Tabs</Subheader>
              {this.getTabsListItem()}
            </List>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }

  dispatchOpenAlias(tab) {
    this.props.dispatch({
      type: 'user-clicked-open',
      payload: tab
    });
  }

  dispatchSnoozeAlias(tab) {
    this.props.dispatch({
      type: 'user-clicked-snooze',
      payload: tab
    });
  }

  dispatchDoneAlias(tab) {
    this.props.dispatch({
      type: 'user-clicked-done',
      payload: tab
    });
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
    openedTabs: state.openedTabs,
  };
};

export default connect(mapStateToProps)(App);
