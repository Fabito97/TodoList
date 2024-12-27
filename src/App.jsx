import { useState, useEffect } from 'react';
import './App.css';
import Form from './Form';
import { ToDoItems } from './ToDoItems';
import TodoList from './TodoList';
import Navbar from './Navbar';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  const priorityOrder = {High: 1, Mid: 2, Low: 3};

  const sortTasks = (tasks) => {
    if (tasks.length) {
      return [...tasks]
                .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
                .slice().sort((a, b) => a.isChecked - b.isChecked);
    }
    return tasks;
  }

  const [toDoItems, setToDoItems] = useState(() => {
    const savedItems = localStorage.getItem('toDoItems');
    const tasks = savedItems ? JSON.parse(savedItems) : [];

    return sortTasks(tasks);     
  });

  const [taskId, setTaskId] = useState();
  const [priority, setPriority] = useState('Low');
  const [item, setItem] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('toDoItems', JSON.stringify(toDoItems));
  }, [toDoItems]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (item) {
      const itemExists = toDoItems.some((toDoItem) => toDoItem.item === item);

      if (!itemExists) {
        if (editing) {
          handleTaskUpdate(item, taskId, priority);
        } else {
          const newItem = {
            id: toDoItems.length + 1,
            task: item,
            isChecked: false,
            priority,
          };

          setToDoItems((items) => sortTasks([...items, newItem]));
          toast.success('Task added successfully');
        }
      } else {
        alert(`${item} is already in your list`);
      }
    } else alert('Please enter an item');

    setItem('');
  };

  const handleTaskUpdate = (updatedTask, taskId, priority) => {
    setToDoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === taskId
          ? { ...item, task: updatedTask, priority, isChecked: false }
          : item
      )
    );
    toast.success('Task updated successfully');
    setTaskId();
    setItem('');
    setPriority('low');
    setEditing(false);
  };

  const handleClear = () => {
    setToDoItems([]);
  };

  return (
    <div className="app">
      <Navbar todoItems={toDoItems} setTodoItems={setToDoItems} />
      <div className="app-container">
        <ToDoItems toDoItems={toDoItems} onClear={handleClear}>
          <Form
            onSubmit={handleSubmit}
            setItem={setItem}
            item={item}
            priority={priority}
            setPriority={setPriority}
            editing={editing}
          />

          <TodoList
            item={item}
            setItem={setItem}
            priority={priority}
            setPriority={setPriority}
            setToDoItems={setToDoItems}
            toDoItems={toDoItems}
            setTaskId={setTaskId}
            setEditing={setEditing}
            editing={editing}
          />
        </ToDoItems>
      </div>

      <TaskInfo toDoItems={toDoItems} />

      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;

const TaskInfo = ({ toDoItems }) => {
  const numItem = toDoItems.length;
  const numCheckedItem = toDoItems.filter((item) => item.isChecked).length;

  if (!numItem) return <p className="footer-info">Your todo list is empty</p>;
  if (numCheckedItem === numItem && numItem) {
    return <p className="footer-info">All tasks Completed. Nice Job</p>;
  }

  return (
    <div className="footer">
      <div className="footer-info">
        <p style={{ marginRight: '10px' }}>
          You have {numItem} tasks in you to-do list.
        </p>
        {!numCheckedItem ? (
          <p>No task completed yet</p>
        ) : (
          <p>
            {numCheckedItem} task(s) completed.
          </p>
        )}
      </div>
    </div>
  );
};
