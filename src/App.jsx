import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Agents from "./pages/Agents";
import University from './components/University/University';
import StudentsProfile from './components/Students/StudentsProfile';
import AgentStudentProfile from './components/Agents/AgentStudentProfile';
import AgentDetails from './pages/DetailsPage/AgentDetails';


function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Layout with nested routes */}
        <Route path="/dashboard/*" element={<Dashboard />}>

          {/* Students */}
          <Route path="student-register" element={<Users />} />
          <Route path="student-profile" element={<StudentsProfile />} />
          {/* Students */}
          
          {/* Agents */}
          <Route path="agent-register" element={<Agents />} />
         
          <Route path="agent-student-profile" element={<AgentStudentProfile />} />
          <Route path="agent-details/:id" element={<AgentDetails />} />

          {/* Agents */}
          
          {/* University */}
          <Route path="university" element={<University />} />
          {/* University */}

        </Route>
      </Routes>
    </Router>
  );
}

export default App;





