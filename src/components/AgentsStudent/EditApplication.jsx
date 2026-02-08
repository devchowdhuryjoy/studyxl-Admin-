// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import BASE_URL from "../../Api/ApiBaseUrl";

// const EditApplication = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     const fetchApplication = async () => {
//       try {
//         const token = localStorage.getItem("admin_token");
//         if (!token) {
//           navigate("/login");
//           return;
//         }

//         const res = await fetch(`${BASE_URL}/admin/agent-applications/${id}`, {
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const result = await res.json();

//         if (!res.ok) throw new Error(result.message || "Failed to fetch");

//         if (!result.data) {
//           throw new Error("No application data found");
//         }

//         const application = result.data;

//         const processedData = {};
//         Object.keys(application).forEach(key => {
//           const value = application[key];

//           if (value === null || value === undefined) {
//             processedData[key] = "";
//           } else if (typeof value === 'boolean') {
//             processedData[key] = value;
//           } else if (Array.isArray(value)) {
//             processedData[key] = JSON.stringify(value);
//           } else if (typeof value === 'object') {
//             processedData[key] = JSON.stringify(value);
//           } else {
//             processedData[key] = String(value);
//           }
//         });

//         console.log("Processed form data:", processedData);
//         setFormData(processedData);

//       } catch (err) {
//         console.error("Error fetching application:", err);
//         setError(err.message);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: err.message,
//           confirmButtonColor: '#EF4444',
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplication();
//   }, [id, navigate]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked :
//               type === 'number' ? (value === '' ? '' : Number(value)) :
//               value
//     }));
//   };

//   const handleFileUpload = async (e, fieldName) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       const token = localStorage.getItem("admin_token");
//       const formDataObj = new FormData();
//       formDataObj.append('file', file);
//       formDataObj.append('field', fieldName);

//       Swal.fire({
//         title: 'Uploading...',
//         text: 'Please wait',
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         }
//       });

//       const response = await fetch(`${BASE_URL}/admin/upload-file/${id}`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: formDataObj
//       });

//       const responseText = await response.text();
//       console.log("Upload response:", responseText);

//       let result;
//       try {
//         result = JSON.parse(responseText);
//       } catch (parseError) {
//         console.error("JSON Parse Error:", parseError);
//         throw new Error("Server returned invalid response");
//       }

//       if (!response.ok) {
//         throw new Error(result.message || 'Upload failed');
//       }

//       if (result.success && result.filePath) {
//         setFormData(prev => ({
//           ...prev,
//           [fieldName]: result.filePath
//         }));

//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: 'File uploaded successfully',
//           confirmButtonColor: '#10B981',
//         });
//       } else {
//         throw new Error(result.message || 'Upload failed');
//       }

//     } catch (err) {
//       console.error("Upload error:", err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Upload Failed!',
//         text: err.message.includes('invalid response') ? 'Server error. Please try again.' : err.message,
//         confirmButtonColor: '#EF4444',
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: 'Do you want to update this application?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#3B82F6',
//       cancelButtonColor: '#6B7280',
//       confirmButtonText: 'Yes, update it!',
//       cancelButtonText: 'Cancel'
//     });

//     if (!result.isConfirmed) return;

//     setSubmitting(true);

//     try {
//       const token = localStorage.getItem("admin_token");

//       const submitData = { ...formData };

//       Object.keys(submitData).forEach(key => {
//         if (submitData[key] === "") {
//           submitData[key] = null;
//         }
//       });

//       const response = await fetch(`${BASE_URL}/admin/agent-applications/update/${id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify(submitData)
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to update application");
//       }

//       if (!result.success) {
//         throw new Error(result.message || "Update failed");
//       }

//       await Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Application updated successfully!',
//         confirmButtonColor: '#10B981',
//       });

//       navigate(`/dashboard/agent-application/application-details/${id}`, {
//         replace: true
//       });

//     } catch (err) {
//       console.error("Update error:", err);

