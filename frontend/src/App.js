import logo from './logo.svg';
import './App.css';
import React ,{ useState } from 'react';
import axios from 'axios'
import ProblemPage from './pages/Compiler';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Compiler from './pages/Compiler';

function App() {
  


  return (
    <Router>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/problems" element={<Compiler/>} />
        <Route path="/submissions" element={<h1>My Submissions</h1>} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/signup" element={<h1>Sign Up Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
