import { SET_SERVER_DOWN } from './ServerStatusActions';

const initialState = {
  isServerDown: false,
};

const serverStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERVER_DOWN:
      return {
        ...state,
        isServerDown: action.payload,
      };
    default:
      return state;
  }
};

export default serverStatusReducer;
