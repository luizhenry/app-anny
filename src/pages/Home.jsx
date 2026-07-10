import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe, Heart, Flower2, Music, CloudSun, Gamepad2, Film, TreePine, LogOut
} from 'lucide-react';

const sections = [
  {
    id: 'universo',
    title: 'Universo Anne',
    desc: 'Mensagens entre estrelas',
    icon: Globe,
    path: '/universo',
    accent: 'from-violet-500/20 to-indigo-500/10',
    border: 'rgba(139, 92, 246, 0.2)',
    iconColor: 'text-violet-400',
  },
  {
    id: 'jardim',
    title: 'Jardim Virtual',
    desc: 'Flores que crescem',
    icon: Flower2,
    path: '/jardim',
    accent: 'from-emerald-500/20 to-teal-500/10',
    border: 'rgba(16, 185, 129, 0.2)',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'spotify',
    title: 'Spotify da Vida',
    desc: 'Cartas como músicas',
    icon: Music,
    path: '/spotify',
    accent: 'from-green-500/20 to-emerald-500/10',
    border: 'rgba(34, 197, 94, 0.2)',
    iconColor: 'text-green-400',
  },
  {
    id: 'triste',
    title: 'Quando Triste',
    desc: 'Mensagem para cada sentimento',
    icon: Heart,
    path: '/quando-triste',
    accent: 'from-rose-500/20 to-pink-500/10',
    border: 'rgba(244, 63, 94, 0.2)',
    iconColor: 'text-rose-400',
  },
  {
    id: 'ceu',
    title: 'Simulador do Céu',
    desc: 'O céu muda com você',
    icon: CloudSun,
    path: '/ceu',
    accent: 'from-amber-500/20 to-orange-500/10',
    border: 'rgba(245, 158, 11, 0.2)',
    iconColor: 'text-amber-400',
  },
  {
    id: 'borboleta',
    title: 'Jogo da Borboleta',
    desc: 'Explore as flores',
    icon: Gamepad2,
    path: '/borboleta',
    accent: 'from-fuchsia-500/20 to-purple-500/10',
    border: 'rgba(217, 70, 239, 0.2)',
    iconColor: 'text-fuchsia-400',
  },
  {
    id: 'netflix',
    title: 'Anneflix',
    desc: 'Cartas como séries',
    icon: Film,
    path: '/netflix',
    accent: 'from-red-500/20 to-rose-500/10',
    border: 'rgba(239, 68, 68, 0.2)',
    iconColor: 'text-red-400',
  },
  {
    id: 'cresce',
    title: 'Jardim Que Cresce',
    desc: 'Cresce com seus dias',
    icon: TreePine,
    path: '/cresce',
    accent: 'from-lime-500/20 to-green-500/10',
    border: 'rgba(132, 204, 22, 0.2)',
    iconColor: 'text-lime-400',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* Mesh gradient */}
      <div className="mesh-gradient-hero" />

      {/* Noise overlay is global via index.css */}

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-20">
        {/* Header */}
        <motion.div
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logout pill */}
          <motion.button
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
            className="btn-ghost mb-10"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <LogOut className="w-3.5 h-3.5" />
            Sair
          </motion.button>

          {/* Title */}
          <div className="flex items-end gap-4 mb-4">
            <h1
              className="font-display text-5xl sm:text-7xl lg:text-8xl leading-none tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Para Anny
            </h1>
            <motion.span
              className="text-3xl sm:text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
            >
              💕
            </motion.span>
          </div>

          <p
            className="text-base sm:text-lg max-w-md"
            style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}
          >
            Cada seção é um pedaço do meu coração.
            Escolha onde explorar.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {sections.map((s, i) => {
            const Icon = s.icon;
            const isLarge = i === 0 || i === 5;

            return (
              <motion.button
                key={s.id}
                onClick={() => navigate(s.path)}
                className={`card-double-bezel text-left group ${isLarge ? 'sm:col-span-2 lg:col-span-2' : ''}`}
                initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  delay: 0.15 + i * 0.08,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="card-inner relative overflow-hidden">
                  {/* Gradient bg */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                    style={{ ease: 'var(--ease-spring)' }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: `1px solid ${s.border}`,
                        transitionTimingFunction: 'var(--ease-spring)',
                      }}
                    >
                      <Icon className={`w-4.5 h-4.5 ${s.iconColor}`} />
                    </div>

                    {/* Text */}
                    <h3
                      className="font-semibold text-sm mb-1 tracking-tight"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {s.desc}
                    </p>

                    {/* Arrow */}
                    <motion.div
                      className="mt-5 flex items-center gap-1.5 text-xs font-medium"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-500"
                        style={{ transitionTimingFunction: 'var(--ease-spring)' }}
                      >
                        Explorar
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-500"
                        style={{ transitionTimingFunction: 'var(--ease-spring)' }}
                      >
                        →
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
        <motion.p
          className="text-center text-xs mt-16 sm:mt-24"
          style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Feito com amor por Luiz Henryque Alves Melo
        </motion.p>
      </div>
    </div>
  );
}
