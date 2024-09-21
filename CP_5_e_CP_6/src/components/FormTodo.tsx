// src/components/FormTodo.tsx
import React, { useState } from 'react';
import { createTodo, updateTodo } from '../api';

interface Props {
  targetId: string;
  todoId?: string;
  onSubmit: () => void;
}

const FormTodo: React.FC<Props> = ({ targetId, todoId, onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (todoId) {
      await updateTodo(todoId);
    } else {
      await createTodo(targetId);
    }
    setTitle('');
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="TODO Title"
        required
        style={{ padding: '10px', width: '70%', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '10px 20px' }}>
        {todoId ? 'Editar' : 'Criar'} TODO
      </button>
    </form>
  );
};

export default FormTodo;
