import Sidebar from "../components/Slidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

const agents = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "01712345678", status: "Approved", active: true },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "01898765432", status: "Rejected", active: false },
];

const Agents = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
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
                  <td className={`p-3 font-semibold ${agent.status === "Approved" ? "text-green-600" : "text-red-600"}`}>
                    {agent.status}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      className={`px-3 py-1 rounded text-white ${agent.active ? "bg-red-500" : "bg-green-500"}`}
                      onClick={() => alert(`${agent.active ? "Deactivated" : "Activated"} agent ID ${agent.id}`)}
                    >
                      {agent.active ? "Deactivate" : "Activate"}
                    </button>
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

