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

chrome.tabs.onReplaced.addListener((addedId, removedId) => {
  store.dispatch({
    type: 'REMOVE_TAB',
    payload: removedId
  });

  chrome.tabs.get(addedId, (tab) => {
    store.dispatch({
      type: 'ADD_TAB',
      payload: tab
    });
  });
});

chrome.tabs.onCreated.addListener((tab) => {
  store.dispatch({
    type: 'ADD_TAB',
    payload: tab
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  store.dispatch({
    type: 'ADD_TAB',
    payload: tab
  });
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  store.dispatch({
    type: 'REMOVE_TAB',
    payload: tabId
  });
});

wrapStore(store, {
  portName: 'example'
});
