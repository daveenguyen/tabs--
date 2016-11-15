const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SNOOZE_TAB':
      return { ...state, [action.payload.url]: action.payload };
    case 'UNSNOOZE_TAB':
      let copy = Object.assign({}, state)
      delete copy[action.payload.url];
      return copy;
    default:
      return state;
  }
};
