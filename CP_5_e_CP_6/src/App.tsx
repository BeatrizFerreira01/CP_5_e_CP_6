
import TodoList from '../src/components/TodoList.tsx';
import FormTarget from '../src/components/FormTarget.tsx';
import FormTodo from '../src/components/FormTodo.tsx';
import Weather from '../src/components/Weather.tsx'; // Certifique-se de que isso está correto
import '../src/index.css'; // Certifique-se de importar o CSS


import { useState } from 'react';
import { getTargets } from './api.ts';

const App: React.FC = () => {
  const [selectedTargetId, setSelectedTargetId] = useState<number | null>(null);

  const handleSelectTarget = (id: number) => {
    setSelectedTargetId(id);
    
  };
  console.log("esse é o target:"+getTargets());
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

        {/* Previsão Horária */}
        <div className="hourly-weather">
          <ul className="weather-list"></ul>
        </div>
      </div>

      {/* Integração com os Componentes TODO */}
      <h1>Insira uma Localização</h1>
      <Weather /> {/* Mantém apenas a seção Weather que contém a caixa de localização */}
    

      {/* Seções para TODOs e Targets */}
      <div className="actions-section">
        <h2>Gerenciar Targets e TODOs</h2>

          <button onClick={() => handleSelectTarget(1)}>Criar Target</button>
          <button onClick={() => handleSelectTarget(2)}>Editar Target</button>
          <button onClick={() => handleSelectTarget(3)}>Deletar Target</button>
          <FormTarget onSubmit={() => console.log('Target created/updated')} />
        </div>

        {/* Div de gerenciamento de TODO */}
        {selectedTargetId && (
          <div className="todo-actions">
            <FormTodo targetId={selectedTargetId.toString()} onSubmit={() => console.log('TODO created/updated')} />
            <button onClick={() => console.log('Criar TODO')}>Criar TODO</button>
            <button onClick={() => console.log('Editar TODO')}>Editar TODO</button>
            <button onClick={() => console.log('Deletar TODO')}>Deletar TODO</button>
          </div>
        )}
      </div>

      {/* Lista de TODOs */}
      {selectedTargetId !== null && <TodoList targetId={selectedTargetId.toString()} />}
    </div>
  );
};

export default App;
