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
      console.log("handle delete")
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
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
  <td className="px-4 py-2">
    {isEditing ? (
      <input
        type="text"
        name="title"
        value={updatedTodo.title}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    ) : (
      <span className="text-gray-800">{todo.title}</span>
    )}
  </td>
  <td className="px-4 py-2">
    {isEditing ? (
      <input
        type="text"
        name="description"
        value={updatedTodo.description}
        onChange={handleInputChange}
        className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    ) : (
      <span className="text-gray-800">{todo.description}</span>
    )}
  </td>
  <td className="px-4 py-2 text-center">
    <span className={todo.completed ? 'text-green-600 font-semibold' : 'text-yellow-600 font-semibold'}>
      {todo.completed ? 'Completed' : 'Pending'}
    </span>
  </td>
  <td className="px-4 py-2 text-center">
    {isEditing ? (
      <button
        onClick={handleSaveChanges}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
      >
        Save
      </button>
    ) : (
      <>
        {!todo.completed && (
          <button
            onClick={handleMarkCompleted}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mr-2 transition duration-300 ease-in-out"
          >
            Mark Completed
          </button>
        )}
        <button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg mr-2 transition duration-300 ease-in-out"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
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
