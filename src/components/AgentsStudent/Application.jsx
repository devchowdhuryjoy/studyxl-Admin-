import React, { useEffect, useState } from "react";
import BASE_URL from "../../Api/ApiBaseUrl";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

//EXACT token getter function
const getAuthToken = () => {
  return localStorage.getItem("admin_token");
};

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Unauthorized: Token not found");
      }

      const response = await fetch(`${BASE_URL}/admin/agent-applications`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Applications API Response:", result);

      // First check the exact structure of API response
      console.log("Result data structure:", result);
      console.log("Result.data:", result?.data);

      // If result.data is an array, map it
      let applicationsData = [];
      if (Array.isArray(result?.data)) {
        applicationsData = result.data;
      } else if (Array.isArray(result)) {
        applicationsData = result;
      } else if (result?.applications && Array.isArray(result.applications)) {
        applicationsData = result.applications;
      }

      console.log("Applications data to map:", applicationsData);

      const formatted = applicationsData.map((item) => {
        console.log("Single application item:", item);

        // Try to get agent info from different possible structures
        let agentName = "Unknown";
        let agentId = "N/A";

        // Check different possible structures for agent info
        if (item.agent_name) {
          agentName = item.agent_name;
        } else if (item.agent && typeof item.agent === "object") {
          // If agent is an object
          if (item.agent.name) {
            agentName = item.agent.name;
          } else if (item.agent.first_name || item.agent.last_name) {
            agentName = `${item.agent.first_name || ""} ${
              item.agent.last_name || ""
            }`.trim();
          }
          agentId = item.agent.id || "N/A";
        } else if (item.agent_first_name || item.agent_last_name) {
          agentName = `${item.agent_first_name || ""} ${
            item.agent_last_name || ""
          }`.trim();
        }

        if (item.agent_id) {
          agentId = item.agent_id;
        }

        return {
          id: item.id || item.application_id || "N/A",
          agent_name: agentName,
          agent_id: agentId,
          studentName: item.student_name || item.student?.name || "Unknown",
          studentId: item.student_id || item.student?.id || "N/A",
          program: item.program_name || item.program?.name || "N/A",
          university: item.university_name || item.university?.name || "N/A",
          status: ["Accepted", "Rejected", "Submitted"].includes(item.status)
            ? item.status
            : "Pending",
          submittedAt:
            item.submitted_at || item.created_at?.slice(0, 10) || "N/A",
        };
      });

      console.log("Formatted applications:", formatted);
      setApplications(formatted);
    } catch (err) {
      console.error("Error in fetchApplications:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const paginatedApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading applications...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
        My Applications
      </h2>

      {/* <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
        <table className="min-w-full divide-y text-xs sm:text-base">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-4 py-3">Application ID</th>
              <th className="px-4 py-3">Agent Name</th>
              <th className="px-4 py-3">Agent ID</th>
              <th className="px-4 py-3">Student Name</th>
              <th className="px-4 py-3">Student ID</th>
              <th className="px-4 py-3">Program</th>
              <th className="px-4 py-3">University Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted Date</th>
            </tr>
          </thead>

          <tbody>
            {paginatedApplications.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-4 py-6 text-center text-gray-500">
                  No applications found
                </td>
              </tr>
            ) : (
              paginatedApplications.map((app) => (
                <tr key={app.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">APP-{app.id}</td>
                  <td className="px-4 py-2">{app.agent_name}</td>
                  <td className="px-4 py-2 font-medium">{app.agent_id}</td>
                  <td className="px-4 py-2">{app.studentName}</td>
                  <td className="px-4 py-2">{app.studentId}</td>
                  <td className="px-4 py-2">{app.program}</td>
                  <td className="px-4 py-2">{app.university}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
                        app.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : app.status === "Submitted"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{app.submittedAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div> */}

      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-100">
        <table className="min-w-full divide-y text-xs sm:text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-3 py-2">Application ID</th>
              <th className="px-3 py-2">Agent Name</th>
              <th className="px-3 py-2">Agent ID</th>
              <th className="px-3 py-2">Student Name</th>
              <th className="px-3 py-2">Student ID</th>
              <th className="px-3 py-2">Program</th>
              <th className="px-3 py-2">University Name</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Submitted Date</th>
              <th className="px-3 py-2">View Application</th>
            </tr>
          </thead>

          <tbody>
            {paginatedApplications.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="px-3 py-4 text-center text-gray-500 text-xs sm:text-sm"
                >
                  No applications found
                </td>
              </tr>
            ) : (
              paginatedApplications.map((app) => (
                <tr key={app.id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium text-xs sm:text-sm">
                    APP-{app.id}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm">
                    {app.agent_name}
                  </td>
                  <td className="px-3 py-2 font-medium text-xs sm:text-sm">
                    {app.agent_id}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm">
                    {app.studentName}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm">
                    {app.studentId}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm">
                    {app.program}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm">
                    {app.university}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] sm:text-xs ${
                        app.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : app.status === "Submitted"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm">
                    {app.submittedAt}
                  </td>
                  <td className="px-3 py-2 text-xs sm:text-sm">
                    <Link
                      to={`application-details/${app.id}`}
                      className="flex items-center justify-center text-primary hover:text-secondary"
                      title="View Application"
                    >
                      <Eye size={18} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-secondary text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Application;
