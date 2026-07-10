import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TypingGreeting = ({ text }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[3px] h-[1em] bg-purple-600 ml-1 align-middle"
      />
    </span>
  );
};

const FloatingParticle = ({ delay }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: Math.random() * 6 + 3,
      height: Math.random() * 6 + 3,
      left: `${Math.random() * 100}%`,
      background: `hsl(${Math.random() * 60 + 280}, 80%, 70%)`,
    }}
    initial={{ y: '105vh', opacity: 0 }}
    animate={{
      y: '-5vh',
      opacity: [0, 0.6, 0.6, 0],
    }}
    transition={{
      duration: 10 + Math.random() * 8,
      delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
);

const cards = [
  {
    emoji: '🌌',
    title: 'Universo da Anne',
    desc: 'Cada estrela é uma lembrança especial',
    path: '/universo',
    gradient: 'from-indigo-500 via-purple-600 to-blue-700',
  },
  {
    emoji: '🌸',
    title: 'Jardim Virtual',
    desc: 'Flores que nascem a cada visita',
    path: '/jardim',
    gradient: 'from-pink-400 via-rose-500 to-pink-600',
  },
  {
    emoji: '🎵',
    title: 'Spotify da Vida',
    desc: 'Cada música é uma carta',
    path: '/spotify',
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
  },
  {
    emoji: '😔',
    title: 'Quando Estiver Triste',
    desc: 'Botões para cada sentimento',
    path: '/triste',
    gradient: 'from-slate-400 via-blue-400 to-indigo-500',
  },
  {
    emoji: '🌙',
    title: 'Simulador de Céu',
    desc: 'O céu muda, e os dias também',
    path: '/ceu',
    gradient: 'from-indigo-800 via-purple-700 to-blue-900',
  },
  {
    emoji: '🦋',
    title: 'Jogo da Borboleta',
    desc: 'Uma jornada de flores e mensagens',
    path: '/borboleta',
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
  },
  {
    emoji: '🎬',
    title: 'Netflix da Anny',
    desc: 'Filmes que são cartas',
    path: '/netflix',
    gradient: 'from-red-600 via-red-700 to-black',
  },
  {
    emoji: '🌷',
    title: 'Jardim que Cresce',
    desc: 'Cresce junto com você',
    path: '/jardim-cresce',
    gradient: 'from-lime-400 via-green-500 to-emerald-600',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Anny');

  useEffect(() => {
    const saved = localStorage.getItem('anny_name');
    if (saved) {
      setUserName(saved.charAt(0).toUpperCase() + saved.slice(1).toLowerCase());
    }
  }, []);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: i * 0.8,
  }));

  return (
    <div className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 30%, #ede9fe 60%, #fae8ff 100%)',
      }}
    >
      {/* Background particles */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} delay={p.delay} />
      ))}

      <div className="relative z-10 px-4 py-8 max-w-4xl mx-auto">
        {/* Logout */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => { localStorage.removeItem('anny_name'); navigate('/'); }}
          className="absolute top-6 left-4 z-50 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm text-purple-700 hover:bg-white/40 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Sair
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1
            className="text-4xl md:text-5xl font-bold text-purple-800 mb-2"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            <TypingGreeting text={`Olá, ${userName}!`} />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-purple-600/70 text-lg"
          >
            Escolha um lugar especial para visitar ✨
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {cards.map((card) => (
            <motion.div key={card.path} variants={item}>
              <Link to={card.path} className="block h-full">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className={`h-full min-h-[160px] md:min-h-[180px] rounded-2xl p-5 bg-gradient-to-br ${card.gradient} text-white cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between relative overflow-hidden group`}
                >
                  {/* Glow overlay on hover */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-2xl" />

                  <div className="relative z-10">
                    <span className="text-3xl md:text-4xl block mb-3">{card.emoji}</span>
                    <h3 className="font-bold text-sm md:text-base leading-tight mb-1">
                      {card.title}
                    </h3>
                    <p className="text-white/80 text-xs leading-relaxed">{card.desc}</p>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    className="relative z-10 self-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-purple-500/50 text-xs mt-12"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Feito com amor por Luiz Henryque Alves Melo 💕
        </motion.p>
      </div>

      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default Home;
