import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { logToSheets } from '../config/sheets';

export default function Login() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validNames = ['anny', 'anne', 'karoline', 'anny karoline'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const clean = name.trim().toLowerCase();

    if (!validNames.includes(clean)) {
      setError('Esse nome não está na lista de convidados 💔');
      setLoading(false);
      return;
    }

    await logToSheets(clean);
    localStorage.setItem('user', clean);
    localStorage.setItem(`visit_${clean}`, Date.now());
    navigate('/home');
  };

  const orbs = [
    { size: 300, x: '10%', y: '20%', color: 'rgba(244, 63, 94, 0.08)', delay: 0 },
    { size: 250, x: '80%', y: '60%', color: 'rgba(167, 139, 250, 0.06)', delay: 2 },
    { size: 200, x: '50%', y: '80%', color: 'rgba(236, 72, 153, 0.07)', delay: 4 },
  ];

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Mesh gradient background */}
      <div className="mesh-gradient-hero" />

      {/* Floating orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: orb.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      {/* Main card */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Double-bezel card */}
        <div className="card-double-bezel">
          <div className="card-inner p-8 sm:p-10">
            {/* Logo / Icon */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(236, 72, 153, 0.1))',
                  border: '1px solid rgba(244, 63, 94, 0.2)',
                }}
              >
                <Heart className="w-7 h-7 text-rose-400" fill="currentColor" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="font-display text-4xl sm:text-5xl mb-3 tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                Para Anny
              </h1>
              <p
                className="text-sm tracking-wide uppercase"
                style={{ color: 'var(--text-muted)', letterSpacing: '0.15em' }}
              >
                Um espaço especial
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <label
                  className="block text-xs font-medium mb-2 tracking-wide uppercase"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Seu nome
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                  placeholder="Digite seu nome"
                  className="w-full px-5 py-3.5 rounded-2xl text-sm outline-none transition-all duration-500"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(244, 63, 94, 0.3)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-subtle)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                  }}
                />
                <AnimatePresence>
                  {error && (
                    <motion.p
                      className="text-xs mt-3 flex items-center gap-1.5"
                      style={{ color: 'var(--accent-rose-light)' }}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sparkles className="w-3 h-3" />
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit button */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-magnetic w-full justify-center"
                >
                  {loading ? (
                    <motion.div
                      className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <>
                      <span>Entrar</span>
                      <span className="btn-icon">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </>
                  )}
                </button>
              </motion.div>
            </form>

            {/* Footer credit */}
            <motion.p
              className="text-center text-xs mt-8"
              style={{ color: 'var(--text-muted)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              Feito com amor por Luiz Henryque
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
