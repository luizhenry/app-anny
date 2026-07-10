import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const STARS_DATA = [
  { id: 0, message: "Você tem um jeito de fazer qualquer lugar parecer mais leve.", x: 12, y: 18, size: 3 },
  { id: 1, message: "Espero que um dia você enxergue em você o que eu enxergo.", x: 78, y: 25, size: 4 },
  { id: 2, message: "Você é a pessoa mais especial que eu já conheci.", x: 45, y: 10, size: 3 },
  { id: 3, message: "Mesmo nos dias difíceis, você continua sendo luz.", x: 88, y: 55, size: 3 },
  { id: 4, message: "Seu sorriso pode iluminar qualquer escuridão.", x: 20, y: 60, size: 4 },
  { id: 5, message: "Você merece todo o amor do mundo.", x: 60, y: 70, size: 3 },
  { id: 6, message: "Eu tô aqui. Sempre vou estar.", x: 35, y: 45, size: 4 },
  { id: 7, message: "Você é mais forte do que imagina.", x: 50, y: 30, size: 3 },
  { id: 8, message: "Cada estrela aqui é um motivo pelo qual eu te amo.", x: 70, y: 42, size: 3 },
  { id: 9, message: "O universo inteiro se torna mais bonito quando estou com você.", x: 15, y: 80, size: 3 },
];

const CONSTELLATION_LETTERS = {
  A: [
    [0, 0], [0.5, 1], [1, 0], [0.3, 0.6], [0.7, 0.6],
  ],
  N: [
    [0, 0], [0, 1], [0.5, 0.5], [1, 0], [1, 1],
  ],
  E: [
    [1, 0], [0, 0], [0, 0.5], [0.8, 0.5], [0, 1], [1, 1],
  ],
};

function BackgroundStars() {
  const stars = useRef(
    Array.from({ length: 200 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.current.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function Constellation({ show }) {
  const allPoints = [];
  const allLines = [];
  let pointIdx = 0;
  const letterWidth = 4;
  const letterSpacing = 2;
  const totalWidth = letterWidth * 3 + letterSpacing * 2;
  const startX = (100 - totalWidth) / 2;

  Object.entries(CONSTELLATION_LETTERS).forEach(([letter, pts], li) => {
    const ox = startX + li * (letterWidth + letterSpacing);
    const lines = [];
    pts.forEach((p, pi) => {
      allPoints.push({ x: ox + p[0] * letterWidth, y: 35 + p[1] * 20, idx: pointIdx });
      if (pi > 0) lines.push([pointIdx - 1, pointIdx]);
      pointIdx++;
    });
    allLines.push(...lines);
  });

  if (!show) return null;

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {allLines.map(([a, b], i) => (
          <motion.line
            key={`l${i}`}
            x1={allPoints[a].x}
            y1={allPoints[a].y}
            x2={allPoints[b].x}
            y2={allPoints[b].y}
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="0.15"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
          />
        ))}
        {allPoints.map((p, i) => (
          <motion.circle
            key={`c${i}`}
            cx={p.x}
            cy={p.y}
            r="0.5"
            fill="#fde68a"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 + 0.5 }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

export default function UniversoAnne() {
  const navigate = useNavigate();
  const [clickedStars, setClickedStars] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [showConstellation, setShowConstellation] = useState(false);
  const [allClicked, setAllClicked] = useState(false);

  const handleStarClick = useCallback(
    (star) => {
      if (clickedStars.includes(star.id)) return;
      const next = [...clickedStars, star.id];
      setClickedStars(next);
      setActiveMessage(star);
      if (next.length === STARS_DATA.length) {
        setTimeout(() => {
          setActiveMessage(null);
          setAllClicked(true);
          setTimeout(() => setShowConstellation(true), 600);
        }, 2500);
      }
    },
    [clickedStars]
  );

  useEffect(() => {
    if (!activeMessage) return;
    const t = setTimeout(() => setActiveMessage(null), 4000);
    return () => clearTimeout(t);
  }, [activeMessage]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
      <BackgroundStars />

      <motion.button
        onClick={() => navigate("/home")}
        className="absolute top-5 left-5 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm text-white/80 hover:bg-white/20 transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Voltar
      </motion.button>

      <div className="relative z-10 flex flex-col items-center pt-16 px-4">
        <motion.h1
          className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-100 bg-clip-text text-transparent text-center mb-2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Universo da Anne ✨
        </motion.h1>
        <motion.p
          className="text-white/50 text-sm mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Clique nas estrelas brilhantes para revelar mensagens
        </motion.p>

        <div className="text-white/40 text-xs mb-4">
          {clickedStars.length} / {STARS_DATA.length} estrelas descobertas
        </div>
      </div>

      <div className="absolute inset-0 z-20">
        {STARS_DATA.map((star) => {
          const isClicked = clickedStars.includes(star.id);
          return (
            <motion.button
              key={star.id}
              className="absolute group"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              onClick={() => handleStarClick(star)}
              whileHover={{ scale: 2 }}
              whileTap={{ scale: 0.8 }}
            >
              <motion.div
                className="rounded-full cursor-pointer"
                style={{
                  width: star.size * 4,
                  height: star.size * 4,
                  background: isClicked
                    ? "radial-gradient(circle, #fbbf24, #f59e0b)"
                    : "radial-gradient(circle, #ffffff, #d1d5db)",
                  boxShadow: isClicked
                    ? "0 0 20px 4px rgba(251,191,36,0.6)"
                    : "0 0 10px 2px rgba(255,255,255,0.3)",
                }}
                animate={
                  isClicked
                    ? { opacity: 1 }
                    : { opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }
                }
                transition={
                  isClicked
                    ? { duration: 0.3 }
                    : { duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
                }
              />
              {!isClicked && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {activeMessage && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setActiveMessage(null)} />
            <motion.div
              className="relative max-w-md w-full p-8 rounded-3xl border border-white/20 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))",
                backdropFilter: "blur(20px)",
              }}
              initial={{ scale: 0.5, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
            >
              <motion.div
                className="text-4xl mb-4"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
              >
                ⭐
              </motion.div>
              <p className="text-lg md:text-xl leading-relaxed text-white/90 font-light italic">
                "{activeMessage.message}"
              </p>
              <div className="mt-4 text-white/30 text-xs">
                Estrela {clickedStars.length} de {STARS_DATA.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Constellation show={showConstellation} />

      <AnimatePresence>
        {allClicked && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center px-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: showConstellation ? 1 : 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.div
              className="text-center pointer-events-auto"
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <p className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent mb-3">
                A N N E
              </p>
              <p className="text-white/60 text-sm">
                Todas as estrelas são suas. Todas são você.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
