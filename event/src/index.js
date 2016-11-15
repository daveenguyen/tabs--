import { applyMiddleware, createStore } from 'redux';
import { alias, wrapStore } from 'react-chrome-redux';
import rootReducer from './reducers';
import aliases from './aliases';

const middleware = [
  alias(aliases),
];

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(...middleware)
);


let unsnoozeSet = new Set();

const setupUnsnooze = (tabs) => {

  if (Object.keys(tabs) && Object.keys(tabs).length > 0) {
    Object.keys(tabs).map((key) => {

      let tab = tabs[key];

      if (!unsnoozeSet.has(key)) {
        unsnoozeSet.add(key);
        console.log(tab);

        let timeout = tab.snoozeUntil - Date.now();

        if (timeout < 0) timeout = 0;

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
