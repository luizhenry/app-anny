import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PERIODOS = {
  manha: {
    label: 'Manhã',
    horaInicio: 5,
    horaFim: 11,
    gradiente: 'linear-gradient(180deg, #FF6B35 0%, #F7931E 25%, #FFD662 50%, #87CEEB 80%, #E0F0FF 100%)',
    mensagem: 'Um novo dia começa. Você pode recomeçar a qualquer momento.',
    sol: true,
    estrelas: false,
    nuvens: true,
    passaros: true,
    corSol: '#FFD662',
  },
  tarde: {
    label: 'Tarde',
    horaInicio: 12,
    horaFim: 17,
    gradiente: 'linear-gradient(180deg, #1E90FF 0%, #4DA6FF 30%, #87CEEB 60%, #B0E0FF 100%)',
    mensagem: 'Respira fundo. Você tá indo bem, mesmo que não pareça.',
    sol: true,
    estrelas: false,
    nuvens: true,
    passaros: false,
    corSol: '#FFD700',
  },
  entreter: {
    label: 'Entertér',
    horaInicio: 18,
    horaFim: 20,
    gradiente: 'linear-gradient(180deg, #FF4500 0%, #FF6347 20%, #FF7F50 40%, #DB7093 60%, #9370DB 80%, #6A5ACD 100%)',
    mensagem: 'O sol se põe, mas sempre volta. Assim como os seus melhores dias.',
    sol: true,
    estrelas: false,
    nuvens: true,
    passaros: false,
    corSol: '#FF6347',
  },
  noite: {
    label: 'Noite',
    horaInicio: 21,
    horaFim: 4,
    gradiente: 'linear-gradient(180deg, #0B0B3B 0%, #191970 30%, #2C1654 50%, #1A0A3E 70%, #0D0D2B 100%)',
    mensagem: 'Mesmo na escuridão, tem estrelas. E você é uma delas.',
    sol: false,
    estrelas: true,
    nuvens: false,
    passaros: false,
    corLuar: '#F5F5DC',
  },
};

function obterPeriodo(hora) {
  if (hora >= 5 && hora <= 11) return 'manha';
  if (hora >= 12 && hora <= 17) return 'tarde';
  if (hora >= 18 && hora <= 20) return 'entreter';
  return 'noite';
}

function Sol({ cor }) {
  return (
    <motion.div
      className="absolute"
      style={{ top: '15%', left: '50%', transform: 'translateX(-50%)' }}
      animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div
        className="w-24 h-24 md:w-32 md:h-32 rounded-full"
        style={{
          background: `radial-gradient(circle, ${cor} 0%, ${cor}CC 40%, ${cor}66 70%, transparent 100%)`,
          boxShadow: `0 0 60px ${cor}AA, 0 0 120px ${cor}44`,
        }}
      />
    </motion.div>
  );
}

function Lua() {
  return (
    <motion.div
      className="absolute"
      style={{ top: '12%', right: '20%' }}
      animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="relative">
        <div
          className="w-20 h-20 md:w-24 md:h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #F5F5DC 0%, #E8E8C8 50%, #D4D4A8 100%)',
            boxShadow: '0 0 40px #F5F5DC88, 0 0 80px #F5F5DC44',
          }}
        />
        <div
          className="absolute w-6 h-6 rounded-full"
          style={{ top: '25%', left: '20%', background: '#D4D4A888' }}
        />
        <div
          className="absolute w-4 h-4 rounded-full"
          style={{ top: '50%', left: '55%', background: '#D4D4A866' }}
        />
        <div
          className="absolute w-3 h-3 rounded-full"
          style={{ top: '35%', left: '60%', background: '#D4D4A844' }}
        />
      </div>
    </motion.div>
  );
}

function Estrela({ top, left, delay, tamanho }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{ top, left, width: tamanho, height: tamanho }}
      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

