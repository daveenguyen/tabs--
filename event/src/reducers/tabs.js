const initialState = {};



export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TAB':
      return { ...state, [action.payload.id]: action.payload };
    case 'REMOVE_TAB':
      let copy = Object.assign({}, state)
      delete copy[action.payload.id];
      return copy;
    default:
      return state;
  }
};
