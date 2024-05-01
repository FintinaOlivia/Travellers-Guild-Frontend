export const SET_SERVER_DOWN = 'SET_SERVER_DOWN';

export const setServerDown = (isServerDown) => ({
  type: SET_SERVER_DOWN,
  payload: isServerDown,
});