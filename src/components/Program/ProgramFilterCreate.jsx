import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BASE_URL from "../../Api/ApiBaseUrl";

const ProgramFilterCreate = () => {
  // Get token from localStorage
  const authToken = localStorage.getItem("admin_token") || "";
  
  // Loading states for each form
  const [loading, setLoading] = useState({
    programLevel: false,
    intake: false,
    programTag: false,
    fieldOfStudy: false,
    subject: false,
    month: false
  });

  // Form data states
  const [formData, setFormData] = useState({
    // Program Level
    programLevelName: "",
    
    // Intake
    intakeName: "",
    
    // Program Tag
    programTagName: "",
    
    // Field of Study
    fieldOfStudyName: "",
    
    // Subject
    subjectName: "",
    selectedFieldOfStudyId: "",
    
    // Month
    monthName: "",
    selectedIntakeId: "",
    openDate: "",
    submissionDeadline: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // 1. Create Program Level
  const handleCreateProgramLevel = async (e) => {
    e.preventDefault();
    
    if (!formData.programLevelName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter Program Level name",
      });
      return;
    }

    setLoading(prev => ({ ...prev, programLevel: true }));

    try {
      const response = await axios.post(
        `${BASE_URL}/admin/program/level/store`,
        {
          name: formData.programLevelName
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Program Level Response:", response.data);
      
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Program Level created successfully!",
      });

      // Reset form
      setFormData(prev => ({ ...prev, programLevelName: "" }));

    } catch (error) {
      console.error("Error creating Program Level:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to create Program Level",
      });
    } finally {
      setLoading(prev => ({ ...prev, programLevel: false }));
    }
  };

  // 2. Create Intake
  const handleCreateIntake = async (e) => {
    e.preventDefault();
    
    if (!formData.intakeName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter Intake name",
      });
      return;
    }

    setLoading(prev => ({ ...prev, intake: true }));

    try {
      const response = await axios.post(
        `${BASE_URL}/admin/intakes`,
        {
          name: formData.intakeName
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Intake Response:", response.data);
      
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Intake created successfully!",
      });

      // Reset form
      setFormData(prev => ({ ...prev, intakeName: "" }));

    } catch (error) {
      console.error("Error creating Intake:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to create Intake",
      });
    } finally {
      setLoading(prev => ({ ...prev, intake: false }));
    }
  };

  // 3. Create Program Tag
  const handleCreateProgramTag = async (e) => {
    e.preventDefault();
    
    if (!formData.programTagName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter Program Tag",
      });
      return;
    }

    setLoading(prev => ({ ...prev, programTag: true }));

    try {
      const response = await axios.post(
        `${BASE_URL}/admin/programtag/`,
        {
          program_tag: formData.programTagName
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Program Tag Response:", response.data);
      
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Program Tag created successfully!",
      });

      // Reset form
      setFormData(prev => ({ ...prev, programTagName: "" }));

    } catch (error) {
      console.error("Error creating Program Tag:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to create Program Tag",
      });
    } finally {
      setLoading(prev => ({ ...prev, programTag: false }));
    }
  };

  // 4. Create Field of Study
  const handleCreateFieldOfStudy = async (e) => {
    e.preventDefault();
    
    if (!formData.fieldOfStudyName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter Field of Study name",
      });
      return;
    }

    setLoading(prev => ({ ...prev, fieldOfStudy: true }));

    try {
      const response = await axios.post(
        `${BASE_URL}/admin/field/of/study/store`,
        {
          name: formData.fieldOfStudyName
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Field of Study Response:", response.data);
      
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Field of Study created successfully!",
      });

      // Reset form
      setFormData(prev => ({ ...prev, fieldOfStudyName: "" }));

    } catch (error) {
      console.error("Error creating Field of Study:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to create Field of Study",
      });
    } finally {
      setLoading(prev => ({ ...prev, fieldOfStudy: false }));
    }
  };

  // 5. Create Subject (under Field of Study)
  const handleCreateSubject = async (e) => {
    e.preventDefault();
    
    if (!formData.subjectName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter Subject name",
      });
      return;
    }

    if (!formData.selectedFieldOfStudyId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter Field of Study ID",
      });
      return;
    }

    setLoading(prev => ({ ...prev, subject: true }));

    try {
      const response = await axios.post(
        `${BASE_URL}/admin/field/of/study/${formData.selectedFieldOfStudyId}/subject/create`,
        {
          subject_name: formData.subjectName
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Subject Response:", response.data);
      
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Subject created successfully!",
      });

      // Reset form
      setFormData(prev => ({ 
        ...prev, 
        subjectName: "",
        selectedFieldOfStudyId: ""
      }));

    } catch (error) {
      console.error("Error creating Subject:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to create Subject",
      });
    } finally {
      setLoading(prev => ({ ...prev, subject: false }));
    }
  };

  // 6. Create Month (under Intake)
  const handleCreateMonth = async (e) => {
    e.preventDefault();
    
    if (!formData.monthName.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter Month name",
      });
      return;
    }

    if (!formData.selectedIntakeId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter Intake ID",
      });
      return;
    }

    if (!formData.openDate) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select Open Date",
      });
      return;
    }

    if (!formData.submissionDeadline) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select Submission Deadline",
      });
      return;
    }

    setLoading(prev => ({ ...prev, month: true }));

    try {
      const response = await axios.post(
        `${BASE_URL}/admin/intake/month/create/${formData.selectedIntakeId}`,
        {
          month: formData.monthName,
          open_date: formData.openDate,
          submission_deadline: formData.submissionDeadline
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Month Response:", response.data);
      
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Month created successfully!",
      });

      // Reset form
      setFormData(prev => ({ 
        ...prev, 
        monthName: "",
        selectedIntakeId: "",
        openDate: "",
        submissionDeadline: ""
      }));

    } catch (error) {
      console.error("Error creating Month:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to create Month",
      });
    } finally {
      setLoading(prev => ({ ...prev, month: false }));
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-secondary underline">Create Program Filters</h1>

      <div className="space-y-8">
        {/* 1. Create Program Level */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-black">1. Create Program Level</h2>
          <form onSubmit={handleCreateProgramLevel} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 text-black font-medium">Program Level Name</label>
              <input
                type="text"
                name="programLevelName"
                value={formData.programLevelName}
                onChange={handleChange}
                placeholder="e.g., Grade-1, Undergraduate"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading.programLevel}
              className={`px-6 py-2 text-white font-bold rounded-lg transition-all ${
                loading.programLevel
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading.programLevel ? 'Creating...' : 'Create Program Level'}
            </button>
          </form>
        </div>

        {/* 2. Create Intake */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-black">2. Create Intake</h2>
          <form onSubmit={handleCreateIntake} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 text-black font-medium">Intake Name</label>
              <input
                type="text"
                name="intakeName"
                value={formData.intakeName}
                onChange={handleChange}
                placeholder="e.g., Feb - Feb 2025, Fall 2024"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading.intake}
              className={`px-6 py-2 text-white font-bold rounded-lg transition-all ${
                loading.intake
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading.intake ? 'Creating...' : 'Create Intake'}
            </button>
          </form>
        </div>

        {/* 3. Create Program Tag */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-black">3. Create Program Tag</h2>
          <form onSubmit={handleCreateProgramTag} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 text-black font-medium">Program Tag</label>
              <input
                type="text"
                name="programTagName"
                value={formData.programTagName}
                onChange={handleChange}
                placeholder="e.g., Fast Acceptance, Second Accept"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading.programTag}
              className={`px-6 py-2 text-white font-bold rounded-lg transition-all ${
                loading.programTag
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {loading.programTag ? 'Creating...' : 'Create Program Tag'}
            </button>
          </form>
        </div>

        {/* 4. Create Field of Study */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-black">4. Create Field of Study</h2>
          <form onSubmit={handleCreateFieldOfStudy} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 text-black font-medium">Field of Study Name</label>
              <input
                type="text"
                name="fieldOfStudyName"
                value={formData.fieldOfStudyName}
                onChange={handleChange}
                placeholder="e.g., Physics, Computer Science"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading.fieldOfStudy}
              className={`px-6 py-2 text-white font-bold rounded-lg transition-all ${
                loading.fieldOfStudy
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-yellow-600 hover:bg-yellow-700'
              }`}
            >
              {loading.fieldOfStudy ? 'Creating...' : 'Create Field of Study'}
            </button>
          </form>
        </div>

        {/* 5. Create Subject */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-black">5. Create Subject (Under Field of Study)</h2>
          <form onSubmit={handleCreateSubject} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-black font-medium">Field of Study ID</label>
                <input
                  type="text"
                  name="selectedFieldOfStudyId"
                  value={formData.selectedFieldOfStudyId}
                  onChange={handleChange}
                  placeholder="Enter Field of Study ID (e.g., 1)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-black font-medium">Subject Name</label>
                <input
                  type="text"
                  name="subjectName"
                  value={formData.subjectName}
                  onChange={handleChange}
                  placeholder="e.g., Architecture Engineering"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading.subject}
              className={`px-6 py-2 text-white font-bold rounded-lg transition-all ${
                loading.subject
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading.subject ? 'Creating...' : 'Create Subject'}
            </button>
          </form>
        </div>

        {/* 6. Create Month */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-black">6. Create Month (Under Intake)</h2>
          <form onSubmit={handleCreateMonth} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-black font-medium">Intake ID</label>
                <input
                  type="text"
                  name="selectedIntakeId"
                  value={formData.selectedIntakeId}
                  onChange={handleChange}
                  placeholder="Enter Intake ID (e.g., 1)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-black font-medium">Month Name</label>
                <input
                  type="text"
                  name="monthName"
                  value={formData.monthName}
                  onChange={handleChange}
                  placeholder="e.g., Feb 2025"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-black font-medium">Open Date</label>
                <input
                  type="datetime-local"
                  name="openDate"
                  value={formData.openDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-black font-medium">Submission Deadline</label>
                <input
                  type="datetime-local"
                  name="submissionDeadline"
                  value={formData.submissionDeadline}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading.month}
              className={`px-6 py-2 text-white font-bold rounded-lg transition-all ${
                loading.month
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {loading.month ? 'Creating...' : 'Create Month'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProgramFilterCreate;