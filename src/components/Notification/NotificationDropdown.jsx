// import React, { useEffect, useRef, useState } from "react";
// import { Bell } from "lucide-react";
// import BASE_URL from "../../Api/ApiBaseUrl";

// const NotificationDropdown = () => {
//   const [open, setOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const dropdownRef = useRef(null);

//   const token = localStorage.getItem("admin_token");

//   const fetchNotifications = async () => {
//     if (!token) {
//       console.error("No admin token found");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(
//         `${BASE_URL}/admin/notifications?timestamp=${Date.now()}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       );

//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

//       const data = await res.json();
//       setNotifications(data.notifications || []);
//     } catch (err) {
//       console.error("Notification fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const unreadCount = notifications.filter((n) => !n.is_read).length;

//   const toggleDropdown = () => {
//     setOpen((prev) => !prev);
//     if (!open) fetchNotifications();
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={toggleDropdown}
//         className="hover:bg-gray-100 p-2 rounded relative"
//       >
//         <Bell size={18} />
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-96 bg-white border rounded-lg shadow-lg z-50">
//           <div className="p-3 border-b font-semibold">Notifications</div>

//           {loading && <p className="p-3 text-sm text-gray-500">Loading...</p>}

//           {!loading && notifications.length === 0 && (
//             <p className="p-3 text-sm text-gray-500">No notifications</p>
//           )}

//           <ul className="max-h-80 overflow-y-auto">
//             {notifications.map((item) => (
//               <li
//                 key={item.id}
//                 className={`p-3 border-b text-sm cursor-pointer ${
//                   item.is_read ? "bg-white" : "bg-blue-50"
//                 }`}
//               >
//                 <p>
//                   <b>{item.type}</b> application updated
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {new Date(item.created_at).toLocaleString()}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationDropdown;



import React, { useEffect, useRef, useState } from "react"; 
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../Api/ApiBaseUrl";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("admin_token");

  const fetchNotifications = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/admin/notifications?timestamp=${Date.now()}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error("Notification fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
    if (!open) fetchNotifications();
  };

  // Navigate to all notifications page
  const goToAllNotifications = () => {
    setOpen(false); // close dropdown
    navigate("/dashboard/notification");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="hover:bg-gray-100 p-2 rounded relative"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-4 w-96 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-3 border-b font-semibold">Notifications</div>

          {loading && <p className="p-3 text-sm text-gray-500">Loading...</p>}

          {!loading && notifications.length === 0 && (
            <p className="p-3 text-sm text-gray-500">No notifications</p>
          )}

          <ul className="max-h-80 overflow-y-auto">
            {notifications.map((item) => (
              <li
                key={item.id}
                onClick={goToAllNotifications} //navigate to notification page
                className={`p-3 border-b text-sm cursor-pointer ${
                  item.is_read ? "bg-white" : "bg-blue-50"
                } hover:bg-gray-100`}
              >
                <p>
                  <b>{item.type}</b> application updated
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
