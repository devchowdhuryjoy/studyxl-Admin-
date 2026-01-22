// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import BASE_URL from "../Api/ApiBaseUrl";
// import { Eye } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const statusOptions = ["Approved", "Rejected", "Pending"];
// const actionOptions = ["Activate", "Deactivate"];

// const Agents = () => {
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch agents from backend
//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/admin/all-user`);
//         if (!response.ok)
//           throw new Error(`HTTP error! status: ${response.status}`);
//         const data = await response.json();
//         console.log("Fetched agents:", data);

//         // default Pending if backend has no status
//         const formattedData = data.map((agent) => ({
//           ...agent,
//           status: agent.is_approved ? "Approved" : "Pending", // use is_approved from backend
//           active: agent.status === "active" || agent.active === true, // handle active/deactivate
//         }));

//         setAgents(formattedData);
//       } catch (error) {
//         console.error("Error fetching agents:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAgents();
//   }, []);

//   // Status dropdown → only admin can change
//   const handleStatusChange = async (id, newStatus) => {
//     if (newStatus === "Pending") return; // Pending option is fixed/disabled

//     let apiEndpoint = "";
//     if (newStatus === "Approved")
//       apiEndpoint = `${BASE_URL}/admin/approve-agent/${id}`;
//     else if (newStatus === "Rejected")
//       apiEndpoint = `${BASE_URL}/admin/reject-agent/${id}`;

//     try {
//       const response = await fetch(apiEndpoint, { method: "GET" });
//       if (!response.ok)
//         throw new Error(`HTTP error! status: ${response.status}`);
//       const result = await response.text();
//       console.log(result);

//       // Update frontend state
//       setAgents((prev) =>
//         prev.map((agent) =>
//           agent.id === id
//             ? {
//                 ...agent,
//                 status: newStatus,
//                 is_approved: newStatus === "Approved",
//               }
//             : agent
//         )
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: `Status changed to ${newStatus}`,
//       });
//     } catch (error) {
//       console.error("Error updating status:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to update status",
//       });
//     }
//   };

//   // Action dropdown → Activate/Deactivate
//   const handleActionChange = async (id, action) => {
//     const apiEndpoint =
//       action === "Activate"
//         ? `${BASE_URL}/admin/activate-agent/${id}`
//         : `${BASE_URL}/admin/deactivate-agent/${id}`;

//     try {
//       const response = await fetch(apiEndpoint, { method: "GET" });
//       if (!response.ok)
//         throw new Error(`HTTP error! status: ${response.status}`);
//       const result = await response.text();
//       console.log(result);

//       // Update frontend state
//       setAgents((prev) =>
//         prev.map((agent) =>
//           agent.id === id ? { ...agent, active: action === "Activate" } : agent
//         )
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: `Action changed to ${action}`,
//       });
//     } catch (error) {
//       console.error("Error updating action:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to update action",
//       });
//     }
//   };

//   if (loading) return <div className="p-6">Loading agents...</div>;

//   return (
//     <div className="flex">
//       <div className="flex-1 flex flex-col">
//         <main className="p-6">
//           <h2 className="text-xl font-semibold mb-4">Agents</h2>
//           <table className="w-full bg-white shadow rounded overflow-hidden">
//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="p-3 text-left">ID</th>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Email</th>
//                 <th className="p-3 text-left">Phone</th>
//                 <th className="p-3 text-left">Status</th>
//                 <th className="p-3 text-left">Action</th>
//                 <th className="p-3 text-left">View Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {agents.map((agent) => (
//                 <tr key={agent.id} className="border-b hover:bg-gray-50">
//                   <td className="p-3">{agent.id}</td>
//                   <td className="p-3">
//                     {agent.first_name} {agent.last_name}
//                   </td>
//                   <td className="p-3">{agent.email}</td>
//                   <td className="p-3">{agent.phone_number}</td>
//                   <td className="p-3">
//                     <select
//                       value={agent.status}
//                       onChange={(e) =>
//                         handleStatusChange(agent.id, e.target.value)
//                       }
//                       className={`p-1 rounded border ${
//                         agent.status === "Approved"
//                           ? "text-green-600"
//                           : agent.status === "Rejected"
//                           ? "text-red-600"
//                           : "text-gray-600"
//                       }`}
//                     >
//                       {statusOptions.map((status) => (
//                         <option
//                           key={status}
//                           value={status}
//                           disabled={status === "Pending"} // disable pending option
//                         >
//                           {status}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="p-3">
//                     <select
//                       value={agent.active ? "Activate" : "Deactivate"}
//                       onChange={(e) =>
//                         handleActionChange(agent.id, e.target.value)
//                       }
//                       className={`p-1 rounded border ${
//                         agent.active
//                           ? "bg-primary text-white"
//                           : "bg-green-500 text-white"
//                       }`}
//                     >
//                       {actionOptions.map((action) => (
//                         <option key={action} value={action}>
//                           {action}
//                         </option>
//                       ))}
//                     </select>
//                   </td>

