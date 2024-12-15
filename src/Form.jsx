const Form = ({ onSubmit, setItem, item, priority, setPriority, editing }) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="" style={{ display: 'block', fontSize: '10px' }}>
          Priority
        </label>
        <select
          name="priority"
          id=""
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            padding: '12px 0px',
            borderRadius: '10px',
            fontSize: '10px',
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

      </div>
      <input
        placeholder="item..."
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button className="btn">{editing ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default Form;
