import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { TodoAdded } from '../store/actions';

export const TodoInput = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatch(TodoAdded(value));
        setValue('');
      }}
    >
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  );
};
