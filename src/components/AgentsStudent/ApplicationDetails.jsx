



import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../Api/ApiBaseUrl";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [imagePreview, setImagePreview] = useState({
    isOpen: false,
    url: null,
    title: ""
  });

  const fetchApplicationData = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        navigate("/login");
        return;
      }

      setLoading(true);
      const res = await fetch(`${BASE_URL}/admin/agent-applications/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store'
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch application");
      }

      if (!result.success) {
        throw new Error(result.message || "API request failed");
      }

      if (!result.data) {
        throw new Error("No application data found");
      }

      setApplication(result.data);

    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err.message);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: err.message,
        confirmButtonColor: '#3B82F6',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationData();
  }, [id, navigate]);

  const formatDate = (dateString) => {
    if (!dateString || dateString === "null" || dateString === "N/A") return "N/A";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString || dateString === "null" || dateString === "N/A") return "N/A";
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === "N/A" || amount === "null") return "N/A";
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(parseFloat(amount));
    } catch (e) {
      return amount;
    }
  };

  const parseJSONField = (field) => {
    if (!field || field === "N/A" || field === "null" || field === "") return [];
    try {
      let data = field;
      
      if (Array.isArray(data)) return data;
      
      if (typeof data === 'string') {
        data = data.trim();
        if (data.startsWith('"') && data.endsWith('"')) {
          data = data.substring(1, data.length - 1);
        }
        
        if (data.startsWith('[') || data.startsWith('{')) {
          try {
            data = JSON.parse(data);
          } catch (parseErr) {
            data = data.replace(/\\"/g, '"');
            try {
              data = JSON.parse(data);
            } catch (e) {
              return [{ description: data }];
            }
          }
        } else {
          return [{ description: data }];
        }
      }
      
      if (Array.isArray(data)) {
        return data;
      } else if (data && typeof data === 'object') {
        return [data];
      }
      
      return [{ description: String(data) }];
    } catch (err) {
      console.error('Error parsing JSON field:', field, err);
      return [{ description: String(field) }];
    }
  };

  const renderJSONField = (field, label) => {
    const data = parseJSONField(field);
    if (data.length === 0) {
      return <p className="text-gray-500 italic">No {label.toLowerCase()} provided</p>;
    }

    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(item).map(([key, value]) => (
                <div key={key}>
                  <span className="text-sm font-medium text-gray-600 capitalize">
                    {key.replace(/_/g, ' ')}:
                  </span>
                  <div className="mt-1 text-gray-900">
                    {key.includes('date') ? formatDate(value) : value || "N/A"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleViewFile = (fileUrl, title = "") => {
    if (!fileUrl || fileUrl === "null") {
      Swal.fire({
        icon: 'info',
        title: 'No File',
        text: 'No file available to view',
        confirmButtonColor: '#3B82F6',
      });
      return;
    }

    let finalUrl = fileUrl;
    
    if (!fileUrl.startsWith('http') && !fileUrl.startsWith('https')) {
      if (fileUrl.startsWith('uploads/')) {
        finalUrl = `${BASE_URL}/${fileUrl}`;
      } else if (fileUrl.includes('/')) {
        finalUrl = `${BASE_URL}/${fileUrl}`;
      } else {
        finalUrl = `${BASE_URL}/uploads/${fileUrl}`;
      }
    }

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    const pdfExtensions = ['.pdf'];
    const docExtensions = ['.doc', '.docx'];
    
    const fileExtension = '.' + fileUrl.toLowerCase().split('.').pop();
    
    if (imageExtensions.includes(fileExtension)) {
      setImagePreview({
        isOpen: true,
        url: finalUrl,
        title: title || "Image Preview"
      });
    } else if (pdfExtensions.includes(fileExtension)) {
      window.open(finalUrl, '_blank');
    } else if (docExtensions.includes(fileExtension)) {
      window.open(`https://docs.google.com/viewer?url=${encodeURIComponent(finalUrl)}`, '_blank');
    } else {
      window.open(finalUrl, '_blank');
    }
  };

  const closeImagePreview = () => {
    setImagePreview({
      isOpen: false,
      url: null,
      title: ""
    });
  };

  const ImagePreviewModal = () => {
    if (!imagePreview.isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
        <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b bg-white">
            <h3 className="text-lg font-semibold text-gray-900">{imagePreview.title}</h3>
            <button
              onClick={closeImagePreview}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4 flex items-center justify-center overflow-auto max-h-[calc(90vh-80px)]">
            <img
              src={imagePreview.url}
              alt={imagePreview.title}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                console.error("Image failed to load:", imagePreview.url);
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Available";
              }}
            />
          </div>
          <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
            <a
              href={imagePreview.url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
            <button
              onClick={closeImagePreview}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DocumentViewer = ({ url, title, type = "document" }) => {
    if (!url || url === "null") {
      return (
        <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500">No {type} uploaded</p>
          </div>
        </div>
      );
    }

    const getFileType = (filename) => {
      if (!filename) return 'other';
      const extension = filename.split('.').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(extension)) return 'image';
      if (extension === 'pdf') return 'pdf';
      if (['doc', 'docx'].includes(extension)) return 'doc';
      return 'other';
    };

    const fileType = getFileType(url);
    const fileName = url.split('/').pop();

    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              fileType === 'image' ? 'bg-blue-100' :
              fileType === 'pdf' ? 'bg-red-100' :
              fileType === 'doc' ? 'bg-green-100' :
              'bg-gray-100'
            }`}>
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {fileType === 'image' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                )}
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{title}</h4>
              <p className="text-sm text-gray-500 truncate max-w-xs">{fileName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleViewFile(url, title)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268 2.943-9.542-7z" />
              </svg>
              View
            </button>
            <a
              href={`${BASE_URL}/uploads/${url}`}
              download={fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
          </div>
        </div>
        
        {fileType === 'image' && (
          <div className="p-4">
            <div 
              className="relative h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => handleViewFile(url, title)}
            >
              <img
                src={`${BASE_URL}/uploads/${url}`}
                alt={title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.error("Preview image failed to load:", url);
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300?text=Image+Preview+Not+Available";
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white bg-opacity-90 p-3 rounded-lg shadow-lg">
                  <p className="text-sm font-medium text-gray-900">Click to view full image</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDocumentsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Documents & Files</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-900">Application Documents</h3>
            <DocumentViewer 
              url={application.sop} 
              title="Statement of Purpose (SOP)" 
              type="SOP"
            />
            <DocumentViewer 
              url={application.resume} 
              title="Resume/CV" 
              type="resume"
            />
            <DocumentViewer 
              url={application.transcripts} 
              title="Academic Transcripts" 
              type="transcripts"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-900">Additional Documents</h3>
            <DocumentViewer 
              url={application.english_test} 
              title="English Test Results" 
              type="english test"
            />
            <DocumentViewer 
              url={application.passport_copy} 
              title="Passport Copy" 
              type="passport"
            />
            <DocumentViewer 
              url={application.photo} 
              title="Student Photo" 
              type="photo"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">References</h2>
        {renderJSONField(application.references, "references")}
      </div>
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading application details...</p>
        <p className="text-sm text-gray-500 mt-2">Application ID: {id}</p>
      </div>
    </div>
  );

  const ErrorDisplay = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Error Loading Application</h3>
        <p className="text-gray-600 text-center mb-2">{error}</p>
        <p className="text-sm text-gray-500 text-center mb-6">Application ID: {id}</p>
        <div className="flex gap-3">
          <button
            onClick={() => fetchApplicationData()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );

  const NoDataDisplay = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Application Found</h3>
        <p className="text-gray-600 mb-6">The application with ID {id} was not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  const renderField = (label, value, type = "text") => (
    <div className="flex justify-between items-start py-3 border-b border-gray-100 last:border-0">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900 text-right font-medium ml-4">
        {type === 'date' ? formatDate(value) : 
         type === 'datetime' ? formatDateTime(value) :
         type === 'currency' ? formatCurrency(value) :
         type === 'boolean' ? (value ? "Yes" : "No") :
         value || "N/A"}
      </span>
    </div>
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay />;
  if (!application) return <NoDataDisplay />;

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "student", label: "Student", icon: "👤" },
    { id: "program", label: "Program", icon: "🎓" },
    { id: "academic", label: "Academic", icon: "📚" },
    { id: "work", label: "Work", icon: "💼" },
    { id: "documents", label: "Documents", icon: "📄" },
    { id: "financial", label: "Financial", icon: "💰" },
    { id: "english", label: "English Tests", icon: "🌐" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition duration-200"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Application #{application.id}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Student:</span> {application.student_name} | 
                    <span className="font-medium ml-2">Agent:</span> {application.agent_name}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  application.status === 'Reviewed' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                  application.status === 'Accepted' ? 'bg-green-100 text-green-800 border border-green-200' :
                  application.status === 'Rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
                  'bg-yellow-100 text-yellow-800 border border-yellow-200'
                }`}>
                  {application.status || 'Pending'}
                </span>
                <button
                  onClick={() => navigate(`/dashboard/agent-application/edit/${id}`)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-5 py-2.5 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex overflow-x-auto space-x-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap rounded-lg transition duration-200 ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {activeTab === "overview" && application && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-700 font-medium">Student ID</div>
                    <div className="text-2xl font-bold text-gray-900">{application.student_id}</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                    <div className="text-sm text-green-700 font-medium">Agent ID</div>
                    <div className="text-2xl font-bold text-gray-900">{application.agent_id}</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-700 font-medium">Program ID</div>
                    <div className="text-2xl font-bold text-gray-900">{application.program_id}</div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                    <div className="text-sm text-yellow-700 font-medium">Intake</div>
                    <div className="text-2xl font-bold text-gray-900">{application.intake || "N/A"}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Student Information</h2>
              </div>
              <div className="space-y-3">
                {renderField("Full Name", application.student_name)}
                {renderField("Email", application.email)}
                {renderField("Phone", application.phone)}
                {renderField("Date of Birth", application.dob, "date")}
                {renderField("Gender", application.gender)}
                {renderField("Country", application.country_of_residence)}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Program Information</h2>
              </div>
              <div className="space-y-3">
                {renderField("Program", application.program_name)}
                {renderField("University", application.university_name)}
                {renderField("Study Level", application.study_level)}
                {renderField("Field of Study", application.field_of_study_name)}
                {renderField("Duration", application.duration)}
                {renderField("Intake", application.intake)}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Financial Summary</h2>
              </div>
              <div className="space-y-3">
                {renderField("Application Fee", application.application_fee, "currency")}
                {renderField("Tuition", application.average_gross_tuition, "currency")}
                {renderField("Living Cost", application.cost_of_living, "currency")}
                {renderField("Success Chance", application.success_chance)}
              </div>
            </div>
          </div>
        )}

        {activeTab === "student" && application && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Personal Information</h2>
              <div className="space-y-4">
                {renderField("Full Name", application.student_name)}
                {renderField("Student ID", application.student_id)}
                {renderField("Email", application.email)}
                {renderField("Phone", application.phone)}
                {renderField("Date of Birth", application.dob, "date")}
                {renderField("Gender", application.gender)}
                {renderField("Address", application.address)}
                {renderField("Nationality", application.student_profile_nationality)}
                {renderField("ELP", application.elp)}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Passport & Immigration</h2>
              <div className="space-y-4">
                {renderField("Passport Number", application.passport)}
                {renderField("Passport Expiry", application.passport_expiry, "date")}
                {renderField("Study Permit/Visa", application.study_permit_or_visa)}
                {renderField("Country of Residence", application.country_of_residence)}
                {renderField("Destination", application.destination)}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Agent Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium mb-2">Agent Name</div>
                  <div className="text-lg font-bold text-gray-900">{application.agent_name}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-600 font-medium mb-2">Agent ID</div>
                  <div className="text-lg font-bold text-gray-900">{application.agent_id}</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm text-purple-600 font-medium mb-2">Company</div>
                  <div className="text-lg font-bold text-gray-900">{application.company_name || "N/A"}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "program" && application && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Program Details</h2>
              <div className="space-y-4">
                {renderField("Program Name", application.program_name)}
                {renderField("University", application.university_name)}
                {renderField("Intake", application.intake)}
                {renderField("Study Level", application.study_level)}
                {renderField("Field of Study", application.field_of_study_name)}
                {renderField("Duration", application.duration)}
                {renderField("Program Description", application.program_description)}
                {renderField("Program Summary", application.program_summary)}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Additional Information</h2>
              <div className="space-y-4">
                {renderField("Campus City", application.campus_city)}
                {renderField("Destination", application.destination)}
                {renderField("Grading Scheme", application.grading_scheme)}
                {renderField("Subject", application.subject)}
                {renderField("Specialization", application.specialization)}
                {renderField("Program Level", application.program_level)}
                {renderField("Education Country", application.education_country)}
                {renderField("Last Level of Study", application.last_level_of_study)}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Important Dates</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium mb-2">Program Open Date</div>
                  <div className="text-lg font-bold text-gray-900">{formatDate(application.program_open_date)}</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-sm text-red-600 font-medium mb-2">Submission Deadline</div>
                  <div className="text-lg font-bold text-gray-900">{formatDateTime(application.program_submission_deadline)}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-600 font-medium mb-2">Application Created</div>
                  <div className="text-lg font-bold text-gray-900">{formatDateTime(application.created_at)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "academic" && application && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Academic Qualifications</h2>
              {renderJSONField(application.academic_qualifications, "academic qualifications")}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Achievements</h2>
              {application.achievements ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-line">{application.achievements}</p>
                </div>
              ) : (
                <p className="text-gray-500 italic">No achievements provided</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "work" && application && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Work Experience</h2>
              {renderJSONField(application.work_experiences, "work experience")}
            </div>
          </div>
        )}

        {activeTab === "documents" && application && renderDocumentsTab()}

        {activeTab === "financial" && application && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Tuition & Fees</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-200">
                  <div>
                    <div className="text-sm text-blue-600 font-medium">Application Fee</div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(application.application_fee)}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-200">
                  <div>
                    <div className="text-sm text-green-600 font-medium">Average Gross Tuition</div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(application.average_gross_tuition)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Cost of Living</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-white rounded-lg border border-yellow-200">
                  <div>
                    <div className="text-sm text-yellow-600 font-medium">Annual Living Cost</div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(application.cost_of_living)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "english" && application && (
          <div className="space-y-6">
            {application.ielts_required && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">IELTS Scores</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-blue-600 font-medium">Overall</div>
                    <div className="text-2xl font-bold text-gray-900">{application.ielts_overall || "N/A"}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">Reading</div>
                    <div className="text-xl font-bold text-gray-900">{application.ielts_reading || "N/A"}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">Writing</div>
                    <div className="text-xl font-bold text-gray-900">{application.ielts_writing || "N/A"}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">Listening</div>
                    <div className="text-xl font-bold text-gray-900">{application.ielts_listening || "N/A"}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">Speaking</div>
                    <div className="text-xl font-bold text-gray-900">{application.ielts_speaking || "N/A"}</div>
                  </div>
                </div>
              </div>
            )}

            {application.toefl_required && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">TOEFL Scores</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-green-600 font-medium">Overall</div>
                    <div className="text-2xl font-bold text-gray-900">{application.toefl_overall || "N/A"}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">Reading</div>
                    <div className="text-xl font-bold text-gray-900">{application.toefl_reading || "N/A"}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">Writing</div>
                    <div className="text-xl font-bold text-gray-900">{application.toefl_writing || "N/A"}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">English Test Requirements</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-sm text-gray-600 mb-2">IELTS Required</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${application.ielts_required ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {application.ielts_required ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm text-gray-600 mb-2">TOEFL Required</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${application.toefl_required ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {application.toefl_required ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm text-gray-600 mb-2">PTE Required</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${application.pte_required ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {application.pte_required ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm text-gray-600 mb-2">Duolingo Required</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${application.duolingo_required ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {application.duolingo_required ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ImagePreviewModal />
    </div>
  );
};

export default ApplicationDetails;






