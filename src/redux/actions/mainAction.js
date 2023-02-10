const ADD_LOGIN_INFO = 'ADD_LOGIN_INFO';

export const addLoginInfo = (name, email) => ({
  type: ADD_LOGIN_INFO,
  payload: {
    name,
    email,
  },
});
