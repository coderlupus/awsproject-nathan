import React, { useState } from 'react';

function JogoAdivinhacao({ setModoJogo }) {
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const [numero, setNumero] = useState(generateRandomNumber());
  const [tentativa, setTentativa] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tentativas, setTentativas] = useState(0);
  const [vitoria, setVitoria] = useState(false);

  const handleInputChange = (e) => {
    setTentativa(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (vitoria) return;

    const numeroTentado = parseInt(tentativa, 10);
    setTentativas((prev) => prev + 1);

    if (numeroTentado === numero) {
      setMensagem(`Parabéns! Você acertou em ${tentativas + 1} tentativas!`);
      setVitoria(true);
    } else if (numeroTentado < numero) {
      setMensagem('Tente um número maior!');
    } else {
      setMensagem('Tente um número menor!');
    }

    setTentativa('');
  };

  const handleReiniciar = () => {
    setNumero(generateRandomNumber());
    setTentativa('');
    setMensagem('');
    setTentativas(0);
    setVitoria(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">Jogo de Adivinhação</h1>
        <p className="text-xl text-center mb-4">Tente adivinhar o número entre 1 e 100!</p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="number"
            value={tentativa}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md mb-4 w-24 text-center"
            placeholder="Sua tentativa"
            min="1"
            max="100"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg mb-4 hover:bg-blue-600 transition"
          >
            Enviar Tentativa
          </button>
        </form>

        {mensagem && (
          <p className="text-xl text-center mb-4">{mensagem}</p>
        )}

        {vitoria && (
          <button
            onClick={handleReiniciar}
            className="bg-green-500 text-white py-2 px-6 rounded-lg w-full hover:bg-green-600 transition"
          >
            Jogar Novamente
          </button>
        )}

        <p className="text-center text-gray-500 mt-4">
          Tentativas: {tentativas}
        </p>
        <button
          onClick={() => setModoJogo(null)}
          className="bg-gray-500 text-white py-2 px-6 rounded-lg mt-4 hover:bg-gray-600 transition"
        >
          Voltar à Tela Inicial
        </button>
      </div>
    </div>
  );
}

export default JogoAdivinhacao;