//                   <td className="p-3">
//                     <button
//                       onClick={() =>
//                         navigate(`/dashboard/agent-details/${agent.id}`)
//                       }
//                       className="text-blue-500 hover:text-blue-700 ml-7"
//                     >
//                       <Eye size={20} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Agents;

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../Api/ApiBaseUrl";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusOptions = ["Approved", "Rejected", "Pending"];
const actionOptions = ["Activate", "Deactivate"];

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ================= FETCH AGENTS =================
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/all-user`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched agents:", data);

        // ✅ FIX: API returns { status, total_agents, agents: [] }
        const agentList = Array.isArray(data.agents) ? data.agents : [];

        const formattedData = agentList.map((agent) => ({
          ...agent,
          status:
            agent.is_approved === "1"
              ? "Approved"
              : agent.is_approved === "0"
              ? "Rejected"
              : "Pending",
          active: agent.status === "active" || agent.active === true,
        }));

        setAgents(formattedData);
      } catch (error) {
        console.error("Error fetching agents:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load agents",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  // ================= STATUS CHANGE =================
  const handleStatusChange = async (id, newStatus) => {
    if (newStatus === "Pending") return;

    let apiEndpoint = "";
    if (newStatus === "Approved") {
      apiEndpoint = `${BASE_URL}/admin/approve-agent/${id}`;
    } else if (newStatus === "Rejected") {
      apiEndpoint = `${BASE_URL}/admin/reject-agent/${id}`;
    }

    try {
      const response = await fetch(apiEndpoint, { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();

      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === id
            ? {
              ...agent,
              status: newStatus,
              is_approved: newStatus === "Approved" ? "1" : "0",
            }
            : agent
        )
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update status",
      });
    }
  };

  // ================= ACTIVATE / DEACTIVATE =================
  const handleActionChange = async (id, action) => {
    const apiEndpoint =
      action === "Activate"
        ? `${BASE_URL}/admin/activate-agent/${id}`
        : `${BASE_URL}/admin/deactivate-agent/${id}`;

    try {
      const response = await fetch(apiEndpoint, { method: "GET" });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();

      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === id
            ? { ...agent, active: action === "Activate" }
            : agent
        )
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Agent ${action}d successfully`,
      });
    } catch (error) {
      console.error("Error updating action:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update action",
      });
    }
  };

  if (loading) {
    return <div className="p-6 text-lg">Loading agents...</div>;
  }

  // ================= UI =================
  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold mb-4">Agents</h2>
      <div className="bg-white shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
          <table className="w-full bg-white shadow rounded overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
                <th className="p-3 text-left">View</th>
              </tr>
            </thead>

            <tbody>
              {agents.map((agent) => (
                <tr
                  key={agent.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{agent.id}</td>
                  <td className="p-3">
                    {agent.first_name} {agent.last_name}
                  </td>
                  <td className="p-3">{agent.email}</td>
                  <td className="p-3">{agent.phone_number}</td>

                  {/* STATUS */}
                  <td className="p-3">
                    <select
                      value={agent.status}
                      onChange={(e) => handleStatusChange(agent.id, e.target.value)}
                      className={`p-1 rounded border ${agent.status === "Approved"
                          ? "text-green-600"
                          : agent.status === "Rejected"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                    >
                      {statusOptions.map((status) => (
                        <option
                          key={status}
                          value={status}
                          disabled={status === "Pending"}
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* ACTION */}
                  <td className="p-3">
                    <select
                      value={agent.active ? "Activate" : "Deactivate"}
                      onChange={(e) => handleActionChange(agent.id, e.target.value)}
                      className={`p-1 rounded border ${agent.active
                          ? "bg-primary text-white"
                          : "bg-green-500 text-white"
                        }`}
                    >
                      {actionOptions.map((action) => (
                        <option key={action} value={action}>
                          {action}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* VIEW */}
                  <td className="p-3 text-center">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/agent-details/${agent.id}`)
                      }
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}

              {agents.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500">
                    No agents found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Agents;
