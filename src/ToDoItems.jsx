import { useState, useEffect } from 'react';
import Logo from './assets/todo-logo1.png';

export const ToDoItems = ({ children, toDoItems, onClear }) => {
  return (
    <div className="app-wrapper">
      <div style={{}}>
        <div className="title">
          <p>{`${
            toDoItems.length
              ? 'Keep adding tasks to stay on top of your goals.'
              : 'Start by adding tasks to your todo list'
          } `}</p>
        </div>

        {children}

        <div className="">
          <ClearButton toDoItems={toDoItems} onClear={onClear} />
        </div>
      </div>
    </div>
  );
};

const ClearButton = ({ children, toDoItems, onClear }) => {
  return (
    <div>
      {toDoItems.length > 0 ? (
        <button className="btn-clear" onClick={onClear}>
          Clear
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default ToDoItems;
