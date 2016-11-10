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
            <a href={curTab.url} target="new">[{key}] {curTab.title}</a>
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <ol>
          {this.getTabs()}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
    openedTabs: state.openedTabs,
  };
};

export default connect(mapStateToProps)(App);
