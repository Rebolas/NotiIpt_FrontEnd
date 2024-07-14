import { useState } from 'react'
import './App.css'
import './styles/style.css'

import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/side-adminbar/side-adminbar.jsx';
import NoticiasMain from './pages/NoticiasMain.jsx';
import NoticiaSoz from './pages/NoticiaSoz.jsx';

// Importa páginas
import TestPage from './pages/test.jsx';
import LoremPage from './pages/lorem.jsx';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Routes>
        <Route path="/" element={<NoticiasMain/>} />
        <Route path="/noticia/:id" element={<NoticiaSoz/>} />
        <Route path="/teste" element={<TestPage />} />
        <Route path="/lorem" element={<LoremPage />} />
       
      </Routes>
    </div>
    );
  }

export default App
