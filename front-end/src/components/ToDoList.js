import React from 'react';
import TodoItem from './ToDoItem';

const TodoList = ({ todos, onUpdate, onDelete }) => {
  return (
    <tbody>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </tbody>
  );
};

export default TodoList;
