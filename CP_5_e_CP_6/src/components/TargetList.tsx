// src/components/TargetList.tsx
import React, { useEffect, useState } from 'react';
import { getTargets, deleteTarget } from '../api';

interface Target {
  id: string;
  name: string;
}

interface Props {
  onSelect: (targetId: string) => void;
}

const TargetList: React.FC<Props> = ({ onSelect }) => {
  const [targets, setTargets] = useState<Target[]>([]);

  useEffect(() => {
    fetchTargets();
  }, []);

  const fetchTargets = async () => {
    try {
      const response = await getTargets();
      setTargets(response.data);
    } catch (error) {
      console.error('Error fetching targets:', error);
    }
  };

  const handleDelete = async (targetId: string) => {
    if (window.confirm('Are you sure you want to delete this target?')) {
      await deleteTarget(targetId);
      fetchTargets();
    }
  };

  return (
    <div>
      <h2>Targets</h2>
      <ul>
        {targets.map((target) => (
          <li key={target.id}>
            <span onClick={() => onSelect(target.id)} style={{ cursor: 'pointer', color: '#5f41e4' }}>
              {target.name}
            </span>
            <button onClick={() => handleDelete(target.id)} style={{ marginLeft: '10px' }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TargetList;
