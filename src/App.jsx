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
import ApplicationDetails from "./components/AgentsStudent/ApplicationDetails";
import CommissionForm from "./components/ComissionForm/CommisionForm";
import ManageCommision from "./components/ComissionForm/ManageCommision/ManageCommision";
import UserCreate from "./components/UserCreate/UserCreate";
import EditApplication from "./components/AgentsStudent/EditApplication";
import UniversityEdit from "./components/University/UniversityEdit/UniversityEdit"
import AllProgram from "./components/Program/AllProgram"
import ProgramEdit from "./components/Program/ProgramEdit"
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
          <Route
            path="agent-application/application-details/:id"
            element={<ApplicationDetails />}
          />
          
          <Route 
            path="agent-application/edit/:id"  
            element={<EditApplication />} 
          />

          {/* Agents */}

          {/* University */}
          <Route path="university" element={<University />} />
          <Route path="universityshow" element={<UniversityShowing />} />
          <Route path="program-create" element={<ProgramCreate />} />
          <Route
            path="program-dropdown-create"
            element={<ProgramFilterCreate />}
          />
          {/* University */}
           <Route path="universities/edit/:id" element={<UniversityEdit/>} />
            <Route path="programshow" element={<AllProgram />} />
             <Route path="programs/edit/:id" element={<ProgramEdit />} />
          {/* notification */}
          <Route path="notification" element={<NotificationAll />} />
          <Route path="notification/:id" element={<NotificationAll />} />
          {/* notification */}

          {/* Commision */}
          <Route path="commision" element={<CommissionForm />} />
          <Route path="commision/:id" element={<CommissionForm />} />
          {/* Commision*/}
          <Route path="manage-commision" element={<ManageCommision />} />
          <Route path="manage-commision/:id" element={<ManageCommision />} />

         
          
          
          

          {/* Create User */}
          <Route path="create-user" element={<UserCreate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
