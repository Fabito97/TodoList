import { useState, useEffect } from "react";
import Logo from "./assets/todo-logo1.png";

export const ToDoItems = ({children, toDoItems, onClear}) => {

  return (
    <div className='app-wrapper'>
      <div style={{}}>
        <div className='app-title'>
          <img src={Logo} width={100} alt="" />
          <h2>To Do List</h2>
        </div>  

        {children}

        <div className='footer'>
          {toDoItems.length > 0 ?
            <button className='btn-clear'
            onClick={onClear}>
              Clear
            </button> :
            <p>Start by adding items to your todo list</p>}
        </div>
      </div>
    </div>
  );
};


