import React, { useState } from 'react';
import { createTarget } from '../api';

interface FormTargetProps {
  onSubmit: (name: string) => void; // Passa o nome do target para a função de submit
}

const FormTarget: React.FC<FormTargetProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name); // Passa o nome do target ao submeter
    createTarget(name);
    setName(''); // Limpa o campo após o envio
  };

  return (
    <form onSubmit={handleSubmit} className="form-target">
      <input
        type="text"
        placeholder="Nome do Target"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="target-input"
      />
      <button type="submit" className="save-target-button">Salvar Target</button>
    </form>
  );
};

export default FormTarget;
