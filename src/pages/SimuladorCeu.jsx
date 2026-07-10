import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sun, Sunset, Moon, CloudSun } from 'lucide-react';

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h >= 5 && h < 8) return 'amanhecer';
  if (h >= 8 && h < 17) return 'manha';
  if (h >= 17 && h < 20) return 'entardecer';
  return 'noite';
}

const skies = {
  amanhecer: {
    icon: CloudSun,
    gradient: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 30%, #e94560 70%, #ff6b6b 100%)',
    message: 'Um novo dia começa. Você pode recomeçar também.',
    label: 'Amanhecer',
    starOpacity: 0.1,
  },
  manha: {
    icon: Sun,
    gradient: 'linear-gradient(180deg, #4a90d9 0%, #7ec8e3 40%, #f0e68c 100%)',
    message: 'O sol está forte. Assim como você.',
    label: 'Manhã',
    starOpacity: 0,
  },
  entardecer: {
    icon: Sunset,
    gradient: 'linear-gradient(180deg, #2d1b69 0%, #6b21a8 30%, #f97316 70%, #fbbf24 100%)',
    message: 'O dia está acabando. Mas você fez de conta.',
    label: 'Entardecer',
    starOpacity: 0.15,
  },
  noite: {
    icon: Moon,
    gradient: 'linear-gradient(180deg, #050510 0%, #0a0a2e 40%, #1a1a4e 70%, #050510 100%)',
    message: 'A noite é sua aliada. Descanse com ela.',
    label: 'Noite',
    starOpacity: 0.8,
  },
};

function NightStars({ opacity }) {
  const [stars] = useState(() =>
    Array.from({ length: 60 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 70,
      size: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 4,
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </div>
  );
}

export default function SimuladorCeu() {
  const navigate = useNavigate();
  const [time, setTime] = useState(getTimeOfDay());
  const sky = skies[time];

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) navigate('/');
  }, [navigate]);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* Animated sky background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={time}
          className="absolute inset-0"
          style={{ background: sky.gradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>

      {/* Stars (visible at night) */}
      <NightStars opacity={sky.starOpacity} />

      {/* Nav */}
      <motion.div
        className="absolute top-6 left-6 z-20"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          onClick={() => navigate('/home')}
          className="btn-ghost"
          style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
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
        <h1 className="font-display text-2xl sm:text-3xl" style={{ color: 'white', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
          Simulador do Céu
        </h1>
      </motion.div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={time}
            className="text-center"
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Icon */}
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {(() => {
                const Icon = sky.icon;
                return <Icon className="w-9 h-9 text-white/90" />;
              })()}
            </motion.div>

            <h2 className="font-display text-4xl sm:text-5xl mb-4" style={{ color: 'white', textShadow: '0 2px 16px rgba(0,0,0,0.3)' }}>
              {sky.label}
            </h2>
            <p className="text-base sm:text-lg max-w-xs mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {sky.message}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Time selector pills */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {Object.entries(skies).map(([key, s]) => {
          const Icon = s.icon;
          return (
            <button
              key={key}
              onClick={() => setTime(key)}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-500"
              style={{
                background: time === key ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(12px)',
                border: time === key ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.08)',
                transform: time === key ? 'scale(1.1)' : 'scale(1)',
                transitionTimingFunction: 'var(--ease-spring)',
              }}
            >
              <Icon className="w-5 h-5 text-white/80" />
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
