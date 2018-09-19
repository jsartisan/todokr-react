import { normalize } from 'normalizr';
import { arrayOfTodos, todo as todoSchema } from './../constants/Schemas';
import * as api from '../api';
import * as types from '../constants/ActionTypes';

export const addTodo = (text) => (dispatch) => {
  return api.addTodo(text).then(response => {
    const { entities, result } = normalize(response, todoSchema);

    dispatch({
      type: types.ADD_TODO_SUCCESS,
      entities,
      response,
      result
    });
  });
}

export const toggleTodo = (id) => (dispatch) => {
  return api.toggleTodo(id).then(response => {
    const { entities, result } = normalize(response, todoSchema);

    dispatch({
      type: types.TOGGLE_TODO_SUCCESS,
      entities,
      result,
      response
    });
  })
}

export const fetchTodosRequest = (filter) => (dispatch) => {
  dispatch({
    type: types.FETCH_TODOS_REQUEST,
    filter,
  });
}

const fetchTodosSuccess = (filter, result, entities) => (dispatch) => {
  dispatch({
    type: types.FETCH_TODOS_SUCCESS,
    result,
    entities,
    filter,
  });
};

const fetchTodosError = (filter, message) => (dispatch) => {
  dispatch({
    type: types.FETCH_TODOS_ERROR,
    filter,
    message,
  });
}

export const fetchTodos = (filter) => (dispatch, getState) => {
  dispatch(fetchTodosRequest(filter));

  return api.fetchTodos(filter).then(
    response => {
      const { entities, result } = normalize(response, arrayOfTodos);

      dispatch(fetchTodosSuccess(filter, result, entities));

      return response;
    },
    error => {
      const message = error.message || 'Something went wrong';
      dispatch(fetchTodosError(filter, message));
    }
  );
};
