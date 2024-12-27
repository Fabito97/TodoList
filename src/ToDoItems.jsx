import { useState, useEffect } from 'react';
import Logo from './assets/todo-logo1.png';

export const ToDoItems = ({ children, toDoItems, onClear }) => {
  return (
    <div className="app-wrapper">
      <div style={{}}>
        <div className="title">
          <p>Start by adding items to your todo list</p>
        </div>

        {children}

        <div className="title">
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
