import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, SkipForward, X, Music } from 'lucide-react';

const tracks = [
  { id: 1, letter: 'A', title: 'Agradeço', desc: 'Por cada momento que vivemos juntos.' },
  { id: 2, letter: 'N', title: 'Nunca', desc: 'Nunca duvide do quanto você é capaz.' },
  { id: 3, letter: 'Y', title: 'You', desc: 'You are enough. Sempre foi.' },
  { id: 4, letter: '❤️', title: 'Amor', desc: 'O tipo de amor que não precisa de palavras.' },
  { id: 5, letter: 'K', title: 'Kintsugi', desc: 'Quebrada, mas reconstruída com ouro.' },
  { id: 6, letter: 'A', title: 'Amanhã', desc: 'Sempre há um amanhã esperando por você.' },
  { id: 7, letter: 'R', title: 'Resiliência', desc: 'A força que você não sabe que tem.' },
  { id: 8, letter: 'O', title: 'Orgulho', desc: 'Tenho orgulho de quem você é.' },
];

export default function SpotifyDaVida() {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (playing === null) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPlaying(null);
          return 0;
        }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [playing]);

  const playTrack = (track) => {
    setPlaying(track);
    setProgress(0);
  };

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

      <div className="relative z-10 max-w-lg mx-auto px-5 py-24 sm:py-32">
        {/* Title */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(16, 185, 129, 0.1))',
                border: '1px solid rgba(34, 197, 94, 0.2)',
              }}
            >
              <Music className="w-4.5 h-4.5 text-green-400" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl" style={{ color: 'var(--text-primary)' }}>
              Spotify da Vida
            </h1>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Cartas que soam como música
          </p>
        </motion.div>

        {/* Track list */}
        <div className="space-y-2">
          {tracks.map((track, i) => (
            <motion.button
              key={track.id}
              onClick={() => playTrack(track)}
              className="w-full text-left group"
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="flex items-center gap-4 p-3 rounded-2xl transition-all duration-500"
                style={{
                  background: playing?.id === track.id ? 'rgba(34, 197, 94, 0.08)' : 'transparent',
                  border: `1px solid ${playing?.id === track.id ? 'rgba(34, 197, 94, 0.15)' : 'transparent'}`,
                  transitionTimingFunction: 'var(--ease-spring)',
                }}
              >
                {/* Track number / play icon */}
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative">
                  <span className="font-display text-lg group-hover:opacity-0 transition-opacity duration-300"
                    style={{ color: playing?.id === track.id ? 'var(--accent-rose-light)' : 'var(--text-muted)' }}
                  >
                    {track.letter}
                  </span>
                  <Play
                    className="w-4 h-4 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: 'var(--text-primary)' }}
                    fill="currentColor"
                  />
                </div>

                {/* Track info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                    {track.title}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {track.desc}
                  </p>
                </div>

                {/* Progress indicator */}
                {playing?.id === track.id && (
                  <div className="w-16 h-1 rounded-full overflow-hidden shrink-0" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'var(--accent-rose)', width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Now playing bar */}
      <AnimatePresence>
        {playing && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-40"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="mx-4 mb-4 rounded-2xl p-4"
              style={{
                background: 'rgba(20, 20, 30, 0.9)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                    {playing.title} — {playing.letter}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {playing.desc}
                  </p>
                </div>
                <button
                  onClick={() => setPlaying(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <X className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                </button>
              </div>
              {/* Progress bar */}
              <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'var(--accent-rose)', width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
