import React from "react";
import { TodoList } from "./TodoList";
import { useTodos } from "../hooks/useTodos";

export const App = () => {
  const todos = useTodos();

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
      </header>
      <TodoList todos={todos} />
    </section>
  );
};
