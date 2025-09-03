import { useState } from "react";
import { Menu, X, Home, Users, ChevronDown } from "lucide-react";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [openAgent, setOpenAgent] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 m-2 rounded bg-gray-200"
      >
        {open ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg transform 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-200`}
      >
        <div className="p-4 text-2xl font-bold border-b">Study-XL</div>
        <nav className="p-4 space-y-2">
          {/* Dashboard */}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <Home size={20} /> Dashboard
          </Link>

          {/* Students with submenu */}
          <div>
            <button
              onClick={() => setOpenStudent(!openStudent)}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded"
            >
              <span className="flex items-center gap-2">
                <Users size={20} /> Students
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openStudent ? "rotate-180" : ""
                }`}
              />
            </button>
            {openStudent && (
              <div className="ml-6 mt-1 space-y-1">
                <Link
                  to="/student-register"
                  className="block p-2 text-sm hover:bg-gray-100 rounded"
                >
                  Student Registation
                </Link>
                <Link
                  to="/student-apply"
                  className="block p-2 text-sm hover:bg-gray-100 rounded"
                >
                  Student Profile
                </Link>
                <Link
                  to="/student-apply"
                  className="block p-2 text-sm hover:bg-gray-100 rounded"
                >
                  University Choose
                </Link>
                <Link
                  to="/student-apply"
                  className="block p-2 text-sm hover:bg-gray-100 rounded"
                >
                  Student Tasks
                </Link>
              </div>
            )}
          </div>

          {/* Agents with submenu */}
          <div>
            <button
              onClick={() => setOpenAgent(!openAgent)}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded"
            >
              <span className="flex items-center gap-2">
                <Users size={20} /> Agents
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openAgent ? "rotate-180" : ""
                }`}
              />
            </button>
            {openAgent && (
              <div className="ml-6 mt-1 space-y-1">
                <Link
                  to="/agent-register"
                  className="block p-2 text-sm hover:bg-gray-100 rounded"
                >
                  Agent Apply
                </Link>
                <Link
                  to="/agent-apply"
                  className="block p-2 text-sm hover:bg-gray-100 rounded"
                >
                  Agent all information 
                </Link>
                <Link
                  to="/agent-apply"
                  className="block p-2 text-sm hover:bg-gray-100 rounded"
                >
                  Agent Tasks 
                </Link>
                <Link
                  to="/agent-apply"
                  className="block p-2 text-sm hover:bg-gray-100 rounded"
                >
                  Student Profile
                </Link>
                <Link
                  to="/agent-apply"
                  className="block p-2 text-sm hover:bg-gray-100 rounded"
                >
                  Student University Choose
                </Link>
              </div>
            )}
          </div>

          {/* University */}
          <Link
            to="/university"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <GraduationCap size={20} /> University
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
