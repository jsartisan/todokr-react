import React from 'react';

import AddTodo from './todos/AddTodo';
import VisibleTodoList from './todos/VisibleTodoList';
import Footer from './todos/Footer';


const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
