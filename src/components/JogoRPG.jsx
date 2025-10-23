import React, { useState } from 'react';

function JogoRPG({ setModoJogo }) {
  const [hpJogador, setHpJogador] = useState(100);
  const [hpInimigo, setHpInimigo] = useState(100);
  const [turno, setTurno] = useState('Jogador');
  const [mensagem, setMensagem] = useState('');
  const [levelJogador, setLevelJogador] = useState(1);
  const [habilidadeEspecialDisponivel, setHabilidadeEspecialDisponivel] = useState(true);

  // Função para aumentar o nível do jogador
  const aumentarNivel = () => {
    setLevelJogador(prev => prev + 1);
    setMensagem(`Você subiu para o nível ${levelJogador + 1}!`);
  };

  // Função de Ataque Normal
  const atacar = () => {
    const danoJogador = Math.floor(Math.random() * 20) + 10;
    setHpInimigo(prev => prev - danoJogador);
    setMensagem(`Você atacou o inimigo e causou ${danoJogador} de dano!`);

    if (hpInimigo - danoJogador <= 0) {
      setMensagem('Você derrotou o inimigo! Parabéns!');
      aumentarNivel();
      return;
    }

    setTurno('Inimigo');
    inimigoAtacar();
  };

  // Função de Cura
  const curar = () => {
    const curaJogador = Math.floor(Math.random() * 15) + 10;
    setHpJogador(prev => Math.min(100, prev + curaJogador));
    setMensagem(`Você se curou em ${curaJogador} pontos de vida.`);

    setTurno('Inimigo');
    inimigoAtacar();
  };

  // Função de Habilidade Especial
  const usarHabilidadeEspecial = () => {
    if (habilidadeEspecialDisponivel) {
      const danoEspecial = Math.floor(Math.random() * 40) + 20;
      setHpInimigo(prev => prev - danoEspecial);
      setMensagem(`Você usou a Habilidade Especial! Causou ${danoEspecial} de dano!`);

      setHabilidadeEspecialDisponivel(false); // Desabilita até o próximo nível
      setTurno('Inimigo');
      inimigoAtacar();
    } else {
      setMensagem('A habilidade especial ainda não está disponível!');
      setTurno('Inimigo');
      inimigoAtacar();
    }
  };

  // Função do Inimigo atacar
  const inimigoAtacar = () => {
    const danoInimigo = Math.floor(Math.random() * 15) + 5;
    setHpJogador(prev => prev - danoInimigo);
    setMensagem(`O inimigo te atacou e causou ${danoInimigo} de dano!`);

    if (hpJogador - danoInimigo <= 0) {
      setMensagem('O inimigo te derrotou. Você perdeu!');
      return;
    }

    setTurno('Jogador');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-teal-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-4">Jogo RPG</h1>
        <p className="text-xl text-center mb-4">Batalha contra o inimigo!</p>

        <div className="text-center mb-4">
          <p>HP Jogador: {hpJogador}</p>
          <p>HP Inimigo: {hpInimigo}</p>
          <p>Nível do Jogador: {levelJogador}</p>
        </div>

        <p className="text-xl text-center mb-4">{mensagem}</p>

        {turno === 'Jogador' ? (
          <div className="flex justify-center space-x-4">
            <button
              onClick={atacar}
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
            >
              Atacar
            </button>
            <button
              onClick={curar}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
            >
              Curar
            </button>
            <button
              onClick={usarHabilidadeEspecial}
              className={`bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600 transition ${habilidadeEspecialDisponivel ? '' : 'opacity-50 cursor-not-allowed'}`}
            >
              Habilidade Especial
            </button>
          </div>
        ) : (
          <p className="text-xl text-center mt-4">Aguarde o inimigo atacar...</p>
        )}

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

export default JogoRPG;
