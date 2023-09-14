import './App.scss';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Login from './pages/Login';
import TodoList from './pages/TodoList';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/todolist">Todo List</Link>
          <Link to="/login">Login</Link>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todolist" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;