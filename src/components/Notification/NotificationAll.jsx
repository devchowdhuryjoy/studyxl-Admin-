// import React, { useEffect, useState } from "react";
// import BASE_URL from "../../Api/ApiBaseUrl";

// const NotificationAll = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("admin_token");

//   const fetchNotifications = async () => {
//     if (!token) return;

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
//       console.error("Failed to fetch notifications:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4">All Notifications</h2>

//       {loading && <p className="text-gray-500">Loading...</p>}

//       {!loading && notifications.length === 0 && (
//         <p className="text-gray-500">No notifications found.</p>
//       )}

//       <ul className="space-y-2">
//         {notifications.map((item) => (
//           <li
//             key={item.id}
//             className={`p-3 border rounded-md ${
//               item.is_read ? "bg-white" : "bg-blue-50"
//             }`}
//           >
//             <p>
//               <b>{item.type}</b> application updated
//             </p>
//             <p className="text-xs text-gray-500">
//               {new Date(item.created_at).toLocaleString()}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default NotificationAll;



import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BASE_URL from "../../Api/ApiBaseUrl";
import { Check } from "lucide-react";

const NotificationAll = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);

  const notificationRefs = useRef({});
  const { id } = useParams();
  const location = useLocation();
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    const selectedId =
      location.state?.selectedNotificationId || (id ? Number(id) : null);

    if (selectedId) {
      setSelectedNotificationId(selectedId);
    }
  }, [location.state, id]);

  const fetchNotifications = async () => {
    if (!token) return;
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/admin/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    if (!token || !id) return;

    await fetch(`${BASE_URL}/admin/notifications/${id}/mark-read`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, is_read: true } : n
      )
    );
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (
      selectedNotificationId &&
      notificationRefs.current[selectedNotificationId]
    ) {
      setTimeout(() => {
        const el = notificationRefs.current[selectedNotificationId];
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("highlight-pulse");

        setTimeout(() => {
          el.classList.remove("highlight-pulse");
        }, 2000);
      }, 300);
    }
  }, [selectedNotificationId, notifications]);

  return (
    <div className="p-6 max-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4">All Notifications</h2>

      {loading && <p>Loading...</p>}

      {!loading && (
        <ul className="bg-white border rounded-lg divide-y">
          {notifications.map((item) => {
            const isSelected = item.id === selectedNotificationId;

            return (
              <li
                key={item.id}
                ref={(el) => (notificationRefs.current[item.id] = el)}
                className={`p-4 ${
                  isSelected
                    ? "bg-blue-100 border-l-4 border-blue-500"
                    : item.is_read
                    ? "bg-white"
                    : "bg-blue-50"
                }`}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedNotificationId(item.id);
                    if (!item.is_read) markAsRead(item.id);
                  }}
                >
                  <p className="font-medium">
                    {item.type === "agent"
                      ? "Agent Application"
                      : item.type === "student"
                      ? "Student Application"
                      : "Notification"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>

                {!item.is_read && (
                  <button
                    onClick={() => markAsRead(item.id)}
                    className="mt-2 text-sm text-blue-600 flex items-center gap-1"
                  >
                    <Check size={14} />
                    Mark as read
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <style>{`
        .highlight-pulse {
          animation: pulse 2s ease-in-out;
        }

        @keyframes pulse {
          0% { background-color: rgba(59,130,246,0.15); }
          50% { background-color: rgba(59,130,246,0.35); }
          100% { background-color: rgba(59,130,246,0.15); }
        }
      `}</style>
    </div>
  );
};

export default NotificationAll;
