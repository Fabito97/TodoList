import { useEffect, useState } from "react";
import { FaTrashAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

const TodoList = ({setToDoItems, toDoItems, setItem, setPriority, setTaskId, setEditing, editing}) => {
  const [deletedItems, setDeletedItems] = useState(() => {
    const savedItems = localStorage.getItem('deletedItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });  

  useEffect(() => {
    localStorage.setItem('deletedItems', JSON.stringify(deletedItems));
  }, [deletedItems]);


  const handleChecked = (id) => {
    setToDoItems((items) => 
      items.map((item) => item.id === id ? 
        { ...item, isChecked: !item.isChecked } : item
    ).sort((a, b) => a.isChecked - b.isChecked)
    );
  };

  const handleDelete = (id) => {
    const item = toDoItems.find((item) => item.id === id )
    
   setToDoItems((prevItems) => prevItems.filter((item) => item.id !== id));

     const deletedTasks =  [...(JSON.parse(localStorage.getItem('deletedItems')) || []), item];
     console.log(deletedTasks);
     localStorage.setItem('deletedItems', JSON.stringify(deletedTasks));
  };


  const handleEdit = (e, id) => {
    e.stopPropagation();

    const item = toDoItems.find((item) => item.id === id )
    setItem(item.task)
    setPriority(item.priority)
    
    setTaskId((item.id));
    setEditing(true)

  }

  return (
    <ul className='item-list items'>
      {toDoItems?.map((item) => <ToDoItem
        key={item.id}
        item={item.task}
        id={item.id}
        isChecked={item.isChecked}
        priority={item.priority}
        onDelete={handleDelete}
        onChecked={handleChecked}
        handleEdit={handleEdit}
        editing={editing}
      />
      )}
    </ul>
  );
};

const ToDoItem = ({ item, id, onDelete, onChecked, isChecked, priority, handleEdit, editing }) => {
  // const [checked, setChecked] = useState(false)
  const statusText = isChecked ? "Done" : priority

  return (
    <li onClick={() => onChecked(id)} className={`${editing ? "editing" : ""}`}>
      <div 
        style={{
          maxWidth:'80%'
        }}
      >
      <span className="checkbox"></span>
      <span className={`item ${isChecked ? "checked" : ""}`}>
        {item}
        
       
      </span>
        <span className={`status ${isChecked ? "completed" : priority.toLowerCase()}`}>
          {`${isChecked ? "Completed": priority}` }
        </span> 
      </div>
      
      <div style={{display:'flex'}}> 
        <button className="btn-edit"
          style={{
            padding:'3px 7px',
            background:"none",
            border:"none",
            color:"#ccc",
            fontSize: "10px",
          }}
          onClick={(e) => handleEdit(e, id)}
          ><FaEdit size={15}/></button>

        <button className='btn-delete remove-item'
          onClick={() => onDelete(id)}
          >
          <FaTrashAlt />
        </button>
      </div>
    </li>
  );
};


export default TodoList