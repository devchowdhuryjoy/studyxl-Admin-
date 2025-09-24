import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const AgentsStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    passportNumber: "",
    passportExpiry: "",
    nationality: "",
    countryOfResidence: "",
    desiredProgram: "",
    preferredIntake: "",
    studyLevel: "",
    specialization: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md relative">
      {/* Cross Icon */}
      <div className="flex justify-end mb-4">
        <span
          className="cursor-pointer text-red-500 hover:text-gray-800"
          onClick={() => navigate(-1)} // go back
        >
          <X size={24} />
        </span>
      </div>

      <h1 className="text-2xl font-bold mb-6">Student Profile</h1>

      <p className="text-black mb-6">Complete your profile information below</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold col-span-full mb-4">
            Personal Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Passport Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold col-span-full mb-4">
            Passport Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passport Number
            </label>
            <input
              type="text"
              name="passport"
              value={formData.passport}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passport Expiry
            </label>
            <input
              type="date"
              name="passport_expiry"
              value={formData.passport_expiry}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country of Residence
            </label>
            <input
              type="text"
              name="country_of_residence"
              value={formData.country_of_residence}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Study Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold col-span-full mb-4">
            Study Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Study Level
            </label>
            <input
              type="text"
              name="study_level"
              value={formData.study_level}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program
            </label>
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Intake
            </label>
            <input
              type="text"
              name="intake"
              value={formData.intake}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Education History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold col-span-full mb-4">
            Education
          </h2>

          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            name="institution"
            placeholder="Institution"
            value={formData.institution}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            name="cgpa"
            placeholder="CGPA"
            value={formData.cgpa}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Test Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold col-span-full mb-4">
            Test Information
          </h2>

          <input
            type="text"
            name="test_name"
            placeholder="Test Name (IELTS / TOEFL)"
            value={formData.test_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            name="test_score"
            placeholder="Score"
            value={formData.test_score}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            name="test_year"
            placeholder="Year"
            value={formData.test_year}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Work Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold col-span-full mb-4">
            Work Experience
          </h2>

          <input
            type="text"
            name="organization"
            placeholder="Organization"
            value={formData.organization}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md col-span-full"
          />
        </div>

        {/* References */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold col-span-full mb-4">
            References
          </h2>

          <input
            type="text"
            name="reference_name"
            placeholder="Reference Name"
            value={formData.reference_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="email"
            name="reference_email"
            placeholder="Reference Email"
            value={formData.reference_email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            name="reference_relationship"
            placeholder="Relationship"
            value={formData.reference_relationship}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            name="reference_phone"
            placeholder="Phone"
            value={formData.reference_phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Other Information */}
        <div className="grid grid-cols-1 gap-6 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Other Information</h2>

          <textarea
            name="sop"
            placeholder="Statement of Purpose"
            value={formData.sop}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <textarea
            name="achievements"
            placeholder="Achievements"
            value={formData.achievements}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold col-span-full mb-4">
            Documents
          </h2>

          <input
            type="file"
            name="resume"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="file"
            name="passport_copy"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="file"
            name="transcripts"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="file"
            name="english_test"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="file"
            name="photo"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentsStudent;
