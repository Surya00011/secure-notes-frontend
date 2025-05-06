import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './pages/Dashboard'
import NavHeader from './components/NavHeader';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App
