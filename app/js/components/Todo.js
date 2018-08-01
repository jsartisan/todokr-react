import React from 'react';

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration:
        completed ?
          'line-through' :
          'none'
    }}
    className={
        completed ?
          'completed' :
          ''
    }
    >
      {text}
  </li>
);

export default Todo;
