import { v4 } from 'node-uuid';

const fakeDatabase = {
  todos: [{
    id: v4(),
    text: 'hey',
    completed: true,
  }, {
    id: v4(),
    text: 'ho',
    completed: true,
  }, {
    id: v4(),
    text: 'go',
    completed: false
  }, {
    id: v4(),
    text: 'something',
    completed: false,
  }]
};

const delay = (ms) => 
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) => {
  return delay(500).then(() => {
    
    if(Math.random() > 0.7) {
      throw new Error('Could not fetch todos');
    }

    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'active':
        return fakeDatabase.todos.filter(t => t.completed === false);
      case 'completed':
        return fakeDatabase.todos.filter(t => t.completed === true);
      default:
        throw new Error(`Unknow filter ${filter}`)
    }
  });
}

export const addTodo = (text) => {
  return delay(500).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false,
    };

    fakeDatabase.todos.push(todo);
    return todo;
  })
}

export const toggleTodo = (id) => {
  return delay(500).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id === id);
    todo.completed = !todo.completed;
    return todo;
  })
}