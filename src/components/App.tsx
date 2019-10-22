import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TodoList } from './TodoList';
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
      </header>
      <TodoList />
    </section>
  );
};