function Estrelas() {
  const estrelas = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 50; i++) {
      arr.push({
        id: i,
        top: `${Math.random() * 70}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 3,
        tamanho: `${2 + Math.random() * 3}px`,
      });
    }
    return arr;
  }, []);

  return (
    <>
      {estrelas.map((e) => (
        <Estrela key={e.id} {...e} />
      ))}
    </>
  );
}

function Nuvem({ top, left, delay, scale = 1 }) {
  return (
    <motion.div
      className="absolute"
      style={{ top, left, transform: `scale(${scale})` }}
      animate={{ x: [-20, 20, -20] }}
      transition={{ duration: 12 + Math.random() * 8, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <div className="relative">
        <div className="w-20 h-8 bg-white/80 rounded-full" />
        <div className="absolute -top-3 left-4 w-12 h-10 bg-white/80 rounded-full" />
        <div className="absolute -top-1 left-10 w-10 h-8 bg-white/70 rounded-full" />
      </div>
    </motion.div>
  );
}

function Passaro({ top, left, delay }) {
  return (
    <motion.div
      className="absolute text-lg"
      style={{ top, left }}
      animate={{ x: [0, 80, 160], y: [0, -20, 0] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <motion.span
        animate={{ scaleY: [1, 0.5, 1] }}
        transition={{ duration: 0.4, repeat: Infinity }}
      >
        ✦
      </motion.span>
    </motion.div>
  );
}

export default function SimuladorCeu() {
  const navigate = useNavigate();
  const [periodoManual, setPeriodoManual] = useState(null);
  const [mostrarMensagemFinal, setMostrarMensagemFinal] = useState(false);
  const [horaAtual, setHoraAtual] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => setHoraAtual(new Date().getHours()), 60000);
    return () => clearInterval(interval);
  }, []);

  const periodoChave = periodoManual || obterPeriodo(horaAtual);
  const periodo = PERIODOS[periodoChave];

  useEffect(() => {
    setMostrarMensagemFinal(false);
    const timer = setTimeout(() => setMostrarMensagemFinal(true), 4000);
    return () => clearTimeout(timer);
  }, [periodoChave]);

  const mudarPeriodo = useCallback((chave) => {
    setPeriodoManual(chave);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden flex flex-col"
      style={{ background: periodo.gradiente }}
      animate={{ background: periodo.gradiente }}
      transition={{ duration: 2 }}
    >
      {periodo.estrelas && <Estrelas />}

      {periodo.sol && <Sol cor={periodo.corSol} />}
      {!periodo.sol && <Lua />}

      {periodo.nuvens && (
        <>
          <Nuvem top="20%" left="10%" delay={0} scale={0.8} />
          <Nuvem top="30%" left="60%" delay={2} scale={1} />
          <Nuvem top="25%" left="35%" delay={4} scale={0.6} />
          <Nuvem top="40%" left="80%" delay={1} scale={0.9} />
        </>
      )}

      {periodo.passaros && (
        <>
          <Passaro top="18%" left="15%" delay={0} />
          <Passaro top="22%" left="25%" delay={1.5} />
          <Passaro top="15%" left="40%" delay={3} />
        </>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6">
        <motion.button
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
          onClick={() => navigate('/home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Voltar
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
            Simulador de Céu
          </h1>
          <p className="text-white/70 text-sm">Toque nos botões para mudar o céu</p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={periodoChave}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="bg-black/30 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-lg w-full text-center border border-white/10"
          >
            <motion.p
              className="text-white/50 text-xs uppercase tracking-widest mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {periodo.label}
            </motion.p>

            <motion.p
              className="text-white text-lg md:text-xl font-light leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {periodo.mensagem}
            </motion.p>

            <AnimatePresence>
              {mostrarMensagemFinal && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mt-6 text-white/60 text-sm italic border-t border-white/10 pt-4"
                >
                  Assim como o céu muda, os dias ruins também passam.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 pb-8 px-4">
        <div className="flex justify-center gap-2 flex-wrap">
          {Object.entries(PERIODOS).map(([chave, p]) => (
            <motion.button
              key={chave}
              onClick={() => mudarPeriodo(chave)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                periodoChave === chave
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'bg-white/15 text-white/80 hover:bg-white/25'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {chave === 'manha' && '🌅'}
              {chave === 'tarde' && '☀️'}
              {chave === 'entreter' && '🌇'}
              {chave === 'noite' && '🌙'}
              {' '}{p.label}
            </motion.button>
          ))}
        </div>
        {!periodoManual && (
          <motion.p
            className="text-white/40 text-xs text-center mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Mostrando céu atual ({horaAtual}h)
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
