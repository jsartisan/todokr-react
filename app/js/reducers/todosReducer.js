import { combineReducers } from 'redux';

import { FILTERS } from '../constants/TodosConstants';
import * as types from '../constants/ActionTypes';

const list = () => {
  const createList = (filter) => {

    const handleToggle = (state, action) => {
      const { result: toggleId, entities } = action;
      const { completed } = entities.todos[toggleId];

      const shouldRemove = (
        (completed && filter === 'active') ||
        (!completed && filter === 'completed')
      );

      return shouldRemove ?
        state.filter(id => id !== toggleId) :
        state;
    };

    const ids = (state = [], action) => {
      switch (action.type) {
        case types.FETCH_TODOS_SUCCESS:
          return action.result;
        case types.ADD_TODO_SUCCESS:
          return filter !== 'completed' ?
          [...state, action.result] :
          state;
        case types.TOGGLE_TODO_SUCCESS:
          return handleToggle(state, action);

        default:
          return state;
      }
    };

    const isFetching = (state = false, action) => {
      if (action.filter !== filter) {
        return state;
      }

      switch (action.type) {
        case types.FETCH_TODOS_REQUEST:
          return true;
        case types.FETCH_TODOS_SUCCESS:
        case types.FETCH_TODOS_ERROR:
          return false;
        default:
          return state;
      }
    };

    const errorMessage = (state = null, action) => {
      if (action.filter !== filter) {
        return state;
      }

      switch (action.type) {
        case types.FETCH_TODOS_ERROR:
          return action.message;

        case types.FETCH_TODOS_SUCCESS:
        case types.FETCH_TODOS_REQUEST:
          return null;
        default:
          return state;
      }
    };

    return combineReducers({
      ids,
      isFetching,
      errorMessage,
    });
  };

  const filterReducers = {};

  FILTERS.forEach((filter) => {
    filterReducers[filter.key] = createList(filter.key);
  });

  return combineReducers(filterReducers);
};

export default combineReducers({
  list: list(),
});

/**
 *  add todo
 */
export const addTodo = (state, action) => {
  const { todo } = action;

  return state;

  return {
    ...state,
    [todo.id]: {
      ...todo,
    },
  };
};

/**
 * toggle todo
 */
export const toggleTodo = (state, action) => {
  const { todo } = action;

  return state;

  return {
    ...state,
    [todo.id]: {
      ...todo
    }
  };
};
