import React from 'react'

const DeletedItemLIst = () => {
  return (
    <div style={{display: "flex", width: "100%", justifyContent: "flex-start", margin: "3rem" }}>
      <div>
        <button 
          style={{
            padding:"10px", 
            borderRadius:"10px", 
            background: "#2b0e5a",
            color:"#fff",
            border: "none"
            }}
        >
            View Deleted items
        </button>
        
        {/* <ul className='item-list items'>
          {toDoItems?.map((item, i) => <ToDoItem
            key={i}
            item={item.item}
            idx={i}
            isChecked={item.isChecked}
            onDelete={handleDelete}
            onChecked={handleChecked}
          />
          )}
        </ul> */}
 
      </div>
    </div>
  )
}

export default DeletedItemLIst


// const DeletedItem = ({ item, idx, onDelete, onChecked, isChecked }) => {
//   // const [checked, setChecked] = useState(false)
//   return (
//     <li onClick={() => onChecked(idx)}>

//       <span className={`item ${isChecked ? "checked" : ""}`}>
//         {item}
//         {isChecked ? 
//         <span className="status">Done</span> : ""
//         }
//         </span>
      

//       <button className='btn-link remove-item'
//         onClick={() => onDelete(idx)}
//       >
//         &times;
//       </button>
//     </li>
//   );
// };