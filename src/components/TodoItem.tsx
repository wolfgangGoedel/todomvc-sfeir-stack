import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodo, DoneSwitched } from '../store';

type TodoItemProps = {
  id: string;
};

export const TodoItem: FC<TodoItemProps> = ({ id }) => {
  const todo = useSelector(getTodo(id));
  const dispatch = useDispatch();

  return (
    <li>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.done}
          onChange={() => dispatch(DoneSwitched(id))}
        />
        <label>{todo.description}</label>
      </div>
    </li>
  );
};
