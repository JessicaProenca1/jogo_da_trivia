const ADD_LOGIN_INFO = 'ADD_LOGIN_INFO';
const ADD_SCORE = 'ADD_SCORE';

export const addLoginInfo = (name, email) => ({
  type: ADD_LOGIN_INFO,
  payload: {
    name,
    email,
  },
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  payload: score,
});
