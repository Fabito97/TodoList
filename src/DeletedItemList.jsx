import React, { useEffect, useState } from 'react';
import './DeletedItemList.css';
import { toast } from 'react-toastify';

const DeletedItemLIst = ({
  deletedTasks,
  todoItems,
  setTodoItems,
  setIsOpen,
  handleClear,
  children,
}) => {
  return (
    <div  
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        margin: '1rem',
      }}
    >
      <div>
        <div className="deleted-items">
          <button
            style={{
              padding: '5px',
              position: 'absolute',
              border: 'none',
              top: '10px',
              left: '10px',
              color: 'red',
              background: 'none',
              cursor: 'pointer',
              fontSize: '20px',
            }}
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
            <div style={{ height: '500px' }}>
          {children}

            </div>

          {deletedTasks.length > 1 && (
            <button
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                background: '#2b05',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                margin: '10px 10px',
              }}
              onClick={handleClear}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeletedItemLIst;
