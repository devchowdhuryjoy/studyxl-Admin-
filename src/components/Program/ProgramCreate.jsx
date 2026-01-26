import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BASE_URL from "../../Api/ApiBaseUrl";

const ProgramCreate = () => {
  // Get token from localStorage (automatic from login)
  const authToken = localStorage.getItem("admin_token") || "";

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
    month_id: "",
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
      const response = await axios.get(`${BASE_URL}/admin/alluniversities`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
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
      const response = await axios.get(`${BASE_URL}/admin/all/program/level`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
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
      const response = await axios.get(`${BASE_URL}/admin/intakes`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
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
      const response = await axios.get(`${BASE_URL}/admin/programtag`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
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
      const response = await axios.get(`${BASE_URL}/admin/all/field/of/study`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
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
      const response = await axios.get(`${BASE_URL}/admin/intake/all/month`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Months response:", response.data);

      // ✅ FIX: correct data extraction
      if (response.data && Array.isArray(response.data.data)) {
        setMonths(response.data.data);
      } else {
        setMonths([]);
      }
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
    setSelectedIds((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle number inputs
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all IDs are selected
    const missingIds = Object.entries(selectedIds)
      .filter(([key, value]) => !value)
      .map(([key]) => key.replace(/_/g, " "));

    if (missingIds.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: `Please select: ${missingIds.join(", ")}`,
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
      average_graduate_program_short_desc:
        formData.average_graduate_program_short_desc,
      average_undergraduate_program: formData.average_undergraduate_program,
      average_undergraduate_program_short_desc:
        formData.average_undergraduate_program_short_desc,
      cost_of_living: formData.cost_of_living,
      cost_of_living_short_desc: formData.cost_of_living_short_desc,
      average_gross_tuition: formData.average_gross_tuition,
      duration: formData.duration,
      campus_city: formData.campus_city,
      success_chance: formData.success_chance,
      program_summary: formData.program_summary,
      average_gross_tuition_short_desc:
        formData.average_gross_tuition_short_desc,
      open_date: formData.open_date,
      submission_deadline: formData.submission_deadline,

      students_requirements: {
        study_permit_or_visa: formData.study_permit_or_visa,
        nationality: formData.nationality,
        education_country: formData.education_country,
        last_level_of_study: formData.last_level_of_study,
        grading_scheme: formData.grading_scheme,
        english_exam_status: {},
      },
    };

    // Add IELTS if required
    if (formData.ielts_required) {
      submissionData.students_requirements.english_exam_status.ielts = {
        required: true,
        reading: formData.ielts_reading ? Number(formData.ielts_reading) : null,
        writing: formData.ielts_writing ? Number(formData.ielts_writing) : null,
        listening: formData.ielts_listening
          ? Number(formData.ielts_listening)
          : null,
        speaking: formData.ielts_speaking
          ? Number(formData.ielts_speaking)
          : null,
        overall: formData.ielts_overall ? Number(formData.ielts_overall) : null,
      };
    }

    // Add TOEFL if required
    if (formData.toefl_required) {
      submissionData.students_requirements.english_exam_status.toefl = {
        required: true,
        reading: formData.toefl_reading ? Number(formData.toefl_reading) : null,
        writing: formData.toefl_writing ? Number(formData.toefl_writing) : null,
        listening: formData.toefl_listening
          ? Number(formData.toefl_listening)
          : null,
        speaking: formData.toefl_speaking
          ? Number(formData.toefl_speaking)
          : null,
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
        listening: formData.pte_listening
          ? Number(formData.pte_listening)
          : null,
        speaking: formData.pte_speaking ? Number(formData.pte_speaking) : null,
        overall: formData.pte_overall ? Number(formData.pte_overall) : null,
      };
    }

    // Add No Exam if provided
    if (formData.no_exam_status) {
      submissionData.students_requirements.english_exam_status.no_exam = {
        status: formData.no_exam_status,
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
        },
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

      let errorMessage =
        error.response?.data?.message || "Something went wrong!";

      if (error.response?.status === 401) {
        errorMessage = "Your session has expired. Please login again.";
        localStorage.removeItem("token");
      } else if (error.response?.status === 422) {
        const errors = error.response.data.errors;
        errorMessage = "Validation errors:\n";
        Object.keys(errors).forEach((key) => {
          errorMessage += `${key}: ${errors[key].join(", ")}\n`;
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
      month_id: "",
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
    <div className="w-full  mx-auto  bg-gray-50 min-h-screen">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        {/* 1. Header Section */}
        <div className="bg-primary p-2 text-white text-center">
          <h2 className="text-4xl font-extrabold uppercase tracking-widest">
            Create Program
          </h2>
          <p className="mt-2 text-white opacity-80">
            Setup new academic opportunities with complete details
          </p>
        </div>

        {/* 2. Admin Selection Panel (Required IDs) */}
        <div className="p-8 bg-blue-50/50 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-2 bg-secondary rounded-full"></div>
            <h3 className="text-xl font-bold text-gray-800 uppercase tracking-tight">
              Core Configuration
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                label: "University",
                name: "university_id",
                options: universities,
                key: "university_name",
              },
              {
                label: "Program Level",
                name: "program_level_id",
                options: programLevels,
                key: "name",
              },
              {
                label: "Intake",
                name: "intake_id",
                options: intakes,
                key: "name",
              },
              {
                label: "Program Tag",
                name: "program_tag_id",
                options: programTags,
                key: "name",
                alt: "program_tag",
              },
              {
                label: "Field of Study",
                name: "field_of_study_id",
                options: fieldOfStudies,
                key: "name",
              },
              {
                label: "Month",
                name: "month_id",
                options: months,
                key: "month",
              },
            ].map((dropdown) => (
              <div key={dropdown.name} className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  {dropdown.label}
                </label>
                <select
                  name={dropdown.name}
                  value={selectedIds[dropdown.name]}
                  onChange={handleDropdownChange}
                  className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 text-gray-700 shadow-sm focus:border-secondary focus:ring-0 transition-all outline-none"
                  required
                >
                  <option value="">Choose {dropdown.label}</option>
                  {dropdown.options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt[dropdown.key] || opt[dropdown.alt]}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-12">
          {/* 3. Action Bar */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={fillSampleData}
              className="flex items-center gap-2 bg-secondary hover:bg-gray-200 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm border border-gray-200"
            >
              <span>✨</span> Auto-Fill Sample Data
            </button>
          </div>

          {/* 4. Basic Information Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-6 w-2 bg-secondary rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-800">
                General Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {[
                {
                  name: "program_name",
                  label: "Program Name",
                  type: "text",
                  required: true,
                },
                {
                  name: "program_description",
                  label: "Program Description",
                  type: "text",
                },
                { name: "program_tag", label: "Program Tag", type: "text" },
                {
                  name: "application_fee",
                  label: "Application Fee",
                  type: "text",
                },
                { name: "duration", label: "Duration", type: "text" },
                { name: "campus_city", label: "Campus City", type: "text" },
                {
                  name: "success_chance",
                  label: "Success Chance",
                  type: "text",
                },
                {
                  name: "average_gross_tuition",
                  label: "Average Tuition",
                  type: "text",
                },
                {
                  name: "cost_of_living",
                  label: "Cost of Living",
                  type: "text",
                },
                {
                  name: "average_graduate_program",
                  label: "Avg Graduate Program",
                  type: "text",
                },
                {
                  name: "average_undergraduate_program",
                  label: "Avg Undergraduate Program",
                  type: "text",
                },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-2 ml-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label}`}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-secondary outline-none transition-all placeholder:text-gray-300"
                    required={field.required}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 5. Descriptions Section (Full Width) */}
          <section className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-200 shadow-inner">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <svg
                  className="w-5 h-5 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Content & Overviews
                </h3>
                <p className="text-xs text-slate-500">
                  Provide detailed program descriptions and financial summaries
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              {[
                {
                  name: "application_short_desc",
                  label: "Application Quick View",
                  subtitle: "Key instructions for applicants",
                  rows: 3,
                  fullWidth: true,
                },
                {
                  name: "program_summary",
                  label: "Program Executive Summary",
                  subtitle: "Comprehensive overview of the course",
                  rows: 4,
                  fullWidth: true,
                },
                {
                  name: "average_gross_tuition_short_desc",
                  label: "Tuition Fees Breakdown",
                  subtitle: "Brief info on annual costs",
                  rows: 3,
                },
                {
                  name: "cost_of_living_short_desc",
                  label: "Living Expenses",
                  subtitle: "Estimated local monthly costs",
                  rows: 3,
                },
                {
                  name: "average_graduate_program_short_desc",
                  label: "Graduate Opportunities",
                  subtitle: "Career prospects for graduates",
                  rows: 3,
                },
                {
                  name: "average_undergraduate_program_short_desc",
                  label: "Undergrad Entry Details",
                  subtitle: "Specifics for bachelor applicants",
                  rows: 3,
                },
              ].map((field) => (
                <div
                  key={field.name}
                  className={`flex flex-col group ${field.fullWidth ? "md:col-span-2" : "md:col-span-1"}`}
                >
                  <div className="flex justify-between items-end mb-2.5 px-1">
                    <div>
                      <label className="text-xs font-black text-slate-700 uppercase tracking-wider">
                        {field.label}
                      </label>
                      <p className="text-[11px] text-slate-400 font-medium italic">
                        {field.subtitle}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 group-focus-within:text-secondary transition-colors">
                      {formData[field.name]?.length || 0} characters
                    </span>
                  </div>

                  <textarea
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    rows={field.rows}
                    placeholder={`Type ${field.label.toLowerCase()} here...`}
                    className="w-full border-2 border-slate-100 rounded-2xl px-5 py-4 shadow-sm 
                     bg-white text-slate-700 text-sm leading-relaxed
                     focus:border-secondary focus:ring-4 focus:ring-secondary/5 
                     hover:border-slate-200 outline-none resize-none transition-all 
                     placeholder:text-slate-300"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 6. Critical Dates Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
              <label className="text-sm font-bold text-green-700 uppercase block mb-3">
                📅 Program Open Date
              </label>
              <input
                type="date"
                name="open_date"
                value={formData.open_date}
                onChange={handleChange}
                className="w-full border-0 bg-white rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
            <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
              <label className="text-sm font-bold text-red-700 uppercase block mb-3">
                ⏰ Submission Deadline
              </label>
              <input
                type="datetime-local"
                name="submission_deadline"
                value={formData.submission_deadline}
                onChange={handleChange}
                className="w-full border-0 bg-white rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-red-400 outline-none"
              />
            </div>
          </section>

          {/* 7. Student Requirements Card */}
          <section className="pt-10 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-6 w-2 bg-orange-400 rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-800">
                Student Requirements
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { name: "study_permit_or_visa", label: "Permit/Visa" },
                { name: "nationality", label: "Target Nationality" },
                { name: "education_country", label: "Education Country" },
                { name: "last_level_of_study", label: "Last Study Level" },
                { name: "grading_scheme", label: "Grading Scheme" },
              ].map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-xs font-bold text-gray-400 uppercase mb-2 ml-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-orange-300 outline-none transition-all"
                  />
                </div>
              ))}
            </div>

            {/* 8. English Exam Dashboard */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-gray-700 border-b pb-4 flex items-center gap-2">
                <span className="text-2xl">🌍</span> English Language
                Proficiency
              </h4>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {[
                  {
                    id: "ielts",
                    label: "IELTS",
                    fields: [
                      "reading",
                      "writing",
                      "listening",
                      "speaking",
                      "overall",
                    ],
                  },
                  {
                    id: "toefl",
                    label: "TOEFL",
                    fields: [
                      "reading",
                      "writing",
                      "listening",
                      "speaking",
                      "overall",
                    ],
                  },
                  {
                    id: "pte",
                    label: "PTE",
                    fields: [
                      "reading",
                      "writing",
                      "listening",
                      "speaking",
                      "overall",
                    ],
                  },
                  { id: "duolingo", label: "Duolingo", fields: ["total"] },
                ].map((exam) => (
                  <div
                    key={exam.id}
                    className={`p-6 rounded-3xl border-2 transition-all duration-300 ${
                      formData[`${exam.id}_required`]
                        ? "border-secondary bg-blue-50/30"
                        : "border-gray-50 bg-gray-50/20 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`${exam.id}_required`}
                          name={`${exam.id}_required`}
                          checked={formData[`${exam.id}_required`]}
                          onChange={handleChange}
                          className="w-5 h-5 rounded border-gray-300 text-secondary focus:ring-secondary"
                        />
                        <label
                          htmlFor={`${exam.id}_required`}
                          className="text-xl font-black text-gray-800 uppercase"
                        >
                          {exam.label}
                        </label>
                      </div>
                      {formData[`${exam.id}_required`] && (
                        <span className="px-3 py-1 bg-secondary text-white text-[10px] font-bold rounded-full">
                          ACTIVE
                        </span>
                      )}
                    </div>

                    {formData[`${exam.id}_required`] && (
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {exam.fields.map((f) => (
                          <div key={f} className="flex flex-col text-center">
                            <label className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                              {f}
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              name={`${exam.id}_${f}`}
                              value={formData[`${exam.id}_${f}`]}
                              onChange={handleNumberChange}
                              className="w-full border-2 border-white rounded-lg px-2 py-2 text-center font-bold text-secondary shadow-sm"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-800 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                <div className="text-white">
                  <p className="font-bold">No Exam Status?</p>
                  <p className="text-xs text-gray-400 italic">
                    Exemption or alternative criteria
                  </p>
                </div>
                <input
                  type="text"
                  name="no_exam_status"
                  value={formData.no_exam_status}
                  onChange={handleChange}
                  placeholder="e.g. MOI, Waiver eligible"
                  className="flex-1 w-full bg-gray-700 border-0 rounded-xl px-6 py-4 text-white focus:ring-2 focus:ring-secondary outline-none"
                />
              </div>
            </div>
          </section>

          {/* 9. Submit Action */}
          <div className="pt-12 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full max-w-xl text-white font-black text-xl py-5 px-10 rounded-2xl transition-all shadow-xl transform hover:-translate-y-1 active:scale-95 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:shadow-secondary/20"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-4">
                  <svg
                    className="animate-spin h-6 w-6 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  SUBMITTING DATA...
                </div>
              ) : (
                " CREATE PROGRAM"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramCreate;
