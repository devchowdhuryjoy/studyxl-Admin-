import { useState } from "react";
import { Menu, X, Home, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 m-2 rounded bg-gray-200"
      >
        {open ? <X /> : <Menu />}
      </button>

      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg transform 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-200`}
      >
        <div className="p-4 text-2xl font-bold border-b">Study-XL</div>
        <nav className="p-4 space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <Home size={20} /> Dashboard
          </Link>
          <Link
            to="/users"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <Users size={20} /> Students
          </Link>
          <Link
            to="/agents"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <Users size={20} /> Agents
          </Link>
          <Link
            to="#"
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
          >
            <Settings size={20} /> Settings
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
