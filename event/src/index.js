import {createStore} from 'redux';
import rootReducer from './reducers';

import {wrapStore} from 'react-chrome-redux';

const store = createStore(rootReducer, {});

chrome.tabs.query({}, (tabs) => {
  tabs.map((tab) => {
    store.dispatch({
      type: 'ADD_TAB',
      payload: tab
    });
  });
});

store.subscribe(() => {
  console.log(store.getState().openedTabs);
});

wrapStore(store, {
  portName: 'example'
});
