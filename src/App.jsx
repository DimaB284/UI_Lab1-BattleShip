import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import About from './About';
import BattleshipGame from './BattleshipGame';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-100 text-slate-800 font-sans">
        <nav className="bg-indigo-600 text-white p-4 shadow-md flex gap-4">
          <Link to="/game" className="hover:text-indigo-200 font-bold transition">Play</Link>
          <Link to="/profile" className="hover:text-indigo-200 transition">Profile</Link>
          <Link to="/about" className="hover:text-indigo-200 transition">About</Link>
          <div className="ml-auto flex gap-4">
            <Link to="/login" className="hover:text-indigo-200 transition">Login</Link>
            <Link to="/register" className="hover:text-indigo-200 transition">Register</Link>
          </div>
        </nav>

        <main className="container mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg min-h-[60vh]">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/game" element={<BattleshipGame />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;