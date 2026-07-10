import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CATEGORIAS = [
  {
    titulo: '❤️ Comédia',
    filmes: [
      {
        id: 'c1',
        titulo: 'O dia que a gente riu até chorar',
        cor: 'from-red-500 to-pink-500',
        letra: 'Lembra daquele dia? Eu penso nisso toda vez que estou triste. Você faz até a chuva parecer música.',
      },
      {
        id: 'c2',
        titulo: 'Nossas piadas internas',
        cor: 'from-pink-500 to-rose-400',
        letra: 'Tem coisas que só a gente entende. E isso é o que torna tudo especial.',
      },
      {
        id: 'c3',
        titulo: 'Seu jeito de rir',
        cor: 'from-rose-400 to-red-400',
        letra: 'Seu riso é a minha música favorita. Eu ouviria pra sempre.',
      },
    ],
  },
  {
    titulo: '🌧️ Dias Difíceis',
    filmes: [
      {
        id: 'd1',
        titulo: 'Pra quando o mundo pesar',
        cor: 'from-slate-600 to-blue-900',
        letra: 'Anny, dias ruins não duram pra sempre. Mas eu durro. Eu vou estar aqui sempre.',
      },
      {
        id: 'd2',
        titulo: 'Quando tudo der errado',
        cor: 'from-gray-700 to-slate-800',
        letra: 'Mesmo quando tudo desmoronar, eu vou segurar na sua mão. Porque é isso que se faz quando ama.',
      },
      {
        id: 'd3',
        titulo: 'Você não está sozinha',
        cor: 'from-blue-900 to-indigo-900',
        letra: 'Eu sei que às vezes parece que o mundo inteiro está contra você. Mas eu nunca estou. Nunca.',
      },
    ],
  },
  {
    titulo: '☀️ Dias Felizes',
    filmes: [
      {
        id: 'f1',
        titulo: 'Nossos melhores momentos',
        cor: 'from-amber-500 to-yellow-400',
        letra: 'Cada segundo com você é o melhor da minha vida. Obrigado por existir.',
      },
      {
        id: 'f2',
        titulo: 'O futuro que a gente vai construir',
        cor: 'from-yellow-400 to-orange-400',
        letra: 'Imagina tudo que a gente ainda vai viver juntos. O melhor ainda tá por vir.',
      },
      {
        id: 'f3',
        titulo: 'Eu te amo',
        cor: 'from-orange-400 to-red-500',
        letra: 'Só isso. Eu te amo. Em qualquer idioma, em qualquer dia, em qualquer circunstância.',
      },
    ],
  },
];

function LinhaFilmes({ categoria, onAbrir }) {
  const scrollRef = useRef(null);
  const [podeEsquerda, setPodeEsquerda] = useState(false);
  const [podeDireita, setPodeDireita] = useState(true);

  const verificarScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setPodeEsquerda(scrollLeft > 10);
    setPodeDireita(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', verificarScroll);
      verificarScroll();
    }
    return () => el?.removeEventListener('scroll', verificarScroll);
  }, []);

  const scroll = (direcao) => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({ left: direcao === 'esquerda' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="mb-10">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-3 px-6 md:px-12">
        {categoria.titulo}
      </h2>
      <div className="relative group">
        {podeEsquerda && (
          <motion.button
            className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-black/80 to-transparent flex items-center justify-center text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll('esquerda')}
            whileHover={{ scale: 1.1 }}
          >
            ‹
          </motion.button>
        )}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categoria.filmes.map((filme) => (
            <motion.button
              key={filme.id}
              className={`flex-shrink-0 w-56 md:w-72 h-36 md:h-44 rounded-lg bg-gradient-to-br ${filme.cor} relative overflow-hidden cursor-pointer`}
              onClick={() => onAbrir(filme)}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-sm md:text-base text-left leading-tight">
                  {filme.titulo}
                </h3>
              </div>
              <motion.div
                className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity"
              />
            </motion.button>
          ))}
        </div>
        {podeDireita && (
          <motion.button
            className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-black/80 to-transparent flex items-center justify-center text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll('direita')}
            whileHover={{ scale: 1.1 }}
          >
            ›
          </motion.button>
        )}
      </div>
    </div>
  );
}

