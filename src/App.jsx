import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Agents from "./pages/Agents";
import University from "./components/University/University";
import StudentsProfile from "./components/Students/StudentsProfile";
import AgentStudentProfile from "./components/Agents/AgentStudentProfile";
import AgentDetails from "./pages/DetailsPage/AgentDetails";
import AgentsStudent from "./components/AgentsStudent/AgentsStudent";
import AgentsStudentProfile from "./components/Agents/ProfileDetails/AgentsStudentProfile";
import ProgramCreate from "./components/Program/ProgramCreate";
import UniversityShowing from "./components/University/UniversityShowing";
import StudentTask from "./components/Students/StudentTask";
import AgentTask from "./components/AgentsStudent/AgentTask";
import Application from "./components/AgentsStudent/Application";
import Program from "./components/AgentsStudent/Program";
import ProgramFilterCreate from "./components/Program/ProgramFilterCreate";
import StudentApplication from "./components/Students/StudentApplication";
import NotificationAll from "./components/Notification/NotificationAll";


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
          <Route path="student-profile/:id" element={<StudentsProfile />} />
          <Route path="program/:id" element={<Program />} />
          <Route path="student-task" element={<StudentTask />} />
          <Route path="student-application" element={<StudentApplication />} />
          {/* Students */}

          {/* Agents */}
          <Route path="agent-register" element={<Agents />} />
          <Route
            path="agent-student-profile-university"
            element={<AgentsStudent />}
          />

          <Route
            path="agent-student-profile"
            element={<AgentStudentProfile />}
          />
          <Route path="agent-details/:id" element={<AgentDetails />} />
          <Route
            path="agent-student-profile-two/:id"
            element={<AgentsStudentProfile />}
          />
          <Route path="agent-task" element={<AgentTask />} />
          <Route path="agent-application" element={<Application />} />

          {/* Agents */}

          {/* University */}
          <Route path="university" element={<University />} />
          <Route path="universityshow" element={<UniversityShowing />} />
          <Route path="program-create" element={<ProgramCreate />} />
          <Route path="program-dropdown-create" element={<ProgramFilterCreate />} />
          {/* University */}

          {/* notification */}
          <Route path="notification" element={<NotificationAll />} />
          <Route path="notification/:id" element={<NotificationAll />} />
          {/* notification */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
