// import React, { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import BASE_URL from "../../../Api/ApiBaseUrl";

// const AgentsStudentProfile = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const safeParse = (value) => {
//     try {
//       if (!value || value === "null") return [];
//       if (typeof value === "string") {
//         return JSON.parse(value);
//       }
//       return value;
//     } catch (e) {
//       return [];
//     }
//   };

//   useEffect(() => {
//     if (!id) {
//       setError("Invalid student ID");
//       setLoading(false);
//       return;
//     }

//     const fetchStudent = async () => {
//       try {
//         const token = localStorage.getItem("admin_token");
//         if (!token) {
//           setError("Authorization token missing");
//           setLoading(false);
//           return;
//         }

//         const response = await fetch(
//           `${BASE_URL}/agent/agent-student/edit/${id}`,
//           {
//             method: "GET",
//             headers: { Authorization: `Bearer ${token}` },
//           },
//         );

//         const data = await response.json();
//         console.log();

//         if (!response.ok || !data) {
//           setError(data?.message || "Failed to fetch student data");
//           setLoading(false);
//           return;
//         }

//         const profile = data.profile || null;

//         if (!profile) {
//           setError("Student not found");
//           setLoading(false);
//           return;
//         }

//         // const parsedStudent = {
//         //   ...profile,
//         //   academic_qualifications: profile.academic_qualifications
//         //     ? JSON.parse(profile.academic_qualifications)
//         //     : [],
//         //   work_experiences: profile.work_experiences
//         //     ? JSON.parse(profile.work_experiences)
//         //     : [],
//         //   test_scores: profile.test_scores
//         //     ? JSON.parse(profile.test_scores)
//         //     : [],
//         //   references: profile.references
//         //     ? JSON.parse(profile.references)
//         //     : [],
//         // };

//         const parsedStudent = {
//           ...profile,
//           academic_qualifications: safeParse(profile.academic_qualifications),
//           work_experiences: safeParse(profile.work_experiences),
//           test_scores: safeParse(profile.test_scores),
//           references: safeParse(profile.references),
//         };

//         setStudent(parsedStudent);
//       } catch (err) {
//         console.error("Error fetching student:", err);
//         setError("Error loading student profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudent();
//   }, [id]);

