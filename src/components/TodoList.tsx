import React from 'react';
import { useSelector } from 'react-redux';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const todos = useSelector(state => Object.values(state.todos));

  return (
    <section className="main">
      <ul className="todo-list">
        {todos.map(({ id, description }) => (
          <TodoItem key={id}>{description}</TodoItem>
        ))}
      </ul>
    </section>
  );
};
