import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import EpsidoTable from './components/EpsidoTable'

function App() {
  return (
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/epsido" element={<EpsidoTable />} />
        </Routes>
      </div>
  )
}

export default App
