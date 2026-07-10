import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TreePine, Calendar, TrendingUp } from 'lucide-react';

const stages = [
  { emoji: '🌱', label: 'Semente', min: 0, color: '#84cc16' },
  { emoji: '🌿', label: 'Brotinho', min: 1, color: '#22c55e' },
  { emoji: '🪴', label: 'Planta', min: 3, color: '#10b981' },
  { emoji: '🌳', label: 'Árvore', min: 5, color: '#059669' },
  { emoji: '🌷', label: 'Botão', min: 7, color: '#ec4899' },
  { emoji: '🌹', label: 'Rosa', min: 10, color: '#f43f5e' },
  { emoji: '🌸', label: 'Flor Completa', min: 14, color: '#fb7185' },
];

function getConsecutiveDays(key) {
  const data = JSON.parse(localStorage.getItem(key) || '[]');
  if (data.length === 0) return { days: 0, dates: [] };

  const today = new Date().toISOString().split('T')[0];
  const dates = [...new Set(data)].sort().reverse();

  if (dates[0] !== today) return { days: 0, dates };

  let count = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diff = (prev - curr) / (1000 * 60 * 60 * 24);
    if (diff === 1) count++;
    else break;
  }

  return { days: count, dates };
}

export default function JardimQueCresce() {
  const navigate = useNavigate();
  const [streak, setStreak] = useState(0);
  const [currentStage, setCurrentStage] = useState(stages[0]);
  const [totalVisits, setTotalVisits] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
      return;
    }

    const key = `garden_days_${user}`;
    const today = new Date().toISOString().split('T')[0];
    const data = JSON.parse(localStorage.getItem(key) || '[]');

    if (!data.includes(today)) {
      data.push(today);
      localStorage.setItem(key, JSON.stringify(data));
    }

    setTotalVisits(data.length);

    const { days } = getConsecutiveDays(key);
    setStreak(days);

    const stage = [...stages].reverse().find((s) => days >= s.min) || stages[0];
    setCurrentStage(stage);
  }, [navigate]);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
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
                background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.15), rgba(34, 197, 94, 0.1))',
                border: '1px solid rgba(132, 204, 22, 0.2)',
              }}
            >
              <TreePine className="w-4.5 h-4.5 text-lime-400" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl" style={{ color: 'var(--text-primary)' }}>
              Jardim Que Cresce
            </h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Cresce com seus dias consecutivos
          </p>
        </motion.div>

        {/* Flower display */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute inset-0 -m-12 rounded-full animate-pulse-glow"
            style={{
              background: `radial-gradient(circle, ${currentStage.color}18 0%, transparent 70%)`,
            }}
          />

          <motion.div
            className="w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center relative"
            style={{
              background: `${currentStage.color}08`,
              border: `1px solid ${currentStage.color}25`,
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

        {/* Stats */}
        <motion.div
          className="flex gap-6 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5" style={{ color: currentStage.color }} />
              <p className="font-display text-3xl" style={{ color: 'var(--text-primary)' }}>
                {streak}
              </p>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              dias seguidos
            </p>
          </div>
          <div className="w-px" style={{ background: 'var(--border-subtle)' }} />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
              <p className="font-display text-3xl" style={{ color: 'var(--text-primary)' }}>
                {totalVisits}
              </p>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              total de dias
            </p>
          </div>
        </motion.div>

        {/* Stage label */}
        <motion.p
          className="font-display text-xl mb-8"
          style={{ color: currentStage.color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {currentStage.label}
        </motion.p>

        {/* Growth stages */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {stages.map((s, i) => (
            <div
              key={i}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base transition-all duration-500"
              style={{
                background: streak >= s.min ? `${s.color}15` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${streak >= s.min ? `${s.color}30` : 'rgba(255,255,255,0.04)'}`,
                transform: streak >= s.min ? 'scale(1)' : 'scale(0.85)',
                opacity: streak >= s.min ? 1 : 0.4,
              }}
            >
              {s.emoji}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
