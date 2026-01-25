
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../Api/ApiBaseUrl";

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  // Debug logs
  console.log("🔍 EditApplication Component Mounted");
  console.log("🔍 ID from URL:", id);
  console.log("🔍 Current path:", window.location.pathname);
  
  // Form state
  const [formData, setFormData] = useState({
    // Student Information
    student_name: "",
    student_id: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    passport: "",
    passport_expiry: "",
    study_permit_or_visa: "",
    country_of_residence: "",
    address: "",
    
    // Program Information
    program_name: "",
    university_name: "",
    intake: "",
    study_level: "",
    field_of_study_name: "",
    duration: "",
    campus_city: "",
    destination: "",
    grading_scheme: "",
    subject: "",
    specialization: "",
    
    // Agent Information
    agent_name: "",
    agent_id: "",
    company_name: "",
    
    // Financial Information
    application_fee: "",
    average_gross_tuition: "",
    cost_of_living: "",
    average_undergraduate_program: "",
    average_graduate_program: "",
    
    // Academic Qualifications (as JSON string)
    academic_qualifications: "[]",
    
    // Work Experiences (as JSON string)
    work_experiences: "[]",
    
    // References (as JSON string)
    references: "[]",
    
    // Additional Information
    achievements: "",
    has_name_difference: "",
    open_to_language_course: false,
    success_chance: "",
    
    // Documents
    sop: "",
    resume: "",
    transcripts: "",
    test_scores: "",
    
    // Important Dates
    program_open_date: "",
    program_submission_deadline: "",
    
    // Status
    status: "Pending"
  });

  // Parse complex fields from API
  const [parsedData, setParsedData] = useState({
    academicQualifications: [],
    workExperiences: [],
    references: []
  });

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        console.log("🔄 Fetching application with ID:", id);
        
        const token = localStorage.getItem("admin_token");
        if (!token) {
          console.log("❌ No token found, redirecting to login");
          navigate("/login");
          return;
        }

        console.log("📡 API URL:", `${BASE_URL}/admin/agent-applications/${id}`);

        const res = await fetch(`${BASE_URL}/admin/agent-applications/${id}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("📡 Response Status:", res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("❌ API Error Response:", errorText);
          throw new Error("Failed to fetch application");
        }

        const result = await res.json();
        console.log("✅ API Response:", result);
        
        if (!result.data) {
          console.error("❌ No data in response:", result);
          throw new Error("No application data found");
        }

        const application = result.data;
        console.log("📝 Application Data:", application);
        
        // Parse complex fields - IMPROVED VERSION
        const parsed = {
          academicQualifications: [],
          workExperiences: [],
          references: []
        };

        // Parse Academic Qualifications - SAFER
        if (application.academic_qualifications) {
          try {
            let quals = application.academic_qualifications;
            console.log("📚 Academic Qualifications raw:", quals, "Type:", typeof quals);
            
            // If it's a string
            if (typeof quals === 'string') {
              // Remove extra quotes and whitespace
              quals = quals.trim();
              // Remove surrounding quotes if present
              if ((quals.startsWith('"') && quals.endsWith('"')) || 
                  (quals.startsWith("'") && quals.endsWith("'"))) {
                quals = quals.slice(1, -1);
              }
              
              try {
                // Try to parse as JSON
                quals = JSON.parse(quals);
              } catch (parseError) {
                console.warn("⚠️ JSON parse failed, treating as plain text:", parseError.message);
                console.warn("⚠️ Raw string value:", quals);
                // If it's not valid JSON, treat as description
                quals = [{ description: quals }];
              }
            }
            
            // Ensure it's an array
            if (Array.isArray(quals)) {
              parsed.academicQualifications = quals;
            } else if (quals && typeof quals === 'object') {
              // If it's a single object, wrap in array
              parsed.academicQualifications = [quals];
            } else {
              // If it's something else (number, boolean, etc)
              parsed.academicQualifications = [{ description: String(quals) }];
            }
            
            console.log("📚 Parsed Academic Qualifications:", parsed.academicQualifications);
          } catch (err) {
            console.error('❌ Error parsing academic qualifications:', err);
            parsed.academicQualifications = [];
          }
        }

        // Parse Work Experiences - SIMILAR LOGIC
        if (application.work_experiences) {
          try {
            let exps = application.work_experiences;
            console.log("💼 Work Experiences raw:", exps, "Type:", typeof exps);
            
            if (typeof exps === 'string') {
              exps = exps.trim();
              if ((exps.startsWith('"') && exps.endsWith('"')) || 
                  (exps.startsWith("'") && exps.endsWith("'"))) {
                exps = exps.slice(1, -1);
              }
              
              try {
                exps = JSON.parse(exps);
              } catch (parseError) {
                console.warn("⚠️ JSON parse failed for work experiences:", parseError.message);
                exps = [{ description: exps }];
              }
            }
            
            if (Array.isArray(exps)) {
              parsed.workExperiences = exps;
            } else if (exps && typeof exps === 'object') {
              parsed.workExperiences = [exps];
            } else {
              parsed.workExperiences = [{ description: String(exps) }];
            }
            
            console.log("💼 Parsed Work Experiences:", parsed.workExperiences);
          } catch (err) {
            console.error('❌ Error parsing work experiences:', err);
            parsed.workExperiences = [];
          }
        }

        // Parse References - SIMILAR LOGIC
        if (application.references) {
          try {
            let refs = application.references;
            console.log("👥 References raw:", refs, "Type:", typeof refs);
            
            if (typeof refs === 'string') {
              refs = refs.trim();
              if ((refs.startsWith('"') && refs.endsWith('"')) || 
                  (refs.startsWith("'") && refs.endsWith("'"))) {
                refs = refs.slice(1, -1);
              }
              
              try {
                refs = JSON.parse(refs);
              } catch (parseError) {
                console.warn("⚠️ JSON parse failed for references:", parseError.message);
                refs = [{ description: refs }];
              }
            }
            
            if (Array.isArray(refs)) {
              parsed.references = refs;
            } else if (refs && typeof refs === 'object') {
              parsed.references = [refs];
            } else {
              parsed.references = [{ description: String(refs) }];
            }
            
            console.log("👥 Parsed References:", parsed.references);
          } catch (err) {
            console.error('❌ Error parsing references:', err);
            parsed.references = [];
          }
        }

        setParsedData(parsed);
        console.log("✅ Parsed Data Set:", parsed);

        // Prepare form data
        const formDataObj = {
          ...application,
          academic_qualifications: JSON.stringify(parsed.academicQualifications || []),
          work_experiences: JSON.stringify(parsed.workExperiences || []),
          references: JSON.stringify(parsed.references || []),
          open_to_language_course: Boolean(application.open_to_language_course)
        };

        // Convert null/undefined to empty strings
        Object.keys(formDataObj).forEach(key => {
          if (formDataObj[key] === null || formDataObj[key] === undefined) {
            formDataObj[key] = "";
          }
        });

        console.log("📋 Form Data Object:", formDataObj);
        setFormData(formDataObj);

      } catch (err) {
        console.error("❌ Error fetching application:", err);
        setError(err.message);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err.message,
          confirmButtonColor: '#EF4444',
        });
      } finally {
        setLoading(false);
        console.log("✅ Loading complete");
      }
    };

    fetchApplication();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayFieldChange = (field, index, key, value) => {
    const updatedArray = [...parsedData[field]];
    updatedArray[index] = {
      ...updatedArray[index],
      [key]: value
    };
    
    setParsedData(prev => ({
      ...prev,
      [field]: updatedArray
    }));

    // Update formData with stringified version
    setFormData(prev => ({
      ...prev,
      [field === 'academicQualifications' ? 'academic_qualifications' : 
       field === 'workExperiences' ? 'work_experiences' : 'references']: JSON.stringify(updatedArray)
    }));
  };

  const addArrayItem = (field) => {
    const newItem = field === 'academicQualifications' ? {
      degree: '',
      institution: '',
      year: '',
      cgpa: '',
      gpa: '',
      percentage: '',
      major: '',
      description: ''
    } : field === 'workExperiences' ? {
      organization: '',
      position: '',
      start_date: '',
      end_date: '',
      current: false,
      duration: '',
      description: ''
    } : {
      name: '',
      email: '',
      phone: '',
      relationship: '',
      position: '',
      organization: '',
      description: ''
    };

    const updatedArray = [...parsedData[field], newItem];
    
    setParsedData(prev => ({
      ...prev,
      [field]: updatedArray
    }));

    // Update formData
    setFormData(prev => ({
      ...prev,
      [field === 'academicQualifications' ? 'academic_qualifications' : 
       field === 'workExperiences' ? 'work_experiences' : 'references']: JSON.stringify(updatedArray)
    }));
  };

  const removeArrayItem = (field, index) => {
    const updatedArray = parsedData[field].filter((_, i) => i !== index);
    
    setParsedData(prev => ({
      ...prev,
      [field]: updatedArray
    }));

    // Update formData
    setFormData(prev => ({
      ...prev,
      [field === 'academicQualifications' ? 'academic_qualifications' : 
       field === 'workExperiences' ? 'work_experiences' : 'references']: JSON.stringify(updatedArray)
    }));
  };

  

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to update this application?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3B82F6',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Yes, update it!',
    cancelButtonText: 'Cancel'
  });

  if (!result.isConfirmed) return;

  setSubmitting(true);
  
  try {
    const token = localStorage.getItem("admin_token");
    
    // Prepare FormData for file uploads
    const formDataToSend = new FormData();
    
    // Add all form fields
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined) {
        // Convert boolean to string
        if (typeof formData[key] === 'boolean') {
          formDataToSend.append(key, formData[key] ? '1' : '0');
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
    });

    // Debug: Log form data
    console.log("📤 Form data to send:");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }

    const url = `${BASE_URL}/admin/agent-applications/update/${id}`;
    console.log("📡 Update URL:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        // REMOVE Content-Type header when using FormData
        // Browser will set it automatically with boundary
      },
      body: formDataToSend
    });

    console.log("📡 Response Status:", response.status);
    console.log("📡 Response Headers:", response.headers);

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    console.log("📡 Content-Type:", contentType);
    
    let result;
    
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      // If not JSON, get text
      const textResponse = await response.text();
      console.error("Non-JSON Response:", textResponse.substring(0, 500));
      
      // Check if it's an HTML error page
      if (textResponse.includes("<!DOCTYPE") || textResponse.includes("<html")) {
        throw new Error("Server returned HTML error page. Please check server logs.");
      } else {
        throw new Error(`Server error: ${textResponse.substring(0, 200)}`);
      }
    }

    if (!response.ok) {
      console.error("❌ Update failed - Response:", result);
      
      // Show detailed error message
      let errorMessage = "Failed to update application";
      if (result.message) {
        errorMessage = result.message;
      } else if (result.errors) {
        // If there are validation errors
        const errorList = Object.values(result.errors).flat().join(', ');
        errorMessage = `Validation errors: ${errorList}`;
      } else if (result.error) {
        errorMessage = result.error;
      }
      
      throw new Error(errorMessage);
    }

    console.log("✅ Update successful:", result);

    await Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Application updated successfully!',
      confirmButtonColor: '#10B981',
      timer: 2000,
      timerProgressBar: true
    });

    // Correct navigation path
    navigate(`/dashboard/agent-application/application-details/${id}`);
    
  } catch (err) {
    console.error("Update error:", err);
    
    let errorMessage = err.message;
    
    // Handle specific error cases
    if (err.message.includes("Unexpected token '<'")) {
      errorMessage = "Server returned an HTML error page instead of JSON. Please check if the API endpoint is correct.";
    } else if (err.message.includes("Failed to fetch")) {
      errorMessage = "Network error. Please check your internet connection.";
    } else if (err.message.includes("500")) {
      errorMessage = "Server internal error. Please try again later or contact support.";
    }
    
    await Swal.fire({
      icon: 'error',
      title: 'Update Failed!',
      html: `
        <div class="text-left">
          <p class="mb-2"><strong>Error:</strong> ${errorMessage}</p>
          <p class="text-sm text-gray-600 mt-2">Application ID: ${id}</p>
          <p class="text-sm text-gray-600">API URL: ${BASE_URL}/admin/agent-applications/update/${id}</p>
        </div>
      `,
      confirmButtonColor: '#EF4444',
      confirmButtonText: 'OK',
      showCancelButton: true,
      cancelButtonText: 'Try Again',
      cancelButtonColor: '#6B7280'
    }).then((swalResult) => {
      if (swalResult.dismiss === Swal.DismissReason.cancel) {
        // Retry the submission
        handleSubmit(e);
      }
    });
  } finally {
    setSubmitting(false);
  }
};

  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Any unsaved changes will be lost.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, discard changes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // ✅ FIXED: Correct navigation path
        navigate(`/dashboard/agent-application/application-details/${id}`);
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading application data...</p>
          <p className="text-sm text-gray-500 mt-2">Application ID: {id}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading application</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <p className="text-sm text-red-700 mt-1">Application ID: {id}</p>
              <div className="mt-4 space-x-3">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log("🎨 Rendering Edit Form with data:", formData);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Edit Application</h1>
                  <p className="mt-1 text-sm text-gray-600">ID: {id}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                formData.status === 'Approved' ? 'bg-green-100 text-green-800' :
                formData.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                formData.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {formData.status}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Student Information Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                <svg className="w-5 h-5 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Student Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Details */}
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-4">Personal Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="student_name"
                          value={formData.student_name || ''}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Student ID
                        </label>
                        <input
                          type="text"
                          name="student_id"
                          value={formData.student_id || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email || ''}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={formData.gender || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documentation */}
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-4">Documentation</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Passport Number
                        </label>
                        <input
                          type="text"
                          name="passport"
                          value={formData.passport || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Passport Expiry Date
                        </label>
                        <input
                          type="date"
                          name="passport_expiry"
                          value={formData.passport_expiry || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Study Permit/Visa
                        </label>
                        <input
                          type="text"
                          name="study_permit_or_visa"
                          value={formData.study_permit_or_visa || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country of Residence
                        </label>
                        <input
                          type="text"
                          name="country_of_residence"
                          value={formData.country_of_residence || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <textarea
                          name="address"
                          value={formData.address || ''}
                          onChange={handleChange}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Program Information Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                <svg className="w-5 h-5 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
                Program Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-4">Program Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Program Name
                        </label>
                        <input
                          type="text"
                          name="program_name"
                          value={formData.program_name || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          University Name
                        </label>
                        <input
                          type="text"
                          name="university_name"
                          value={formData.university_name || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Intake
                        </label>
                        <input
                          type="text"
                          name="intake"
                          value={formData.intake || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Study Level
                        </label>
                        <select
                          name="study_level"
                          value={formData.study_level || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select Level</option>
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="Graduate">Graduate</option>
                          <option value="Postgraduate">Postgraduate</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Certificate">Certificate</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Field of Study
                        </label>
                        <input
                          type="text"
                          name="field_of_study_name"
                          value={formData.field_of_study_name || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          name="duration"
                          value={formData.duration || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-4">Additional Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Campus City
                        </label>
                        <input
                          type="text"
                          name="campus_city"
                          value={formData.campus_city || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Destination
                        </label>
                        <input
                          type="text"
                          name="destination"
                          value={formData.destination || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Grading Scheme
                        </label>
                        <input
                          type="text"
                          name="grading_scheme"
                          value={formData.grading_scheme || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Specialization
                        </label>
                        <input
                          type="text"
                          name="specialization"
                          value={formData.specialization || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Qualifications Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  <svg className="w-5 h-5 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                  Academic Qualifications
                </h2>
                <button
                  type="button"
                  onClick={() => addArrayItem('academicQualifications')}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Qualification
                </button>
              </div>
            </div>
            <div className="p-6">
              {parsedData.academicQualifications.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">No academic qualifications added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {parsedData.academicQualifications.map((qual, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-gray-900">Qualification {index + 1}</h3>
                        <button
                          type="button"
                          onClick={() => removeArrayItem('academicQualifications', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                          <input
                            type="text"
                            value={qual.degree || ''}
                            onChange={(e) => handleArrayFieldChange('academicQualifications', index, 'degree', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                          <input
                            type="text"
                            value={qual.institution || ''}
                            onChange={(e) => handleArrayFieldChange('academicQualifications', index, 'institution', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                          <input
                            type="text"
                            value={qual.year || ''}
                            onChange={(e) => handleArrayFieldChange('academicQualifications', index, 'year', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
                          <input
                            type="text"
                            value={qual.major || ''}
                            onChange={(e) => handleArrayFieldChange('academicQualifications', index, 'major', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
                          <input
                            type="text"
                            value={qual.cgpa || ''}
                            onChange={(e) => handleArrayFieldChange('academicQualifications', index, 'cgpa', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">GPA</label>
                          <input
                            type="text"
                            value={qual.gpa || ''}
                            onChange={(e) => handleArrayFieldChange('academicQualifications', index, 'gpa', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Percentage (%)</label>
                          <input
                            type="text"
                            value={qual.percentage || ''}
                            onChange={(e) => handleArrayFieldChange('academicQualifications', index, 'percentage', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={qual.description || ''}
                          onChange={(e) => handleArrayFieldChange('academicQualifications', index, 'description', e.target.value)}
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Work Experience Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  <svg className="w-5 h-5 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Work Experience
                </h2>
                <button
                  type="button"
                  onClick={() => addArrayItem('workExperiences')}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Experience
                </button>
              </div>
            </div>
            <div className="p-6">
              {parsedData.workExperiences.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">No work experience added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {parsedData.workExperiences.map((exp, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-gray-900">Experience {index + 1}</h3>
                        <button
                          type="button"
                          onClick={() => removeArrayItem('workExperiences', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                          <input
                            type="text"
                            value={exp.organization || ''}
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'organization', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                          <input
                            type="text"
                            value={exp.position || ''}
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'position', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                          <input
                            type="date"
                            value={exp.start_date || ''}
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'start_date', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                          <input
                            type="date"
                            value={exp.end_date || ''}
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'end_date', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                          <input
                            type="text"
                            value={exp.duration || ''}
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'duration', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`current-${index}`}
                            checked={exp.current || false}
                            onChange={(e) => handleArrayFieldChange('workExperiences', index, 'current', e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`current-${index}`} className="ml-2 block text-sm text-gray-900">
                            Current Job
                          </label>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={exp.description || ''}
                          onChange={(e) => handleArrayFieldChange('workExperiences', index, 'description', e.target.value)}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Agent Information Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                <svg className="w-5 h-5 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 a2 2 0 014 0z" />
                </svg>
                Agent Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    name="agent_name"
                    value={formData.agent_name || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agent ID
                  </label>
                  <input
                    type="text"
                    name="agent_id"
                    value={formData.agent_id || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Financial Information Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                <svg className="w-5 h-5 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Financial Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Application Fee ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="application_fee"
                      value={formData.application_fee || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Average Gross Tuition ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="average_gross_tuition"
                      value={formData.average_gross_tuition || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cost of Living ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="cost_of_living"
                      value={formData.cost_of_living || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Average UG Program ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="average_undergraduate_program"
                      value={formData.average_undergraduate_program || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Average Graduate Program ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="average_graduate_program"
                      value={formData.average_graduate_program || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                <svg className="w-5 h-5 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Achievements
              </h2>
            </div>
            <div className="p-6">
              <textarea
                name="achievements"
                value={formData.achievements || ''}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter achievements, awards, or notable accomplishments..."
              />
            </div>
          </div>

          {/* References Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  <svg className="w-5 h-5 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  References
                </h2>
                <button
                  type="button"
                  onClick={() => addArrayItem('references')}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Reference
                </button>
              </div>
            </div>
            <div className="p-6">
              {parsedData.references.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">No references added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {parsedData.references.map((ref, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-gray-900">Reference {index + 1}</h3>
                        <button
                          type="button"
                          onClick={() => removeArrayItem('references', index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <input
                            type="text"
                            value={ref.name || ''}
                            onChange={(e) => handleArrayFieldChange('references', index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={ref.email || ''}
                            onChange={(e) => handleArrayFieldChange('references', index, 'email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input
                            type="tel"
                            value={ref.phone || ''}
                            onChange={(e) => handleArrayFieldChange('references', index, 'phone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                          <input
                            type="text"
                            value={ref.relationship || ''}
                            onChange={(e) => handleArrayFieldChange('references', index, 'relationship', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                          <input
                            type="text"
                            value={ref.position || ''}
                            onChange={(e) => handleArrayFieldChange('references', index, 'position', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                          <input
                            type="text"
                            value={ref.organization || ''}
                            onChange={(e) => handleArrayFieldChange('references', index, 'organization', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={ref.description || ''}
                          onChange={(e) => handleArrayFieldChange('references', index, 'description', e.target.value)}
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Additional Information Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                <svg className="w-5 h-5 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Additional Information
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name Difference
                  </label>
                  <input
                    type="text"
                    name="has_name_difference"
                    value={formData.has_name_difference || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="If any name difference exists"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="open_to_language_course"
                    name="open_to_language_course"
                    checked={formData.open_to_language_course || false}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="open_to_language_course" className="ml-2 block text-sm text-gray-900">
                    Open to Language Course
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Success Chance (%)
                  </label>
                  <input
                    type="number"
                    name="success_chance"
                    value={formData.success_chance || ''}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Documents Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                <svg className="w-5 h-5 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Documents
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SOP (URL or Path)
                  </label>
                  <input
                    type="text"
                    name="sop"
                    value={formData.sop || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resume (URL or Path)
                  </label>
                  <input
                    type="text"
                    name="resume"
                    value={formData.resume || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transcripts (URL or Path)
                  </label>
                  <input
                    type="text"
                    name="transcripts"
                    value={formData.transcripts || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Test Scores (URL or Path)
                  </label>
                  <input
                    type="text"
                    name="test_scores"
                    value={formData.test_scores || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Important Dates Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                <svg className="w-5 h-5 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Important Dates
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Program Open Date
                  </label>
                  <input
                    type="date"
                    name="program_open_date"
                    value={formData.program_open_date || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Submission Deadline
                  </label>
                  <input
                    type="date"
                    name="program_submission_deadline"
                    value={formData.program_submission_deadline || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                <svg className="w-5 h-5 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Application Status
              </h2>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4">
                <select
                  name="status"
                  value={formData.status || 'Pending'}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  formData.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  formData.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                  formData.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  Current: {formData.status}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={submitting}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Application
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditApplication;


