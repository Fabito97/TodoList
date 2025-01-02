import React, { useEffect, useState } from 'react';
import DeletedItemLIst from './DeletedItemList';
import Logo from './assets/todo-logo1.png';
import { toast } from 'react-toastify';
import DeletedItem from './DeletedItems';

const Navbar = ({ todoItems, setTodoItems }) => {
  const [filter, setFilter] = useState(false);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchDeletedItem();
  }, [todoItems]);

  const fetchDeletedItem = () => {
    const deletedItems = localStorage.getItem('deletedItems');
    setDeletedTasks(deletedItems.length ? JSON.parse(deletedItems) : []);
  };

  const displayFilter = () => {
    setFilter(!filter);
  };

  const handleDeletedTaskDisplayMenu = () => {
    fetchDeletedItem();
    if (deletedTasks.length) {
      setIsOpen(true);
      setFilter(false);
    } else toast.success('You have no deleted tasks');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filter &&
        !event.target.closest('.navbar ul') &&
        !event.target.closest('button')
      ) {
        setFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filter]);

  const handleClear = () => {
    localStorage.removeItem('deletedItems');
    setDeletedTasks([]);
    setIsOpen(false);
  };

  const handleRestore = (task) => {
    setTodoItems((prevTasks) => [...prevTasks, task]);

    const updatedTasks = deletedTasks.filter((item) => item.id !== task.id);

    localStorage.setItem('deletedItems', JSON.stringify(updatedTasks));

    if (updatedTasks.length === 0) setIsOpen(false);
  };

  const handleCompletedTaskFilter = () => {
    setTodoItems((prevTasks) =>
      prevTasks.slice().sort((a, b) => !a.isChecked - !b.isChecked)
    );
  };

  const handleUncompletedTaskFilter = () => {
    setTodoItems((prevTasks) =>
      prevTasks.slice().sort((a, b) => a.isChecked - b.isChecked)
    );
  };

  const handlePriorityFilter = (priority) => {
    const priorityOrder = { High: 2, Mid: 3, Low: 4};

    if (priority === 'High')  {
      priorityOrder.High = 1;
    } else if (priority === 'Mid') {
      priorityOrder.Mid = 1;
    } else {
      priorityOrder.Low = 1;
    }
    
    setTodoItems((prevTasks) =>
      prevTasks.slice().sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
                    .sort((a, b) => a.isChecked - b.isChecked)
    );
  }

  return (
    <div className="navbar">
      <div className="container nav">
        <div className="app-title">
          <img src={Logo} width={70} alt="" />
          <h2>To Do List</h2>
        </div>
        <div style={{ position: 'relative' }}>
          <button className='btn-filter'
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              background: '#2b0e5a',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={displayFilter}
          >
            Filter tasks
          </button>
          {filter && (
            <ul className='filter-menu'
              style={{
                position: 'absolute',
                background: '#2b0e5a',
                width: '130px',
                padding: '10px',
                paddingRight: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                left: '-30px',
                cursor: 'pointer',
                zIndex: 1,
              }}
              onMouseOver={() => setFilter(true)}
              onMouseOut={() => setFilter(false)}
            >
              <li onClick={handleUncompletedTaskFilter}>All tasks</li>
              <li onClick={handleCompletedTaskFilter}>Completed tasks</li>
              <li>
                Priority
                <ul
                  className="priority"
                 
                >
                  <li onClick={() => handlePriorityFilter("High")}>High</li>
                  <li onClick={() => handlePriorityFilter("Mid")}>Mid</li>
                  <li onClick={() => handlePriorityFilter("Low")}>Low</li>
                </ul>
              </li>
            </ul>
          )}
          {isOpen && (
            <DeletedItemLIst
              todoItems={todoItems}
              setTodoItems={setTodoItems}
              deletedTasks={deletedTasks}
              handleClear={handleClear}
              setIsOpen={setIsOpen}
            >
              <DeletedItem
                deletedTasks={deletedTasks}
                handleRestore={handleRestore}
              />
            </DeletedItemLIst>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
