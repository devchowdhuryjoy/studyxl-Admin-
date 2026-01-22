





import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import NotificationDropdown from "../Notification/NotificationDropdown";
import { Menu } from "lucide-react";
const Navbar = ({ onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("auth");
        localStorage.removeItem("admin_token");
        navigate("/");
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const authRaw = localStorage.getItem("auth");
    if (authRaw) {
      try {
        const auth = JSON.parse(authRaw);
        setUser(auth.user || {});
      } catch (err) {
        console.error("Auth parse error", err);
      }
    }
  }, []);

  return (
    <header className="flex justify-between items-center bg-white shadow px-4 py-3">
     <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-1 hover:bg-gray-100 rounded-md transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold">Study-XL</h1>
      </div>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <NotificationDropdown />

        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setOpen(!open)}>
          <span className="hidden sm:block text-sm font-medium">{user?.name || "Admin"}</span>
          <img src="/profileright.jpg" alt="profile" className="w-10 h-10 rounded-full" />
        </div>

        {open && (
          <div className="absolute right-0 top-14 w-32 bg-white border rounded-lg shadow-lg z-50">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;



