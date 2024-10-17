import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import SubmitUrl from './pages/SubmitUrl';
function App() {
  return (
    <Router>
    <Routes>
      <Route path = "/register" element={<Register />} /> 
      <Route path = "/login" element={<Login />} /> 
      <Route path = "/submiturl" element={<SubmitUrl />} /> 

    </Routes>
    
    </Router>
  );
}

export default App;