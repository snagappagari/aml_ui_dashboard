import './App.css'
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import ManualProcessing from './components/ManualProcessing';
import Layout from '../src/Layout'; // Import the new Layout component

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manualprocessing" element={<ManualProcessing />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
