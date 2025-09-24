import React, { useState } from "react";
import { ChevronDown, ChevronRight, Eye, User, School } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AgentStudentProfile = () => {
  const navigate = useNavigate();
  const [expandedAgent, setExpandedAgent] = useState(null);

  // Demo Data
  const agents = [
    {
      agentId: "123456",
      agentName: "Global Education Agency",
      students: [
        {
          studentId: "STU001",
          fullName: "John Doe",
        },
        {
          studentId: "STU002",
          fullName: "Alice Smith",
        },
      ],
    },
    {
      agentId: "654321",
      agentName: "Study Abroad Consultants",
      students: [
        {
          studentId: "STU003",
          fullName: "Michael Brown",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Agents & Students</h1>

      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border text-left">Agent ID</th>
            <th className="p-3 border text-left">Agent Name</th>
            <th className="p-3 border text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, index) => (
            <React.Fragment key={index}>
              {/* Agent Row */}
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

              {/* Student Rows */}
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
                          onClick={() => navigate("/dashboard/agent-student-profile-university")}
                        >
                          <User size={18} />
                        </span>
                        <span
                          className="cursor-pointer hover:text-blue-600"
                          onClick={() => navigate("/university")}
                        >
                          <School size={18} />
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