//   // Loading state
//   if (loading) {
//     return (
//       <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Student Profile</h1>
//           <button
//             onClick={() => navigate(-1)}
//             className="text-red-500 hover:text-black"
//           >
//             <X size={24} />
//           </button>
//         </div>
//         <div className="text-center py-10">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f16f22] mx-auto"></div>
//           <p className="mt-4 text-black">Loading student profile...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error || !student) {
//     return (
//       <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Student Profile</h1>
//           <button
//             onClick={() => navigate(-1)}
//             className="text-red-500 hover:text-gray-800"
//           >
//             <X size={24} />
//           </button>
//         </div>
//         <div className="text-center py-10 text-red-500">
//           <p className="text-lg font-medium">
//             {error || "No student data found"}
//           </p>
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-4 bg-[#f16f22] text-white px-4 py-2 rounded-md hover:bg-blue-700"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Helper function to handle empty values
//   // const displayValue = (value) => value || "Not provided";

//   const displayValue = (value) => {
//     if (value === null || value === undefined || value === "") {
//       return "N/A";
//     }
//     return value;
//   };

//   const getFileUrl = (filePath) => {
//     if (!filePath) return null;

//     // If it's already a full URL, return as is
//     if (filePath.startsWith("http")) {
//       return filePath;
//     }

//     // Remove leading slashes
//     let cleanPath = filePath.replace(/^\//, "");

//     // If the path already starts with uploads/, use it as is
//     if (cleanPath.startsWith("uploads/")) {
//       // return `${BASE_URL.replace("/api", "")}/${cleanPath}`;
//       return `${BASE_URL.replace("/api", "")}/${cleanPath}`;
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Student Profile</h1>
//         <button
//           onClick={() => navigate(-1)}
//           className="text-red-500 hover:text-black transition-colors"
//         >
//           <X size={24} />
//         </button>
//       </div>

//       {/* Profile Section */}
//       <div className="bg-white rounded-2xl shadow-lg p-6 flex  flex-col lg:flex-row items-center gap-6 mb-6">
//         <img
//           src="/profileright.jpg"
//           alt="Student Avatar"
//           className="w-32 h-32 object-cover rounded-full border-4 border-[#f16f22] shadow-md"
//         />

//         <div>
//           <h1 className="text-2xl font-bold text-black">
//             {displayValue(student.name)}
//           </h1>
//           <p className="text-black">{displayValue(student.email)}</p>
//           <p className="text-sm text-black">
//             Destination: {displayValue(student.destination)}
//           </p>
//           <p className="text-sm text-black">
//             Program: {displayValue(student.program)}
//           </p>
//           <p className="text-sm text-black">
//             Study Level: {displayValue(student.study_level)}
//           </p>
//         </div>
//       </div>

//       {/* Basic Info Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         {/* Personal Information */}
//         <div className="bg-gray-50 p-6 rounded-xl shadow-md">
//           <h2 className="text-lg font-semibold mb-3 text-[#f16f22]">
//             Personal Information
//           </h2>
//           <div className="space-y-2">
//             <p>
//               <span className="font-medium">Phone:</span>{" "}
//               {displayValue(student.phone)}
//             </p>
//             <p>
//               <span className="font-medium">Gender:</span>{" "}
//               {displayValue(student.gender)}
//             </p>
//             <p>
//               <span className="font-medium">Date of Birth:</span>{" "}
//               {displayValue(student.dob)}
//             </p>
//             <p>
//               <span className="font-medium">Nationality:</span>{" "}
//               {displayValue(student.nationality)}
//             </p>
//             <p>
//               <span className="font-medium">Address:</span>{" "}
//               {displayValue(student.address)}
//             </p>
//           </div>
//         </div>

//         {/* Passport Information */}
//         <div className="bg-gray-50 p-6 rounded-xl shadow-md">
//           <h2 className="text-lg font-semibold mb-3 text-[#f16f22]">
//             Passport Information
//           </h2>
//           <div className="space-y-2">
//             <p>
//               <span className="font-medium">Passport Number:</span>{" "}
//               {displayValue(student.passport)}
//             </p>
//             <p>
//               <span className="font-medium">Expiry Date:</span>{" "}
//               {displayValue(student.passport_expiry)}
//             </p>
//             <p>
//               <span className="font-medium">Country of Residence:</span>{" "}
//               {displayValue(student.country_of_residence)}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Study Information */}
//       <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-6">
//         <h2 className="text-lg font-semibold mb-3 text-[#f16f22]">
//           Study Information
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <p>
//             <span className="font-medium">Destination:</span>{" "}
//             {displayValue(student.destination)}
//           </p>
//           <p>
//             <span className="font-medium">Study Level:</span>{" "}
//             {displayValue(student.study_level)}
//           </p>
//           <p>
//             <span className="font-medium">Program:</span>{" "}
//             {displayValue(student.program)}
//           </p>
//           <p>
//             <span className="font-medium">Intake:</span>{" "}
//             {displayValue(student.intake)}
//           </p>
//           <p>
//             <span className="font-medium">Specialization:</span>{" "}
//             {displayValue(student.specialization)}
//           </p>
//         </div>
//       </div>

//       {/* Academic Qualifications */}
//       {student.academic_qualifications &&
//         student.academic_qualifications.length > 0 && (
//           <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-6">
//             <h2 className="text-lg font-semibold mb-3 text-[#f16f22]">
//               Academic Qualifications
//             </h2>
//             <div className="space-y-4">
//               {student.academic_qualifications.map((qualification, index) => (
//                 <div key={index} className="border-l-4 border-[#f16f22] pl-4">
//                   <p>
//                     <span className="font-medium">Qualification:</span>{" "}
//                     {displayValue(qualification.qualification)}
//                   </p>
//                   <p>
//                     <span className="font-medium">Institution:</span>{" "}
//                     {displayValue(qualification.institution)}
//                   </p>
//                   <p>
//                     <span className="font-medium">Year:</span>{" "}
//                     {displayValue(qualification.year)}
//                   </p>
//                   <p>
//                     <span className="font-medium">CGPA/Percentage:</span>{" "}
//                     {displayValue(qualification.cgpa)}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//       {/* Test Scores */}
//       {student.test_scores && student.test_scores.length > 0 && (
//         <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-6">
//           <h2 className="text-lg font-semibold mb-3 text-[#f16f22]">
//             Test Scores
//           </h2>
//           <div className="space-y-4">
//             {student.test_scores.map((test, index) => (
//               <div key={index} className="border-l-4 border-[#f16f22] pl-4">
//                 <p>
//                   <span className="font-medium">Test:</span>{" "}
//                   {displayValue(test.test_name)}
//                 </p>
//                 <p>
//                   <span className="font-medium">Score:</span>{" "}
//                   {displayValue(test.score)}
//                 </p>
//                 <p>
//                   <span className="font-medium">Year:</span>{" "}
//                   {displayValue(test.year)}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Work Experience */}
//       {student.work_experiences && student.work_experiences.length > 0 && (
//         <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-6">
//           <h2 className="text-lg font-semibold mb-3 text-[#f16f22]">
//             Work Experience
//           </h2>
//           <div className="space-y-4">
//             {student.work_experiences.map((work, index) => (
//               <div key={index} className="border-l-4 border-[#f16f22] pl-4">
//                 <p>
//                   <span className="font-medium">Organization:</span>{" "}
//                   {displayValue(work.organization)}
//                 </p>
//                 <p>
//                   <span className="font-medium">Position:</span>{" "}
//                   {displayValue(work.position)}
//                 </p>
//                 <p>
//                   <span className="font-medium">Duration:</span>{" "}
//                   {displayValue(work.start_date)} -{" "}
//                   {displayValue(work.end_date)}
//                 </p>
//                 <p>
//                   <span className="font-medium">Description:</span>{" "}
//                   {displayValue(work.description)}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Documents Section */}
//       <div className="bg-gray-50 p-6 rounded-xl shadow-md">
//         <h2 className="text-lg font-semibold mb-3 text-[#f16f22]">Documents</h2>
//         <div className="space-y-2">
//           {student.resume && (
//             <p>
//               <span className="font-medium">Resume:</span>{" "}
//               <a
//                 href={getFileUrl(student.resume)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-[#f16f22] hover:underline"
//               >
//                 View Resume
//               </a>
//             </p>
//           )}
//           {student.transcripts && (
//             <p>
//               <span className="font-medium">Transcripts:</span>{" "}
//               <a
//                 href={getFileUrl(student.transcripts)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-[#f16f22] hover:underline"
//               >
//                 View Transcripts
//               </a>
//             </p>
//           )}
//           {student.passport_copy && (
//             <p>
//               <span className="font-medium">Passport Copy:</span>{" "}
//               <a
//                 href={getFileUrl(student.passport_copy)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-[#f16f22] hover:underline"
//               >
//                 View Passport
//               </a>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AgentsStudentProfile;



import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../../Api/ApiBaseUrl";
import Swal from "sweetalert2";

const AgentsStudentProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState({
    isOpen: false,
    url: null,
    title: "",
  });

  const safeParse = (value) => {
    try {
      if (!value || value === "null") return [];
      if (typeof value === "string") {
        return JSON.parse(value);
      }
      return value;
    } catch (e) {
      return [];
    }
  };

  // NEW FUNCTION: Parse JSON array strings for document fields
  const parseDocumentField = (field) => {
    if (!field || field === "null" || field === "") return [];
    
    try {
      // If it's already an array, return it
      if (Array.isArray(field)) return field;
      
      // If it's a string, try to parse it as JSON
      if (typeof field === "string") {
        // First, try to parse as JSON
        try {
          const parsed = JSON.parse(field);
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch (jsonError) {
          // If JSON parsing fails, try to clean the string
          let cleanField = field.replace(/^["']|["']$/g, "");
          
          // If it looks like a JSON array but with escaped quotes
          if (cleanField.startsWith('[') && cleanField.endsWith(']')) {
            try {
              // Replace escaped quotes and parse
              cleanField = cleanField.replace(/\\"/g, '"');
              const parsed = JSON.parse(cleanField);
              return Array.isArray(parsed) ? parsed : [parsed];
            } catch (e) {
              // If still fails, return as single item array
              return [cleanField];
            }
          }
          
          // If it's not a JSON array, return as single item
          return [cleanField];
        }
      }
      
      return [];
    } catch (err) {
      console.error("Error parsing document field:", field, err);
      return [];
    }
  };

  // Helper function to parse document paths and clean them
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

  // Function to get file URL - CORRECTED to handle the actual path structure
  const getFileUrl = (docPath) => {
    if (!docPath) return "#";

    try {
      let cleanPath = docPath;
      if (typeof docPath === "string") {
        // Remove quotes if present
        cleanPath = docPath.replace(/^["']|["']$/g, "");
        
        // Clean backslashes and double slashes
        cleanPath = cleanPath.replace(/\\/g, "/").replace(/\/\//g, "/");
        
        // The path from API already includes "uploads/" at the beginning
        // So we don't need to add it again, just ensure it's correct
        if (!cleanPath.startsWith("uploads/")) {
          // If it doesn't start with uploads/, add it
          cleanPath = `uploads/${cleanPath}`;
        }
        
        // Remove any double "uploads/uploads/" pattern
        cleanPath = cleanPath.replace(/uploads\/uploads\//g, "uploads/");
        
        // Construct the full URL - the base URL without /api
        const baseUrl = BASE_URL.replace("/api", "");
        return `${baseUrl}/${cleanPath}`;
      }
      return "#";
    } catch (e) {
      console.error("Error constructing file URL:", e);
      return "#";
    }
  };

  // Handle file view (from first code's handleViewFile)
  const handleViewFile = (fileUrl, title = "") => {
    if (!fileUrl || fileUrl === "null" || fileUrl === "#") {
      Swal.fire({
        icon: "info",
        title: "No File",
        text: "No file available to view",
        confirmButtonColor: "#f16f22",
      });
      return;
    }

    let finalUrl = fileUrl;

    if (!fileUrl.startsWith("http") && !fileUrl.startsWith("https")) {
      if (fileUrl.startsWith("uploads/")) {
        finalUrl = `${BASE_URL.replace("/api", "")}/${fileUrl}`;
      } else if (fileUrl.includes("/")) {
        finalUrl = `${BASE_URL.replace("/api", "")}/${fileUrl}`;
      } else {
        finalUrl = `${BASE_URL.replace("/api", "")}/uploads/${fileUrl}`;
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
        "_blank"
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
              <X size={24} className="text-gray-600" />
            </button>
          </div>
          <div className="p-4 flex items-center justify-center overflow-auto max-h-[calc(90vh-80px)]">
            <img
              src={imagePreview.url}
              alt={imagePreview.title}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#f16f22] text-white rounded-lg hover:bg-[#e55d0f] transition-colors"
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

  // Document viewer component - UPDATED to handle multiple files
  const DocumentViewer = ({ url, title }) => {
    // Parse the document field to get array of file paths
    const filePaths = parseDocumentField(url);
    
    if (!filePaths || filePaths.length === 0) return null;

    return (
      <div className="space-y-3">
        {filePaths.map((filePath, index) => {
          const docPath = parseDocumentPath(filePath);
          const fileUrl = getFileUrl(filePath);
          const isPDF = docPath?.toLowerCase().endsWith(".pdf");
          const isImage = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"].some(
            (ext) => docPath?.toLowerCase().endsWith(ext)
          );

          return (
            <div key={index} className="border border-gray-300 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`p-2 rounded-lg flex-shrink-0 ${
                      isImage
                        ? "bg-blue-100"
                        : isPDF
                        ? "bg-red-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {isPDF ? (
                      <svg
                        className="w-6 h-6 text-red-600"
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
                        className="w-6 h-6 text-blue-600"
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
                        className="w-6 h-6 text-gray-600"
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
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">
                      {filePaths.length > 1 ? `${title} (${index + 1})` : title}
                    </h4>
                    <p className="text-sm text-gray-500 truncate">
                      {docPath || "File"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleViewFile(fileUrl, title)}
                  className="ml-2 px-4 py-2 bg-[#f16f22] text-white rounded-lg hover:bg-[#e55d0f] transition-colors flex-shrink-0"
                >
                  View
                </button>
              </div>

              {/* Show preview for images */}
              {isImage && fileUrl !== "#" && (
                <div className="p-4">
                  <div
                    className="relative h-48 bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => handleViewFile(fileUrl, title)}
                  >
                    <img
                      src={fileUrl}
                      alt={title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=Image+Preview+Not+Available";
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white bg-opacity-90 p-3 rounded-lg shadow-lg">
                        <p className="text-sm font-medium text-gray-900">
                          Click to view full image
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Show PDF icon for PDF files */}
              {isPDF && (
                <div className="p-4 bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-16 h-16 text-red-500 mx-auto mb-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .8-.7 1.5-1.5 1.5H8v-4h2c.8 0 1.5.7 1.5 1.5v1zm5 2c0 .8-.7 1.5-1.5 1.5h-2v-4h2c.8 0 1.5.7 1.5 1.5v1zm3-2c0 .8-.7 1.5-1.5 1.5h-2v-4h2c.8 0 1.5.7 1.5 1.5v1z" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      PDF Document - Click View to open
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    if (!id) {
      setError("Invalid student ID");
      setLoading(false);
      return;
    }

    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) {
          setError("Authorization token missing");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${BASE_URL}/agent/agent-student/edit/${id}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();

        if (!response.ok || !data) {
          setError(data?.message || "Failed to fetch student data");
          setLoading(false);
          return;
        }

        const profile = data.profile || null;

        if (!profile) {
          setError("Student not found");
          setLoading(false);
          return;
        }

        const parsedStudent = {
          ...profile,
          academic_qualifications: safeParse(profile.academic_qualifications),
          work_experiences: safeParse(profile.work_experiences),
          test_scores: safeParse(profile.test_scores),
          references: safeParse(profile.references),
          // Note: We'll parse document fields directly in DocumentViewer
        };

        setStudent(parsedStudent);
      } catch (err) {
        console.error("Error fetching student:", err);
        setError("Error loading student profile");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const displayValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }
    return value;
  };

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
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row items-center gap-6 mb-6">
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
                    {displayValue(qualification.degree || qualification.qualification)}
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
                  
                  {/* Show documents for this qualification */}
                  {qualification.document && qualification.document.length > 0 && (
                    <div className="mt-3">
                      <p className="font-medium text-gray-700 mb-2">Documents:</p>
                      <DocumentViewer 
                        url={qualification.document} 
                        title={`Academic Document`} 
                      />
                    </div>
                  )}
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
                  <span className="font-medium">Date:</span>{" "}
                  {displayValue(test.date)}
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
        
        <div className="space-y-6">
          {student.english_test && (
            <div>
              <h3 className="font-medium text-gray-700 mb-2">English Test Results</h3>
              <DocumentViewer 
                url={student.english_test} 
                title="English Test" 
              />
            </div>
          )}

          {student.passport_copy && (
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Passport Copy</h3>
              <DocumentViewer 
                url={student.passport_copy} 
                title="Passport" 
              />
            </div>
          )}

          {student.photo && (
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Student Photo</h3>
              <DocumentViewer 
                url={student.photo} 
                title="Photo" 
              />
            </div>
          )}

          {student.resume && (
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Resume/CV</h3>
              <DocumentViewer 
                url={student.resume} 
                title="Resume" 
              />
            </div>
          )}

          {student.transcripts && (
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Academic Transcripts</h3>
              <DocumentViewer 
                url={student.transcripts} 
                title="Transcript" 
              />
            </div>
          )}

          {student.other_file_uploaded && (
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Other Files</h3>
              <DocumentViewer 
                url={student.other_file_uploaded} 
                title="Other File" 
              />
            </div>
          )}
        </div>
      </div>

      <ImagePreviewModal />
    </div>
  );
};

export default AgentsStudentProfile;



