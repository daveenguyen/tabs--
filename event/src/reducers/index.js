import {combineReducers} from 'redux';

import count from './count';
import openedTabs from './openedTabs';
import snoozedTabs from './snoozedTabs';

export default combineReducers({
  count,
  openedTabs,
  snoozedTabs
});
