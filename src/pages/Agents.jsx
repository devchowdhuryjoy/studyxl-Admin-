import { useState } from "react";


const initialAgents = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "01712345678", status: "Approved", active: true },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "01898765432", status: "Rejected", active: false },
];

const statusOptions = ["Approved", "Rejected", "Pending"];
const actionOptions = ["Activate", "Deactivate"];

const Agents = () => {
  const [agents, setAgents] = useState(initialAgents);

  const handleStatusChange = (id, newStatus) => {
    setAgents((prev) =>
      prev.map((agent) => (agent.id === id ? { ...agent, status: newStatus } : agent))
    );
  };

  const handleActionChange = (id, action) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id
          ? { ...agent, active: action === "Activate" ? true : false }
          : agent
      )
    );
  };

  return (
    <div className="flex">
      
      <div className="flex-1 flex flex-col">
        
        <main className="p-6">
          <h2 className="text-xl font-semibold mb-4">Agents</h2>
          <table className="w-full bg-white shadow rounded overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{agent.id}</td>
                  <td className="p-3">{agent.name}</td>
                  <td className="p-3">{agent.email}</td>
                  <td className="p-3">{agent.phone}</td>
                  <td className="p-3">
                    <select
                      value={agent.status}
                      onChange={(e) => handleStatusChange(agent.id, e.target.value)}
                      className={`p-1 rounded border ${agent.status === "Approved" ? "text-green-600" : "text-red-600"}`}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3">
                    <select
                      value={agent.active ? "Deactivate" : "Activate"}
                      onChange={(e) => handleActionChange(agent.id, e.target.value)}
                      className={`p-1 rounded border ${agent.active ? "bg-primary text-white" : "bg-green-500 text-white"}`}
                    >
                      {actionOptions.map((action) => (
                        <option key={action} value={action}>
                          {action}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Agents;
