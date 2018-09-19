import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from './CommonSelectors';
import { arrayOfTodos, todo  } from '../constants/Schemas';

export const getTodoIds = (state, filter) => state.todos.list[filter].ids;
export const getTodosIsFetching = (state, filter) => state.todos.list[filter].isFetching;
export const getTodosErrorMessage = (state, filter) => state.todos.list[filter].errorMessage;

export const getTodos = createSelector(
  getEntities,
  getTodoIds,
  (entities, ids) => {
    return denormalize(ids, arrayOfTodos, entities);
  },
);
