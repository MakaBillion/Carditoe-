import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import MainApp from './components/MainApp';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/app/*" element={<MainApp />} />
    </Routes>
  );
};

export default App;
