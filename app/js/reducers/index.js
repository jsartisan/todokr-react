import { combineReducers } from 'redux';

import todoReducer from './todosReducer';
import entitiesReducer from './entitiesReducer';

export default combineReducers({
  entities: entitiesReducer,
  todos: todoReducer,
});
