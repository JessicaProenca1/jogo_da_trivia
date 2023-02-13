const ADD_LOGIN_INFO = 'ADD_LOGIN_INFO';
const ADD_SCORE = 'ADD_SCORE';
const SEND_ASSERTIONS = 'SEND_ASSERTIONS';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};
const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_LOGIN_INFO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case SEND_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  default:
    return state;
  }
};

export default player;
