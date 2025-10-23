import React from 'react';

function TelaInicial({ setModoJogo }) {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 to-pink-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-4">Escolha um Jogo</h1>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={() => setModoJogo('adivinhacao')}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
          >
            Jogo de Adivinhação
          </button>
          <button
            onClick={() => setModoJogo('rpg')}
            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
          >
            Jogo RPG
          </button>
        </div>
      </div>
    </div>
  );
}

export default TelaInicial;
