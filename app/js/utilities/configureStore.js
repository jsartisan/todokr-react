import { createStore, compose, applyMiddleware } from 'redux';
import throttle from 'lodash/throttle';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './../reducers';

/**
 * logs store update when dispatching
 *
 * @param  {[type]} store [description]
 * @return {[type]}       [description]
 */

const logger = createLogger();

/**
 * create a store
 */
const configureStore = () => {
  const composeEnhancers =
    typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
      compose;

  const middlewares = setupMiddlewares();
  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  return store;
};

/**
 *  returns list of middlewares
 */
const setupMiddlewares = () => {
  const middlewares = [thunk];

  if(process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  return middlewares;
}

export default configureStore;
