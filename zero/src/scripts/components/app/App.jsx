import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  getTabs() {
    let openedTabs = this.props.openedTabs;
    if (openedTabs) {
      return Object.keys(openedTabs).map((key) => {
        let curTab = openedTabs[key];
        return (
          <li key={key}>
            <div>
              <button onClick={() => this.dispatchOpenAlias(curTab)}>[{key}] {curTab.title}</button>
              <button onClick={() => this.dispatchSnoozeAlias(curTab)}>Snooze</button>
              <button onClick={() => this.dispatchDoneAlias(curTab)}>Done</button>
            </div>
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Opened Tabs</h1>
        <ol>
          {this.getTabs()}
        </ol>
      </div>
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
