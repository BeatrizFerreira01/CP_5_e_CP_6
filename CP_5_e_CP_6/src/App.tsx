// src/App.tsx
import React, { useState } from 'react';
import TargetList from './components/TargetList';
import TodoList from './components/TodoList';
import FormTarget from './components/FormTarget';
import FormTodo from './components/FormTodo';
import Weather from './components/Weather';
import './index.css'; // Certifique-se de importar o CSS

const App: React.FC = () => {
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);

  const handleSelectTarget = (targetId: string) => {
    setSelectedTargetId(targetId);
  };

  return (
    <div className="container">
      {/* Seção de Clima */}
      <div className="weather-section">
        <div className="current-weather">
          <img src="/src/assets/react.svg" className="weather-icon" alt="React icon" /><br></br>
          <h5 className="description">CP 5 e 6 de Consumo de API TODO/TARGETS com design de Weather!<br>
          </br>
          <br></br>Por: Beatriz Ferreira Cruz - RM555698</h5>
        </div>

        {/* Previsão Horária */}
        <div className="hourly-weather">
          <ul className="weather-list"></ul>
        </div>
      </div>

      {/* Integração com os Componentes TODO */}
      <h1>Insira uma Localização</h1>
      <Weather />
      <TargetList onSelect={handleSelectTarget} />
      {selectedTargetId && <TodoList targetId={selectedTargetId} />}
      <FormTarget onSubmit={() => console.log('Target created/updated')} />
      {selectedTargetId && <FormTodo targetId={selectedTargetId} onSubmit={() => console.log('TODO created/updated')} />}
    </div>
  );
};

export default App;
