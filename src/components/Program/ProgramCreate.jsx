
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BASE_URL from "../../Api/ApiBaseUrl";

const ProgramCreate = () => {
  // Get token from localStorage (automatic from login)
  const authToken = localStorage.getItem("token") || "";
  
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [programLevels, setProgramLevels] = useState([]);
  const [intakes, setIntakes] = useState([]);
  const [programTags, setProgramTags] = useState([]);
  const [fieldOfStudies, setFieldOfStudies] = useState([]);
  const [months, setMonths] = useState([]);
  
  const [selectedIds, setSelectedIds] = useState({
    university_id: "",
    program_level_id: "",
    intake_id: "",
    program_tag_id: "",
    field_of_study_id: "",
    month_id: ""
  });

  const [formData, setFormData] = useState({
    // Basic Program Info
    program_name: "",
    program_description: "",
    program_tag: "",
    application_fee: "",
    application_short_desc: "",
    average_graduate_program: "",
    average_graduate_program_short_desc: "",
    average_undergraduate_program: "",
    average_undergraduate_program_short_desc: "",
    cost_of_living: "",
    cost_of_living_short_desc: "",
    average_gross_tuition: "",
    duration: "",
    campus_city: "",
    success_chance: "",
    program_summary: "",
    average_gross_tuition_short_desc: "",
    open_date: "",
    submission_deadline: "",
    
    // Student Requirements
    study_permit_or_visa: "",
    nationality: "",
    education_country: "",
    last_level_of_study: "",
    grading_scheme: "",
    
    // IELTS
    ielts_required: false,
    ielts_reading: "",
    ielts_writing: "",
    ielts_listening: "",
    ielts_speaking: "",
    ielts_overall: "",
    
    // TOEFL
    toefl_required: false,
    toefl_reading: "",
    toefl_writing: "",
    toefl_listening: "",
    toefl_speaking: "",
    toefl_overall: "",
    
    // Duolingo
    duolingo_required: false,
    duolingo_total: "",
    
    // PTE
    pte_required: false,
    pte_reading: "",
    pte_writing: "",
    pte_listening: "",
    pte_speaking: "",
    pte_overall: "",
    
    // No Exam
    no_exam_status: "",
  });

  // Fetch all required data on component mount
  useEffect(() => {
    console.log("BASE_URL:", BASE_URL);
    console.log("Token:", authToken);
    fetchUniversities();
    fetchProgramLevels();
    fetchIntakes();
    fetchProgramTags();
    fetchFieldOfStudies();
    fetchMonths();
  }, []);

  const fetchUniversities = async () => {
    try {
      console.log("Fetching universities...");
      const response = await axios.get(
        `${BASE_URL}/admin/alluniversities`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Universities response:", response.data);
      // Different APIs return data in different structures
      if (response.data.universities) {
        setUniversities(response.data.universities || []);
      } else if (response.data.data) {
        setUniversities(response.data.data || []);
      } else {
        setUniversities(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching universities:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load universities",
      });
    }
  };

  const fetchProgramLevels = async () => {
    try {
      console.log("Fetching program levels...");
      const response = await axios.get(
        `${BASE_URL}/admin/all/program/level`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Program levels response:", response.data);
      setProgramLevels(response.data || []);
    } catch (error) {
      console.error("Error fetching program levels:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load program levels",
      });
    }
  };

  const fetchIntakes = async () => {
    try {
      console.log("Fetching intakes...");
      const response = await axios.get(
        `${BASE_URL}/admin/intakes`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Intakes response:", response.data);
      setIntakes(response.data || []);
    } catch (error) {
      console.error("Error fetching intakes:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load intakes",
      });
    }
  };

  const fetchProgramTags = async () => {
    try {
      console.log("Fetching program tags...");
      const response = await axios.get(
        `${BASE_URL}/admin/programtag`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Program tags response:", response.data);
      // Fix: program tags API returns {data: Array} structure
      if (response.data.data) {
        setProgramTags(response.data.data || []);
      } else {
        setProgramTags(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching program tags:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load program tags",
      });
    }
  };

  const fetchFieldOfStudies = async () => {
    try {
      console.log("Fetching field of studies...");
      const response = await axios.get(
        `${BASE_URL}/admin/all/field/of/study/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Field of studies response:", response.data);
      setFieldOfStudies(response.data || []);
    } catch (error) {
      console.error("Error fetching field of studies:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load field of studies",
      });
    }
  };

  const fetchMonths = async () => {
    try {
      console.log("Fetching months...");
      const response = await axios.get(
        `${BASE_URL}/admin/intake/all/month`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Months response:", response.data);
      setMonths(response.data || []);
    } catch (error) {
      console.error("Error fetching months:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load months",
      });
    }
  };

  // Handle dropdown changes
  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setSelectedIds(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle number inputs
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that all IDs are selected
    const missingIds = Object.entries(selectedIds)
      .filter(([key, value]) => !value)
      .map(([key]) => key.replace(/_/g, ' '));
    
    if (missingIds.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: `Please select: ${missingIds.join(', ')}`,
        confirmButtonColor: "#d33",
      });
      return;
    }
    
    if (!authToken) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please login first to create programs",
        confirmButtonColor: "#d33",
      });
      return;
    }
    
    setLoading(true);

    // Prepare data for API (nested structure)
    const submissionData = {
      program_name: formData.program_name,
      program_description: formData.program_description,
      program_tag: formData.program_tag,
      application_fee: formData.application_fee,
      application_short_desc: formData.application_short_desc,
      average_graduate_program: formData.average_graduate_program,
      average_graduate_program_short_desc: formData.average_graduate_program_short_desc,
      average_undergraduate_program: formData.average_undergraduate_program,
      average_undergraduate_program_short_desc: formData.average_undergraduate_program_short_desc,
      cost_of_living: formData.cost_of_living,
      cost_of_living_short_desc: formData.cost_of_living_short_desc,
      average_gross_tuition: formData.average_gross_tuition,
      duration: formData.duration,
      campus_city: formData.campus_city,
      success_chance: formData.success_chance,
      program_summary: formData.program_summary,
      average_gross_tuition_short_desc: formData.average_gross_tuition_short_desc,
      open_date: formData.open_date,
      submission_deadline: formData.submission_deadline,
      
      students_requirements: {
        study_permit_or_visa: formData.study_permit_or_visa,
        nationality: formData.nationality,
        education_country: formData.education_country,
        last_level_of_study: formData.last_level_of_study,
        grading_scheme: formData.grading_scheme,
        english_exam_status: {}
      }
    };

    // Add IELTS if required
    if (formData.ielts_required) {
      submissionData.students_requirements.english_exam_status.ielts = {
        required: true,
        reading: formData.ielts_reading ? Number(formData.ielts_reading) : null,
        writing: formData.ielts_writing ? Number(formData.ielts_writing) : null,
        listening: formData.ielts_listening ? Number(formData.ielts_listening) : null,
        speaking: formData.ielts_speaking ? Number(formData.ielts_speaking) : null,
        overall: formData.ielts_overall ? Number(formData.ielts_overall) : null,
      };
    }

    // Add TOEFL if required
    if (formData.toefl_required) {
      submissionData.students_requirements.english_exam_status.toefl = {
        required: true,
        reading: formData.toefl_reading ? Number(formData.toefl_reading) : null,
        writing: formData.toefl_writing ? Number(formData.toefl_writing) : null,
        listening: formData.toefl_listening ? Number(formData.toefl_listening) : null,
        speaking: formData.toefl_speaking ? Number(formData.toefl_speaking) : null,
        overall: formData.toefl_overall ? Number(formData.toefl_overall) : null,
      };
    }

    // Add Duolingo if required
    if (formData.duolingo_required) {
      submissionData.students_requirements.english_exam_status.duolingo = {
        required: true,
        total: formData.duolingo_total ? Number(formData.duolingo_total) : null,
      };
    }

    // Add PTE if required
    if (formData.pte_required) {
      submissionData.students_requirements.english_exam_status.pte = {
        required: true,
        reading: formData.pte_reading ? Number(formData.pte_reading) : null,
        writing: formData.pte_writing ? Number(formData.pte_writing) : null,
        listening: formData.pte_listening ? Number(formData.pte_listening) : null,
        speaking: formData.pte_speaking ? Number(formData.pte_speaking) : null,
        overall: formData.pte_overall ? Number(formData.pte_overall) : null,
      };
    }

    // Add No Exam if provided
    if (formData.no_exam_status) {
      submissionData.students_requirements.english_exam_status.no_exam = {
        status: formData.no_exam_status
      };
    }

    console.log("Submitting data:", submissionData);
    console.log("Selected IDs:", selectedIds);

    try {
      const response = await axios.post(
        `${BASE_URL}/admin/university-programs/${selectedIds.university_id}/${selectedIds.program_level_id}/${selectedIds.intake_id}/${selectedIds.program_tag_id}/${selectedIds.field_of_study_id}/${selectedIds.month_id}/store`,
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Response:", response.data);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Program Created Successfully!",
        confirmButtonColor: "#3085d6",
      });

      // Reset form after success
      resetForm();

    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      
      let errorMessage = error.response?.data?.message || "Something went wrong!";
      
      if (error.response?.status === 401) {
        errorMessage = "Your session has expired. Please login again.";
        localStorage.removeItem("token");
      } else if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        errorMessage = "Validation errors:\n";
        Object.keys(errors).forEach(key => {
          errorMessage += `${key}: ${errors[key].join(', ')}\n`;
        });
      }
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      program_name: "",
      program_description: "",
      program_tag: "",
      application_fee: "",
      application_short_desc: "",
      average_graduate_program: "",
      average_graduate_program_short_desc: "",
      average_undergraduate_program: "",
      average_undergraduate_program_short_desc: "",
      cost_of_living: "",
      cost_of_living_short_desc: "",
      average_gross_tuition: "",
      duration: "",
      campus_city: "",
      success_chance: "",
      program_summary: "",
      average_gross_tuition_short_desc: "",
      open_date: "",
      submission_deadline: "",
      study_permit_or_visa: "",
      nationality: "",
      education_country: "",
      last_level_of_study: "",
      grading_scheme: "",
      ielts_required: false,
      ielts_reading: "",
      ielts_writing: "",
      ielts_listening: "",
      ielts_speaking: "",
      ielts_overall: "",
      toefl_required: false,
      toefl_reading: "",
      toefl_writing: "",
      toefl_listening: "",
      toefl_speaking: "",
      toefl_overall: "",
      duolingo_required: false,
      duolingo_total: "",
      pte_required: false,
      pte_reading: "",
      pte_writing: "",
      pte_listening: "",
      pte_speaking: "",
      pte_overall: "",
      no_exam_status: "",
    });
    
    setSelectedIds({
      university_id: "",
      program_level_id: "",
      intake_id: "",
      program_tag_id: "",
      field_of_study_id: "",
      month_id: ""
    });
  };

  const fillSampleData = () => {
    setFormData({
      program_name: "Bachelor of Law Enforcement Studies",
      program_description: "Comprehensive program for law enforcement studies",
      program_tag: "Fast Acceptance",
      application_fee: "150.00",
      application_short_desc: "Application for law enforcement program",
      average_graduate_program: "Law Enforcement",
      average_graduate_program_short_desc: "Graduate level",
      average_undergraduate_program: "Undergraduate Studies",
      average_undergraduate_program_short_desc: "Undergraduate level",
      cost_of_living: "12000",
      cost_of_living_short_desc: "Annual living cost",
      average_gross_tuition: "21237.00",
      duration: "4 years",
      campus_city: "New Westminster",
      success_chance: "High",
      program_summary: "A comprehensive bachelor's degree in law enforcement",
      average_gross_tuition_short_desc: "Annual tuition fee",
      open_date: "2025-09-01",
      submission_deadline: "2026-03-01 23:59:00",
      study_permit_or_visa: "Required",
      nationality: "International",
      education_country: "Bangladesh",
      last_level_of_study: "High School",
      grading_scheme: "GPA (out of 4.0)",
      ielts_required: true,
      ielts_reading: "6",
      ielts_writing: "6",
      ielts_listening: "6",
      ielts_speaking: "6",
      ielts_overall: "6.5",
      toefl_required: true,
      toefl_reading: "20",
      toefl_writing: "20",
      toefl_listening: "20",
      toefl_speaking: "20",
      toefl_overall: "80",
      duolingo_required: true,
      duolingo_total: "110",
      pte_required: true,
      pte_reading: "50",
      pte_writing: "50",
      pte_listening: "50",
      pte_speaking: "50",
      pte_overall: "58",
      no_exam_status: "I will provide this later",
    });
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-3xl font-bold mb-8 text-secondary text-center underline">Program Create</h2>

      

      {/* ID Selection Section */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-black">Select Required IDs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* University Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-black font-medium">University</label>
            <select
              name="university_id"
              value={selectedIds.university_id}
              onChange={handleDropdownChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select University</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.university_name}
                </option>
              ))}
            </select>
          </div>

          {/* Program Level Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-black font-medium">Program Level</label>
            <select
              name="program_level_id"
              value={selectedIds.program_level_id}
              onChange={handleDropdownChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Program Level</option>
              {programLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>

          {/* Intake Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-black font-medium">Intake</label>
            <select
              name="intake_id"
              value={selectedIds.intake_id}
              onChange={handleDropdownChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Intake</option>
              {intakes.map((intake) => (
                <option key={intake.id} value={intake.id}>
                  {intake.name}
                </option>
              ))}
            </select>
          </div>

          {/* Program Tag Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-black font-medium">Program Tag</label>
            <select
              name="program_tag_id"
              value={selectedIds.program_tag_id}
              onChange={handleDropdownChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Program Tag</option>
              {programTags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.program_tag || tag.name}
                </option>
              ))}
            </select>
          </div>

          {/* Field of Study Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-black font-medium">Field of Study</label>
            <select
              name="field_of_study_id"
              value={selectedIds.field_of_study_id}
              onChange={handleDropdownChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Field of Study</option>
              {fieldOfStudies.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.name}
                </option>
              ))}
            </select>
          </div>

          {/* Month Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 text-black font-medium">Month</label>
            <select
              name="month_id"
              value={selectedIds.month_id}
              onChange={handleDropdownChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Month</option>
              {months.map((month) => (
                <option key={month.id} value={month.id}>
                  {month.month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Fill Sample Data Button */}
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={fillSampleData}
          className="bg-secondary hover:bg-primary text-white px-4 py-2 rounded-lg transition-colors"
        >
          Fill Sample Data
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Program Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "program_name", placeholder: "Program Name", type: "text", required: true },
            { name: "program_description", placeholder: "Program Description", type: "text" },
            { name: "program_tag", placeholder: "Program Tag", type: "text" },
            { name: "application_fee", placeholder: "Application Fee", type: "text" },
            { name: "duration", placeholder: "Duration", type: "text" },
            { name: "campus_city", placeholder: "Campus City", type: "text" },
            { name: "success_chance", placeholder: "Success Chance", type: "text" },
            { name: "average_gross_tuition", placeholder: "Average Tuition", type: "text" },
            { name: "cost_of_living", placeholder: "Cost of Living", type: "text" },
            { name: "average_graduate_program", placeholder: "Avg Graduate Program", type: "text" },
            { name: "average_undergraduate_program", placeholder: "Avg Undergraduate Program", type: "text" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="mb-1 text-black font-medium">{field.placeholder}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={field.required}
              />
            </div>
          ))}
        </div>

        {/* Text Areas */}
        <div className="space-y-6">
          {[
            { name: "application_short_desc", label: "Application Short Description", rows: 3 },
            { name: "program_summary", label: "Program Summary", rows: 4 },
            { name: "average_gross_tuition_short_desc", label: "Tuition Short Description", rows: 2 },
            { name: "cost_of_living_short_desc", label: "Cost of Living Short Description", rows: 2 },
            { name: "average_graduate_program_short_desc", label: "Graduate Program Short Desc", rows: 2 },
            { name: "average_undergraduate_program_short_desc", label: "Undergraduate Program Short Desc", rows: 2 },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="mb-1 text-black font-medium">{field.label}</label>
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.label}
                rows={field.rows}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="mb-1 text-black font-medium">Open Date</label>
            <input
              type="date"
              name="open_date"
              value={formData.open_date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-black font-medium">Submission Deadline</label>
            <input
              type="datetime-local"
              name="submission_deadline"
              value={formData.submission_deadline}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Student Requirements Section */}
        <div className="pt-8 border-t border-gray-200">
          <h3 className="text-2xl font-bold mb-6 text-black">Student Requirements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { name: "study_permit_or_visa", label: "Study Permit/Visa", placeholder: "Required" },
              { name: "nationality", label: "Nationality", placeholder: "International" },
              { name: "education_country", label: "Education Country", placeholder: "Bangladesh" },
              { name: "last_level_of_study", label: "Last Level of Study", placeholder: "High School" },
              { name: "grading_scheme", label: "Grading Scheme", placeholder: "GPA (out of 4.0)" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="mb-1 text-black font-medium">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                />
              </div>
            ))}
          </div>

          {/* English Exam Requirements */}
          <h4 className="text-xl font-bold mb-4 text-black">English Exam Requirements</h4>
          
          {/* IELTS Section */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="ielts_required"
                name="ielts_required"
                checked={formData.ielts_required}
                onChange={handleChange}
                className="w-5 h-5 mr-3"
              />
              <label htmlFor="ielts_required" className="text-lg font-bold text-black">
                IELTS Requirements
              </label>
            </div>
            
            {formData.ielts_required && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: "ielts_reading", label: "Reading" },
                  { name: "ielts_writing", label: "Writing" },
                  { name: "ielts_listening", label: "Listening" },
                  { name: "ielts_speaking", label: "Speaking" },
                  { name: "ielts_overall", label: "Overall" },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col">
                    <label className="mb-1 text-black font-medium">{field.label}</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="9"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleNumberChange}
                      placeholder="Score"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TOEFL Section */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="toefl_required"
                name="toefl_required"
                checked={formData.toefl_required}
                onChange={handleChange}
                className="w-5 h-5 mr-3"
              />
              <label htmlFor="toefl_required" className="text-lg font-bold text-black">
                TOEFL Requirements
              </label>
            </div>
            
            {formData.toefl_required && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: "toefl_reading", label: "Reading" },
                  { name: "toefl_writing", label: "Writing" },
                  { name: "toefl_listening", label: "Listening" },
                  { name: "toefl_speaking", label: "Speaking" },
                  { name: "toefl_overall", label: "Overall" },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col">
                    <label className="mb-1 text-black font-medium">{field.label}</label>
                    <input
                      type="number"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleNumberChange}
                      placeholder="Score"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Duolingo Section */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="duolingo_required"
                name="duolingo_required"
                checked={formData.duolingo_required}
                onChange={handleChange}
                className="w-5 h-5 mr-3"
              />
              <label htmlFor="duolingo_required" className="text-lg font-bold text-black">
                Duolingo Requirements
              </label>
            </div>
            
            {formData.duolingo_required && (
              <div className="w-full md:w-1/3">
                <div className="flex flex-col">
                  <label className="mb-1 text-black font-medium">Total Score</label>
                  <input
                    type="number"
                    name="duolingo_total"
                    value={formData.duolingo_total}
                    onChange={handleNumberChange}
                    placeholder="e.g., 110"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                  />
                </div>
              </div>
            )}
          </div>

          {/* PTE Section */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="pte_required"
                name="pte_required"
                checked={formData.pte_required}
                onChange={handleChange}
                className="w-5 h-5 mr-3"
              />
              <label htmlFor="pte_required" className="text-lg font-bold text-black">
                PTE Requirements
              </label>
            </div>
            
            {formData.pte_required && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: "pte_reading", label: "Reading" },
                  { name: "pte_writing", label: "Writing" },
                  { name: "pte_listening", label: "Listening" },
                  { name: "pte_speaking", label: "Speaking" },
                  { name: "pte_overall", label: "Overall" },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col">
                    <label className="mb-1 text-black font-medium">{field.label}</label>
                    <input
                      type="number"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleNumberChange}
                      placeholder="Score"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* No Exam Status */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <label className="block mb-2 text-black font-bold">No Exam Status (if applicable)</label>
            <input
              type="text"
              name="no_exam_status"
              value={formData.no_exam_status}
              onChange={handleChange}
              placeholder="e.g., I will provide this later"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`max-w-md mt-8 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-secondary hover:bg-primary'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Creating Program...
            </div>
          ) : (
            'Create Program'
          )}
        </button>
      </form>
    </div>
  );
};

export default ProgramCreate;