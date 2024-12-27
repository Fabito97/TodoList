
const DeletedItem = ({
  deletedTasks,
  handleRestore,
}) => {
  return (
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
                <span
                  className={`status ${
                    item.priority === 'high'
                      ? 'high'
                      : item.priority === 'medium'
                      ? 'medium'
                      : 'low'
                  }`}
                >
                  {item.priority}
                </span>
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
                  fontSize: '12px',
                }}
                onClick={() => handleRestore(item)}
              >
                Restore
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletedItem;