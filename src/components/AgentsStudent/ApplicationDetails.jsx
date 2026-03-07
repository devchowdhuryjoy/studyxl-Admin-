




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
    title: "",
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
        cache: "no-store",
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
        icon: "error",
        title: "Error!",
        text: err.message,
        confirmButtonColor: "#3B82F6",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationData();
  }, [id, navigate]);

  const formatDate = (dateString) => {
    if (!dateString || dateString === "null" || dateString === "N/A")
      return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString || dateString === "null" || dateString === "N/A")
      return "N/A";
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === "N/A" || amount === "null") return "N/A";
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(parseFloat(amount));
    } catch (e) {
      return amount;
    }
  };

  const parseJSONField = (field) => {
    if (!field || field === "N/A" || field === "null" || field === "")
      return [];
    try {
      let data = field;

      if (Array.isArray(data)) return data;

      if (typeof data === "string") {
        data = data.trim();
        if (data.startsWith('"') && data.endsWith('"')) {
          data = data.substring(1, data.length - 1);
        }

        if (data.startsWith("[") || data.startsWith("{")) {
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
      } else if (data && typeof data === "object") {
        return [data];
      }

      return [{ description: String(data) }];
    } catch (err) {
      console.error("Error parsing JSON field:", field, err);
      return [{ description: String(field) }];
    }
  };

  // Add this helper function to parse document paths
  const parseDocumentPath = (docPath) => {
    if (!docPath) return null;

    try {
      // If it's a string, clean it up
      let cleanPath = docPath;
      if (typeof docPath === "string") {
        // Remove quotes if present
        cleanPath = docPath.replace(/^["']|["']$/g, "");

        // Clean backslashes and double slashes
        cleanPath = cleanPath.replace(/\\/g, "/").replace(/\/\//g, "/");

        // Extract just the filename if it's a full path
        const parts = cleanPath.split("/");
        return parts[parts.length - 1];
      }
      return docPath;
    } catch (e) {
      console.error("Error parsing document path:", e);
      return null;
    }
  };

  // Add this function to get file URL for academic documents
  const getAcademicFileUrl = (docPath) => {
    if (!docPath) return "#";

    try {
      let cleanPath = docPath;
      if (typeof docPath === "string") {
        cleanPath = docPath
          .replace(/^["']|["']$/g, "")
          .replace(/\\/g, "/")
          .replace(/\/\//g, "/");

        // Remove "uploads" from the beginning if it exists
        if (cleanPath.startsWith("uploads/")) {
          cleanPath = cleanPath.replace("uploads/", "");
        }

        return `https://studyxladmin.globalrouteway.com/uploads/${cleanPath}`;
      }
      return "#";
    } catch (e) {
      console.error("Error constructing academic file URL:", e);
      return "#";
    }
  };

  
  

  const renderJSONField = (field, label) => {
    const data = parseJSONField(field);
    if (data.length === 0) {
      return (
        <p className="text-gray-500 italic">
          No {label.toLowerCase()} provided
        </p>
      );
    }

    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(item).map(([key, value]) => {
                // Skip rendering document field here, we'll handle it separately
                if (key === "document") return null;

                return (
                  <div key={key}>
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {key.replace(/_/g, " ")}:
                    </span>
                    <div className="mt-1 text-gray-900">
                      {key.includes("date")
                        ? formatDate(value)
                        : value || "N/A"}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Render documents for this academic qualification */}
            {item.document && item.document.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-600 block mb-2">
                  Documents:
                </span>
                <div className="space-y-2">
                  {Array.isArray(item.document) ? (
                    item.document.map((doc, docIndex) => {
                      const docPath = parseDocumentPath(doc);
                      const docUrl = getAcademicFileUrl(doc);
                      const isPDF = docPath?.toLowerCase().endsWith(".pdf");
                      const isImage = [
                        ".jpg",
                        ".jpeg",
                        ".png",
                        ".gif",
                        ".webp",
                      ].some((ext) => docPath?.toLowerCase().endsWith(ext));

                      return (
                        <div
                          key={docIndex}
                          className="flex items-center justify-between bg-white p-2 rounded border border-gray-200"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            {isPDF ? (
                              <svg
                                className="w-5 h-5 text-red-500 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                            ) : isImage ? (
                              <svg
                                className="w-5 h-5 text-blue-500 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-5 h-5 text-gray-500 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            )}
                            <span className="text-sm text-gray-700 truncate">
                              {docPath || "Document"}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              if (isImage) {
                                setImagePreview({
                                  isOpen: true,
                                  url: docUrl,
                                  title: `Academic Document - ${docPath}`,
                                });
                              } else {
                                window.open(
                                  docUrl,
                                  "_blank",
                                  "noopener,noreferrer",
                                );
                              }
                            }}
                            className="ml-2 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex-shrink-0"
                          >
                            View
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-between bg-white p-2 rounded border border-gray-200">
                      <span className="text-sm text-gray-700 truncate">
                        {String(item.document)}
                      </span>
                      <button
                        onClick={() =>
                          window.open(
                            getAcademicFileUrl(item.document),
                            "_blank",
                          )
                        }
                        className="ml-2 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        View
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleViewFile = (fileUrl, title = "") => {
    if (!fileUrl || fileUrl === "null") {
      Swal.fire({
        icon: "info",
        title: "No File",
        text: "No file available to view",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    let finalUrl = fileUrl;

    if (!fileUrl.startsWith("http") && !fileUrl.startsWith("https")) {
      if (fileUrl.startsWith("uploads/")) {
        finalUrl = `${BASE_URL}/${fileUrl}`;
      } else if (fileUrl.includes("/")) {
        finalUrl = `${BASE_URL}/${fileUrl}`;
      } else {
        finalUrl = `${BASE_URL}/uploads/${fileUrl}`;
      }
    }

    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
    const pdfExtensions = [".pdf"];
    const docExtensions = [".doc", ".docx"];

    const fileExtension = "." + fileUrl.toLowerCase().split(".").pop();

    if (imageExtensions.includes(fileExtension)) {
      setImagePreview({
        isOpen: true,
        url: finalUrl,
        title: title || "Image Preview",
      });
    } else if (pdfExtensions.includes(fileExtension)) {
      window.open(finalUrl, "_blank");
    } else if (docExtensions.includes(fileExtension)) {
      window.open(
        `https://docs.google.com/viewer?url=${encodeURIComponent(finalUrl)}`,
        "_blank",
      );
    } else {
      window.open(finalUrl, "_blank");
    }
  };

  const closeImagePreview = () => {
    setImagePreview({
      isOpen: false,
      url: null,
      title: "",
    });
  };

  const ImagePreviewModal = () => {
    if (!imagePreview.isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
        <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b bg-white">
            <h3 className="text-lg font-semibold text-gray-900">
              {imagePreview.title}
            </h3>
            <button
              onClick={closeImagePreview}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
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
                e.target.src =
                  "https://via.placeholder.com/600x400?text=Image+Not+Available";
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
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
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

  // const renderDocumentsTab = () => {
  //   const FILE_ROOT = "http://studyxl.globalrouteway.com";

  //   const documents = (() => {
  //     try {
  //       const raw = application.student_snapshot?.documents;
  //       if (Array.isArray(raw)) return raw;
  //       if (typeof raw === "string") return JSON.parse(raw);
  //       return [];
  //     } catch { return []; }
  //   })();

  //   const buildUrl = (path) =>
  //     path ? `${FILE_ROOT}/${path.replace(/^\/+/, "")}` : null;

  //   const DocCard = ({ doc }) => {
  //     const filePath = doc?.file_path;
  //     return (
  //       <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
  //         <p className="text-xs font-semibold text-gray-700 mb-2">
  //           {doc.document_type}
  //         </p>
  //         {!filePath ? (
  //           <p className="text-gray-400 italic text-xs">Not uploaded</p>
  //         ) : filePath.match(/\.(jpg|jpeg|png|gif)$/i) ? (
  //           <a href={buildUrl(filePath)} target="_blank" rel="noopener noreferrer" className="block">
  //             <img
  //               src={buildUrl(filePath)}
  //               alt={doc.document_type}
  //               className="max-h-24 rounded border border-gray-300 mx-auto hover:opacity-80 transition"
  //             />
  //             <span className="text-blue-600 text-xs flex items-center mt-1 hover:underline">
  //               <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  //               </svg>
  //               View Full Image
  //             </span>
  //           </a>
  //         ) : filePath.toLowerCase().endsWith(".pdf") ? (
  //           <a href={buildUrl(filePath)} target="_blank" rel="noopener noreferrer"
  //             className="flex items-center text-blue-600 text-xs hover:underline">
  //             <svg className="w-4 h-4 mr-1 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
  //               <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
  //             </svg>
  //             View PDF
  //           </a>
  //         ) : (
  //           <a href={buildUrl(filePath)} target="_blank" rel="noopener noreferrer"
  //             className="flex items-center text-blue-600 text-xs hover:underline">
  //             <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-4-4A2 2 0 0013.414 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  //             </svg>
  //             View Document
  //           </a>
  //         )}
  //       </div>
  //     );
  //   };

  //   return (
  //     <div className="space-y-6">
  //       <div className="bg-white rounded-xl shadow-lg p-6">
  //         <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
  //           Documents & Files
  //         </h2>

  //         {documents.length === 0 ? (
  //           <div className="text-center py-10 text-gray-400 border border-dashed border-gray-300 rounded-lg">
  //             No documents uploaded yet.
  //           </div>
  //         ) : (
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //             {documents.map((doc, index) => (
  //               <DocCard key={index} doc={doc} />
  //             ))}
  //           </div>
  //         )}
  //       </div>

  //       <div className="bg-white rounded-xl shadow-lg p-6">
  //         <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
  //           References
  //         </h2>
  //         {renderJSONField(application.student_snapshot?.references, "references")}
  //       </div>
  //     </div>
  //   );
  // };

const renderDocumentsTab = () => {
  const FILE_ROOT = "http://studyxl.globalrouteway.com";

  // Parse documents from student_snapshot
  const documents = (() => {
    try {
      const raw = application.student_snapshot?.documents;
      if (Array.isArray(raw)) return raw;
      if (typeof raw === "string" && raw !== "null" && raw !== "") {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch (err) {
      console.error("Error parsing documents:", err);
      return [];
    }
  })();

  console.log("Documents from API:", documents);

  // Helper to build full URL
  const buildUrl = (path) => {
    if (!path) return null;
    
    // Clean the path
    let cleanPath = path.replace(/^["']|["']$/g, '').replace(/^\/+|\/+$/g, '');
    
    // Handle different path formats
    if (cleanPath.startsWith('uploads/documents/')) {
      return `${FILE_ROOT}/${cleanPath}`;
    } else if (cleanPath.startsWith('uploads/')) {
      return `${FILE_ROOT}/${cleanPath}`;
    } else if (cleanPath.startsWith('documents/')) {
      return `${FILE_ROOT}/uploads/${cleanPath}`;
    } else {
      return `${FILE_ROOT}/uploads/documents/${cleanPath}`;
    }
  };

  // Helper to check if file is image
  const isImageFile = (filename) => {
    if (!filename) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
    return imageExtensions.includes(ext);
  };

  // Helper to check if file is PDF
  const isPdfFile = (filename) => {
    if (!filename) return false;
    return filename.toLowerCase().endsWith('.pdf');
  };

  // Helper to extract filename from path
  const getFileName = (path) => {
    if (!path) return 'Unknown';
    return path.split('/').pop() || path;
  };

  // File Item Component
  const FileItem = ({ filePath, docType, index }) => {
    const fileName = getFileName(filePath);
    const isImage = isImageFile(fileName);
    const isPdf = isPdfFile(fileName);
    const fileUrl = buildUrl(filePath);

    return (
      <div className="bg-white rounded-lg p-3 border border-green-100 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3">
          {/* File Icon */}
          <div className="flex-shrink-0">
            {isPdf ? (
              <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
              </svg>
            ) : isImage ? (
              <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
            )}
          </div>

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate" title={fileName}>
              {fileName}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {docType} {index > 0 ? `(File ${index})` : ''}
            </p>
          </div>

          {/* View Button */}
          <button
            onClick={() => {
              if (isImage) {
                setImagePreview({
                  isOpen: true,
                  url: fileUrl,
                  title: `${docType} - ${fileName}`,
                });
              } else {
                window.open(fileUrl, '_blank', 'noopener,noreferrer');
              }
            }}
            className="flex-shrink-0 inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </button>
        </div>

        {/* Image Preview for images */}
        {isImage && (
          <div className="mt-3">
            <img
              src={fileUrl}
              alt={fileName}
              className="max-h-32 rounded-lg border border-gray-200 mx-auto cursor-pointer hover:opacity-80 transition"
              onClick={() => setImagePreview({
                isOpen: true,
                url: fileUrl,
                title: `${docType} - ${fileName}`,
              })}
              onError={(e) => {
                console.error("Image failed to load:", fileUrl);
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/200x150?text=Image+Not+Available';
              }}
            />
          </div>
        )}
      </div>
    );
  };

  // Document Card Component - UPDATED to handle file_path array correctly
  const DocCard = ({ doc }) => {
    // Get file_path which is an array from the backend
    const filePaths = doc?.file_path || [];
    
    // Ensure it's an array
    const pathsArray = Array.isArray(filePaths) ? filePaths : (filePaths ? [filePaths] : []);

    if (pathsArray.length === 0) {
      return (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {doc.document_type || "Unknown Document"}
          </p>
          <p className="text-gray-400 italic text-sm">No file uploaded</p>
        </div>
      );
    }

    return (
      <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-green-200">
          <p className="text-sm font-semibold text-gray-800">
            {doc.document_type || "Document"}
          </p>
          {pathsArray.length > 1 && (
            <span className="text-xs bg-green-200 text-green-800 px-2.5 py-1 rounded-full font-medium">
              {pathsArray.length} Files
            </span>
          )}
        </div>
        
        <div className="space-y-3">
          {pathsArray.map((filePath, idx) => (
            <FileItem 
              key={idx} 
              filePath={filePath} 
              docType={doc.document_type}
              index={idx + 1}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Documents Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            Documents & Files
          </h2>
        </div>

        {documents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <p className="text-gray-500 font-medium">No documents uploaded yet</p>
            <p className="text-sm text-gray-400 mt-1">Documents will appear here once uploaded</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, index) => (
              <DocCard key={index} doc={doc} />
            ))}
          </div>
        )}
      </div>

      {/* References Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            References
          </h2>
        </div>
        {renderJSONField(application.student_snapshot?.references, "references")}
      </div>
    </div>
  );
};

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">
          Loading application details...
        </p>
        <p className="text-sm text-gray-500 mt-2">Application ID: {id}</p>
      </div>
    </div>
  );

  const ErrorDisplay = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          Error Loading Application
        </h3>
        <p className="text-gray-600 text-center mb-2">{error}</p>
        <p className="text-sm text-gray-500 text-center mb-6">
          Application ID: {id}
        </p>
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
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          No Application Found
        </h3>
        <p className="text-gray-600 mb-6">
          The application with ID {id} was not found.
        </p>
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
        {type === "date"
          ? formatDate(value)
          : type === "datetime"
            ? formatDateTime(value)
            : type === "currency"
              ? formatCurrency(value)
              : type === "boolean"
                ? value
                  ? "Yes"
                  : "No"
                : value || "N/A"}
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
    { id: "language", label: "Language Test", icon: "🌐" },
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
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Application #{application.id}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Student:</span>{" "}
                    {application.student_data?.student_name}

                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${application.status === "Reviewed"
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : application.status === "Accepted"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : application.status === "Rejected"
                        ? "bg-red-100 text-red-800 border border-red-200"
                        : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    }`}
                >
                  {application.status || "Pending"}
                </span>
                <button
                  onClick={() =>
                    navigate(`/dashboard/agent-application/edit/${id}`)
                  }
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-5 py-2.5 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
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
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap rounded-lg transition duration-200 ${activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow"
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
                    <div className="text-sm text-blue-700 font-medium">
                      Student ID
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {application.student_data?.student_id}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-700 font-medium">
                      University ID
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {application.student_data?.university_id}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-700 font-medium">
                      Program ID
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {application.program_id}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                    <div className="text-sm text-yellow-700 font-medium">
                      Intake
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {application.student_data?.intake_name || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Student Information
                </h2>
              </div>
              <div className="space-y-3">
                {renderField("Student Name", application.student_data?.student_name)}
                {renderField("Email", application.student_data?.email)}
                {renderField("Phone", application.student_data?.phone)}
                {renderField("Date of Birth", application.student_data?.dob, "date")}
                {renderField("Gender", application.student_data?.gender)}
                {renderField("Country", application.student_data?.country)}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Program Information
                </h2>
              </div>
              <div className="space-y-3">
                {renderField("Program", application.program_data?.program_name)}
                {renderField("University", application.program_data?.university_name)}
                {renderField("Study Level", application.program_data?.last_level_of_study)}
                {renderField("Field of Study", application.program_data?.field_of_study_name)}
                {renderField("Duration", application.program_data?.duration)}
                {renderField("Intake", application.program_data?.intake_name)}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Financial Summary
                </h2>
              </div>
              <div className="space-y-3">
                {renderField(
                  "Application Fee",
                  application.program_data?.application_fee,
                  "currency",
                )}
                {renderField(
                  "Tuition",
                  application.program_data?.average_gross_tuition,
                  "currency",
                )}
                {renderField(
                  "Living Cost",
                  application.program_data?.cost_of_living,
                  "currency",
                )}
                {renderField("Success Chance", application.program_data?.success_chance)}
              </div>
            </div>
          </div>
        )}

        {activeTab === "student" && application && (
          <div className="space-y-6">

            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Basic */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                  <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-wide border-b border-gray-200 pb-2">Basic Details</h3>
                  {renderField("Student Name", application.student_data?.student_name)}
                  {renderField("Student ID", application.student_id)}
                  {renderField("Date of Birth", application.student_data?.dob, "date")}
                  {renderField("Gender", application.student_data?.gender)}
                  {renderField("Email", application.student_data?.email)}
                  {renderField("Phone", application.student_data?.phone)}
                  {renderField("Country of Birth", application.student_data?.country)}
                  {renderField("Nationality", application.student_data?.nationality)}

                </div>

                {/* Contact */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
                  <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-wide border-b border-gray-200 pb-2">Address</h3>

                  {/* {renderField("Address", application.program_snapshot?.address)} */}
                  {renderField("City", application.student_data?.city)}
                  {renderField("Country of Residence", application.student_data?.country_of_residence)}
                  {renderField("State / Territory", application.student_data?.state_territory)}
                  {renderField("Postal Code", application.student_data?.postal_code)}
                  {renderField("Current Address 1", application.student_data?.current_address_1)}
                  {renderField("Current Address 2", application.student_data?.current_address_2)}
                  {renderField("Current City", application.student_data?.current_city)}
                  {renderField("Current Territory", application.student_data?.current_state_territory)}
                  {renderField("Current Postal Code", application.student_data?.current_postal_code)}
                  {renderField("Permanent Address 1", application.student_data?.permanent_address1)}
                  {renderField("Permanent Address 2", application.student_data?.permanent_address2)}
                  {renderField("Permanent Country", application.student_data?.permanent_country)}
                </div>



              </div>
              {/* Emergency Contact */}
              <div className="bg-red-50 rounded-xl p-4 mt-5 space-y-3 border border-red-100">
                <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wide border-b border-red-200 pb-2">Emergency Contact</h3>
                {renderField("Name", application.student_data?.emergency_contact_name)}
                {renderField("Email", application.student_data?.emergency_contact_email)}
                {renderField("Phone", application.student_data?.emergency_contact_phone)}
                {renderField("Relationship", application.student_data?.emergency_contact_relationship)}
              </div>
            </div>

            {/* Passport & Immigration */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Passport & Immigration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Passport */}
                <div className="bg-blue-50 rounded-xl p-4 space-y-3 border border-blue-100">
                  <h3 className="text-sm font-semibold text-blue-500 uppercase tracking-wide border-b border-blue-200 pb-2">Passport</h3>
                  {renderField("Passport Number", application.student_data?.passport_number)}
                  {renderField("Appears on Passport", application.student_data?.appears_passport)}
                  {renderField("Issue Location", application.student_data?.passport_issue_location)}
                  {renderField("Issue Date", application.student_data?.issue_date, "date")}
                  {renderField("Expiry Date", application.student_data?.expiry_date, "date")}
                  {renderField("Passport Expiry", application.student_data?.passport_expiry, "date")}
                </div>

                {/* Visa */}
                <div className="bg-yellow-50 rounded-xl p-4 space-y-3 border border-yellow-100">
                  <h3 className="text-sm font-semibold text-yellow-600 uppercase tracking-wide border-b border-yellow-200 pb-2">Immigration & Visa</h3>
                  {renderField("Immigration History", application.student_data?.immigration_history)}
                  <div className="rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
                      Visa Rejection
                    </h2>
                    {renderJSONField(application.student_data?.visa_rejections, "Visa Rejection")}

                  </div>

                </div>



              </div>
            </div>

            {/* Agent Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
                Agent Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Agent ID */}
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c0 1.657-1.343 3-3 3s-3-1.343-3-3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Agent ID</p>
                    <p className="text-base font-bold text-gray-900 mt-0.5">
                      {application.agent_id || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Company */}
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Company</p>
                    <p className="text-base font-bold text-gray-900 mt-0.5">
                      {application.student_snapshot?.company_name || "N/A"}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {activeTab === "program" && application && (
          <div className="space-y-6">

            {/* Program Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Program Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">

                {/* Core Info */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                    <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Core Info</h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {renderField("Program Name", application.program_snapshot?.program_name)}
                    {renderField("University", application.program_snapshot?.university_name)}
                    {renderField("Intake ID", application.program_snapshot?.intake_id)}
                    {renderField("Intake Name", application.program_snapshot?.intake_name)}
                    {renderField("Program Level", application.program_snapshot?.program_level)}
                    {renderField("Program Level ID", application.program_snapshot?.program_level_id)}
                    {renderField("Field of Study", application.program_snapshot?.field_of_study_name)}
                    {renderField("Field of Study ID", application.program_snapshot?.field_of_study_id)}
                    {renderField("Duration", application.program_snapshot?.duration)}
                    {renderField("No Exam Status", application.program_snapshot?.no_exam_status)}
                    {renderField("Program Tag", application.program_snapshot?.program_tag_name)}
                    {renderField("Program Tag ID", application.program_snapshot?.program_tag_id)}
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                    <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xs font-semibold text-green-700 uppercase tracking-wide">Location</h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {renderField("Campus City", application.program_snapshot?.campus_city)}
                    {renderField("Education Country", application.program_snapshot?.education_country)}
                    {renderField("Nationality", application.program_snapshot?.nationality)}
                    {renderField("Last Level of Study", application.program_snapshot?.last_level_of_study)}
                    {renderField("Grading Scheme", application.program_snapshot?.grading_scheme)}
                    {renderField("Study Permit / Visa", application.program_snapshot?.study_permit_or_visa)}
                    {renderField("Success Chance", application.program_snapshot?.success_chance)}
                  </div>
                </div>

                {/* Financials */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-gray-200">
                    <div className="w-7 h-7 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xs font-semibold text-yellow-700 uppercase tracking-wide">Financials</h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {renderField("Avg Gross Tuition", application.program_snapshot?.average_gross_tuition)}
                    {renderField("Tuition Note", application.program_snapshot?.average_gross_tuition_short_desc)}
                    {renderField("Cost of Living", application.program_snapshot?.cost_of_living)}
                    {renderField("Living Cost Note", application.program_snapshot?.cost_of_living_short_desc)}
                    {renderField("Application Fee", application.program_snapshot?.application_fee)}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-50 to-violet-50 border-b border-gray-200">
                    <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xs font-semibold text-purple-700 uppercase tracking-wide">Additional Info</h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {renderField("Avg Graduate Program", application.program_snapshot?.average_graduate_program)}
                    {renderField("Graduate Note", application.program_snapshot?.average_graduate_program_short_desc)}
                    {renderField("Avg Undergraduate Program", application.program_snapshot?.average_undergraduate_program)}
                    {renderField("Undergraduate Note", application.program_snapshot?.average_undergraduate_program_short_desc)}
                    {renderField("Application Desc", application.program_snapshot?.application_short_desc)}
                    {renderField("Program Summary", application.program_snapshot?.program_summary)}
                  </div>
                </div>

              </div>
            </div>

            {/* Important Dates */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Important Dates</h2>
              <div className="flex flex-col divide-y divide-gray-100">
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-blue-600">Program Open Date</span>
                  <span className="text-sm font-bold text-gray-900">{formatDate(application.program_data?.open_date)}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-red-600">Submission Deadline</span>
                  <span className="text-sm font-bold text-gray-900">{formatDateTime(application.program_data?.submission_deadline)}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm font-medium text-green-600">Application Created</span>
                  <span className="text-sm font-bold text-gray-900">{formatDateTime(application.created_at)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
                Intake Months
              </h2>
              {renderJSONField(application.program_data?.intake_months, "Intake Months")}
            </div>

            {/* Descriptions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Descriptions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="bg-purple-50 rounded-xl p-4 space-y-3 border border-purple-100">
                  <h3 className="text-sm font-semibold text-purple-500 uppercase tracking-wide border-b border-purple-200 pb-2">Program Description</h3>
                  {renderField("Description", application.program_data?.program_description)}
                  {renderField("Short Description", application.program_data?.application_short_desc)}
                </div>

                <div className="bg-pink-50 rounded-xl p-4 space-y-3 border border-pink-100">
                  <h3 className="text-sm font-semibold text-pink-500 uppercase tracking-wide border-b border-pink-200 pb-2">Program Summary</h3>
                  {renderField("Summary", application.program_data?.program_summary)}
                </div>

              </div>
            </div>

          </div>
        )}

        {activeTab === "academic" && application && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
                Academic Qualifications
              </h2>
              {renderJSONField(
                application.student_data.academic_qualifications,
                "academic qualifications",
              )}
            </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
                Academic Histories
              </h2>
              {renderJSONField(
                application.student_data.academic_histories,
                "academic histories",
              )}
            </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
                Academic Interest
              </h2>
              {renderJSONField(
                application.student_data.academic_interests,
                "academic interests",
              )}
            </div>
          </div>
        )}

        {activeTab === "work" && application && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
                Work Experience
              </h2>
              {renderJSONField(application.student_data?.work_experiences, "work experience")}
            </div>
          </div>
        )}

        {activeTab === "documents" && application && renderDocumentsTab()}

        {activeTab === "financial" && application && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
                Tuition & Fees
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-200">
                  <div>
                    <div className="text-sm text-blue-600 font-medium">
                      Application Fee
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(application.program_data?.application_fee)}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-200">
                  <div>
                    <div className="text-sm text-green-600 font-medium">
                      Average Gross Tuition
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(application.program_data?.average_gross_tuition)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
                Cost of Living
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-white rounded-lg border border-yellow-200">
                  <div>
                    <div className="text-sm text-yellow-600 font-medium">
                      Annual Living Cost
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(application.program_data?.cost_of_living)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "language" && application && (
          <div className="space-y-6">
            {application.program_data?.ielts_required && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
                  IELTS Scores
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-blue-600 font-medium">
                      Overall
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {application.program_data?.ielts_overall || "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">
                      Reading
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {application.program_data?.ielts_reading || "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">
                      Writing
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {application.program_data?.ielts_writing || "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">
                      Listening
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {application.program_data?.ielts_listening || "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">
                      Speaking
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {application.program_data?.ielts_speaking || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {application.program_data?.toefl_required && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
                  TOEFL Scores
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-green-600 font-medium">Overall</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {application.program_data?.toefl_overall || "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">Reading</div>
                    <div className="text-xl font-bold text-gray-900">
                      {application.program_data?.toefl_reading || "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">Writing</div>
                    <div className="text-xl font-bold text-gray-900">
                      {application.program_data?.toefl_writing || "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">Listening</div>
                    <div className="text-xl font-bold text-gray-900">
                      {application.program_data?.toefl_listening || "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">Speaking</div>
                    <div className="text-xl font-bold text-gray-900">
                      {application.program_data?.toefl_speaking || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {application.program_data?.pte_required && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
                  PTE Scores
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-purple-600 font-medium">Overall</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {application.program_data?.pte_overall || "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">Reading</div>
                    <div className="text-xl font-bold text-gray-900">
                      {application.program_data?.pte_reading || "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">Writing</div>
                    <div className="text-xl font-bold text-gray-900">
                      {application.program_data?.pte_writing || "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">Listening</div>
                    <div className="text-xl font-bold text-gray-900">
                      {application.program_data?.pte_listening || "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 font-medium">Speaking</div>
                    <div className="text-xl font-bold text-gray-900">
                      {application.program_data?.pte_speaking || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
                English Test Requirements
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <div className="text-sm text-gray-600 mb-2">
                    IELTS Required
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${application.program_data?.ielts_required ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    {application.program_data?.ielts_required ? "Yes" : "No"}
                  </div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm text-gray-600 mb-2">
                    TOEFL Required
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${application.program_data?.toefl_required ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    {application.program_data?.toefl_required ? "Yes" : "No"}
                  </div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm text-gray-600 mb-2">PTE Required</div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${application.program_data?.pte_required ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    {application.program_data?.pte_required ? "Yes" : "No"}
                  </div>
                </div>
                <div className="text-center p-4">
                  <div className="text-sm text-gray-600 mb-2">
                    Duolingo Required
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${application.program_data?.duolingo_required ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    {application.program_data?.duolingo_required ? "Yes" : "No"}
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