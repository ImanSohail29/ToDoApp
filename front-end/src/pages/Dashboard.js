import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from '../components/ToDoList';
import StatusFilter from '../components/StatusFilter';
import Pagination from '../components/Pagination';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [totalTodos, setTotalTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [statusFilter, setStatusFilter] = useState('');
  useEffect(() => {
    fetchTodos(page, pageSize, statusFilter);
  }, [page, pageSize, statusFilter]);
 // Handle pagination
 const handlePageChange = (newPage) => {
  setPage(newPage);
};

// Handle status filter
const handleStatusFilter = (newStatus) => {
  setStatusFilter(newStatus);
};
  const fetchTodos = async (page, pageSize, status) => {
    try {
      if(status===''){
        const { data } = await axios.get('/api/todos', {
          params: {
            page,
            pageSize
          }
        });
        setTodos(data.todos);
        setTotalTodos(data.totalTodos)
      }
      else
      {
      const { data } = await axios.get('/api/todos', {
        params: {
          page,
          pageSize,
          status
        }
      });
      setTodos(data.todos);
      setTotalTodos(data.totalTodos)
    }
     
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const { data } = await axios.post('/api/todos', newTodo);
      setTodos([...todos, data]);
      setNewTodo({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      const { data } = await axios.put(`/api/todos/${updatedTodo.id}`, updatedTodo);
      setTodos(todos.map(todo => (todo.id === updatedTodo.id ? data : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo Dashboard</h1>
      <div className="mt-4">
        <input
          type="text"
          name="title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          className="w-full border rounded py-1 px-2 mr-2"
          placeholder="New Todo Title"
        />
        <input
          type="text"
          name="description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          className="w-full border rounded py-1 px-2 mr-2"
          placeholder="New Todo Description"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
        >
          Add
        </button>
      </div>
       {/* Pagination controls */}
      {/* Status filter */}
      <StatusFilter onChange={handleStatusFilter} />
      {/* Todo list */}
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="border-b py-2 px-4 text-left">Title</th>
            <th className="border-b py-2 px-4 text-left">Description</th>
            <th className="border-b py-2 px-4 text-left">Status</th>
            <th className="border-b py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
      </table>
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(totalTodos / pageSize)}
        onPageChange={handlePageChange}
      />
      
    </div>
  );
};

export default Dashboard;
