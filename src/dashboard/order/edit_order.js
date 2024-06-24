import React, { useState } from 'react';
import './edit_order.css';

function EditOrder() {
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [originalContent, setOriginalContent] = useState('abc');

  const handleEditClick = () => {
    setEditing(true);
    setNewContent(originalContent);
  };

  const handleSaveClick = () => {
    setEditing(false);
    setOriginalContent(newContent);
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleChange = (event) => {
    setNewContent(event.target.value);
  };

  return (
    <div className="edit_order_container">

        <div className='chi_tiet_don_hang'>

        </div>

        <div className='thong_tin_khach_hang'>
            
        </div>



      {editing ? (
        <div>
          <input
            type="text"
            value={newContent}
            onChange={handleChange}
          />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{originalContent}</p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default EditOrder;
