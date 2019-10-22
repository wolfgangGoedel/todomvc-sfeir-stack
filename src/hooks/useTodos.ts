import { useState, useEffect } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("//localhost:3001/api/tasks")
      .then(r => r.json())
      .then(setTodos);
  }, []);

  return todos;
};
