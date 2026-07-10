import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "anny-garden-days";

const STAGES = [
  { day: 1, emoji: "🌱", label: "Semente", color: "from-emerald-400 to-green-500" },
  { day: 2, emoji: "🌿", label: "Brotamento", color: "from-green-400 to-emerald-500" },
  { day: 3, emoji: "🌼", label: "Pequena flor", color: "from-yellow-400 to-amber-500" },
  { day: 4, emoji: "🌷", label: "Tulipa", color: "from-pink-400 to-rose-500" },
  { day: 5, emoji: "🌺", label: "Hibisco", color: "from-red-400 to-pink-500" },
  { day: 6, emoji: "🌻", label: "Girassol", color: "from-yellow-400 to-orange-500" },
  { day: 7, emoji: "🌹", label: "Rosa", color: "from-rose-400 to-red-500" },
];

function getStage(days) {
  if (days >= 7) return STAGES[6];
  return STAGES[Math.min(days - 1, STAGES.length - 1)];
}

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 4,
        color: ["bg-green-300/30", "bg-yellow-300/30", "bg-pink-300/20", "bg-white/20"][
          Math.floor(Math.random() * 4)
        ],
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            x: [0, (Math.random() - 0.5) * 20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function GrowthTimeline({ currentDay }) {
  return (
    <div className="flex items-center justify-center gap-1 mb-8 flex-wrap max-w-lg mx-auto">
      {STAGES.map((s, i) => {
        const isCurrent = currentDay === s.day;
        const isPast = currentDay > s.day;
        const isFuture = currentDay < s.day;

        return (
          <motion.div
            key={s.day}
            className={`flex items-center ${i < STAGES.length - 1 ? "gap-1" : ""}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
          >
            <motion.div
              className={`relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all ${
                isCurrent
                  ? "border-amber-400 bg-amber-400/20 shadow-lg shadow-amber-400/30"
                  : isPast
                  ? "border-green-400/50 bg-green-400/10"
                  : "border-white/10 bg-white/5"
              }`}
              animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
              transition={isCurrent ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
            >
              <span className={`text-lg md:text-xl ${isFuture ? "opacity-30 grayscale" : ""}`}>
                {s.emoji}
              </span>
              {isCurrent && (
                <motion.div
                  className="absolute -bottom-5 text-[10px] text-amber-300 font-semibold whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Hoje
                </motion.div>
              )}
            </motion.div>
            {i < STAGES.length - 1 && (
              <div className={`w-4 md:w-6 h-0.5 ${isPast ? "bg-green-400/40" : "bg-white/10"}`} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function GardenScene({ stage }) {
  const flowers = useMemo(() => {
    const count = Math.min(stage.day + 2, 12);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 10 + (i / count) * 80 + (Math.random() - 0.5) * 8,
      delay: i * 0.12,
      emoji: stage.emoji,
      size: 20 + Math.random() * 16,
    }));
  }, [stage]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none">
      {flowers.map((f) => (
        <motion.div
          key={f.id}
          className="absolute bottom-16 cursor-default"
          style={{ left: `${f.x}%`, fontSize: f.size }}
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 10,
            stiffness: 120,
            delay: f.delay + 0.5,
          }}
        >
          <motion.span
            className="inline-block"
            animate={{ y: [0, -4, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {f.emoji}
          </motion.span>
        </motion.div>
      ))}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 rounded-t-[50%]"
        style={{ background: "linear-gradient(to top, #166534, #22c55e, transparent)" }}
      />
    </div>
  );
}

export default function JardimQueCresce() {
  const navigate = useNavigate();
  const [consecutiveDays, setConsecutiveDays] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [todayVisit, setTodayVisit] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    if (!stored.includes(today)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...stored, today]));
    }
    setTodayVisit(true);

    const sorted = [...new Set(stored)].sort();
    setTotalDays(sorted.length);

    let streak = 0;
    let checkDate = new Date();
    const checkStr = checkDate.toISOString().split("T")[0];

    if (sorted.includes(checkStr)) {
      streak = 1;
      while (true) {
        checkDate = new Date(checkDate.getTime() - 86400000);
        const ds = checkDate.toISOString().split("T")[0];
        if (sorted.includes(ds)) streak++;
        else break;
      }
    } else {
      checkDate = new Date(checkDate.getTime() - 86400000);
      const ds = checkDate.toISOString().split("T")[0];
      if (sorted.includes(ds)) {
        streak = 1;
        while (true) {
          checkDate = new Date(checkDate.getTime() - 86400000);
          const d2 = checkDate.toISOString().split("T")[0];
          if (sorted.includes(d2)) streak++;
          else break;
        }
      }
    }

    setConsecutiveDays(streak);
  }, []);

  const stage = getStage(consecutiveDays || totalDays || 1);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-emerald-950 via-teal-900 to-rose-950 text-white">
      <FloatingParticles />

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

      <div className="relative z-10 flex flex-col items-center pt-16 px-4 pb-48">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-center mb-2"
          style={{
            background: "linear-gradient(135deg, #6ee7b7, #34d399, #fbbf24)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Jardim que Cresce 🌱
        </motion.h1>

        <motion.p
          className="text-white/50 text-sm mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Visite todos os dias para ver seu jardim crescer
        </motion.p>

        <GrowthTimeline currentDay={consecutiveDays || totalDays || 1} />

        <motion.div
          className="flex flex-col items-center gap-3 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <motion.div
            className="text-7xl md:text-8xl"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {stage.emoji}
          </motion.div>
          <span className={`text-lg font-bold bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`}>
            {stage.label}
          </span>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <p className="text-3xl font-bold text-green-300">{consecutiveDays}</p>
            <p className="text-white/50 text-xs mt-1">
              {consecutiveDays === 1 ? "dia seguido" : "dias seguidos"}
            </p>
          </div>
          <div className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <p className="text-3xl font-bold text-amber-300">{totalDays}</p>
            <p className="text-white/50 text-xs mt-1">total de visitas</p>
          </div>
        </motion.div>

        <motion.div
          className="relative max-w-lg w-full p-8 rounded-3xl border border-white/10 text-center mb-6"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            "Assim como as plantas, você também está crescendo. Cada dia é uma nova chance."
          </p>
        </motion.div>

        {consecutiveDays >= 3 && (
          <motion.div
            className="px-5 py-3 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
          >
            🔥 {consecutiveDays} dias seguidos! Continue assim!
          </motion.div>
        )}

        {consecutiveDays >= 7 && (
          <motion.div
            className="mt-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-400/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            <p className="text-2xl mb-1">🌹</p>
            <p className="text-rose-300 text-sm font-semibold">Jardim em flor! Você chegou ao estágio máximo.</p>
          </motion.div>
        )}
      </div>

      <GardenScene stage={stage} />
    </div>
  );
}
