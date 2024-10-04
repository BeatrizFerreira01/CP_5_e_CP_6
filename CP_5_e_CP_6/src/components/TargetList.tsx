import React, { useEffect, useState } from 'react';
import { getTargets } from '../api.ts'; // Assegure-se de que o caminho esteja correto
import '../src/components/TargetList.tsx'; // Importa o CSS para o componente

interface Target {
  id: string;
  name: string;
}

interface Props {
  targets: Target[];
  onSelect: (targetId: string) => void;
  onDelete: (targetId: string) => Promise<void>; // Espera uma função que retorna uma Promise
}

const TargetList: React.FC<Props> = ({ onSelect, onDelete }) => {
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
    if (window.confirm('Tem certeza de que deseja excluir este target?')) {
      await onDelete(targetId); // Chama a função onDelete recebida por props
      fetchTargets(); // Atualiza a lista de targets após exclusão
    }
  };

  return (
    <div>
      <h2>Targets</h2>
      <ul>
        {targets.map((target) => (
          <li key={target.id}>
            <span onClick={() => onSelect(target.id)} className="target-name">
              {target.name}
            </span>
            <button onClick={() => handleDelete(target.id)} className="target-button">
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TargetList;
