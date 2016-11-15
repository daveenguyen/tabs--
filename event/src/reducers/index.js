import {combineReducers} from 'redux';

import openedTabs from './openedTabs';
import snoozedTabs from './snoozedTabs';

export default combineReducers({
  openedTabs,
  snoozedTabs
});
