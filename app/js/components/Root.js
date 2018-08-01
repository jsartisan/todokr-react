import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import App from './App';

const history = createBrowserHistory();

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path='/:filter?' component={App} />
      </Switch>
    </Router>
  </Provider>
);

export default Root;