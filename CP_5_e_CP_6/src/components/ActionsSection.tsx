import React, { useState, useEffect } from 'react';
import TargetList from '../../src/components/TargetList.tsx';
import FormTarget from '../../src/components/FormTarget.tsx';
import FormTodo from '../../src/components/FormTodo.tsx';
//import Weather from '../../src/components/Weather.tsx';
import { getTargets, deleteTarget, createTodo } from '../../src/api.ts'; // Certifique-se de que isso está correto
import '../index.css'; // Certifique-se de importar o CSS

// Definindo a interface para um Target
interface Target {
  id: string;
  name: string;
}

const App: React.FC = () => {
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);
  const [targets, setTargets] = useState<Target[]>([]);
  const [todoDescription, setTodoDescription] = useState<string>(''); // Inicializa como string vazia

  useEffect(() => {
    fetchTargets(); // Chama a função para buscar os targets quando o componente é montado
  }, []);

  const fetchTargets = async () => {
    try {
      const response = await getTargets();
      setTargets(response.data); // Atualiza a lista de targets
    } catch (error) {
      console.error('Error fetching targets:', error);
    }
  };

  const handleSelectTarget = (targetId: string) => {
    setSelectedTargetId(targetId);
  };

  const handleDeleteTarget = async (targetId: string) => {
    if (window.confirm('Tem certeza de que deseja excluir este target?')) {
      await deleteTarget(targetId); // Chama a função de exclusão da API
      fetchTargets(); // Atualiza a lista de targets
    }
  };

  const handleCreateTodo = async () => {
    if (todoDescription.trim() === '' || !selectedTargetId) return; // Não cria se vazio ou sem target selecionado
    await createTodo(selectedTargetId, todoDescription); // Chama a função para criar TODO
    setTodoDescription(''); // Limpa o campo de descrição após a criação
  };

  return (
    <div className="container">
      {/* Seção de Clima */}
      <div className="weather-section">
        <div className="current-weather">
          <img src="/src/assets/react.svg" className="weather-icon" alt="React icon" /><br />
          <h5 className="description">
            CP 5 e 6 de Consumo de API TODO/TARGETS com design de Weather!<br /><br />
            Por: Beatriz Ferreira Cruz - RM555698
          </h5>
        </div>

        {/* Previsão Horária */}
        <div className="hourly-weather">
          <ul className="weather-list"></ul>
        </div>
      </div>

      {/* Integração com os Componentes TODO */}
      <h1>Insira uma Localização</h1>
      {/* <Weather /> Mantém apenas a seção Weather que contém a caixa de localização */}

      {/* Lista de Targets */}
      <TargetList 
        targets={targets} // Passa a lista de targets para o TargetList
        onSelect={handleSelectTarget} 
        onDelete={handleDeleteTarget} // Passa a função de exclusão
      />

      {/* Seções para TODOs e Targets */}
      <div className="actions-section">
        <h2>Gerenciar Targets e TODOs</h2>

        {/* Div de gerenciamento de Target */}
        <div className="target-actions">
          <h3>Target</h3>
          <FormTarget onSubmit={fetchTargets} /> {/* Atualiza a lista após criar um target */}
          <button onClick={() => console.log('Criar Target')}>Criar Target</button>
          <button onClick={() => console.log('Editar Target')}>Editar Target</button>
          <button onClick={() => console.log('Deletar Target')}>Deletar Target</button>
        </div>

        {/* Div de gerenciamento de TODO */}
        {selectedTargetId && (
          <div className="todo-actions">
            <h3>TODO</h3>
            <FormTodo 
              targetId={selectedTargetId} 
              onSubmit={handleCreateTodo} // Passa a função para criar TODO
            />
            <input
              type="text"
              placeholder="Descrição do TODO"
              value={todoDescription}
              onChange={(e) => setTodoDescription(e.target.value)}
            />
            <button onClick={handleCreateTodo}>Criar TODO</button>
            <button onClick={() => console.log('Editar TODO')}>Editar TODO</button>
            <button onClick={() => console.log('Deletar TODO')}>Deletar TODO</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
