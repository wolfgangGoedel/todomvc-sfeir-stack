import React from 'react';

export const TodoItem = ({ children }) => {
  return (
    <li>
      <div className="view">
        <label>{children}</label>
      </div>
    </li>
  );
};
