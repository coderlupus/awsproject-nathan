import React, { useState, useEffect } from 'react';

// --- Funções Auxiliares de Lógica do Jogo ---

// Função para gerar um inimigo baseado no nível do jogador
function criarInimigo(levelJogador) {
  const hpBase = 50;
  const danoBase = 10;
  const escalaPorNivel = 1.5; // Fator de aumento de stats por nível

  return {
    nome: `Inimigo Nível ${levelJogador}`,
    maxHp: Math.floor(hpBase + hpBase * levelJogador * 0.5),
    hpAtual: Math.floor(hpBase + hpBase * levelJogador * 0.5),
    dano: Math.floor(danoBase * escalaPorNivel * levelJogador),
  };
}

// Stats iniciais do Jogador
const PLAYER_STATS_INICIAIS = {
  maxHp: 100,
  hpAtual: 100,
  danoBase: 15,
  curaBase: 20,
  level: 1,
  habilidadeEspecialDisponivel: true,
};

// --- Componente Principal JogoRPG ---

function JogoRPG({ setModoJogo }) {
  const [playerStats, setPlayerStats] = useState(PLAYER_STATS_INICIAIS);
  const [enemy, setEnemy] = useState(criarInimigo(1));
  const [turno, setTurno] = useState('Jogador');
  const [mensagem, setMensagem] = useState(`O ${enemy.nome} apareceu!`);
  const [gameStatus, setGameStatus] = useState('Batalha'); // Estados: 'Batalha', 'Vitoria', 'Derrota'

  // Documentação: Efeito para verificar o fim do jogo/batalha a cada mudança de HP
  useEffect(() => {
    if (gameStatus === 'Batalha') {
      if (playerStats.hpAtual <= 0) {
        setGameStatus('Derrota');
        setMensagem('O inimigo te derrotou. Fim de jogo!');
      } else if (enemy.hpAtual <= 0) {
        setGameStatus('Vitoria');
        setMensagem(`Você derrotou o ${enemy.nome}! Prepare-se para o próximo desafio.`);
      }
    }
  }, [playerStats.hpAtual, enemy.hpAtual, gameStatus]);

  // Documentação: Função de rolagem de dado para adicionar variabilidade
  const rolarDano = (base, variacao = 0.2) => {
    const minDano = base * (1 - variacao);
    const maxDano = base * (1 + variacao);
    return Math.floor(Math.random() * (maxDano - minDano + 1) + minDano);
  };

  // --- Funções de Ação do Jogador ---

  const atacar = () => {
    if (turno !== 'Jogador' || gameStatus !== 'Batalha') return;

    const danoReal = rolarDano(playerStats.danoBase * playerStats.level);
    const novoHpInimigo = Math.max(0, enemy.hpAtual - danoReal);

    setEnemy((prev) => ({ ...prev, hpAtual: novoHpInimigo }));
    setMensagem(`Você atacou e causou ${danoReal} de dano ao ${enemy.nome}!`);

    if (novoHpInimigo > 0) {
      setTurno('Inimigo');
      setTimeout(inimigoAtacar, 1000); // Dá um tempo para o feedback visual
    }
  };

  const curar = () => {
    if (turno !== 'Jogador' || gameStatus !== 'Batalha') return;

    const curaReal = rolarDano(playerStats.curaBase, 0.3);
    const novoHpJogador = Math.min(playerStats.maxHp, playerStats.hpAtual + curaReal);

    setPlayerStats((prev) => ({ ...prev, hpAtual: novoHpJogador }));
    setMensagem(`Você se curou em ${curaReal} pontos de vida.`);

    setTurno('Inimigo');
    setTimeout(inimigoAtacar, 1000);
  };

  const usarHabilidadeEspecial = () => {
    if (turno !== 'Jogador' || gameStatus !== 'Batalha' || !playerStats.habilidadeEspecialDisponivel) return;

    const danoEspecial = rolarDano(playerStats.danoBase * playerStats.level * 2, 0.1); // Dano dobrado
    const novoHpInimigo = Math.max(0, enemy.hpAtual - danoEspecial);

    setEnemy((prev) => ({ ...prev, hpAtual: novoHpInimigo }));
    setPlayerStats((prev) => ({ ...prev, habilidadeEspecialDisponivel: false }));
    setMensagem(`Você usou a Habilidade Especial! Causou ${danoEspecial} de dano!`);

    if (novoHpInimigo > 0) {
      setTurno('Inimigo');
      setTimeout(inimigoAtacar, 1000);
    }
  };

  // --- Função de Ação do Inimigo ---

  const inimigoAtacar = () => {
    if (gameStatus !== 'Batalha') return;

    const danoInimigo = rolarDano(enemy.dano, 0.2);
    const novoHpJogador = Math.max(0, playerStats.hpAtual - danoInimigo);

    setPlayerStats((prev) => ({ ...prev, hpAtual: novoHpJogador }));
    setMensagem(`O ${enemy.nome} te atacou e causou ${danoInimigo} de dano!`);

    if (novoHpJogador > 0) {
      setTurno('Jogador');
    }
    // O useEffect cuidará do estado de derrota se hpAtual <= 0
  };

  // --- Funções de Gerenciamento do Jogo ---

  // Documentação: Reinicia o jogo por completo (Level 1, novo inimigo, HP total)
  const handleReiniciarJogo = () => {
    const novoInimigo = criarInimigo(1);
    setPlayerStats(PLAYER_STATS_INICIAIS);
    setEnemy(novoInimigo);
    setMensagem(`O ${novoInimigo.nome} apareceu!`);
    setTurno('Jogador');
    setGameStatus('Batalha');
  };

  // Documentação: Avança para a próxima batalha (Aumenta o nível, HP e Special)
  const handleProximaBatalha = () => {
    const proximoLevel = playerStats.level + 1;
    const novoMaxHp = playerStats.maxHp + 20; // Aumento de HP no nível
    
    // Curar o jogador, aumentar o nível e recarregar a habilidade
    setPlayerStats((prev) => ({
      ...prev,
      level: proximoLevel,
      maxHp: novoMaxHp,
      hpAtual: novoMaxHp, // Enche o HP
      habilidadeEspecialDisponivel: true, // Recarrega a habilidade
    }));

    const novoInimigo = criarInimigo(proximoLevel);
    setEnemy(novoInimigo);
    setMensagem(`Você subiu para o Nível ${proximoLevel}! Próxima batalha contra: ${novoInimigo.nome}`);
    setTurno('Jogador');
    setGameStatus('Batalha');
  };

  // --- Renderização da Interface (JSX) ---

  // Documentação: Componente de Barra de HP (usado para Jogador e Inimigo)
  const HealthBar = ({ current, max, color }) => {
    const percent = (current / max) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div
          className={`h-4 rounded-full transition-all duration-500`}
          style={{ width: `${percent}%`, backgroundColor: color }}
        ></div>
        <p className="text-sm text-gray-700 text-center">{current}/{max} HP</p>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-teal-600 p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-xl">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-6">Aventura RPG</h1>
        <p className="text-xl text-center mb-6 font-semibold">{mensagem}</p>

        {/* Informações do Jogador */}
        <div className="mb-6 border p-4 rounded-lg bg-gray-50">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Seu Herói (Nível {playerStats.level})</h2>
          <HealthBar current={playerStats.hpAtual} max={playerStats.maxHp} color="#3b82f6" />
        </div>

        {/* Informações do Inimigo */}
        <div className="mb-8 border p-4 rounded-lg bg-red-50">
          <h2 className="text-2xl font-bold text-red-600 mb-2">{enemy.nome}</h2>
          <HealthBar current={enemy.hpAtual} max={enemy.maxHp} color="#ef4444" />
        </div>

        {/* Área de Ações do Jogador */}
        {gameStatus === 'Batalha' && turno === 'Jogador' && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={atacar}
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
            >
              Atacar
            </button>
            <button
              onClick={curar}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
              Curar
            </button>
            <button
              onClick={usarHabilidadeEspecial}
              className={`bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600 transition ${playerStats.habilidadeEspecialDisponivel ? '' : 'opacity-50 cursor-not-allowed'}`}
              disabled={!playerStats.habilidadeEspecialDisponivel}
            >
              Habilidade Especial
            </button>
          </div>
        )}

        {/* Área de Mensagens de Espera */}
        {gameStatus === 'Batalha' && turno === 'Inimigo' && (
          <p className="text-xl text-center mt-4 text-gray-600">Aguarde o {enemy.nome} atacar...</p>
        )}

        {/* Área de Vitória */}
        {gameStatus === 'Vitoria' && (
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handleProximaBatalha}
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
            >
              Próxima Batalha (Nível {playerStats.level + 1})
            </button>
          </div>
        )}

        {/* Área de Derrota */}
        {gameStatus === 'Derrota' && (
          <div className="flex flex-col items-center space-y-4 mt-6">
            <button
              onClick={handleReiniciarJogo}
              className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition"
            >
              Reiniciar Jogo (Level 1)
            </button>
          </div>
        )}

        {/* Botão de Voltar ao Menu Principal */}
        <button
          onClick={() => setModoJogo(null)}
          className="bg-gray-500 text-white py-2 px-6 rounded-lg mt-8 w-full hover:bg-gray-600 transition"
        >
          Voltar à Tela Inicial
        </button>
      </div>
    </div>
  );
}

export default JogoRPG;