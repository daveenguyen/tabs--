import React, {Component} from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import SnoozeIcon from 'material-ui/svg-icons/action/schedule';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

class App extends Component {
  constructor(props) {
    super(props);
  }

  getTabsListItem() {
    let openedTabs = this.props.openedTabs;
    if (openedTabs) {
      return Object.keys(openedTabs).map((key) => {
        let curTab = openedTabs[key];
        return (
          <ListItem key={key}
            leftAvatar={<Avatar src={curTab.favIconUrl} />}
            primaryText={curTab.title}
            secondaryText={curTab.url}
            onClick={() => this.dispatchOpenAlias(curTab)}
            rightIconButton={
              <IconButton
                touch={true}
                tooltip="more"
                tooltipPosition="bottom-left"
                onClick={() => this.dispatchSnoozeAlias(curTab)}
              >
                <SnoozeIcon color={grey400} />
              </IconButton>
            }
          />
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
          <List>
            <Subheader>Opened Tabs</Subheader>
            {this.getTabsListItem()}
          </List>
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
