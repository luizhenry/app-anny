import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Flower2 } from 'lucide-react';

const stages = [
  { emoji: '🌱', label: 'Semente', min: 0 },
  { emoji: '🌿', label: 'Brotinho', min: 3 },
  { emoji: '🪴', label: 'Planta', min: 7 },
  { emoji: '🌷', label: 'Botão', min: 14 },
  { emoji: '🌹', label: 'Rosa', min: 25 },
  { emoji: '💐', label: 'Buquê', min: 40 },
  { emoji: '🌸', label: 'Flor Completa', min: 60 },
];

const messages = [
  'Continue cuidando do seu jardim. Cada visita é uma regada.',
  'Suas flores estão crescendo. Assim como você.',
  'Um jardim bonito leva tempo. Tenha paciência consigo.',
  'Cada flor que nasce é um lembrete: crescer leva tempo.',
  'Você é o jardineiro mais dedicado que conheço.',
  'Nem todas as flores precisam ser perfeitas pra serem lindas.',
];

export default function JardimVirtual() {
  const navigate = useNavigate();
  const [visitCount, setVisitCount] = useState(0);
  const [currentStage, setCurrentStage] = useState(stages[0]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
      return;
    }

    const key = `garden_${user}`;
    const stored = parseInt(localStorage.getItem(key) || '0', 10);
    const newCount = stored + 1;
    localStorage.setItem(key, String(newCount));
    setVisitCount(newCount);

    const stage = [...stages].reverse().find((s) => newCount >= s.min) || stages[0];
    setCurrentStage(stage);
  }, [navigate]);

  const msg = messages[visitCount % messages.length];

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* Garden gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #050510 0%, #0a1a0a 40%, #0d2818 70%, #051005 100%)',
        }}
      />

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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-5">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(34, 197, 94, 0.1))',
                border: '1px solid rgba(16, 185, 129, 0.2)',
              }}
            >
              <Flower2 className="w-4.5 h-4.5 text-emerald-400" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl" style={{ color: 'var(--text-primary)' }}>
              Jardim Virtual
            </h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Suas flores crescem a cada visita
          </p>
        </motion.div>

        {/* Flower display */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Glow ring */}
          <div
            className="absolute inset-0 -m-8 rounded-full animate-pulse-glow"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
            }}
          />

          <motion.div
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center relative"
            style={{
              background: 'rgba(16, 185, 129, 0.06)',
              border: '1px solid rgba(16, 185, 129, 0.15)',
            }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.span
              className="text-6xl sm:text-7xl"
              key={currentStage.emoji}
              initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            >
              {currentStage.emoji}
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Stage info */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-display text-2xl mb-1" style={{ color: 'var(--text-primary)' }}>
            {currentStage.label}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {visitCount} {visitCount === 1 ? 'visita' : 'visitas'}
          </p>
        </motion.div>

        {/* Message card */}
        <motion.div
          className="w-full max-w-sm card-double-bezel"
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="card-inner text-center p-6">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {msg}
            </p>
          </div>
        </motion.div>

        {/* Progress dots */}
        <motion.div
          className="flex gap-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {stages.map((s, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-500"
              style={{
                background: visitCount >= s.min ? 'var(--accent-rose)' : 'rgba(255,255,255,0.1)',
                transform: visitCount >= s.min ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
