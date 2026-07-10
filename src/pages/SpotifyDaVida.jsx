import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tracks = [
  {
    id: 1,
    title: "Quando você precisar descansar",
    letter:
      "Descansa, Anny. Você não precisa carregar o mundo nos seus ombros o tempo todo. É ok parar. É ok respirar. Eu tô aqui.",
    gradient: "from-green-500 to-emerald-700",
  },
  {
    id: 2,
    title: "Quando estiver sorrindo",
    letter:
      "Esse é o meu som favorito - seu sorriso. Quando você sorri, o mundo inteiro fica mais bonito. Nunca pare de sorrir.",
    gradient: "from-yellow-400 to-amber-600",
  },
  {
    id: 3,
    title: "Quando estiver chorando",
    letter:
      "Chora à vontade. Suas lágrimas não te fazem fraca - te fazem humana. E eu vou estar do seu lado limpando cada uma delas.",
    gradient: "from-blue-400 to-cyan-600",
  },
  {
    id: 4,
    title: "Quando sentir saudade",
    letter:
      "Eu também sinto. Mas saudade é só o amor que não cabe num lugar só. E o nosso amor é gigante.",
    gradient: "from-purple-500 to-violet-700",
  },
  {
    id: 5,
    title: "Quando lembrar de mim",
    letter:
      "Eu espero que quando você pensar em mim, seu coração fique quentinho. Porque é assim que eu me sinto quando penso em você.",
    gradient: "from-pink-400 to-rose-600",
  },
  {
    id: 6,
    title: "Quando sentir raiva do mundo",
    letter:
      "O mundo às vezes é duro mesmo. Mas você é mais duro. Mais forte. Mais lindo. Não deixa nada apagar sua luz.",
    gradient: "from-red-500 to-orange-600",
  },
  {
    id: 7,
    title: "Quando não conseguir dormir",
    letter:
      "Fecha os olhos e pensa em tudo que a gente já viveu juntos. Cada momento é uma estrela, e o nosso céu é infinito.",
    gradient: "from-indigo-500 to-blue-700",
  },
  {
    id: 8,
    title: "Quando precisar de um abraço",
    letter:
      "Vem cá. Segura na minha mão. Não precisa de palavras. Só ficar assim tá bom. Eu nunca vou soltar.",
    gradient: "from-amber-400 to-orange-600",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 22, stiffness: 260 } },
  exit: { opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.25 } },
};

export default function SpotifyDaVida() {
  const [activeTrack, setActiveTrack] = useState(null);
  const [progress, setProgress] = useState(0);

  const openTrack = (track) => {
    setActiveTrack(track);
    setProgress(0);
  };

  const closeTrack = () => {
    setActiveTrack(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#121212" }}>
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

      <div className="max-w-3xl mx-auto px-4 pt-20 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Spotify da Vida <span className="inline-block">🎵</span>
          </h1>
          <p className="text-neutral-400 text-lg">Cada faixa é uma carta pra você</p>
          <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />
        </motion.div>

        {/* Track List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-1"
        >
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              variants={itemVariants}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              onClick={() => openTrack(track)}
              className="flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer group transition-colors"
            >
              {/* Track Number */}
              <span className="text-sm text-neutral-500 w-6 text-right font-mono group-hover:hidden">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Play Icon (hover) */}
              <span className="text-sm text-white w-6 text-right font-mono hidden group-hover:block">
                ▶
              </span>

              {/* Gradient Dot */}
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${track.gradient} flex-shrink-0`} />

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-base truncate">{track.title}</p>
                <p className="text-neutral-500 text-sm">Luiz Henryque</p>
              </div>

              {/* Duration Indicator */}
              <svg
                className="text-neutral-600 group-hover:text-white transition-colors flex-shrink-0"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Now Playing Modal */}
      <AnimatePresence>
        {activeTrack && (
          <NowPlayingModal track={activeTrack} onClose={closeTrack} progress={progress} setProgress={setProgress} />
        )}
      </AnimatePresence>
    </div>
  );
}

function NowPlayingModal({ track, onClose, progress, setProgress }) {
  useState(() => {
    let frame;
    let start = null;
    const duration = 12000;

    const animate = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-90`} />
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          >
            ✕
          </button>

          {/* Playing Icon */}
          <div className="flex items-center gap-2 mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 rounded-full bg-white"
            />
            <span className="text-xs text-white/80 uppercase tracking-widest font-medium">
              Tocando agora
            </span>
          </div>

          {/* Track Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            {track.title}
          </h2>
          <p className="text-white/70 text-sm mb-8">Luiz Henryque</p>

          {/* Letter */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 mb-8">
            <p className="text-white text-lg leading-relaxed italic">
              &ldquo;{track.letter}&rdquo;
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-white/50">{formatTime(progress * 0.12)}</span>
              <span className="text-xs text-white/50">2:00</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button className="text-white/60 hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black"
              onClick={onClose}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            </motion.button>
            <button className="text-white/60 hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function formatTime(seconds) {
  const s = Math.floor(seconds);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}
