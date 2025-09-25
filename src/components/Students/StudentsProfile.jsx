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
import BASE_URL from "../../Api/ApiBaseUrl";

const StudentsProfile = ({ id }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/students/detail/${id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer 18|ybj64VEXs4lWEHIMGIfzCxsAOg12t781tM0E0zwC59f8edcc",
          },
        });
        const data = await response.json();
        setStudent(data.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (!student) return <div className="text-center py-6 text-red-500">No data found</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Profile Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6">
        <img
          src={`http://127.0.0.1:8000/${student.photo}`}
          alt={student.name}
          className="w-32 h-32 object-cover rounded-full border-4 border-indigo-500 shadow-md"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{student.name}</h1>
          <p className="text-gray-600">{student.email}</p>
          <p className="text-sm text-gray-500">Destination: {student.destination}</p>
          <p className="text-sm text-gray-500">Program: {student.program}</p>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3 text-indigo-600">Personal Info</h2>
          <p><span className="font-medium">Phone:</span> {student.phone}</p>
          <p><span className="font-medium">Gender:</span> {student.gender}</p>
          <p><span className="font-medium">DOB:</span> {student.dob}</p>
          <p><span className="font-medium">Nationality:</span> {student.nationality}</p>
          <p><span className="font-medium">Address:</span> {student.address}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-3 text-indigo-600">Passport Info</h2>
          <p><span className="font-medium">Passport:</span> {student.passport}</p>
          <p><span className="font-medium">Expiry:</span> {student.passport_expiry}</p>
          <p><span className="font-medium">Country of Residence:</span> {student.country_of_residence}</p>
        </div>
      </div>

      {/* Academic Qualifications */}
      <div className="bg-white p-6 rounded-xl shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-3 text-indigo-600">Academic Qualifications</h2>
        {student.academic_qualifications?.map((q, idx) => (
          <div key={idx} className="border-b py-2">
            <p><span className="font-medium">Degree:</span> {q.degree}</p>
            <p><span className="font-medium">Institution:</span> {q.institution}</p>
            <p><span className="font-medium">Year:</span> {q.year}</p>
            <p><span className="font-medium">CGPA:</span> {q.cgpa}</p>
          </div>
        ))}
      </div>

      {/* Test Scores */}
      <div className="bg-white p-6 rounded-xl shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-3 text-indigo-600">Test Scores</h2>
        {student.test_scores?.map((t, idx) => (
          <div key={idx} className="border-b py-2">
            <p><span className="font-medium">Test:</span> {t.test_name}</p>
            <p><span className="font-medium">Score:</span> {t.score}</p>
            <p><span className="font-medium">Date:</span> {t.date}</p>
          </div>
        ))}
      </div>

      {/* Work Experience */}
      <div className="bg-white p-6 rounded-xl shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-3 text-indigo-600">Work Experience</h2>
        {student.work_experiences?.map((w, idx) => (
          <div key={idx} className="border-b py-2">
            <p><span className="font-medium">Organization:</span> {w.organization}</p>
            <p><span className="font-medium">Position:</span> {w.position}</p>
            <p><span className="font-medium">Duration:</span> {w.start_date} - {w.end_date}</p>
            <p><span className="font-medium">Description:</span> {w.description}</p>
          </div>
        ))}
      </div>

      {/* References */}
      <div className="bg-white p-6 rounded-xl shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-3 text-indigo-600">References</h2>
        {student.references?.map((r, idx) => (
          <div key={idx} className="border-b py-2">
            <p><span className="font-medium">Name:</span> {r.name}</p>
            <p><span className="font-medium">Email:</span> {r.email}</p>
            <p><span className="font-medium">Phone:</span> {r.phone}</p>
            <p><span className="font-medium">Relationship:</span> {r.relationship}</p>
          </div>
        ))}
      </div>

      {/* SOP & Achievements */}
      <div className="bg-white p-6 rounded-xl shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-3 text-indigo-600">Other Info</h2>
        <p><span className="font-medium">SOP:</span> {student.sop}</p>
        <p><span className="font-medium">Achievements:</span> {student.achievements}</p>
      </div>

      {/* Documents */}
      <div className="bg-white p-6 rounded-xl shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-3 text-indigo-600">Documents</h2>
        <p>
          <a
            href={`http://127.0.0.1:8000/${student.resume}`}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-500 underline"
          >
            Resume
          </a>
        </p>
        {student.transcripts && (
          <p>
            <a
              href={`http://127.0.0.1:8000/${student.transcripts}`}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-500 underline"
            >
              Transcripts
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentsProfile;



