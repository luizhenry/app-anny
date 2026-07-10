import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Universo from './pages/UniversoAnne';
import Jardim from './pages/JardimVirtual';
import Spotify from './pages/SpotifyDaVida';
import Triste from './pages/QuandoTriste';
import Ceu from './pages/SimuladorCeu';
import Borboleta from './pages/JogoBorboleta';
import Netflix from './pages/NetflixAnny';
import JardimCresce from './pages/JardimQueCresce';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/universo" element={<Universo />} />
      <Route path="/jardim" element={<Jardim />} />
      <Route path="/spotify" element={<Spotify />} />
      <Route path="/triste" element={<Triste />} />
      <Route path="/ceu" element={<Ceu />} />
      <Route path="/borboleta" element={<Borboleta />} />
      <Route path="/netflix" element={<Netflix />} />
      <Route path="/jardim-cresce" element={<JardimCresce />} />
    </Routes>
  );
}

export default App;
