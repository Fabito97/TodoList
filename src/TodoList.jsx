import { useEffect, useState } from "react";

const TodoList = ({setToDoItems, toDoItems, setItem, setPriority, setTaskId, setEditing}) => {
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
    )
    );
  };

  const handleDelete = (id) => {
    const item = toDoItems.find((item) => item.id === id )
    
    setToDoItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setDeletedItems((prevItems) => [...prevItems, item]);
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
      />
      )}
    </ul>
  );
};

const ToDoItem = ({ item, id, onDelete, onChecked, isChecked, priority, handleEdit }) => {
  // const [checked, setChecked] = useState(false)
  const statusText = isChecked ? "Done" : priority

  return (
    <li onClick={() => onChecked(id)} className="">
      <div 
        style={{
          width:'80%'
        }}
      >

      <span className={`item ${isChecked ? "checked" : ""}`}>
        {item}
        
       
      </span>
        <span className={`status ${isChecked ? "status.completed" : priority.toLowerCase()}`}>
          {`${isChecked ? "Done": priority}` }
        </span> 
      </div>
      
      <div>
        <button
          style={{
            padding:'5px',
            borderRadius:'8px',
            background:"#403",
            border:"none",
            color:"#ccc",
            fontSize: "10px",          
          }}
          onClick={(e) => handleEdit(e, id)}
          >Edit</button>

        <button className='btn-link remove-item'
          onClick={() => onDelete(id)}
          >
          &times;
        </button>
      </div>
    </li>
  );
};


export default TodoList