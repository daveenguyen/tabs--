import { applyMiddleware, createStore } from 'redux';
import { alias, wrapStore } from 'react-chrome-redux';
import rootReducer from './reducers';
import aliases from './aliases';
import Unsnoozer from './Unsnoozer';

const middleware = [
  alias(aliases),
];

chrome.storage.local.get('storeState', (item) => {
  let initialState = { snoozedTabs: item.storeState } || {};
  initializeStore(initialState);
});

const initializeStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  const saveChanges = () => {
    chrome.storage.local.set({
      'storeState': store.getState().snoozedTabs
    }, () => {

    });
  }

  let unsnoozer = new Unsnoozer(store);

  store.subscribe(() => {
    unsnoozer.processTabs(store.getState().snoozedTabs);
    saveChanges();
  })


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

}