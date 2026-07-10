import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { logToSheets } from '../config/sheets';

const FloatingHeart = ({ delay, x, size, duration }) => (
  <motion.div
    className="absolute pointer-events-none select-none"
    initial={{ y: '110vh', x: `${x}vw`, opacity: 0, rotate: 0 }}
    animate={{
      y: '-10vh',
      opacity: [0, 1, 1, 0],
      rotate: [0, 15, -15, 10, 0],
      x: [`${x}vw`, `${x + 5}vw`, `${x - 5}vw`, `${x + 3}vw`],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    style={{ fontSize: size }}
  >
    💖
  </motion.div>
);

const Sparkle = ({ delay, x, y }) => (
  <motion.div
    className="absolute pointer-events-none"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1.2, 0],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    ✨
  </motion.div>
);

const Login = () => {
  const [name, setName] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const validNames = ['anny', 'anne', 'karoline'];
    const lower = trimmed.toLowerCase();

    if (!validNames.includes(lower)) {
      alert('Esse nome não está na lista 💔');
      return;
    }

    setIsLogging(true);

    await logToSheets({ name: trimmed, action: 'login' });

    localStorage.setItem('anny_name', trimmed);
    setShowWelcome(true);

    setTimeout(() => {
      navigate('/home');
    }, 1800);
  };

  const hearts = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    delay: i * 1.2,
    x: Math.random() * 90 + 5,
    size: Math.random() * 20 + 14,
    duration: 8 + Math.random() * 6,
  }));

  const sparkles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    delay: Math.random() * 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #f9c6d4 0%, #c8a2e8 30%, #d8b4fe 60%, #f0abfc 100%)',
      }}
    >
      {/* Animated background pulse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #f9c6d4 0%, #c8a2e8 30%, #d8b4fe 60%, #f0abfc 100%)',
            'linear-gradient(135deg, #f0abfc 0%, #d8b4fe 30%, #c8a2e8 60%, #f9c6d4 100%)',
            'linear-gradient(135deg, #f9c6d4 0%, #c8a2e8 30%, #d8b4fe 60%, #f0abfc 100%)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating hearts */}
      {hearts.map((h) => (
        <FloatingHeart key={h.id} {...h} />
      ))}

      {/* Sparkles */}
      {sparkles.map((s) => (
        <Sparkle key={s.id} {...s} />
      ))}

      {/* Welcome overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-center"
            >
              <motion.p
                className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg"
                style={{ fontFamily: "'Dancing Script', cursive" }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Bem-vinda, Anny! 💕
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-[90vw] max-w-md mx-4"
      >
        <div
          className="rounded-3xl p-8 md:p-10 shadow-2xl border border-white/40"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <motion.h1
              className="text-3xl md:text-4xl text-purple-900 font-bold mb-2"
              style={{ fontFamily: "'Dancing Script', cursive" }}
              animate={{
                textShadow: [
                  '0 0 10px rgba(147, 51, 234, 0.3)',
                  '0 0 20px rgba(147, 51, 234, 0.5)',
                  '0 0 10px rgba(147, 51, 234, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Para: Anny Karoline
            </motion.h1>
            <p className="text-purple-700/80 text-sm mt-2">Um presente feito com carinho 💝</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <label className="block text-purple-800 text-sm font-medium mb-2">
              Qual é o seu nome?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Digite seu nome..."
              className="w-full px-4 py-3 rounded-xl bg-white/30 border border-white/50 text-purple-900 placeholder-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-400/60 focus:border-transparent transition-all duration-300 text-center text-lg"
              disabled={isLogging}
            />
          </motion.div>

          <motion.button
            onClick={handleLogin}
            disabled={isLogging || !name.trim()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-full py-3.5 rounded-xl font-bold text-white text-lg disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #a855f7, #ec4899, #a855f7)',
              backgroundSize: '200% 200%',
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-xl"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(168, 85, 247, 0.4)',
                  '0 0 40px rgba(236, 72, 153, 0.6)',
                  '0 0 20px rgba(168, 85, 247, 0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10">
              {isLogging ? (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  Entrando...
                </motion.span>
              ) : (
                'Entrar ✨'
              )}
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 text-center text-purple-800/60 text-xs px-4"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        Feito com amor por Luiz Henryque Alves Melo 💕
      </motion.p>

      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default Login;
