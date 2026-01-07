import React, { useEffect, useState } from "react";
import BASE_URL from "../../Api/ApiBaseUrl";

const NotificationAll = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

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
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Notifications</h2>

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && notifications.length === 0 && (
        <p className="text-gray-500">No notifications found.</p>
      )}

      <ul className="space-y-2">
        {notifications.map((item) => (
          <li
            key={item.id}
            className={`p-3 border rounded-md ${
              item.is_read ? "bg-white" : "bg-blue-50"
            }`}
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
  );
};

export default NotificationAll;

