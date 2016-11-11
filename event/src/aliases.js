
const clickSnooze = (originalAction) => {
  clickDone(originalAction);
  
  setTimeout(() => {
    clickOpen(originalAction);
  }, 1000);
  
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
