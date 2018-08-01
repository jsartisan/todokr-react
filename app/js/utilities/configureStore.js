import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import reducers from './../reducers';

/**
 * logs store update when dispatching
 * 
 * @param  {[type]} store [description]
 * @return {[type]}       [description]
 */
const logger = (store) => (next) => {
  if(!console.group) {
    return next;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('action', action);

    const returnValue = next(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);

    return returnValue;
  }
}

/**
 * thunk middleware
 * 
 * @param  {[type]} store [description]
 * @return {[type]}       [description]
 */
const thunk = (store) => (next) => (action) => {
  if(typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }

  return next(action);
}

/**
 * wraps dispatch with middleware chain
 * 
 * @param  {[type]} store       [description]
 * @param  {[type]} middlewares [description]
 * @return {[type]}             [description]
 */
const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => 
    store.dispatch = middleware(store)(store.dispatch)
  );
};

const configureStore = () => {
  
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  const middlewares = [thunk];

  if(process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

  return store;
};

export default configureStore;