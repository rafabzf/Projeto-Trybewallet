import { INFO_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case INFO_USER:
    return {
      ...state,
      ...action.payload,
    };
  default: return state;
  }
}

export default user;