//       await Swal.fire({
//         icon: 'error',
//         title: 'Update Failed!',
//         text: err.message,
//         confirmButtonColor: '#EF4444',
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleCancel = () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'Any unsaved changes will be lost.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#EF4444',
//       cancelButtonColor: '#6B7280',
//       confirmButtonText: 'Yes, discard changes',
//       cancelButtonText: 'Cancel'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate(`/dashboard/agent-application/application-details/${id}`);
//       }
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading application data...</p>
//           <p className="text-sm text-gray-500 mt-2">Application ID: {id}</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
//           <div className="flex">
//             <div className="flex-shrink-0">
//               <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <h3 className="text-sm font-medium text-red-800">Error loading application</h3>
//               <p className="text-sm text-red-700 mt-1">{error}</p>
//               <div className="mt-4 space-x-3">
//                 <button
//                   onClick={() => window.location.reload()}
//                   className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
//                 >
//                   Try Again
//                 </button>
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//                 >
//                   Go Back
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const formSections = [
//     {
//       title: "Basic Information",
//       fields: [
//         { name: "student_name", label: "Student Name", type: "text", required: true },
//         { name: "student_id", label: "Student ID", type: "number", required: true },
//         { name: "agent_name", label: "Agent Name", type: "text", required: true },
//         { name: "agent_id", label: "Agent ID", type: "number", required: true },
//         { name: "program_id", label: "Program ID", type: "text", required: true },
//         { name: "program_name", label: "Program Name", type: "text", required: true },
//         { name: "university_name", label: "University Name", type: "text", required: true },
//         { name: "intake", label: "Intake", type: "text", required: true },
//         { name: "status", label: "Status", type: "select",
//           options: ["Pending", "Reviewed", "Accepted", "Rejected"], required: true }
//       ]
//     },
//     {
//       title: "Program Details",
//       fields: [
//         { name: "program_level_id", label: "Program Level ID", type: "number" },
//         { name: "program_description", label: "Program Description", type: "textarea", rows: 3 },
//         { name: "program_level", label: "Program Level", type: "text" },
//         { name: "program_open_date", label: "Program Open Date", type: "date" },
//         { name: "program_submission_deadline", label: "Submission Deadline", type: "datetime-local" },
//         { name: "intake_name", label: "Intake Name", type: "text" },
//         { name: "field_of_study_id", label: "Field of Study ID", type: "number" },
//         { name: "field_of_study_name", label: "Field of Study Name", type: "text" },
//         { name: "study_permit_or_visa", label: "Study Permit/Visa", type: "text" },
//         { name: "program_nationality", label: "Program Nationality", type: "text" },
//         { name: "education_country", label: "Education Country", type: "text" },
//         { name: "last_level_of_study", label: "Last Level of Study", type: "text" },
//         { name: "grading_scheme", label: "Grading Scheme", type: "text" }
//       ]
//     },
//     {
//       title: "Program Meta Information",
//       fields: [
//         { name: "program_tag_id", label: "Program Tag ID", type: "number" },
//         { name: "program_tag_name", label: "Program Tag Name", type: "text" },
//         { name: "no_exam_status", label: "No Exam Status", type: "text" },
//         { name: "application_fee", label: "Application Fee", type: "number", step: "0.01" },
//         { name: "application_short_desc", label: "Application Short Description", type: "textarea", rows: 2 },
//         { name: "average_graduate_program", label: "Average Graduate Program", type: "number", step: "0.01" },
//         { name: "average_graduate_program_short_desc", label: "Avg Graduate Program Desc", type: "textarea", rows: 2 },
//         { name: "average_undergraduate_program", label: "Average Undergraduate Program", type: "number", step: "0.01" },
//         { name: "average_undergraduate_program_short_desc", label: "Avg UG Program Desc", type: "textarea", rows: 2 },
//         { name: "cost_of_living", label: "Cost of Living", type: "number", step: "0.01" },
//         { name: "cost_of_living_short_desc", label: "Cost of Living Desc", type: "textarea", rows: 2 },
//         { name: "average_gross_tuition", label: "Average Gross Tuition", type: "number", step: "0.01" },
//         { name: "average_gross_tuition_short_desc", label: "Avg Tuition Desc", type: "textarea", rows: 2 },
//         { name: "campus_city", label: "Campus City", type: "text" },
//         { name: "duration", label: "Duration", type: "text" },
//         { name: "success_chance", label: "Success Chance", type: "text" },
//         { name: "program_summary", label: "Program Summary", type: "textarea", rows: 4 },
//         { name: "intake_months", label: "Intake Months ", type: "textarea", rows: 2 },
//         { name: "images", label: "Images ", type: "textarea", rows: 2 }
//       ]
//     },
//     {
//       title: "Student Profile",
//       fields: [
//         { name: "company_name", label: "Company Name", type: "text" },
//         { name: "email", label: "Email", type: "email" },
//         { name: "destination", label: "Destination", type: "text" },
//         { name: "study_level", label: "Study Level", type: "text" },
//         { name: "subject", label: "Subject", type: "text" },
//         { name: "student_profile_nationality", label: "Student Nationality", type: "text" },
//         { name: "passport", label: "Passport Number", type: "text" },
//         { name: "elp", label: "ELP", type: "text" },
//         { name: "dob", label: "Date of Birth", type: "date" },
//         { name: "address", label: "Address", type: "textarea", rows: 2 },
//         { name: "phone", label: "Phone", type: "tel" },
//         { name: "gender", label: "Gender", type: "select", options: ["", "Male", "Female", "Other"] },
//         { name: "passport_expiry", label: "Passport Expiry", type: "date" },
//         { name: "country_of_residence", label: "Country of Residence", type: "text" },
//         { name: "specialization", label: "Specialization", type: "text" },
//         { name: "language_test_status", label: "Language Test Status", type: "select",
//           options: ["", "proof_after_acceptance", "exemption_eligible", "not_taken_not_planning"] },
//         { name: "open_to_language_course", label: "Open to Language Course", type: "checkbox" },
//         { name: "has_gre_score", label: "Has GRE Score", type: "checkbox" },
//         { name: "has_gmat_score", label: "Has GMAT Score", type: "checkbox" },
//         { name: "has_name_difference", label: "Has Name Difference", type: "checkbox" }
//       ]
//     },
//     {
//       title: "English Test Requirements",
//       fields: [
//         { name: "ielts_required", label: "IELTS Required", type: "checkbox" },
//         { name: "ielts_overall", label: "IELTS Overall", type: "number", step: "0.1" },
//         { name: "ielts_reading", label: "IELTS Reading", type: "number" },
//         { name: "ielts_writing", label: "IELTS Writing", type: "number" },
//         { name: "ielts_listening", label: "IELTS Listening", type: "number" },
//         { name: "ielts_speaking", label: "IELTS Speaking", type: "number" },
//         { name: "toefl_required", label: "TOEFL Required", type: "checkbox" },
//         { name: "toefl_overall", label: "TOEFL Overall", type: "number" },
//         { name: "toefl_reading", label: "TOEFL Reading", type: "number" },
//         { name: "toefl_writing", label: "TOEFL Writing", type: "number" },
//         { name: "toefl_listening", label: "TOEFL Listening", type: "number" },
//         { name: "toefl_speaking", label: "TOEFL Speaking", type: "number" },
//         { name: "duolingo_required", label: "Duolingo Required", type: "checkbox" },
//         { name: "duolingo_total", label: "Duolingo Total", type: "number" },
//         { name: "pte_required", label: "PTE Required", type: "checkbox" },
//         { name: "pte_overall", label: "PTE Overall", type: "number" },
//         { name: "pte_reading", label: "PTE Reading", type: "number" },
//         { name: "pte_writing", label: "PTE Writing", type: "number" },
//         { name: "pte_listening", label: "PTE Listening", type: "number" },
//         { name: "pte_speaking", label: "PTE Speaking", type: "number" }
//       ]
//     },
//     {
//       title: "Documents Upload",
//       fields: [
//         {
//           name: "sop",
//           label: "Statement of Purpose (SOP)",
//           type: "file",
//           accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png",
//           onUpload: (e) => handleFileUpload(e, "sop")
//         },
//         {
//           name: "resume",
//           label: "Resume/CV",
//           type: "file",
//           accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png",
//           onUpload: (e) => handleFileUpload(e, "resume")
//         },
//         {
//           name: "transcripts",
//           label: "Academic Transcripts",
//           type: "file",
//           accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png",
//           onUpload: (e) => handleFileUpload(e, "transcripts")
//         },
//         {
//           name: "english_test",
//           label: "English Test Results",
//           type: "file",
//           accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png",
//           onUpload: (e) => handleFileUpload(e, "english_test")
//         },
//         {
//           name: "passport_copy",
//           label: "Passport Copy",
//           type: "file",
//           accept: ".pdf,.jpg,.jpeg,.png",
//           onUpload: (e) => handleFileUpload(e, "passport_copy")
//         },
//         {
//           name: "photo",
//           label: "Student Photo",
//           type: "file",
//           accept: ".jpg,.jpeg,.png",
//           onUpload: (e) => handleFileUpload(e, "photo")
//         }
//       ]
//     },
//     {
//       title: "Additional Information",
//       fields: [
//         { name: "achievements", label: "Achievements", type: "textarea", rows: 4 },
//         { name: "academic_qualifications", label: "Academic Qualifications ", type: "textarea", rows: 4 },
//         { name: "work_experiences", label: "Work Experiences ", type: "textarea", rows: 4 },
//         { name: "references", label: "References ", type: "textarea", rows: 4 },
//         { name: "test_scores", label: "Test Scores ", type: "textarea", rows: 4 }
//       ]
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="p-2 rounded-full hover:bg-gray-100"
//                 >
//                   <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                   </svg>
//                 </button>
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">Edit Application</h1>
//                   <p className="mt-1 text-sm text-gray-600">ID: {id} | Student: {formData.student_name || "N/A"}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
//                 formData.status === 'Reviewed' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
//                 formData.status === 'Accepted' ? 'bg-green-100 text-green-800 border border-green-200' :
//                 formData.status === 'Rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
//                 'bg-yellow-100 text-yellow-800 border border-yellow-200'
//               }`}>
//                 {formData.status || 'Pending'}
//               </span>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {formSections.map((section, sectionIndex) => (
//             <div key={sectionIndex} className="bg-white shadow rounded-lg overflow-hidden">
//               <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//                 <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {section.fields.map((field, fieldIndex) => (
//                     <div
//                       key={fieldIndex}
//                       className={field.type === 'textarea' || field.type === 'file' ? 'md:col-span-2' : ''}
//                     >
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         {field.label}
//                         {field.required && <span className="text-red-500 ml-1">*</span>}
//                       </label>

//                       {field.type === 'select' ? (
//                         <select
//                           name={field.name}
//                           value={formData[field.name] || ''}
//                           onChange={handleChange}
//                           required={field.required}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         >
//                           {field.options.map((option, optIndex) => (
//                             <option key={optIndex} value={option}>
//                               {option || '-- Select --'}
//                             </option>
//                           ))}
//                         </select>
//                       ) : field.type === 'checkbox' ? (
//                         <div className="flex items-center">
//                           <input
//                             type="checkbox"
//                             id={field.name}
//                             name={field.name}
//                             checked={formData[field.name] || false}
//                             onChange={handleChange}
//                             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                           />
//                           <label htmlFor={field.name} className="ml-2 text-sm text-gray-900">
//                             {field.label}
//                           </label>
//                         </div>
//                       ) : field.type === 'textarea' ? (
//                         <textarea
//                           name={field.name}
//                           value={formData[field.name] || ''}
//                           onChange={handleChange}
//                           rows={field.rows || 3}
//                           placeholder={`Enter ${field.label}...`}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       ) : field.type === 'file' ? (
//                         <div className="space-y-2">
//                           <input
//                             type="file"
//                             id={field.name}
//                             onChange={field.onUpload}
//                             accept={field.accept}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                           />
//                           {formData[field.name] && (
//                             <div className="text-sm text-green-600 flex items-center gap-2">
//                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                               </svg>
//                               File uploaded: {formData[field.name].split('/').pop()}
//                             </div>
//                           )}
//                         </div>
//                       ) : field.type === 'datetime-local' ? (
//                         <input
//                           type="datetime-local"
//                           name={field.name}
//                           value={formData[field.name] || ''}
//                           onChange={handleChange}
//                           required={field.required}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       ) : (
//                         <input
//                           type={field.type}
//                           name={field.name}
//                           value={formData[field.name] || ''}
//                           onChange={handleChange}
//                           required={field.required}
//                           step={field.step}
//                           placeholder={`Enter ${field.label}...`}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="pt-6 border-t border-gray-200">
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 disabled={submitting}
//                 className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//               >
//                 {submitting ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Updating...
//                   </>
//                 ) : (
//                   <>
//                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     Update Application
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditApplication;

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
  const [formData, setFormData] = useState({
    status: "",
  });
  const [applicationInfo, setApplicationInfo] = useState({});

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

        if (!result.data) {
          throw new Error("No application data found");
        }

        const application = result.data;

        // Set application info for display
        setApplicationInfo({
          student_name: application.student_name,
          student_id: application.student_id,
          program_name: application.program_name,
          university_name: application.university_name,
          agent_name: application.agent_name,
        });

        // Set only status in form data
        setFormData({
          status: application.status || "Pending",
        });
      } catch (err) {
        console.error("Error fetching application:", err);
        setError(err.message);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: err.message,
          confirmButtonColor: "#EF4444",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Update Status?",
      text: `Do you want to change status to "${formData.status}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, update status!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setSubmitting(true);

    try {
      const token = localStorage.getItem("admin_token");

      // Send only status field
      const submitData = { status: formData.status };

      const response = await fetch(
        `${BASE_URL}/admin/agent-applications/update/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(submitData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update application");
      }

      if (!result.success) {
        throw new Error(result.message || "Update failed");
      }

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Application status updated successfully!",
        confirmButtonColor: "#10B981",
      });

      navigate(`/dashboard/agent-application/application-details/${id}`);
    } catch (err) {
      console.error("Update error:", err);

      await Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: err.message,
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Discard Changes?",
      text: "Any unsaved changes will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, discard",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/dashboard/agent-application/application-details/${id}`);
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading application...
          </p>
          <p className="text-sm text-gray-500 mt-2">Application ID: {id}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
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
              onClick={() => window.location.reload()}
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
  }

  const statusOptions = [
    {
      value: "Pending",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    { value: "Reviewed", color: "bg-blue-100 text-blue-800 border-blue-200" },
    {
      value: "Accepted",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    { value: "Rejected", color: "bg-red-100 text-red-800 border-red-200" },
  ];

  const getStatusColor = (status) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option ? option.color : "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
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
                  Update Application Status
                </h1>
                <p className="text-sm text-gray-600 mt-1">Application #{id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(formData.status)}`}
              >
                Current: {formData.status}
              </span>
            </div>
          </div>
        </div>

        {/* Application Info Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
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
              Application Information
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Student Name
                  </span>
                  <p className="text-lg font-semibold text-gray-900">
                    {applicationInfo.student_name || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Student ID
                  </span>
                  <p className="text-lg font-semibold text-gray-900">
                    {applicationInfo.student_id || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Agent Name
                  </span>
                  <p className="text-lg font-semibold text-gray-900">
                    {applicationInfo.agent_name || "N/A"}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Program Name
                  </span>
                  <p className="text-lg font-semibold text-gray-900">
                    {applicationInfo.program_name || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    University
                  </span>
                  <p className="text-lg font-semibold text-gray-900">
                    {applicationInfo.university_name || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Application ID
                  </span>
                  <p className="text-lg font-semibold text-gray-900">{id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Update Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Update Status
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select New Status
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <div className="space-y-4">
                  {statusOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`status-${option.value}`}
                        name="status"
                        value={option.value}
                        checked={formData.status === option.value}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor={`status-${option.value}`}
                        className="ml-3 flex items-center gap-2 cursor-pointer"
                      >
                        <span
                          className={`px-3 py-1.5 rounded-full text-sm font-medium border ${option.color}`}
                        >
                          {option.label}
                        </span>
                        <span className="text-gray-900">{option.value}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={submitting}
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating Status...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Update Status
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditApplication;
