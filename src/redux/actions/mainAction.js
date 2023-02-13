const ADD_LOGIN_INFO = 'ADD_LOGIN_INFO';
const ADD_SCORE = 'ADD_SCORE';
const SEND_ASSERTIONS = 'SEND_ASSERTIONS';

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

export const sendAssertions = (assertions) => ({
  type: SEND_ASSERTIONS,
  payload: assertions,
});