function ModalFilme({ filme, onFechar }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onFechar();
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onFechar]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onFechar}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        className="relative w-full max-w-xl bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-white/10"
        initial={{ scale: 0.8, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`h-48 md:h-56 bg-gradient-to-br ${filme.cor} relative`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
          <button
            className="absolute top-4 right-4 w-8 h-8 bg-[#1a1a1a]/80 rounded-full flex items-center justify-center text-white hover:bg-[#1a1a1a] transition-colors text-lg"
            onClick={onFechar}
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-6">
            <h2 className="text-white text-2xl md:text-3xl font-bold">{filme.titulo}</h2>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">NOVIDADE</span>
            <span className="text-white/50 text-sm">Produzido com amor</span>
          </div>
          <motion.p
            className="text-white/90 text-base md:text-lg leading-relaxed font-light"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {filme.letra}
          </motion.p>
          <motion.div
            className="mt-6 flex gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button className="bg-white text-black font-semibold px-6 py-2 rounded-md hover:bg-white/90 transition-colors text-sm">
              ▶ Assistir
            </button>
            <button className="bg-white/20 text-white font-semibold px-6 py-2 rounded-md hover:bg-white/30 transition-colors text-sm border border-white/20">
              + Minha Lista
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function NetflixAnny() {
  const navigate = useNavigate();
  const [filmeAberto, setFilmeAberto] = useState(null);

  return (
    <div className="min-h-screen bg-[#141414]">
      <motion.header
        className="sticky top-0 z-40 px-6 md:px-12 py-4 bg-gradient-to-b from-black/90 to-transparent"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <motion.button
            className="text-white/70 hover:text-white text-sm transition-colors"
            onClick={() => navigate('/home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Voltar
          </motion.button>
          <div className="text-center">
            <h1 className="text-red-600 text-2xl md:text-3xl font-black tracking-wider">
              ANNYFLIX
            </h1>
            <p className="text-white/40 text-[10px] md:text-xs mt-0.5">
              Produzido com amor, dirigido por Luiz Henryque
            </p>
          </div>
          <div className="w-16" />
        </div>
      </motion.header>

      <motion.div
        className="relative h-[50vh] md:h-[70vh] mb-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-[#141414] to-purple-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
        <div className="absolute bottom-12 left-6 md:left-12 max-w-xl">
          <motion.p
            className="text-red-600 text-xs uppercase tracking-widest mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            Especial para Anny Karoline
          </motion.p>
          <motion.h2
            className="text-white text-3xl md:text-5xl font-black mb-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            Para os Dias Que Você Precisa
          </motion.h2>
          <motion.p
            className="text-white/70 text-sm md:text-base mb-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Uma coleção de cartas que eu escrevi pra você.
            Cada um é um pedaço do meu coração, guardado pra quando você precisar.
          </motion.p>
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <button className="bg-white text-black font-semibold px-6 py-2 rounded-md hover:bg-white/90 transition-colors text-sm">
              ▶ Assistir tudo
            </button>
            <button className="bg-white/20 text-white font-semibold px-6 py-2 rounded-md hover:bg-white/30 transition-colors text-sm border border-white/20">
              ⓘ Mais informações
            </button>
          </motion.div>
        </div>
      </motion.div>

      <div className="pb-16">
        {CATEGORIAS.map((cat, i) => (
          <motion.div
            key={cat.titulo}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
          >
            <LinhaFilmes categoria={cat} onAbrir={setFilmeAberto} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {filmeAberto && (
          <ModalFilme filme={filmeAberto} onFechar={() => setFilmeAberto(null)} />
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#141414] to-transparent pointer-events-none z-30" />
    </div>
  );
}
