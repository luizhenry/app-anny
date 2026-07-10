import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const emotions = [
  {
    id: 1,
    icon: "😴",
    label: "Quando estiver cansada",
    gradient: "from-pink-500 to-rose-600",
    shadowColor: "rgba(236, 72, 153, 0.35)",
    message:
      "Anny, tá na hora de descansar. Feche os olhos, respire fundo. O amanhã pode esperar. Hoje, cuide de você. Eu cuido de tudo.",
  },
  {
    id: 2,
    icon: "😔",
    label: "Quando estiver triste",
    gradient: "from-blue-500 to-purple-600",
    shadowColor: "rgba(99, 102, 241, 0.35)",
    message:
      "Eu sei que dói. Não vou falar que vai passar porque agora tá doendo de verdade. Mas eu vou estar aqui. Do seu lado. Sempre. Sua tristeza é válida.",
  },
  {
    id: 3,
    icon: "😡",
    label: "Quando estiver com raiva",
    gradient: "from-red-500 to-orange-500",
    shadowColor: "rgba(239, 68, 68, 0.35)",
    message:
      "Sua raiva é válida. Você tem todo o direito de sentir. Mas lembra: nada disso define quem você é. Você é maior que qualquer raiva.",
  },
  {
    id: 4,
    icon: "❤️",
    label: "Quando sentir que ninguém liga",
    gradient: "from-amber-400 to-rose-500",
    shadowColor: "rgba(251, 146, 60, 0.35)",
    message:
      "Eu ligo. Eu sempre ligo. Cada detalhe sobre você importa pra mim. Você não está sozinha. Nunca esteve. Eu tô aqui. Sempre vou estar.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 20, stiffness: 200 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 24, stiffness: 280 } },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
};

export default function QuandoTriste() {
  const [activeEmotion, setActiveEmotion] = useState(null);
  const [readEmotions, setReadEmotions] = useState(new Set());

  const openEmotion = (emotion) => {
    setActiveEmotion(emotion);
    setReadEmotions((prev) => new Set([...prev, emotion.id]));
  };

  const closeEmotion = () => {
    setActiveEmotion(null);
  };

  const allRead = readEmotions.size >= emotions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Back Button */}
      <a
        href="/home"
        className="fixed top-4 left-4 z-50 flex items-center gap-1 text-sm text-neutral-400 hover:text-white transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Voltar
      </a>

      <div className="max-w-3xl mx-auto px-4 pt-20 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Quando você estiver triste...
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl">
            Escolha como você se sente agora
          </p>
          <div className="mt-6 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
        </motion.div>

        {/* Emotion Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {emotions.map((emotion) => (
            <motion.button
              key={emotion.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openEmotion(emotion)}
              className="relative group rounded-2xl p-8 text-left overflow-hidden cursor-pointer border border-white/5"
              style={{ boxShadow: `0 8px 32px ${emotion.shadowColor}` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${emotion.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10">
                <span className="text-5xl mb-4 block">{emotion.icon}</span>
                <h3 className="text-xl font-semibold text-white leading-snug">
                  {emotion.label}
                </h3>
              </div>

              {/* Read indicator */}
              {readEmotions.has(emotion.id) && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Shine effect */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.button>
          ))}
        </motion.div>

        {/* Completion Message */}
        <AnimatePresence>
          {allRead && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-14 text-center"
            >
              <div className="inline-block rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 px-8 py-6">
                <p className="text-xl md:text-2xl text-white leading-relaxed">
                  Você não está sozinha, Anny.
                  <br />
                  Eu sempre vou estar aqui.{" "}
                  <span className="inline-block">💕</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {activeEmotion && (
          <MessageModal emotion={activeEmotion} onClose={closeEmotion} />
        )}
      </AnimatePresence>
    </div>
  );
}

function MessageModal({ emotion, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
      >
        {/* Gradient Glow Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${emotion.gradient} opacity-100`} />
        <div className="absolute inset-0 bg-black/40" />

        {/* Soft Glow */}
        <div
          className="absolute -inset-20 blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle, ${emotion.shadowColor} 0%, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-10">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white/80 hover:text-white hover:bg-black/50 transition-colors"
          >
            ✕
          </button>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.15, damping: 12, stiffness: 200 }}
            className="text-6xl mb-6"
          >
            {emotion.icon}
          </motion.div>

          {/* Label */}
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {emotion.label}
          </h2>

          {/* Message */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <p className="text-white text-lg leading-relaxed">
              {emotion.message}
            </p>
          </div>

          {/* Close Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-white/40 text-sm mt-6"
          >
            Toque fora para fechar
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
