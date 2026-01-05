import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Program = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 relative">
      {/* Cross / Close Icon */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-600"
      >
        <X size={24} />
      </button>

      <h1 className="text-2xl font-semibold">
        Program Apply of student
      </h1>
    </div>
  );
};

export default Program;