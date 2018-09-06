import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import configureStore from './utilities/configureStore';

const store = configureStore();

render(
  <Root store={store} />,
  document.getElementById('app-root')
);
