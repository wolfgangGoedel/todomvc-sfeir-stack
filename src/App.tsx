import React, { useState, useEffect } from "react";
import { TodoList } from "./TodoList";

export const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("//localhost:3001/api/tasks")
      .then(r => r.json())
      .then(setTodos);
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
      </header>
      <TodoList todos={todos} />
    </section>
  );
};
