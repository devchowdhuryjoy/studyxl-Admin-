import React, { useEffect, useState } from "react";
import BASE_URL from "../Api/ApiBaseUrl";
import { User, School } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const token = localStorage.getItem("token");
        const token = localStorage.getItem("admin_token");
        if (!token) throw new Error("No auth token found");

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const response = await fetch(`${BASE_URL}/admin/all/students`, {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        });

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log("Students API:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="p-6">⏳ Loading students...</div>;
  if (!users.length) return <div className="p-6"> No students found</div>;

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <main className="p-4">
          <h2 className="text-xl font-semibold mb-4">Students</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow rounded overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left whitespace-nowrap">ID</th>
                  <th className="p-3 text-left whitespace-nowrap">Full Name</th>
                  <th className="p-3 text-left whitespace-nowrap">Email</th>
                  <th className="p-3 text-left whitespace-nowrap">Destination</th>
                  <th className="p-3 text-left whitespace-nowrap">Study Level</th>
                  <th className="p-3 text-left whitespace-nowrap">Nationality</th>
                  <th className="p-3 text-left whitespace-nowrap">Elp</th>
                  <th className="p-3 text-left whitespace-nowrap">Test Score</th>
                  <th className="p-3 text-left whitespace-nowrap">Passport</th>
                  <th className="p-3 text-left whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 whitespace-nowrap">{u.id}</td>
                    <td className="p-3 whitespace-nowrap">{u.name || "-"}</td>
                    <td className="p-3 whitespace-nowrap">{u.email || "-"}</td>
                    <td className="p-3 whitespace-nowrap">{u.destination || "-"}</td>
                    <td className="p-3 whitespace-nowrap">{u.study_level || "-"}</td>
                    <td className="p-3 whitespace-nowrap">{u.nationality || "-"}</td>
                    <td className="p-3 whitespace-nowrap">{u.elp || "-"}</td>
                    <td className="p-3 whitespace-nowrap">{u.subject || "-"}</td>
                    <td className="p-3 whitespace-nowrap">{u.passport || "-"}</td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <span
                          className="cursor-pointer hover:text-blue-600"
                          onClick={() => navigate(`/dashboard/student-profile/${u.id}`)}
                        >
                          <User size={18} />
                        </span>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;
