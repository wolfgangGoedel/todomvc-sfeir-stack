import React from "react";

export const TodoList = ({ todos }) => {
  return (
    <section className="main">
      <ul className="todo-list">
        {todos.map(todo => (
          <li>
            <div className="view">
              <label>{todo.description}</label>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
