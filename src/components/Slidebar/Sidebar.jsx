import { useState, useEffect } from "react";
import { Menu, X, Home, Users, ChevronDown, GraduationCap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const savedMenu = sessionStorage.getItem("activeMenu");
    if (savedMenu) {
      setActiveMenu(savedMenu);
    }
  }, []);

  const toggleMenu = (menu) => {
    const newMenu = activeMenu === menu ? null : menu;
    setActiveMenu(newMenu);
    if (newMenu) {
      sessionStorage.setItem("activeMenu", newMenu);
    } else {
      sessionStorage.removeItem("activeMenu");
    }
  };

  const handleMainLinkClick = () => {
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  // active link check function
  const isActive = (path) => location.pathname === path;

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
            onClick={handleMainLinkClick}
            className={`flex items-center gap-2 p-2 rounded ${
              isActive("/dashboard")
                ? "bg-[#f16f22] text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <Home size={20} /> Dashboard
          </Link>

          {/* Students with submenu */}
          <div>
            <button
              onClick={() => toggleMenu("students")}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded"
            >
              <span className="flex items-center gap-2">
                <Users size={20} /> Students
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  activeMenu === "students" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeMenu === "students" && (
              <div className="ml-6 mt-1 space-y-1">
                <Link
                  to="/dashboard/student-register"
                  onClick={handleMainLinkClick}
                  className={`block p-2 text-sm rounded ${
                    isActive("/dashboard/student-register")
                      ? "bg-[#f16f22] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Student Registration
                </Link>

                <Link
                  to="/dashboard/student-task"
                  onClick={handleMainLinkClick}
                  className={`block p-2 text-sm rounded ${
                    isActive("/dashboard/student-task")
                      ? "bg-[#f16f22] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Student Tasks
                </Link>
              </div>
            )}
          </div>

          {/* Agents with submenu */}
          <div>
            <button
              onClick={() => toggleMenu("agents")}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded"
            >
              <span className="flex items-center gap-2">
                <Users size={20} /> Agents
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  activeMenu === "agents" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeMenu === "agents" && (
              <div className="ml-6 mt-1 space-y-1">
                <Link
                  to="/dashboard/agent-register"
                  onClick={handleMainLinkClick}
                  className={`block p-2 text-sm rounded ${
                    isActive("/dashboard/agent-register")
                      ? "bg-[#f16f22] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Agent Registration
                </Link>

                <Link
                  to="/dashboard/agent-student-profile"
                  onClick={handleMainLinkClick}
                  className={`block p-2 text-sm rounded ${
                    isActive("/dashboard/agent-student-profile")
                      ? "bg-[#f16f22] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Agent Student Profile
                </Link>
                <Link
                  to="/dashboard/agent-application"
                  onClick={handleMainLinkClick}
                  className={`block p-2 text-sm rounded ${
                    isActive("/dashboard/agent-application")
                      ? "bg-[#f16f22] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Application
                </Link>

                <Link
                  to="/dashboard/agent-task"
                  onClick={handleMainLinkClick}
                  className={`block p-2 text-sm rounded ${
                    isActive("/dashboard/agent-task")
                      ? "bg-[#f16f22] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Agent Tasks
                </Link>
              </div>
            )}
          </div>

          {/*           
          <Link
            to="/dashboard/university"
            onClick={handleMainLinkClick}
            className={`flex items-center gap-2 p-2 rounded ${
              isActive("/dashboard/university")
                ? "bg-[#f16f22] text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <GraduationCap size={20} /> University
          </Link>

         
          <Link
            to="/dashboard/universityshow"
            onClick={handleMainLinkClick}
            className={`flex items-center gap-2 p-2 rounded ${
              isActive("/dashboard/universityshow")
                ? "bg-[#f16f22] text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <GraduationCap size={20} />All University 
          </Link>
          
          <Link
            to="/dashboard/program-create"
            onClick={handleMainLinkClick}
            className={`flex items-center gap-2 p-2 rounded ${
              isActive("/dashboard/program-create")
                ? "bg-[#f16f22] text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <GraduationCap size={20} /> Program Create
          </Link> */}

          {/* University Menu with Submenu */}
          <div>
            <button
              onClick={() => toggleMenu("university")}
              className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded"
            >
              <span className="flex items-center gap-2">
                <GraduationCap size={20} /> University
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  activeMenu === "university" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeMenu === "university" && (
              <div className="ml-6 mt-1 space-y-1">
                {/* University Create */}
                <Link
                  to="/dashboard/university"
                  onClick={handleMainLinkClick}
                  className={`block p-2 text-sm rounded ${
                    isActive("/dashboard/university")
                      ? "bg-[#f16f22] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  University Create
                </Link>

                {/* All Universities */}
                <Link
                  to="/dashboard/universityshow"
                  onClick={handleMainLinkClick}
                  className={`block p-2 text-sm rounded ${
                    isActive("/dashboard/universityshow")
                      ? "bg-[#f16f22] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  All University
                </Link>

                {/* Program Create */}
                <Link
                  to="/dashboard/program-create"
                  onClick={handleMainLinkClick}
                  className={`block p-2 text-sm rounded ${
                    isActive("/dashboard/program-create")
                      ? "bg-[#f16f22] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Program Create
                </Link>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
