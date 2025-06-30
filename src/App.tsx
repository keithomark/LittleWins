import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Goal from './pages/Goal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goal/:id" element={<Goal />} />
      </Routes>
    </Router>
  )
}

export default App