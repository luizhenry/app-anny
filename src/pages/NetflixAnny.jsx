import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Play, Film } from 'lucide-react';

const categories = [
  {
    title: 'Cartas de Força',
    color: 'from-red-500/15 to-rose-500/5',
    border: 'rgba(239, 68, 68, 0.15)',
    items: [
      { id: 1, title: 'Carta 1', preview: 'Você é mais forte do que imagina.', full: 'Nos dias em que tudo parece pesado, lembre: você já carregou montanhas inteiras nos ombros e nem percebeu. Sua força está no silêncio da persistência.' },
      { id: 2, title: 'Carta 2', preview: 'Não pare agora.', full: 'Onde você está hoje é resultado de tudo que você não desistiu ontem. Continue. O futuro que você sonha está mais perto do que parece.' },
      { id: 3, title: 'Carta 3', preview: 'Respire.', full: 'Às vezes a resposta é apenas: respire fundo, olhe pra cima, e lembre que tempos difíceis também passam. Você não está presa — está crescendo.' },
    ],
  },
  {
    title: 'Cartas de Amor',
    color: 'from-rose-500/15 to-pink-500/5',
    border: 'rgba(244, 63, 94, 0.15)',
    items: [
      { id: 4, title: 'Carta 4', preview: 'Eu penso em você.', full: 'Mesmo quando não estou dizendo, eu estou pensando. Em como você sorri, em como você luta, em como você faz tudo ao redor ser mais bonito apenas por estar aqui.' },
      { id: 5, title: 'Carta 5', preview: 'Você é meu lar.', full: 'Não preciso de um lugar pra chamar de lar quando você está perto. Seu abraço é o endereço mais seguro que já conheci.' },
      { id: 6, title: 'Carta 6', preview: 'Pra sempre.', full: 'Não é só pra hoje, nem pra amanhã. É pra sempre. Nos bons momentos, nos difíceis, no silêncio e no caos. Eu escolho você, sempre.' },
    ],
  },
  {
    title: 'Cartas de Esperança',
    color: 'from-violet-500/15 to-purple-500/5',
    border: 'rgba(139, 92, 246, 0.15)',
    items: [
      { id: 7, title: 'Carta 7', preview: 'Amanhã será melhor.', full: 'Hoje pode ter sido difícil, mas o amanhã é uma página em branco. E você tem todas as cores pra pintar do jeito que quiser.' },
      { id: 8, title: 'Carta 8', preview: 'Você não está sozinha.', full: 'Mesmo quando parece que o mundo inteiro te esqueceu, tem alguém aqui que nunca vai parar de se importar. Esse alguém sou eu.' },
      { id: 9, title: 'Carta 9', preview: 'A luz sempre volta.', full: 'Mesmo nas noites mais escuras, o sol volta. E quando ele voltar, você vai ver que tudo que passou te preparou pra brilhar ainda mais.' },
    ],
  },
];

export default function NetflixAnny() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) navigate('/');
  }, [navigate]);

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

      <div className="relative z-10 max-w-4xl mx-auto px-5 py-24 sm:py-32">
        {/* Title */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(244, 63, 94, 0.1))',
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }}
            >
              <Film className="w-4.5 h-4.5 text-red-400" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl" style={{ color: 'var(--text-primary)' }}>
              Anneflix
            </h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Cartas como séries
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-14">
          {categories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.3 + ci * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-sm font-semibold tracking-wide uppercase mb-5" style={{ color: 'var(--text-secondary)' }}>
                {cat.title}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {cat.items.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setSelected(item)}
                    className="text-left group card-double-bezel"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="card-inner relative overflow-hidden">
                      {/* Gradient bg on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                        style={{ transitionTimingFunction: 'var(--ease-spring)' }}
                      />

                      <div className="relative z-10">
                        {/* Play icon */}
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500"
                          style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            transitionTimingFunction: 'var(--ease-spring)',
                          }}
                        >
                          <Play className="w-3 h-3 text-white ml-0.5" fill="currentColor" />
                        </div>

                        <h3 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>
                          {item.title}
                        </h3>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                          {item.preview}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Letter modal */}
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
              style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(16px)' }}
              onClick={() => setSelected(null)}
            />

            <motion.div
              className="relative w-full max-w-md card-double-bezel"
              initial={{ opacity: 0, y: 32, scale: 0.95, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 16, scale: 0.97, filter: 'blur(4px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="card-inner p-8 sm:p-10">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 p-2 rounded-full transition-colors duration-300"
                  style={{ color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)' }}
                >
                  <X className="w-4 h-4" />
                </button>

                <h3 className="font-display text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>
                  {selected.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {selected.full}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
