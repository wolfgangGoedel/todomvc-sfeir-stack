import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TodoList } from './TodoList';
import { TodoInput } from './TodoInput';
import { action } from '../store';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action.appReady());
  }, [dispatch]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoInput />
      </header>
      <TodoList />
    </section>
  );
};
