import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, User, School } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../Api/ApiBaseUrl";

const AgentStudentProfile = () => {
  const navigate = useNavigate();
  const [expandedAgent, setExpandedAgent] = useState(null);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/agent/all/agent-student`, {
          method: "GET",
          redirect: "follow",
        });

        const result = await response.json();
        // console.log("API result:", result);

        const students = result.data || [];

        // Group students by agent
        const grouped = students.reduce((acc, student) => {
          const agentId = student.agent_id;
          const agentName = student.company_name;

          if (!acc[agentId]) {
            acc[agentId] = {
              agentId,
              agentName,
              students: [],
            };
          }

          acc[agentId].students.push({
            studentId: student.id,
            fullName: student.name,
          });

          return acc;
        }, {});

        // Convert grouped object to array
        setAgents(Object.values(grouped));
      } catch (error) {
        console.error("Error fetching agents:", error);
        setAgents([]);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Agents & Students</h1>

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border text-left">Agent ID</th>
            <th className="p-3 border text-left">Agency Name</th>
            <th className="p-3 border text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, index) => (
            <React.Fragment key={index}>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border">{agent.agentId}</td>
                <td className="p-3 border">{agent.agentName}</td>
                <td
                  className="p-3 border text-center cursor-pointer"
                  onClick={() =>
                    setExpandedAgent(
                      expandedAgent === agent.agentId ? null : agent.agentId
                    )
                  }
                >
                  {expandedAgent === agent.agentId ? (
                    <ChevronDown />
                  ) : (
                    <ChevronRight />
                  )}
                </td>
              </tr>

              {expandedAgent === agent.agentId &&
                agent.students.map((student, sIndex) => (
                  <tr key={sIndex} className="bg-gray-50">
                    <td className="p-3 border pl-10" colSpan={2}>
                      {student.studentId} - {student.fullName}
                    </td>
                    <td className="p-3 border text-center whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <span
                          className="cursor-pointer hover:text-blue-600"
                          onClick={() =>
                            navigate(
                              `/dashboard/agent-student-profile-two/${student.studentId}`
                            )
                          }
                        >
                          <User size={18} />
                        </span>
                       
                      </div>
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentStudentProfile;
