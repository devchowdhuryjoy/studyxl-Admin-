import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Agents from "./pages/Agents";
import University from './components/University/University';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />

        
        <Route path="/dashboard" element={<Dashboard />} />

        
        <Route path="/student-register" element={<Users />} />
        <Route path="/agent-register" element={<Agents />} />
        <Route path="/university" element={<University />} />

        <Route
          path="/welcome"
          element={
            <div className="h-screen flex items-center justify-center bg-black">
              <h1 className="text-5xl font-bold text-amber-600">
                Welcome To Study-XL-Admin Dashboard
              </h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
