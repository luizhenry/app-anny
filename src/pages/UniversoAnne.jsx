import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, X } from 'lucide-react';

const messages = [
  { title: 'Você é luz', text: 'Mesmo nos dias difíceis, você ilumina tudo ao redor.' },
  { title: 'Respira', text: 'Tudo bem não estar bem. Eu estou aqui.' },
  { title: 'Força', text: 'Você já superou 100% dos seus piores dias.' },
  { title: 'Amor', text: 'Nada nesse mundo pode substituir o que você significa pra mim.' },
  { title: 'Brilho', text: 'As estrelas não competem umas com as outras. Nem você precisa.' },
  { title: 'Paz', text: 'O silêncio também é uma forma de cuidado.' },
  { title: 'Coragem', text: 'Ser vulnerável já é ser forte demais.' },
  { title: 'Leveza', text: 'Você não precisa carregar tudo sozinha.' },
  { title: 'Esperança', text: 'Amanhã é um novo começo. E eu vou estar lá.' },
  { title: 'Você importa', text: 'Seu sorriso faz o mundo ser um lugar melhor.' },
];

function StarField({ count = 80 }) {
  const [stars] = useState(() =>
    Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function UniversoAnne() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) navigate('/');
  }, [navigate]);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* Starfield */}
      <StarField count={100} />

      {/* Constellation hint */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.p
          className="font-display text-[80px] sm:text-[120px] lg:text-[160px] tracking-[0.3em] font-light select-none"
          style={{ color: 'rgba(255,255,255,0.025)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 1 }}
        >
          ANNE
        </motion.p>
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
          Universo Anne
        </h1>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          Toque nas estrelas
        </p>
      </motion.div>

      {/* Stars grid */}
      <div className="relative z-10 flex flex-wrap justify-center items-center gap-5 sm:gap-8 min-h-[100dvh] px-8 pt-24 pb-16">
        {messages.map((msg, i) => (
          <motion.button
            key={i}
            onClick={() => setSelected(msg)}
            className="group relative"
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{
              delay: 0.3 + i * 0.08,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-500"
              style={{
                background: 'radial-gradient(circle, rgba(244, 63, 94, 0.12) 0%, rgba(167, 139, 250, 0.06) 60%, transparent 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 0 40px rgba(244, 63, 94, 0.06)',
                transitionTimingFunction: 'var(--ease-spring)',
              }}
            >
              <Star className="w-5 h-5 text-rose-300/70 group-hover:text-rose-300 transition-colors duration-500" fill="currentColor" />
            </div>
            {/* Glow on hover */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(244, 63, 94, 0.15) 0%, transparent 70%)',
                transform: 'scale(2)',
              }}
            />
          </motion.button>
        ))}
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
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
              onClick={() => setSelected(null)}
            />

            {/* Card */}
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
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(167, 139, 250, 0.1))',
                    border: '1px solid rgba(244, 63, 94, 0.2)',
                  }}
                >
                  <Star className="w-5 h-5 text-rose-400" fill="currentColor" />
                </div>

                <h3 className="font-display text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>
                  {selected.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {selected.text}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
