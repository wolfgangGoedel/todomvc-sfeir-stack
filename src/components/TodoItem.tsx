import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodo, DoneSwitched, TodoRemoved } from '../store';

type TodoItemProps = {
  id: string;
};

export const TodoItem: FC<TodoItemProps> = ({ id }) => {
  const todo = useSelector(getTodo(id));
  const dispatch = useDispatch();

  return (
    <li className={todo.done ? 'completed' : ''}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.done}
          onChange={() => dispatch(DoneSwitched(id))}
        />
        <label>{todo.description}</label>
        <button className="destroy" onClick={() => dispatch(TodoRemoved(id))} />
      </div>
    </li>
  );
};
