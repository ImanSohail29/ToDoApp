import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import { Col, Container, Row, Form, Button, Spinner, Alert } from "react-bootstrap";
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
  <div className="bg-gradient-to-r from-purple-400 via-green-500 to-red-500 text-white py-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-2">Todo List</h1>
        <p className="text-lg font-light">Stay organized and manage your tasks efficiently</p>
      </div>
    </div>
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <input
          type="text"
          name="title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="New Todo Title"
        />
    
        <input
          type="text"
          name="description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="New Todo Description"
        />
      <button
        onClick={addTodo}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Add Todo
      </button>
      <StatusFilter onChange={handleStatusFilter} />

    </div>
       {/* Pagination controls */}
      {/* Status filter */}
      {/* Todo list */}
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-b py-3 px-5 text-left font-semibold text-gray-700">Title</th>
            <th className="border-b py-3 px-5 text-left font-semibold text-gray-700">Description</th>
            <th className="border-b py-3 px-5 text-right font-semibold text-gray-700">Status</th>
            <th className="border-b py-3 px-5 text-right font-semibold text-gray-700">Actions</th>
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
    </div>
  );
};

export default Dashboard;
