import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Heart, Zap, Moon, UserX } from 'lucide-react';

const emotions = [
  {
    id: 'cansada',
    label: 'Estou cansada',
    icon: Moon,
    accent: 'from-amber-500/20 to-orange-500/10',
    border: 'rgba(245, 158, 11, 0.2)',
    iconColor: 'text-amber-400',
    messages: [
      'Descanse. O mundo pode esperar.',
      'Você merece um momento só pra você.',
      'Não é fraqueza parar. É sabedoria.',
      'Fechar os olhos por um tempo é um ato de amor próprio.',
    ],
  },
  {
    id: 'triste',
    label: 'Estou triste',
    icon: Heart,
    accent: 'from-blue-500/20 to-indigo-500/10',
    border: 'rgba(59, 130, 246, 0.2)',
    iconColor: 'text-blue-400',
    messages: [
      'Tudo bem sentir. Eu estou aqui.',
      'Sua tristeza é válida. Não tenha vergonha dela.',
      'Chorar também é corajoso.',
      'Você não está sozinha nessa.',
    ],
  },
  {
    id: 'raiva',
    label: 'Estou com raiva',
    icon: Zap,
    accent: 'from-red-500/20 to-rose-500/10',
    border: 'rgba(239, 68, 68, 0.2)',
    iconColor: 'text-red-400',
    messages: [
      'Sua raiva é válida. Ela diz o que importa pra você.',
      'Respire. Você é mais forte que qualquer situação.',
      'Não guarde isso. Deixe sair.',
      'Você tem todo o direito de se sentir assim.',
    ],
  },
  {
    id: 'ninguem',
    label: 'Ninguém liga',
    icon: UserX,
    accent: 'from-violet-500/20 to-purple-500/10',
    border: 'rgba(139, 92, 246, 0.2)',
    iconColor: 'text-violet-400',
    messages: [
      'Eu ligo. Sempre liguei.',
      'Você importa mais do que imagina.',
      'O mundo é melhor com você nele.',
      'Às vezes sentimos isso, mas não é verdade.',
    ],
  },
];

export default function QuandoTriste() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [currentMsg, setCurrentMsg] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (!selected) return;
    setCurrentMsg(0);
    const interval = setInterval(() => {
      setCurrentMsg((p) => (p + 1) % selected.messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [selected]);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <div className="mesh-gradient-hero" />

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
          Quando Triste
        </h1>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          Como você se sente?
        </p>
      </motion.div>

      {/* Emotion cards */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-5 pt-24 pb-16 gap-4 sm:gap-5 max-w-md mx-auto">
        {emotions.map((e, i) => {
          const Icon = e.icon;
          return (
            <motion.button
              key={e.id}
              onClick={() => setSelected(e)}
              className="w-full card-double-bezel text-left group"
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="card-inner flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${e.border}`,
                    transitionTimingFunction: 'var(--ease-spring)',
                  }}
                >
                  <Icon className={`w-4.5 h-4.5 ${e.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {e.label}
                  </h3>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Message modal */}
      <AnimatePresence>
        {selected && (
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
              onClick={() => setSelected(null)}
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
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 p-2 rounded-full transition-colors duration-300"
                  style={{ color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)' }}
                >
                  <X className="w-4 h-4" />
                </button>

                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 bg-gradient-to-br ${selected.accent}`}
                  style={{ border: `1px solid ${selected.border}` }}
                >
                  {(() => {
                    const Icon = selected.icon;
                    return <Icon className={`w-6 h-6 ${selected.iconColor}`} />;
                  })()}
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentMsg}
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {selected.messages[currentMsg]}
                  </motion.p>
                </AnimatePresence>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {selected.messages.map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                      style={{
                        background: i === currentMsg ? 'var(--accent-rose)' : 'rgba(255,255,255,0.15)',
                        transform: i === currentMsg ? 'scale(1.3)' : 'scale(1)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
