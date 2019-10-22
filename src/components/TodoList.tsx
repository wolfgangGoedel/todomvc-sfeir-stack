import React from 'react';
import { useSelector } from 'react-redux';
import { TodoItem } from './TodoItem';
import { getTodoIds } from '../store';

export const TodoList = () => {
  const todos = useSelector(getTodoIds);

  return (
    <section className="main">
      <ul className="todo-list">
        {todos.map(id => (
          <TodoItem key={id} id={id} />
        ))}
      </ul>
    </section>
  );
};
