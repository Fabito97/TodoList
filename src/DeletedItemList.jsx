import React, { useEffect, useState } from 'react';
import './DeletedItemList.css';

const DeletedItemLIst = ({ todoItems }) => {
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchDeletedItem = () => {
    const deletedItems = localStorage.getItem('deletedItems');
    setDeletedTasks(deletedItems ? JSON.parse(deletedItems) : []);
    setIsOpen(true);
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        margin: '1rem',
      }}
    >
      <div>
        {!isOpen && (
          <button
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              background: '#2b0e5a',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={fetchDeletedItem}
          >
            View deleted tasks
          </button>
        )}

        {isOpen && (
          <DeletedItem deletedTasks={deletedTasks} setIsOpen={setIsOpen} />
        )}
      </div>
    </div>
  );
};

export default DeletedItemLIst;

const DeletedItem = ({ deletedTasks, setIsOpen }) => {
  return (
    <div className="deleted-items">
      <button
        onClick={() => setIsOpen(false)}
        style={{
          padding: '5px',
          position: 'absolute',
          border: 'none',
          top: '10px',
          left: '10px',
          color: 'red',
          background: 'none',
          cursor: 'pointer',
        }}
      >
        &times;
      </button>
      <div className="item-container">
        <ul className="deleted-items-list">
          {deletedTasks?.map((item, i) => (
            <li key={i}>
              <div
                style={{
                  maxWidth: '100%',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span className={` `}>{item.task}</span>
                  <span className={`status `}>{item.priority}</span>
                </div>
                <button
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    background: '#2b05',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '10px',
                  }}
                >
                  Undo delete
                </button>
              </div>
            </li>
          ))}
          <button
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              background: '#2b05',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              margin: '10px 10px 30px',
            }}
            onClick={() => setIsOpen(true)}
          >
            Clear
          </button>
        </ul>
      </div>
    </div>
  );
};
