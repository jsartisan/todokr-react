import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getTodosIsFetching, getTodos, getTodosErrorMessage } from './../../selectors/TodoSelectors';
import * as actions from '../../actions';
import TodoList from './TodoList';
import FetchError from './../common/FetchError';

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if(this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, isFetching, errorMessage, todos } = this.props;

    if(isFetching === true && todos.length === 0) {
      return <p>Loading...</p>
    }

    if(errorMessage && todos.length === 0) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      );
    }

    return <TodoList
      todos={todos}
      onTodoClick={toggleTodo}
    />
  }
}

const mapStateToProps = (state, ownProps) => {
  const filter = ownProps.match.params.filter || 'all';

  return {
    todos: getTodos(state, filter),
    filter,
    errorMessage: getTodosErrorMessage(state, filter),
    isFetching: getTodosIsFetching(state, filter)
  }
};

export default withRouter(
  connect(
    mapStateToProps, actions
  )(VisibleTodoList)
);
