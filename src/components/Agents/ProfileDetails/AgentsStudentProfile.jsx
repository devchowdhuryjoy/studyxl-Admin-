

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../../Api/ApiBaseUrl";

const AgentsStudentProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  if (!id) {
    setError("Invalid student ID");
    setLoading(false);
    return;
  }

  const fetchStudent = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Authorization token missing");
        setLoading(false);
        return;
      }

      const response = await fetch(`${BASE_URL}/agent-student/edit/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      

      if (data.success) {
        
        let found;
        if (Array.isArray(data.data)) {
          found = data.data.find((s) => String(s.id) === String(id));
        } else {
          found = data.data;
        }

        if (found) {
         
          const parsedStudent = {
            ...found,
            academic_qualifications: found.academic_qualifications
              ? JSON.parse(found.academic_qualifications)
              : [],
            work_experiences: found.work_experiences
              ? JSON.parse(found.work_experiences)
              : [],
            test_scores: found.test_scores
              ? JSON.parse(found.test_scores)
              : [],
            references: found.references
              ? JSON.parse(found.references)
              : [],
          };
          setStudent(parsedStudent);
        } else {
          setError("Student not found");
        }
      } else {
        setError(data.message || "Failed to fetch student data");
      }
    } catch (error) {
      console.error("Error fetching student:", error);
      setError("Error loading student profile");
    } finally {
      setLoading(false);
    }
  };

  fetchStudent();
}, [id]);


  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Student Profile</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-red-500 hover:text-black"
          >
            <X size={24} />
          </button>
        </div>
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f16f22] mx-auto"></div>
          <p className="mt-4 text-black">Loading student profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !student) {
    return (
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Student Profile</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-red-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>
        </div>
        <div className="text-center py-10 text-red-500">
          <p className="text-lg font-medium">
            {error || "No student data found"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-[#f16f22] text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Helper function to handle empty values
  const displayValue = (value) => value || "Not provided";

  // Helper function to format file URLs
  const getFileUrl = (filePath) => {
    if (!filePath) return null;
    return filePath.startsWith("http")
      ? filePath
      : `${BASE_URL}/${filePath.replace(/^\//, "")}`;
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Profile</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-red-500 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6 mb-6">
        <img
          src="/profileright.jpg"
          alt="Student Avatar"
          className="w-32 h-32 object-cover rounded-full border-4 border-[#f16f22] shadow-md"
        />

        <div>
          <h1 className="text-2xl font-bold text-black">
            {displayValue(student.name)}
          </h1>
          <p className="text-black">{displayValue(student.email)}</p>
          <p className="text-sm text-black">
            Destination: {displayValue(student.destination)}
          </p>
          <p className="text-sm text-black">
            Program: {displayValue(student.program)}
          </p>
          <p className="text-sm text-black">
            Study Level: {displayValue(student.study_level)}
          </p>
        </div>
      </div>

      {/* Basic Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Personal Information */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3 text-[#f16f22]">
            Personal Information
          </h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {displayValue(student.phone)}
            </p>
            <p>
              <span className="font-medium">Gender:</span>{" "}
              {displayValue(student.gender)}
            </p>
            <p>
              <span className="font-medium">Date of Birth:</span>{" "}
              {displayValue(student.dob)}
            </p>
            <p>
              <span className="font-medium">Nationality:</span>{" "}
              {displayValue(student.nationality)}
            </p>
            <p>
              <span className="font-medium">Address:</span>{" "}
              {displayValue(student.address)}
            </p>
          </div>
        </div>

        {/* Passport Information */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3 text-[#f16f22]">
            Passport Information
          </h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Passport Number:</span>{" "}
              {displayValue(student.passport)}
            </p>
            <p>
              <span className="font-medium">Expiry Date:</span>{" "}
              {displayValue(student.passport_expiry)}
            </p>
            <p>
              <span className="font-medium">Country of Residence:</span>{" "}
              {displayValue(student.country_of_residence)}
            </p>
          </div>
        </div>
      </div>

      {/* Study Information */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-3 text-[#f16f22]">
          Study Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <span className="font-medium">Destination:</span>{" "}
            {displayValue(student.destination)}
          </p>
          <p>
            <span className="font-medium">Study Level:</span>{" "}
            {displayValue(student.study_level)}
          </p>
          <p>
            <span className="font-medium">Program:</span>{" "}
            {displayValue(student.program)}
          </p>
          <p>
            <span className="font-medium">Intake:</span>{" "}
            {displayValue(student.intake)}
          </p>
          <p>
            <span className="font-medium">Specialization:</span>{" "}
            {displayValue(student.specialization)}
          </p>
        </div>
      </div>

      {/* Academic Qualifications */}
      {student.academic_qualifications &&
        student.academic_qualifications.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-3 text-[#f16f22]">
              Academic Qualifications
            </h2>
            <div className="space-y-4">
              {student.academic_qualifications.map((qualification, index) => (
                <div key={index} className="border-l-4 border-[#f16f22] pl-4">
                  <p>
                    <span className="font-medium">Qualification:</span>{" "}
                    {displayValue(qualification.qualification)}
                  </p>
                  <p>
                    <span className="font-medium">Institution:</span>{" "}
                    {displayValue(qualification.institution)}
                  </p>
                  <p>
                    <span className="font-medium">Year:</span>{" "}
                    {displayValue(qualification.year)}
                  </p>
                  <p>
                    <span className="font-medium">CGPA/Percentage:</span>{" "}
                    {displayValue(qualification.cgpa)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Test Scores */}
      {student.test_scores && student.test_scores.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-3 text-[#f16f22]">
            Test Scores
          </h2>
          <div className="space-y-4">
            {student.test_scores.map((test, index) => (
              <div key={index} className="border-l-4 border-[#f16f22] pl-4">
                <p>
                  <span className="font-medium">Test:</span>{" "}
                  {displayValue(test.test_name)}
                </p>
                <p>
                  <span className="font-medium">Score:</span>{" "}
                  {displayValue(test.score)}
                </p>
                <p>
                  <span className="font-medium">Year:</span>{" "}
                  {displayValue(test.year)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {student.work_experiences && student.work_experiences.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-3 text-[#f16f22]">
            Work Experience
          </h2>
          <div className="space-y-4">
            {student.work_experiences.map((work, index) => (
              <div key={index} className="border-l-4 border-[#f16f22] pl-4">
                <p>
                  <span className="font-medium">Organization:</span>{" "}
                  {displayValue(work.organization)}
                </p>
                <p>
                  <span className="font-medium">Position:</span>{" "}
                  {displayValue(work.position)}
                </p>
                <p>
                  <span className="font-medium">Duration:</span>{" "}
                  {displayValue(work.start_date)} -{" "}
                  {displayValue(work.end_date)}
                </p>
                <p>
                  <span className="font-medium">Description:</span>{" "}
                  {displayValue(work.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents Section */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-3 text-[#f16f22]">
          Documents
        </h2>
        <div className="space-y-2">
          {student.resume && (
            <p>
              <span className="font-medium">Resume:</span>{" "}
              <a
                href={getFileUrl(student.resume)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f16f22] hover:underline"
              >
                View Resume
              </a>
            </p>
          )}
          {student.transcripts && (
            <p>
              <span className="font-medium">Transcripts:</span>{" "}
              <a
                href={getFileUrl(student.transcripts)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f16f22] hover:underline"
              >
                View Transcripts
              </a>
            </p>
          )}
          {student.passport_copy && (
            <p>
              <span className="font-medium">Passport Copy:</span>{" "}
              <a
                href={getFileUrl(student.passport_copy)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f16f22] hover:underline"
              >
                View Passport
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentsStudentProfile;





