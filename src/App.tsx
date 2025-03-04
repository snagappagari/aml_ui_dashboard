import './App.css'
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
