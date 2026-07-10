import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FLOWERS = ["🌸", "🌹", "🌷", "🌻", "🌺", "🌼", "💐", "🪷"];
const STORAGE_KEY = "anny-flowers";

function FloatingPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        emoji: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 6,
        size: 14 + Math.random() * 14,
        drift: (Math.random() - 0.5) * 60,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, fontSize: p.size }}
          initial={{ y: "-10vh", x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: "110vh",
            x: [0, p.drift, -p.drift / 2, p.drift / 3],
            opacity: [0, 0.7, 0.7, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}

function GrassBlades() {
  const blades = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: (i / 40) * 100 + (Math.random() - 0.5) * 2,
        height: 30 + Math.random() * 40,
        delay: Math.random() * 2,
        shade: Math.random() > 0.5 ? "from-green-600" : "from-green-500",
      })),
    []
  );

  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
      {blades.map((b) => (
        <motion.div
          key={b.id}
          className={`absolute bottom-0 w-1 bg-gradient-to-t ${b.shade} to-green-300 rounded-full origin-bottom`}
          style={{ left: `${b.x}%`, height: b.height }}
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 3 + Math.random() * 2, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function FlowerDisplay({ flowers }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto mb-8">
      <AnimatePresence>
        {flowers.map((entry, i) => (
          <motion.div
            key={entry.date}
            className="flex flex-col items-center"
            initial={{ scale: 0, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              damping: 12,
              stiffness: 150,
              delay: i * 0.15,
            }}
          >
            <motion.div
              className="text-5xl md:text-6xl cursor-default"
              whileHover={{ scale: 1.3, rotate: 10 }}
              animate={{ y: [0, -6, 0] }}
              transition={{
                y: { duration: 2 + Math.random(), repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {entry.flower}
            </motion.div>
            <span className="text-white/40 text-xs mt-1">{entry.dateFormatted}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function JardimVirtual() {
  const navigate = useNavigate();
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const today = new Date().toISOString().split("T")[0];

    if (!stored.find((f) => f.date === today)) {
      const newFlower = {
        date: today,
        flower: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
        dateFormatted: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
      };
      const updated = [...stored, newFlower];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setFlowers(updated);
    } else {
      setFlowers(stored);
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-emerald-900 via-green-900 to-pink-950 text-white">
      <FloatingPetals />

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

      <div className="relative z-10 flex flex-col items-center pt-16 pb-48 px-4">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-center mb-2"
          style={{
            background: "linear-gradient(135deg, #fbcfe8, #f9a8d4, #a7f3d0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Jardim Virtual 🌿
        </motion.h1>

        <motion.p
          className="text-white/50 text-sm mb-8 text-center max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Cada visita planta uma nova flor
        </motion.p>

        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 to-green-300 bg-clip-text text-transparent">
            {flowers.length}
          </span>
          <p className="text-white/60 text-sm mt-1">
            {flowers.length === 1 ? "flor brotou no seu jardim" : "flores brotaram no seu jardim"}
          </p>
        </motion.div>

        <FlowerDisplay flowers={flowers} />

        <motion.div
          className="relative max-w-lg w-full p-8 rounded-3xl border border-white/10 text-center mt-4"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            "Mesmo quando os dias parecem cinzas, as coisas continuam crescendo."
          </p>
          <div className="mt-4 flex justify-center gap-1">
            {["🌸", "🌿", "🌷", "🌻"].map((e, i) => (
              <motion.span
                key={i}
                className="text-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
              >
                {e}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 z-20">
        <div
          className="absolute bottom-0 left-0 right-0 h-20 rounded-t-[40%]"
          style={{
            background: "linear-gradient(to top, #166534, #15803d, transparent)",
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <GrassBlades />
      </div>
    </div>
  );
}
