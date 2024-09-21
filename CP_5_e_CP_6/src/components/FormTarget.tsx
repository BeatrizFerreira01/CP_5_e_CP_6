// src/components/FormTarget.tsx
import React, { useState } from 'react';
import { createTarget, updateTarget } from '../api';

interface Props {
  targetId?: string;
  onSubmit: () => void;
}

const FormTarget: React.FC<Props> = ({ targetId, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (targetId) {
      await updateTarget(targetId, name);
    } else {
      await createTarget(name);
    }
    setName('');
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Target Name"
        required
        style={{ padding: '10px', width: '70%', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '10px 20px' }}>
        {targetId ? 'Editar' : 'Criar'} Target
      </button>
    </form>
  );
};

export default FormTarget;
