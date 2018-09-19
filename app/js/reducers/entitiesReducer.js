import { merge } from 'lodash';

const initialState = {
  todos: {},
};

export default (state = initialState, action) => {
  if (action.entities) {
    return merge({}, state, action.entities);
  }

  return state;
};
