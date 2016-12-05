export default class Unsnoozer {
  
  constructor(store) {
    this.store = store;
    this.snoozeMap = new Map();
  }

  processTabs(tabs) {
    if (Object.keys(tabs) && Object.keys(tabs).length > 0) {
      Object.keys(tabs).map( (key) => {
        this.setupTabByKey(tabs, key);
      });
    }
  }

  setupTabByKey(tabs, key) {
    let tab = tabs[key];

    if (this.snoozeMap.has(key)) {
      let snoozeInfo = this.snoozeMap.get(key);
      let timerHandle = snoozeInfo.handle;
      let snoozeUntil = snoozeInfo.snoozeUntil;

      if (tab.snoozeUntil != snoozeUntil) {
        clearTimeout(timerHandle)
        this.snoozeMap.delete(key);
      }
    }

    if (!this.snoozeMap.has(key)) {
      let timeout = tab.snoozeUntil - Date.now();
      
      if (timeout < 2000) timeout = 2000;

      let timerHandle = setTimeout(() => {
          this.store.dispatch({
            type: 'unsnooze',
            payload: tab
          });
          this.snoozeMap.delete(key);
        }
      , timeout);

      let snoozeInfo = {
        handler: timerHandle,
        snoozeUntil: tab.snoozeUntil
      }

      this.snoozeMap.set(key, snoozeInfo);  
    }
  }
}
