import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BASE_URL from "../../Api/ApiBaseUrl";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [parsedData, setParsedData] = useState({
    academicQualifications: [],
    workExperiences: [],
    references: []
  });

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(`${BASE_URL}/admin/agent-applications/${id}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (!res.ok) throw new Error(result.message || "Failed to fetch");

        setApplication(result.data);
        
        // Parse JSON strings if they exist
        if (result.data) {
          const parsed = {
            academicQualifications: [],
            workExperiences: [],
            references: []
          };

          // Parse Academic Qualifications
          if (result.data.academic_qualifications) {
            try {
              if (typeof result.data.academic_qualifications === 'string') {
                parsed.academicQualifications = JSON.parse(result.data.academic_qualifications);
              } else if (Array.isArray(result.data.academic_qualifications)) {
                parsed.academicQualifications = result.data.academic_qualifications;
              }
            } catch (err) {
              console.error('Error parsing academic qualifications:', err);
              // If it's not valid JSON, treat it as plain text
              parsed.academicQualifications = [{ description: result.data.academic_qualifications }];
            }
          }

          // Parse Work Experiences
          if (result.data.work_experiences) {
            try {
              if (typeof result.data.work_experiences === 'string') {
                parsed.workExperiences = JSON.parse(result.data.work_experiences);
              } else if (Array.isArray(result.data.work_experiences)) {
                parsed.workExperiences = result.data.work_experiences;
              }
            } catch (err) {
              console.error('Error parsing work experiences:', err);
              parsed.workExperiences = [{ description: result.data.work_experiences }];
            }
          }

          // Parse References
          if (result.data.references) {
            try {
              if (typeof result.data.references === 'string') {
                parsed.references = JSON.parse(result.data.references);
              } else if (Array.isArray(result.data.references)) {
                parsed.references = result.data.references;
              }
            } catch (err) {
              console.error('Error parsing references:', err);
              parsed.references = [{ description: result.data.references }];
            }
          }

          setParsedData(parsed);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const renderField = (label, value, isBoolean = false, isCurrency = false) => {
    if (isBoolean) {
      return (
        <div className="flex items-center">
          <span className="font-medium text-gray-700">{label}:</span>
          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {value ? 'Yes' : 'No'}
          </span>
        </div>
      );
    }
    
    if (isCurrency) {
      return (
        <div>
          <span className="font-medium text-gray-700">{label}:</span>
          <span className="ml-2 text-gray-900">{formatCurrency(value)}</span>
        </div>
      );
    }
    
    return (
      <div>
        <span className="font-medium text-gray-700">{label}:</span>
        <span className="ml-2 text-gray-900">{value || "N/A"}</span>
      </div>
    );
  };

  const renderDocumentLink = (label, value) => {
    if (!value) return renderField(label, null);
    
    const isUrl = value.startsWith('http') || value.startsWith('/');
    
    return (
      <div>
        <span className="font-medium text-gray-700">{label}:</span>
        {isUrl ? (
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-2 text-blue-600 hover:text-blue-800 hover:underline"
          >
            View Document
          </a>
        ) : (
          <span className="ml-2 text-gray-900">{value}</span>
        )}
      </div>
    );
  };

  // Render Academic Qualifications
  const renderAcademicQualifications = () => {
    if (!parsedData.academicQualifications || parsedData.academicQualifications.length === 0) {
      return <p className="text-gray-500">No academic qualifications provided</p>;
    }

    return (
      <div className="space-y-3">
        {parsedData.academicQualifications.map((qual, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium text-gray-900">Qualification {index + 1}</h4>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              {qual.degree && <div><span className="text-sm text-gray-600">Degree:</span> <span className="font-medium">{qual.degree}</span></div>}
              {qual.institution && <div><span className="text-sm text-gray-600">Institution:</span> <span className="font-medium">{qual.institution}</span></div>}
              {qual.year && <div><span className="text-sm text-gray-600">Year:</span> <span className="font-medium">{qual.year}</span></div>}
              {qual.cgpa && <div><span className="text-sm text-gray-600">CGPA:</span> <span className="font-medium">{qual.cgpa}</span></div>}
              {qual.gpa && <div><span className="text-sm text-gray-600">GPA:</span> <span className="font-medium">{qual.gpa}</span></div>}
              {qual.percentage && <div><span className="text-sm text-gray-600">Percentage:</span> <span className="font-medium">{qual.percentage}%</span></div>}
              {qual.major && <div><span className="text-sm text-gray-600">Major:</span> <span className="font-medium">{qual.major}</span></div>}
              {qual.description && !qual.degree && !qual.institution && (
                <div><span className="text-sm text-gray-600">Description:</span> <span className="font-medium">{qual.description}</span></div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render Work Experiences
  const renderWorkExperiences = () => {
    if (!parsedData.workExperiences || parsedData.workExperiences.length === 0) {
      return <p className="text-gray-500">No work experience provided</p>;
    }

    return (
      <div className="space-y-3">
        {parsedData.workExperiences.map((exp, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              {exp.organization && <div><span className="text-sm text-gray-600">Organization:</span> <span className="font-medium">{exp.organization}</span></div>}
              {exp.position && <div><span className="text-sm text-gray-600">Position:</span> <span className="font-medium">{exp.position}</span></div>}
              {exp.start_date && <div><span className="text-sm text-gray-600">Start Date:</span> <span className="font-medium">{formatDate(exp.start_date)}</span></div>}
              {exp.end_date && <div><span className="text-sm text-gray-600">End Date:</span> <span className="font-medium">{formatDate(exp.end_date)}</span></div>}
              {exp.current && <div><span className="text-sm text-gray-600">Current:</span> <span className={`px-2 py-1 text-xs rounded-full ${exp.current ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{exp.current ? 'Yes' : 'No'}</span></div>}
              {exp.duration && <div><span className="text-sm text-gray-600">Duration:</span> <span className="font-medium">{exp.duration}</span></div>}
            </div>
            {exp.description && (
              <div className="mt-2">
                <span className="text-sm text-gray-600">Description:</span>
                <p className="mt-1 text-gray-700">{exp.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render References
  const renderReferences = () => {
    if (!parsedData.references || parsedData.references.length === 0) {
      return <p className="text-gray-500">No references provided</p>;
    }

    return (
      <div className="space-y-3">
        {parsedData.references.map((ref, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium text-gray-900">Reference {index + 1}</h4>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              {ref.name && <div><span className="text-sm text-gray-600">Name:</span> <span className="font-medium">{ref.name}</span></div>}
              {ref.email && (
                <div>
                  <span className="text-sm text-gray-600">Email:</span>
                  <a href={`mailto:${ref.email}`} className="ml-1 font-medium text-blue-600 hover:text-blue-800">
                    {ref.email}
                  </a>
                </div>
              )}
              {ref.phone && (
                <div>
                  <span className="text-sm text-gray-600">Phone:</span>
                  <a href={`tel:${ref.phone}`} className="ml-1 font-medium text-blue-600 hover:text-blue-800">
                    {ref.phone}
                  </a>
                </div>
              )}
              {ref.relationship && <div><span className="text-sm text-gray-600">Relationship:</span> <span className="font-medium">{ref.relationship}</span></div>}
              {ref.position && <div><span className="text-sm text-gray-600">Position:</span> <span className="font-medium">{ref.position}</span></div>}
              {ref.organization && <div><span className="text-sm text-gray-600">Organization:</span> <span className="font-medium">{ref.organization}</span></div>}
              {ref.description && !ref.name && !ref.email && !ref.phone && (
                <div><span className="text-sm text-gray-600">Description:</span> <span className="font-medium">{ref.description}</span></div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleAction = async (action) => {
    if (!window.confirm(`Are you sure you want to ${action.toLowerCase()} this application?`)) {
      return;
    }

    setActionLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/admin/agent-applications/${id}/${action.toLowerCase()}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || `Failed to ${action}`);

      // Refresh application data
      const updatedRes = await fetch(`${BASE_URL}/admin/agent-applications/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      const updatedResult = await updatedRes.json();
      setApplication(updatedResult.data);
      
      alert(`Application ${action.toLowerCase()} successfully!`);
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${BASE_URL}/admin/agent-applications/${id}/export-pdf`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to download PDF");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `application-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert(`Error downloading PDF: ${err.message}`);
    }
  };

  const handleEdit = () => {
    navigate(`/applications/${id}/edit`);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading application details...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm text-red-700 hover:text-red-600 font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  if (!application) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No application found</h3>
        <p className="mt-1 text-sm text-gray-500">The application you're looking for doesn't exist.</p>
        <div className="mt-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
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
                  <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
                  <p className="mt-1 text-sm text-gray-600">ID: {application.id}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Submitted:</span> {formatDate(application.created_at)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                application.status === 'Approved' ? 'bg-green-100 text-green-800' :
                application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                application.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {application.status}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Student & Program Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Student Information Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Student Information
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">Personal Details</h3>
                      {renderField("Full Name", application.student_name)}
                      {renderField("Student ID", application.student_id)}
                      {renderField("Email", application.email)}
                      {renderField("Phone", application.phone)}
                      {renderField("Date of Birth", application.dob)}
                      {renderField("Gender", application.gender)}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">Documentation</h3>
                      {renderField("Passport Number", application.passport)}
                      {renderField("Passport Expiry", application.passport_expiry)}
                      {renderField("Study Permit/Visa", application.study_permit_or_visa)}
                      {renderField("Country of Residence", application.country_of_residence || application.country_of_resence)}
                      {renderField("Address", application.address)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Program Information Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                  Program Information
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-medium text-green-900 mb-2">Program Details</h3>
                      {renderField("Program", application.program?.name || application.program_name)}
                      {renderField("University", application.university?.name || application.university_name)}
                      {renderField("Intake", application.intake)}
                      {renderField("Study Level", application.study_level)}
                      {renderField("Field of Study", application.field_of_study_name)}
                      {renderField("Duration", application.duration)}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-medium text-green-900 mb-2">Additional Details</h3>
                      {renderField("Campus City", application.campus_city)}
                      {renderField("Destination", application.destination)}
                      {renderField("Grading Scheme", application.grading_scheme)}
                      {renderField("Subject", application.subject)}
                      {renderField("Specialization", application.specialization)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Qualifications Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                  Academic Qualifications
                </h2>
              </div>
              <div className="p-6">
                {renderAcademicQualifications()}
              </div>
            </div>

            {/* Work Experience Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Work Experience
                </h2>
              </div>
              <div className="p-6">
                {renderWorkExperiences()}
              </div>
            </div>
          </div>

          {/* Right Column - Agent & Documents */}
          <div className="space-y-6">
            {/* Agent Information Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Agent Information
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <div className="bg-purple-50 p-4 rounded-lg">
                  {renderField("Agent Name", application.agent_name)}
                  {renderField("Agent ID", application.agent_id)}
                  {renderField("Company Name", application.company_name)}
                </div>
              </div>
            </div>

            {/* Financial Information Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Financial Information
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <div className="bg-yellow-50 p-4 rounded-lg space-y-2">
                  {renderField("Application Fee", application.application_fee, false, true)}
                  {renderField("Average Gross Tuition", application.average_gross_tuition, false, true)}
                  {renderField("Cost of Living", application.cost_of_living, false, true)}
                  {renderField("Average UG Program", application.average_undergraduate_program, false, true)}
                  {renderField("Average Graduate Program", application.average_graduate_program, false, true)}
                </div>
              </div>
            </div>

            {/* Achievements Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Achievements
                </h2>
              </div>
              <div className="p-6">
                <div className="bg-pink-50 p-4 rounded-lg">
                  {application.achievements ? (
                    <div>
                      <span className="font-medium text-gray-700">Achievements:</span>
                      <p className="mt-2 text-gray-900 whitespace-pre-line">{application.achievements}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No achievements provided</p>
                  )}
                </div>
              </div>
            </div>

            {/* References Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  References
                </h2>
              </div>
              <div className="p-6">
                {renderReferences()}
              </div>
            </div>

            {/* Documents Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Documents
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <div className="bg-red-50 p-4 rounded-lg space-y-2">
                  {renderDocumentLink("SOP", application.sop)}
                  {renderDocumentLink("Resume", application.resume)}
                  {renderDocumentLink("Transcripts", application.transcripts)}
                  {renderDocumentLink("Test Scores", application.test_scores)}
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Additional Information
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  {renderField("Name Difference", application.has_name_difference)}
                  {renderField("Open to Language Course", application.open_to_language_course, true)}
                  {renderField("Success Chance", application.success_chance)}
                </div>
              </div>
            </div>

            {/* Important Dates */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Important Dates
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                  {renderField("Program Open Date", application.program_open_date)}
                  {renderField("Submission Deadline", application.program_submission_deadline)}
                  {renderField("Last Updated", formatDate(application.updated_at))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-end gap-3">
            <button
              onClick={handleDownloadPDF}
              disabled={actionLoading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>
            <button
              onClick={handleEdit}
              disabled={actionLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Application
            </button>
            {application.status !== 'Approved' && (
              <button
                onClick={() => handleAction('Approve')}
                disabled={actionLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Approve
              </button>
            )}
            {application.status !== 'Rejected' && (
              <button
                onClick={() => handleAction('Reject')}
                disabled={actionLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Reject
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;


