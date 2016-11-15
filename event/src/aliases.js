
const clickSnooze = (originalAction) => {
  chrome.tabs.remove(originalAction.payload.id);

  originalAction.type = 'SNOOZE_TAB';

  return originalAction;
}

const unsnooze = (originalAction) => {
  chrome.tabs.create({'url': originalAction.payload.url, active: false});

  originalAction.type = 'UNSNOOZE_TAB';

  return originalAction;
}

const clickOpen = (originalAction) => {
  chrome.tabs.create({'url': originalAction.payload.url, active: false});

  return originalAction;
}

const clickDone = (originalAction) => {
  chrome.tabs.remove(originalAction.payload.id);

  return originalAction;
}

export default {
  'user-clicked-open': clickOpen,
  'user-clicked-done': clickDone,
  'user-clicked-snooze': clickSnooze,
  'unsnooze': unsnooze,
}
