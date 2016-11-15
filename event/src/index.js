import { applyMiddleware, createStore } from 'redux';
import { alias, wrapStore } from 'react-chrome-redux';
import rootReducer from './reducers';
import aliases from './aliases';

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

  let unsnoozeSet = new Set();

  const setupUnsnooze = (tabs) => {

    if (Object.keys(tabs) && Object.keys(tabs).length > 0) {
      Object.keys(tabs).map((key) => {

        let tab = tabs[key];

        if (!unsnoozeSet.has(key)) {
          unsnoozeSet.add(key);

          let timeout = tab.snoozeUntil - Date.now();

          if (timeout < 2000) timeout = 2000;

          setTimeout(() => {
              store.dispatch({
                type: 'unsnooze',
                payload: tab
              });
              unsnoozeSet.delete(key);
            }
          , timeout);
        }
      });
    }
  }

  store.subscribe(() => {
    setupUnsnooze(store.getState().snoozedTabs);
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