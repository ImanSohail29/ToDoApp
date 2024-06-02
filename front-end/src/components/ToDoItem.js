import React, { useState } from 'react';
import axios from 'axios';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodo({
      ...updatedTodo,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const { data } = await axios.put(`/api/todos/${updatedTodo.id}`, updatedTodo);
      onUpdate(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/todos/${todo.id}`);
      onDelete(todo.id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleMarkCompleted = async () => {
    try {
      const { data } = await axios.patch(`/api/todos/${updatedTodo.id}/completed`);
      onUpdate(data);
    } catch (error) {
      console.error('Error marking todo as completed:', error);
    }
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={updatedTodo.title}
            onChange={handleInputChange}
            className="w-full border rounded py-1 px-2"
          />
        ) : (
          <span>{todo.title}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="description"
            value={updatedTodo.description}
            onChange={handleInputChange}
            className="w-full border rounded py-1 px-2"
          />
        ) : (
          <span>{todo.description}</span>
        )}
      </td>
      <td>{todo.completed ? 'Completed' : 'Pending'}</td>
      <td>
        {isEditing ? (
          <button
            onClick={handleSaveChanges}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          >
            Save
          </button>
        ) : (
          <>
            {!todo.completed && (
              <button
                onClick={handleMarkCompleted}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded mr-2"
              >
                Mark Completed
              </button>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TodoItem;
