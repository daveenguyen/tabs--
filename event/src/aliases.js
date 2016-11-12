
const clickSnooze = (originalAction) => {
  chrome.tabs.remove(originalAction.payload.id);
  
  setTimeout(() => {
    clickOpen(originalAction);
  }, 2500);
  
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
}
