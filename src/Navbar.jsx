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
    }
    else toast.success('You have no deleted tasks');
  };



  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       filter &&
  //       !event.target.closest('.navbar ul') &&
  //       !event.target.closest('button')
  //     ) {
  //       setFilter(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [filter]);

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
    // setTodoItems((prevTasks) => prevTasks.filter((task) => task.isChecked));
  }

  return (
    <div className="navbar">
      <div className="container nav">
        <div className="app-title">
          <img src={Logo} width={70} alt="" />
          <h2>To Do List</h2>
        </div>
        <div>
          <button
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
            <ul
              style={{
                position: 'absolute',
                background: '#2b0e5a',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                zIndex: '100',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                cursor: 'pointer',
              }}
            >
              <li>All tasks</li>
              <li onClick={handleCompletedTaskFilter}>Completed tasks</li>
              <li onClick={handleDeletedTaskDisplayMenu}>Deleted tasks</li>
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
