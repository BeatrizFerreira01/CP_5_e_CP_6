// src/components/TodoList.tsx
import React, { useEffect, useState } from 'react';
import { getTodosByTarget, deleteTodo } from '../api';

interface Todo {
  id: string;
  title: string;
}

interface Props {
  targetId: string;
}

const TodoList: React.FC<Props> = ({ targetId }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, [targetId]);

  const fetchTodos = async () => {
    try {
      const response = await getTodosByTarget(targetId);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDelete = async (todoId: string) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await deleteTodo(todoId);
      fetchTodos();
    }
  };

  return (
    <div>
      <h2>TODOs</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: '10px' }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
