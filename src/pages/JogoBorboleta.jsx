import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Flower2 } from 'lucide-react';

const flowers = [
  { id: 0, emoji: '🌹', x: 10, y: 30, message: 'Você é a rosa mais linda do jardim.' },
  { id: 1, emoji: '🌻', x: 75, y: 20, message: 'Sempre inclinada pra luz. Assim como você.' },
  { id: 2, emoji: '🌷', x: 40, y: 65, message: 'Delicada, mas com uma raiz forte.' },
  { id: 3, emoji: '🌸', x: 85, y: 60, message: 'Cada pétala é um sorriso seu.' },
  { id: 4, emoji: '🌺', x: 20, y: 75, message: 'Exótica. Diferente. Perfeita.' },
  { id: 5, emoji: '💐', x: 60, y: 45, message: 'Um bouquet de tudo que você é.' },
];

export default function JogoBorboleta() {
  const navigate = useNavigate();
  const [butterflyPos, setButterflyPos] = useState({ x: 50, y: 50 });
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [visited, setVisited] = useState(new Set());

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) navigate('/');
  }, [navigate]);

  const goToFlower = (flower) => {
    setButterflyPos({ x: flower.x, y: flower.y });
    setTimeout(() => {
      setSelectedFlower(flower);
      setVisited((prev) => new Set([...prev, flower.id]));
    }, 800);
  };

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* Meadow gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #050510 0%, #0a1a0a 40%, #0d2818 70%, #051005 100%)',
        }}
      />

      {/* Grass texture dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${50 + Math.random() * 50}%`,
              background: `rgba(${34 + Math.random() * 30}, ${180 + Math.random() * 50}, ${80 + Math.random() * 40}, ${0.1 + Math.random() * 0.15})`,
            }}
          />
        ))}
      </div>

      {/* Nav */}
      <motion.div
        className="absolute top-6 left-6 z-20"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <button onClick={() => navigate('/home')} className="btn-ghost">
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar
        </button>
      </motion.div>

      {/* Title */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="font-display text-2xl sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
          Jogo da Borboleta
        </h1>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          Toque nas flores
        </p>
      </motion.div>

      {/* Score */}
      <motion.div
        className="absolute top-6 right-6 z-20"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="px-3 py-1.5 rounded-full text-xs font-medium"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)',
          }}
        >
          {visited.size}/{flowers.length}
        </div>
      </motion.div>

      {/* Flowers */}
      <div className="relative z-10 w-full h-[100dvh]">
        {flowers.map((f, i) => (
          <motion.button
            key={f.id}
            onClick={() => goToFlower(f)}
            className="absolute group"
            style={{ left: `${f.x}%`, top: `${f.y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-3xl sm:text-4xl block transition-transform duration-500 group-hover:scale-110"
              style={{ filter: visited.has(f.id) ? 'saturate(0.5) brightness(0.7)' : 'none', transitionTimingFunction: 'var(--ease-spring)' }}
            >
              {f.emoji}
            </span>
            {visited.has(f.id) && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent-rose)', border: '2px solid var(--bg-deep)' }}
              >
                <span className="text-[8px] text-white">✓</span>
              </div>
            )}
          </motion.button>
        ))}

        {/* Butterfly */}
        <motion.div
          className="absolute z-30 pointer-events-none"
          animate={{ left: `${butterflyPos.x}%`, top: `${butterflyPos.y}%` }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <motion.span
            className="text-3xl sm:text-4xl block"
            animate={{ rotate: [0, 5, -5, 0], y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            🦋
          </motion.span>
        </motion.div>
      </div>

      {/* Message modal */}
      <AnimatePresence>
        {selectedFlower && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
              onClick={() => setSelectedFlower(null)}
            />

            <motion.div
              className="relative w-full max-w-sm card-double-bezel"
              initial={{ opacity: 0, y: 24, scale: 0.95, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 16, scale: 0.97, filter: 'blur(4px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="card-inner p-8 text-center">
                <button
                  onClick={() => setSelectedFlower(null)}
                  className="absolute top-4 right-4 p-2 rounded-full transition-colors duration-300"
                  style={{ color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)' }}
                >
                  <X className="w-4 h-4" />
                </button>

                <span className="text-5xl block mb-6">{selectedFlower.emoji}</span>

                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {selectedFlower.message}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
