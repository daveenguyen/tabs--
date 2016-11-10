import {combineReducers} from 'redux';

import count from './count';
import openedTabs from './tabs';

export default combineReducers({
  count,
  openedTabs
});
