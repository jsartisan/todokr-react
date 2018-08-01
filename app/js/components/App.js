import React from 'react';
import { Provider } from 'react-redux';

import AddTodo from './AddTodo.jsx';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer.jsx';


const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;