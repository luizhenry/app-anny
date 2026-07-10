import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FLORES = [
  { id: 0, emoji: '🌸', x: '10%', y: '25%', mensagem: 'Você é delicada como uma pétala, mas mais forte que qualquer tempestade.' },
  { id: 1, emoji: '🌹', x: '75%', y: '18%', mensagem: 'Cada espinho que você enfrentou te fez mais linda por dentro.' },
  { id: 2, emoji: '🌷', x: '20%', y: '65%', mensagem: 'Mesmo quando o mundo tenta te derrubar, você sempre se levanta.' },
  { id: 3, emoji: '🌻', x: '80%', y: '60%', mensagem: 'Você sempre encontra a luz, mesmo nos lugares mais escuros.' },
  { id: 4, emoji: '🌺', x: '50%', y: '15%', mensagem: 'Sua cor é única. Ninguém no mundo é como você.' },
  { id: 5, emoji: '🌼', x: '60%', y: '75%', mensagem: 'Você traz alegria onde quer que vá. Mesmo sem perceber.' },
];

function Flor({ emoji, x, y, onClick, visitada, index }) {
  return (
    <motion.button
      className="absolute cursor-pointer select-none"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      onClick={onClick}
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.3, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative">
        <span className="text-4xl md:text-5xl block" role="img">{emoji}</span>
        {visitada && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center text-white text-xs font-bold"
          >
            ✓
          </motion.div>
        )}
      </div>
      <motion.div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-4 bg-green-600/40 rounded-full"
        animate={{ scaleY: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  );
}

function Borboleta({ x, y }) {
  return (
    <motion.div
      className="absolute z-20 select-none pointer-events-none"
      animate={{ left: x, top: y }}
      transition={{ type: 'spring', stiffness: 40, damping: 15, mass: 1.2 }}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <motion.span
        className="text-3xl md:text-4xl block"
        animate={{ rotate: [-5, 5, -5], y: [0, -4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🦋
      </motion.span>
    </motion.div>
  );
}

function Formiga({ x, y, delay }) {
  return (
    <motion.div
      className="absolute text-xs opacity-50"
      style={{ left: x, top: y }}
      animate={{ x: [0, 30, 0], y: [0, 10, 0] }}
      transition={{ duration: 8, repeat: Infinity, delay, ease: 'linear' }}
    >
      🐜
    </motion.div>
  );
}

export default function JogoBorboleta() {
  const navigate = useNavigate();
  const [floresVisitadas, setFloresVisitadas] = useState(new Set());
  const [posicaoBorboleta, setPosicaoBorboleta] = useState({ x: '50%', y: '50%' });
  const [mensagemAtual, setMensagemAtual] = useState(null);
  const [finalizou, setFinalizou] = useState(false);
  const [jogoIniciado, setJogoIniciado] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setJogoIniciado(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const todasVisitadas = floresVisitadas.size === FLORES.length;

  const clicarFlor = useCallback((flor) => {
    if (finalizou) return;
    setPosicaoBorboleta({ x: flor.x, y: flor.y });
    setMensagemAtual(flor.mensagem);
    setFloresVisitadas((prev) => {
      const novo = new Set(prev);
      novo.add(flor.id);
      return novo;
    });
  }, [finalizou]);

  useEffect(() => {
    if (todasVisitadas && !finalizou) {
      const timer = setTimeout(() => {
        setFinalizou(true);
        setMensagemAtual('Até as borboletas passam um tempo dentro do casulo. Mas sempre saem mais bonitas. 🦋');
        setPosicaoBorboleta({ x: '50%', y: '50%' });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [todasVisitadas, finalizou]);

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0FF 40%, #90EE90 70%, #228B22 100%)',
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-800/20"
            style={{
              width: `${60 + Math.random() * 100}px`,
              height: `${40 + Math.random() * 60}px`,
              bottom: `${Math.random() * 30}%`,
              left: `${Math.random() * 100}%`,
              borderRadius: '50% 50% 50% 50%',
            }}
          />
        ))}
      </div>

      <motion.button
        className="absolute top-6 left-6 z-30 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
        onClick={() => navigate('/home')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Voltar
      </motion.button>

      <motion.div
        className="absolute top-6 right-6 z-30 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        🌸 {floresVisitadas.size}/{FLORES.length} flores visitadas
      </motion.div>

      {!jogoIniciado && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/40"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          onAnimationComplete={() => {}}
        >
          <motion.div
            className="text-center text-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-6xl block mb-4">🦋</span>
            <p className="text-xl font-light">Toque nas flores para guiar a borboleta</p>
          </motion.div>
        </motion.div>
      )}

      <Formiga x="15%" y="85%" delay={0} />
      <Formiga x="70%" y="90%" delay={2} />
      <Formiga x="40%" y="88%" delay={4} />

      {FLORES.map((flor, i) => (
        <Flor
          key={flor.id}
          {...flor}
          index={i}
          visitada={floresVisitadas.has(flor.id)}
          onClick={() => clicarFlor(flor)}
        />
      ))}

      <Borboleta x={posicaoBorboleta.x} y={posicaoBorboleta.y} />

      <AnimatePresence>
        {finalizou && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, type: 'spring', stiffness: 100 }}
              className="text-center"
            >
              <motion.span
                className="text-8xl md:text-9xl block mb-4"
                animate={{ rotate: [0, 5, -5, 0], y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌸
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mensagemAtual && (
          <motion.div
            key={mensagemAtual}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-lg"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-2xl border border-white/50">
              <motion.p
                className="text-gray-800 text-base md:text-lg font-light leading-relaxed text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {mensagemAtual}
              </motion.p>
              {finalizou && (
                <motion.button
                  className="mt-4 mx-auto block bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={() => navigate('/home')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continuar ❤️
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
