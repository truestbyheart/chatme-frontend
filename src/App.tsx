import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login/Login';
import { Signup } from './Pages/Signup';
import Chat from './Pages/Chat';

export const App: React.FC = (): React.ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default App;
