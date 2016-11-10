import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    chrome.tabs.query({}, (tabs) => {
      tabs.map((tab) => {
        this.props.dispatch({
          type: 'ADD_TAB',
          payload: tab
        });
      });
    });
  }

  render() {
    return (
      <div>
        Click Count: {this.props.count}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

export default connect(mapStateToProps)(App);
