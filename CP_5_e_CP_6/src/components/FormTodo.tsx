import React, { useState } from 'react';

interface FormTodoProps {
  targetId: string;
  onSubmit: (targetId: string, description: string) => void;
}

const FormTodo: React.FC<FormTodoProps> = ({ targetId, onSubmit }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(targetId, description);
    setDescription(''); // Limpa o campo após o envio
  };

  return (
    <form onSubmit={handleSubmit} className="form-todo">
      <input
        type="text"
        placeholder="Descrição do TODO"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="todo-input"
      />
      <button type="submit" className="save-todo-button">Salvar TODO</button>
    </form>
  );
};

export default FormTodo;
