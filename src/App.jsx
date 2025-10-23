import React, { useState } from 'react';
import TelaInicial from './components/TelaInicial';
import JogoAdivinhacao from './components/JogoAdivinhacao';
import JogoRPG from './components/JogoRPG';

// Função Principal
function App() {
  const [modoJogo, setModoJogo] = useState(null);

  return (
    <div>
      {modoJogo === null ? (
        <TelaInicial setModoJogo={setModoJogo} />
      ) : modoJogo === 'adivinhacao' ? (
        <JogoAdivinhacao setModoJogo={setModoJogo} />
      ) : (
        <JogoRPG setModoJogo={setModoJogo} />
      )}
    </div>
  );
}

export default App;
