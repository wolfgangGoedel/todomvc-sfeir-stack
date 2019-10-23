import React, { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import { TodoList } from './TodoList';
import { TodoInput } from './TodoInput';
import { AppReady } from '../store/actions';

export const App: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AppReady());
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
