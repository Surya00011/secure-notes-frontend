import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/register" element={<Register/>}/> 
        <Route path="/reset-password" element={<ResetPassword/>}/>
      </Routes>
    </Router>
  )
}

export default App
