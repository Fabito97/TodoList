import { useState, useEffect } from 'react';
import './App.css';
import Form from './Form';
import { ToDoItems } from './ToDoItems';
import TodoList from './TodoList';
import DeletedItemLIst from './DeletedItemList';

function App() {
  const [toDoItems, setToDoItems] = useState(() => {
    const savedItems = localStorage.getItem('toDoItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  
  const [taskId, setTaskId] = useState()
  const [priority, setPriority] = useState('low')
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
        if(editing) {
          handleTaskUpdate(item, taskId, priority)
        } else {
          const newItem = {
          id: toDoItems.length + 1, 
          task: item, 
          isChecked: false, 
          priority };

          setToDoItems((items) => [...items, newItem]);
        }
      } else {
        alert(`${item} is already in your list`);
      }
    } else alert('Please enter an item');

    setItem('');
  };

  const handleTaskUpdate = (updatedTask, taskId, priority) => {
    setToDoItems((prevItems) =>
    prevItems.map((item) => item.id === taskId ?
      {...item, task: updatedTask, priority, isChecked: false} : item
    ))
    setTaskId();
    setItem("")
    setPriority("low")
    setEditing(false)
  }

  const handleClear = () => {
    setToDoItems([]);
  };


  return (
    <div className="container">
      <div>
        <DeletedItemLIst toDoItem={toDoItems}/>
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
            />
        </ToDoItems>
        <DoneList toDoItems={toDoItems} />
      </div>
    </div>
  );
}

export default App;

const DoneList = ({ toDoItems }) => {
  const numItem = toDoItems.length;
  const numCheckedItem = toDoItems.filter((item) => item.isChecked).length;

  if (!numItem) return <p>Your todo list is empty</p>;
  if (numCheckedItem === numItem && numItem) {
    return <p>All tasks Completed. Nice Job</p>;
  }

  return (
    <div>
      <p>You have {numItem} tasks in you to-do list.</p>
      {!numCheckedItem ? (
        <p>No task completed yet</p>
      ) : (
        <p>
          {numCheckedItem} tasks completed, {numItem - numCheckedItem} yet to be
          completed
        </p>
      )}
     
    </div>
  );
};
