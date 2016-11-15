import React, { Component } from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TabsList from './TabsList';


class App extends Component {
  constructor(props) {
    super(props);
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
            <TabsList
              title='Opened Tabs'
              tabs={this.props.openedTabs}
              onSnooze={this.dispatchSnoozeAlias.bind(this)} 
              onDone={this.dispatchDoneAlias.bind(this)} 
              onOpen={this.dispatchOpenAlias.bind(this)} 
            />
            <TabsList
              title='Snoozed Tabs'
              tabs={this.props.snoozedTabs}
              onSnooze={this.dispatchSnoozeAlias.bind(this)} 
              onDone={this.dispatchDoneAlias.bind(this)} 
              onOpen={this.dispatchOpenAlias.bind(this)} 
            />
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
    let newObj = {
      ...tab,
      snoozeUntil: Date.now() + 2000
    }

    console.log(newObj);

    this.props.dispatch({
      type: 'user-clicked-snooze',
      payload: newObj
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
    snoozedTabs: state.snoozedTabs,
  };
};

export default connect(mapStateToProps)(App);
