import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/App.tsx';
import '../src/index.css'; // Importando o CSS global

// Certifique-se de que o elemento com id 'root' existe no seu HTML
const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  console.error("O elemento com id 'root' não foi encontrado.");
}

