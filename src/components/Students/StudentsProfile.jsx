// import React, { useState } from "react";
// import { X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const StudentsProfile = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     dob: "",
//     gender: "",
//     phone: "",
//     email: "",
//     address: "",
//     passportNumber: "",
//     passportExpiry: "",
//     nationality: "",
//     countryOfResidence: "",
//     desiredProgram: "",
//     preferredIntake: "",
//     studyLevel: "",
//     specialization: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white rounded-lg shadow-md relative">
//       {/* Cross Icon */}
//       <div className="flex justify-end mb-4">
//         <span
//           className="cursor-pointer text-red-500 hover:text-gray-800"
//           onClick={() => navigate(-1)} // go back
//         >
//           <X size={24} />
//         </span>
//       </div>

//       <h1 className="text-2xl font-bold mb-6">Student Profile</h1>
//       <p className="text-black mb-6">Complete your profile information below</p>

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Personal Information */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
//           <h2 className="text-xl font-semibold col-span-full mb-4">
//             Personal Information
//           </h2>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Phone
//             </label>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Date of Birth
//             </label>
//             <input
//               type="date"
//               name="dob"
//               value={formData.dob}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Gender
//             </label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             >
//               <option value="">Select</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Address
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>

//         {/* Passport Information */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
//           <h2 className="text-xl font-semibold col-span-full mb-4">
//             Passport Information
//           </h2>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Passport Number
//             </label>
//             <input
//               type="text"
//               name="passport"
//               value={formData.passport}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Passport Expiry
//             </label>
//             <input
//               type="date"
//               name="passport_expiry"
//               value={formData.passport_expiry}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Country of Residence
//             </label>
//             <input
//               type="text"
//               name="country_of_residence"
//               value={formData.country_of_residence}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>

//         {/* Study Information */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
//           <h2 className="text-xl font-semibold col-span-full mb-4">
//             Study Information
//           </h2>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Destination
//             </label>
//             <input
//               type="text"
//               name="destination"
//               value={formData.destination}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Study Level
//             </label>
//             <input
//               type="text"
//               name="study_level"
//               value={formData.study_level}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Program
//             </label>
//             <input
//               type="text"
//               name="program"
//               value={formData.program}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Intake
//             </label>
//             <input
//               type="text"
//               name="intake"
//               value={formData.intake}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Specialization
//             </label>
//             <input
//               type="text"
//               name="specialization"
//               value={formData.specialization}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             />
//           </div>
//         </div>

//         {/* Education History */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
//           <h2 className="text-xl font-semibold col-span-full mb-4">
//             Education
//           </h2>

//           <input
//             type="text"
//             name="qualification"
//             placeholder="Qualification"
//             value={formData.qualification}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="text"
//             name="institution"
//             placeholder="Institution"
//             value={formData.institution}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="text"
//             name="year"
//             placeholder="Year"
//             value={formData.year}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="text"
//             name="cgpa"
//             placeholder="CGPA"
//             value={formData.cgpa}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Test Information */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
//           <h2 className="text-xl font-semibold col-span-full mb-4">
//             Test Information
//           </h2>

//           <input
//             type="text"
//             name="test_name"
//             placeholder="Test Name (IELTS / TOEFL)"
//             value={formData.test_name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="text"
//             name="test_score"
//             placeholder="Score"
//             value={formData.test_score}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="text"
//             name="test_year"
//             placeholder="Year"
//             value={formData.test_year}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Work Experience */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
//           <h2 className="text-xl font-semibold col-span-full mb-4">
//             Work Experience
//           </h2>

//           <input
//             type="text"
//             name="organization"
//             placeholder="Organization"
//             value={formData.organization}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="text"
//             name="position"
//             placeholder="Position"
//             value={formData.position}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="date"
//             name="start_date"
//             value={formData.start_date}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="date"
//             name="end_date"
//             value={formData.end_date}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <textarea
//             name="description"
//             placeholder="Job Description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md col-span-full"
//           />
//         </div>

//         {/* References */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
//           <h2 className="text-xl font-semibold col-span-full mb-4">
//             References
//           </h2>

//           <input
//             type="text"
//             name="reference_name"
//             placeholder="Reference Name"
//             value={formData.reference_name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="email"
//             name="reference_email"
//             placeholder="Reference Email"
//             value={formData.reference_email}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="text"
//             name="reference_relationship"
//             placeholder="Relationship"
//             value={formData.reference_relationship}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="text"
//             name="reference_phone"
//             placeholder="Phone"
//             value={formData.reference_phone}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Other Information */}
//         <div className="grid grid-cols-1 gap-6 p-6 bg-gray-50 rounded-lg">
//           <h2 className="text-xl font-semibold mb-4">Other Information</h2>

//           <textarea
//             name="sop"
//             placeholder="Statement of Purpose"
//             value={formData.sop}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <textarea
//             name="achievements"
//             placeholder="Achievements"
//             value={formData.achievements}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* File Uploads */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
//           <h2 className="text-xl font-semibold col-span-full mb-4">
//             Documents
//           </h2>

//           <input
//             type="file"
//             name="resume"
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="file"
//             name="passport_copy"
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="file"
//             name="transcripts"
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="file"
//             name="english_test"
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />

//           <input
//             type="file"
//             name="photo"
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Submit */}
//         <div className="flex justify-end mt-6">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
//           >
//             Save Profile
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default StudentsProfile;

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../Api/ApiBaseUrl";

const StudentsProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    
    if (!id || id === "undefined") {
      setError("Invalid student ID");
      setLoading(false);
      return;
    }

    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("authToken") || "your-token-here";

        const response = await fetch(
          `${BASE_URL}/admin/students/detail/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setStudent(data.data);
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

export default StudentsProfile;
