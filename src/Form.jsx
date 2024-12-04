const Form = ({onSubmit, setItem, item, priority, setPriority, editing}) => {
  return (
    <form className='form' onSubmit={onSubmit}>
      <select name="priority" id="" value={priority} onChange={(e) => setPriority(e.target.value)}
        style={{
          padding:"14px 0px",
          borderRadius:"10px",
          fontSize:"10px"
        }}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <input
        placeholder='item...'
        value={item}
        onChange={(e) => setItem(e.target.value)} />
      <button className='btn'>{editing ? "Update" : "Add"}</button>
    </form>
  );
};

export default Form