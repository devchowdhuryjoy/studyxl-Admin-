// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import BASE_URL from "../../Api/ApiBaseUrl";

// const ProgramFilterCreate = () => {
//   // Get token from localStorage
//   const authToken = localStorage.getItem("admin_token") || "";
  
//   // Loading states for each form
//   const [loading, setLoading] = useState({
//     programLevel: false,
//     intake: false,
//     programTag: false,
//     fieldOfStudy: false,
//     subject: false,
//     month: false
//   });

//   // Form data states
//   const [formData, setFormData] = useState({
//     // Program Level
//     programLevelName: "",
    
//     // Intake
//     intakeName: "",
    
//     // Program Tag
//     programTagName: "",
    
//     // Field of Study
//     fieldOfStudyName: "",
    
//     // Subject
//     subjectName: "",
//     selectedFieldOfStudyId: "",
    
//     // Month
//     monthName: "",
//     selectedIntakeId: "",
//     openDate: "",
//     submissionDeadline: ""
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // 1. Create Program Level
//   const handleCreateProgramLevel = async (e) => {
//     e.preventDefault();
    
//     if (!formData.programLevelName.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please enter Program Level name",
//       });
//       return;
//     }

//     setLoading(prev => ({ ...prev, programLevel: true }));

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/admin/program/level/store`,
//         {
//           name: formData.programLevelName
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       console.log("Program Level Response:", response.data);
      
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Program Level created successfully!",
//       });

//       // Reset form
//       setFormData(prev => ({ ...prev, programLevelName: "" }));

//     } catch (error) {
//       console.error("Error creating Program Level:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.response?.data?.message || "Failed to create Program Level",
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, programLevel: false }));
//     }
//   };

//   // 2. Create Intake
//   const handleCreateIntake = async (e) => {
//     e.preventDefault();
    
//     if (!formData.intakeName.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please enter Intake name",
//       });
//       return;
//     }

//     setLoading(prev => ({ ...prev, intake: true }));

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/admin/intakes`,
//         {
//           name: formData.intakeName
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       console.log("Intake Response:", response.data);
      
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Intake created successfully!",
//       });

//       // Reset form
//       setFormData(prev => ({ ...prev, intakeName: "" }));

//     } catch (error) {
//       console.error("Error creating Intake:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.response?.data?.message || "Failed to create Intake",
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, intake: false }));
//     }
//   };

//   // 3. Create Program Tag
//   const handleCreateProgramTag = async (e) => {
//     e.preventDefault();
    
//     if (!formData.programTagName.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please enter Program Tag",
//       });
//       return;
//     }

//     setLoading(prev => ({ ...prev, programTag: true }));

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/admin/programtag`,
//         {
//           program_tag: formData.programTagName
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       console.log("Program Tag Response:", response.data);
      
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Program Tag created successfully!",
//       });

//       // Reset form
//       setFormData(prev => ({ ...prev, programTagName: "" }));

//     } catch (error) {
//       console.error("Error creating Program Tag:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.response?.data?.message || "Failed to create Program Tag",
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, programTag: false }));
//     }
//   };

//   // 4. Create Field of Study
//   const handleCreateFieldOfStudy = async (e) => {
//     e.preventDefault();
    
//     if (!formData.fieldOfStudyName.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please enter Field of Study name",
//       });
//       return;
//     }

//     setLoading(prev => ({ ...prev, fieldOfStudy: true }));

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/admin/field/of/study/store`,
//         {
//           name: formData.fieldOfStudyName
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       console.log("Field of Study Response:", response.data);
      
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Field of Study created successfully!",
//       });

//       // Reset form
//       setFormData(prev => ({ ...prev, fieldOfStudyName: "" }));

//     } catch (error) {
//       console.error("Error creating Field of Study:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.response?.data?.message || "Failed to create Field of Study",
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, fieldOfStudy: false }));
//     }
//   };

//   // 5. Create Subject (under Field of Study)
//   const handleCreateSubject = async (e) => {
//     e.preventDefault();
    
//     if (!formData.subjectName.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please enter Subject name",
//       });
//       return;
//     }

//     if (!formData.selectedFieldOfStudyId) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please enter Field of Study ID",
//       });
//       return;
//     }

//     setLoading(prev => ({ ...prev, subject: true }));

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/admin/field/of/study/${formData.selectedFieldOfStudyId}/subject/create`,
//         {
//           subject_name: formData.subjectName
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       console.log("Subject Response:", response.data);
      
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Subject created successfully!",
//       });

//       // Reset form
//       setFormData(prev => ({ 
//         ...prev, 
//         subjectName: "",
//         selectedFieldOfStudyId: ""
//       }));

//     } catch (error) {
//       console.error("Error creating Subject:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.response?.data?.message || "Failed to create Subject",
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, subject: false }));
//     }
//   };

//   // 6. Create Month (under Intake)
//   const handleCreateMonth = async (e) => {
//     e.preventDefault();
    
//     if (!formData.monthName.trim()) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please enter Month name",
//       });
//       return;
//     }

//     if (!formData.selectedIntakeId) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please enter Intake ID",
//       });
//       return;
//     }

//     if (!formData.openDate) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please select Open Date",
//       });
//       return;
//     }

//     if (!formData.submissionDeadline) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Please select Submission Deadline",
//       });
//       return;
//     }

//     setLoading(prev => ({ ...prev, month: true }));

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/admin/intake/month/create/${formData.selectedIntakeId}`,
//         {
//           month: formData.monthName,
//           open_date: formData.openDate,
//           submission_deadline: formData.submissionDeadline
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authToken}`,
//           },
//         }
//       );

//       console.log("Month Response:", response.data);
      
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Month created successfully!",
//       });

//       // Reset form
//       setFormData(prev => ({ 
//         ...prev, 
//         monthName: "",
//         selectedIntakeId: "",
//         openDate: "",
//         submissionDeadline: ""
//       }));

//     } catch (error) {
//       console.error("Error creating Month:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: error.response?.data?.message || "Failed to create Month",
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, month: false }));
//     }
//   };

//   return (
//     <div className="w-full mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-8 text-center text-secondary underline">Create Program Filters</h1>

//       <div className="space-y-8">
//         {/* 1. Create Program Level */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-bold mb-4 text-black">1. Create Program Level</h2>
//           <form onSubmit={handleCreateProgramLevel} className="space-y-4">
//             <div className="flex flex-col">
//               <label className="mb-1 text-black font-medium">Program Level Name</label>
//               <input
//                 type="text"
//                 name="programLevelName"
//                 value={formData.programLevelName}
//                 onChange={handleChange}
//                 placeholder="e.g., Grade-1, Undergraduate"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading.programLevel}
//               className={`px-6 py-2 text-white font-bold rounded-lg transition-all ${
//                 loading.programLevel
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-blue-600 hover:bg-blue-700'
//               }`}
//             >
//               {loading.programLevel ? 'Creating...' : 'Create Program Level'}
//             </button>
//           </form>
//         </div>

//         {/* 2. Create Intake */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-bold mb-4 text-black">2. Create Intake</h2>
//           <form onSubmit={handleCreateIntake} className="space-y-4">
//             <div className="flex flex-col">
//               <label className="mb-1 text-black font-medium">Intake Name</label>
//               <input
//                 type="text"
//                 name="intakeName"
//                 value={formData.intakeName}
//                 onChange={handleChange}
//                 placeholder="e.g., Feb - Feb 2025, Fall 2024"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading.intake}
//               className={`px-6 py-2 text-white font-bold rounded-lg transition-all ${
//                 loading.intake
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-green-600 hover:bg-green-700'
//               }`}
//             >
//               {loading.intake ? 'Creating...' : 'Create Intake'}
//             </button>
//           </form>
//         </div>

//         {/* 3. Create Program Tag */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-bold mb-4 text-black">3. Create Program Tag</h2>
//           <form onSubmit={handleCreateProgramTag} className="space-y-4">
//             <div className="flex flex-col">
//               <label className="mb-1 text-black font-medium">Program Tag</label>
//               <input
//                 type="text"
//                 name="programTagName"
//                 value={formData.programTagName}
//                 onChange={handleChange}
//                 placeholder="e.g., Fast Acceptance, Second Accept"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading.programTag}
//               className={`px-6 py-2 text-white font-bold rounded-lg transition-all ${
//                 loading.programTag
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-purple-600 hover:bg-purple-700'
//               }`}
//             >
//               {loading.programTag ? 'Creating...' : 'Create Program Tag'}
//             </button>
//           </form>
//         </div>

//         {/* 4. Create Field of Study */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-bold mb-4 text-black">4. Create Field of Study</h2>
//           <form onSubmit={handleCreateFieldOfStudy} className="space-y-4">
//             <div className="flex flex-col">
//               <label className="mb-1 text-black font-medium">Field of Study Name</label>
//               <input
//                 type="text"
//                 name="fieldOfStudyName"
//                 value={formData.fieldOfStudyName}
//                 onChange={handleChange}
//                 placeholder="e.g., Physics, Computer Science"
//                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading.fieldOfStudy}
//               className={`px-6 py-2 text-white font-bold rounded-lg transition-all ${
//                 loading.fieldOfStudy
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-yellow-600 hover:bg-yellow-700'
//               }`}
//             >
//               {loading.fieldOfStudy ? 'Creating...' : 'Create Field of Study'}
//             </button>
//           </form>
//         </div>

//         {/* 5. Create Subject */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-bold mb-4 text-black">5. Create Subject (Under Field of Study)</h2>
//           <form onSubmit={handleCreateSubject} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex flex-col">
//                 <label className="mb-1 text-black font-medium">Field of Study ID</label>
//                 <input
//                   type="text"
//                   name="selectedFieldOfStudyId"
//                   value={formData.selectedFieldOfStudyId}
//                   onChange={handleChange}
//                   placeholder="Enter Field of Study ID (e.g., 1)"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label className="mb-1 text-black font-medium">Subject Name</label>
//                 <input
//                   type="text"
//                   name="subjectName"
//                   value={formData.subjectName}
//                   onChange={handleChange}
//                   placeholder="e.g., Architecture Engineering"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               disabled={loading.subject}
//               className={`px-6 py-2 text-white font-bold rounded-lg transition-all ${
//                 loading.subject
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-indigo-600 hover:bg-indigo-700'
//               }`}
//             >
//               {loading.subject ? 'Creating...' : 'Create Subject'}
//             </button>
//           </form>
//         </div>

//         {/* 6. Create Month */}
//         <div className="bg-white p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-bold mb-4 text-black">6. Create Month (Under Intake)</h2>
//           <form onSubmit={handleCreateMonth} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex flex-col">
//                 <label className="mb-1 text-black font-medium">Intake ID</label>
//                 <input
//                   type="text"
//                   name="selectedIntakeId"
//                   value={formData.selectedIntakeId}
//                   onChange={handleChange}
//                   placeholder="Enter Intake ID (e.g., 1)"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label className="mb-1 text-black font-medium">Month Name</label>
//                 <input
//                   type="text"
//                   name="monthName"
//                   value={formData.monthName}
//                   onChange={handleChange}
//                   placeholder="e.g., Feb 2025"
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label className="mb-1 text-black font-medium">Open Date</label>
//                 <input
//                   type="datetime-local"
//                   name="openDate"
//                   value={formData.openDate}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label className="mb-1 text-black font-medium">Submission Deadline</label>
//                 <input
//                   type="datetime-local"
//                   name="submissionDeadline"
//                   value={formData.submissionDeadline}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               disabled={loading.month}
//               className={`px-6 py-2 text-white font-bold rounded-lg transition-all ${
//                 loading.month
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-red-600 hover:bg-red-700'
//               }`}
//             >
//               {loading.month ? 'Creating...' : 'Create Month'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgramFilterCreate;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BASE_URL from "../../Api/ApiBaseUrl";

const token = localStorage.getItem("admin_token");

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const ProgramFiltersCrud = () => {
  /* ---------------- STATES ---------------- */
  const [programLevels, setProgramLevels] = useState([]);
  const [intakes, setIntakes] = useState([]);
  const [intakeMonths, setIntakeMonths] = useState([]);
  const [programTags, setProgramTags] = useState([]);
  const [fields, setFields] = useState([]);

  const [edit, setEdit] = useState(null); // Generic edit
  const [editMonth, setEditMonth] = useState(null); // Intake Month edit

  // Intake Month form fields
  const [monthName, setMonthName] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [submissionDeadline, setSubmissionDeadline] = useState("");
  const [selectedIntakeId, setSelectedIntakeId] = useState("");

  /* ---------------- FETCH ALL ---------------- */
  const fetchAll = async () => {
    try {
      const [pl, i, im, pt, f] = await Promise.all([
        axios.get(`${BASE_URL}/admin/all/program/level`, { headers }),
        axios.get(`${BASE_URL}/admin/intakes`, { headers }),
        axios.get(`${BASE_URL}/admin/intake/all/month`, { headers }),
        axios.get(`${BASE_URL}/admin/programtag`, { headers }),
        axios.get(`${BASE_URL}/admin/all/field/of/study`, { headers }),
      ]);

      setProgramLevels(pl.data.data || pl.data);
      setIntakes(i.data.data || i.data);
      setIntakeMonths(im.data.data || im.data);
      setProgramTags(pt.data.data || pt.data);
      setFields(f.data.data || f.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (url) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(url, { headers });
      Swal.fire("Deleted!", "", "success");
      fetchAll();
    } catch (error) {
      Swal.fire("Error", "Failed to delete", "error");
    }
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async () => {
    try {
      await axios.put(edit.url, edit.payload, { headers });
      Swal.fire("Updated!", "", "success");
      setEdit(null);
      fetchAll();
    } catch (error) {
      Swal.fire("Error", "Failed to update", "error");
    }
  };

  /* ---------------- CREATE GENERIC BLOCK ---------------- */
  const Block = ({ title, rows, nameKey, createUrl, updateUrl, deleteUrl }) => {
    const [createValue, setCreateValue] = useState("");

    const handleCreate = async () => {
      if (!createValue.trim()) {
        Swal.fire("Error", "Field required", "error");
        return;
      }

      try {
        await axios.post(createUrl, { [nameKey]: createValue }, { headers });
        Swal.fire("Created!", "", "success");
        setCreateValue("");
        fetchAll();
      } catch (error) {
        Swal.fire("Error", "Failed to create", "error");
      }
    };

    return (
      <div className="bg-white p-6 rounded shadow mb-10">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {/* CREATE */}
        <div className="flex gap-3 mb-4">
          <input
            className="border p-2 flex-1"
            placeholder={`Enter ${title}`}
            value={createValue}
            onChange={(e) => setCreateValue(e.target.value)}
          />
          <button onClick={handleCreate} className="bg-green-600 text-white px-4 rounded">
            Add
          </button>
        </div>

        {/* LIST */}
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id}>
                <td className="border p-2 text-center">{i + 1}</td>
                <td className="border p-2 text-center">{row[nameKey]}</td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    onClick={() =>
                      setEdit({
                        value: row[nameKey],
                        url: updateUrl(row.id),
                        payload: { [nameKey]: row[nameKey] },
                      })
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(deleteUrl(row.id))}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  /* ---------------- CREATE INTAKE MONTH ---------------- */
  const handleCreateIntakeMonth = async () => {
    if (!selectedIntakeId || !monthName || !openDate || !submissionDeadline) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/admin/intake/month/create/${selectedIntakeId}`,
        {
          month: monthName,
          open_date: openDate,
          submission_deadline: submissionDeadline,
        },
        { headers }
      );
      Swal.fire("Created!", "", "success");
      setSelectedIntakeId("");
      setMonthName("");
      setOpenDate("");
      setSubmissionDeadline("");
      fetchAll();
    } catch (error) {
      Swal.fire("Error", "Failed to create intake month", "error");
    }
  };

  /* ---------------- UPDATE INTAKE MONTH ---------------- */
  const handleUpdateMonth = async () => {
    if (!editMonth.intake_id || !editMonth.month || !editMonth.open_date || !editMonth.submission_deadline) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    try {
      await axios.put(
        `${BASE_URL}/admin/intake/month/${editMonth.id}`,
        {
          intake_id: editMonth.intake_id,
          month: editMonth.month,
          open_date: editMonth.open_date,
          submission_deadline: editMonth.submission_deadline,
        },
        { headers }
      );
      Swal.fire("Updated!", "", "success");
      setEditMonth(null);
      fetchAll();
    } catch (error) {
      Swal.fire("Error", "Failed to update intake month", "error");
    }
  };

  return (
    <div className="p-6">
      {/* PROGRAM LEVEL */}
      <Block
        title="Program Levels"
        rows={programLevels}
        nameKey="name"
        createUrl={`${BASE_URL}/admin/program/level/store`}
        updateUrl={(id) => `${BASE_URL}/admin/program/level/${id}/update`}
        deleteUrl={(id) => `${BASE_URL}/admin/program/level/${id}/delete`}
      />

      {/* INTAKE */}
      <Block
        title="Intakes"
        rows={intakes}
        nameKey="name"
        createUrl={`${BASE_URL}/admin/intakes`}
        updateUrl={(id) => `${BASE_URL}/admin/intakes/${id}`}
        deleteUrl={(id) => `${BASE_URL}/admin/intakes/${id}`}
      />

      {/* INTAKE MONTHS */}
      <div className="bg-white p-6 rounded shadow mb-10">
        <h2 className="text-xl font-bold mb-4">Intake Months</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          <select
            className="border p-2"
            value={selectedIntakeId}
            onChange={(e) => setSelectedIntakeId(e.target.value)}
          >
            <option value="">Select Intake</option>
            {intakes.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="border p-2"
            placeholder="Month Name"
            value={monthName}
            onChange={(e) => setMonthName(e.target.value)}
          />
          <input
            type="date"
            className="border p-2"
            placeholder="Open Date"
            value={openDate}
            onChange={(e) => setOpenDate(e.target.value)}
          />
          <input
            type="date"
            className="border p-2"
            placeholder="Submission Deadline"
            value={submissionDeadline}
            onChange={(e) => setSubmissionDeadline(e.target.value)}
          />
          <button
            onClick={handleCreateIntakeMonth}
            className="bg-green-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* LIST */}
        <table className="w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Intake</th>
              <th className="border p-2">Month</th>
              <th className="border p-2">Open Date</th>
              <th className="border p-2">Deadline</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {intakeMonths.map((m, i) => (
              <tr key={m.id}>
                <td className="border p-2 text-center">{i + 1}</td>
                <td className="border p-2 text-center">{m.intake_name || m.intake?.name}</td>
                <td className="border p-2 text-center">{m.month}</td>
                <td className="border p-2 text-center">{m.open_date}</td>
                <td className="border p-2 text-center">{m.submission_deadline}</td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    onClick={() => setEditMonth({ ...m, intake_id: m.intake_id })}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(`${BASE_URL}/admin/intake/month/${m.id}`)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PROGRAM TAG */}
      <Block
        title="Program Tags"
        rows={programTags}
        nameKey="program_tag"
        createUrl={`${BASE_URL}/admin/programtag`}
        updateUrl={(id) => `${BASE_URL}/admin/programtag/${id}`}
        deleteUrl={(id) => `${BASE_URL}/admin/programtag/${id}`}
      />

      {/* FIELD OF STUDY */}
      <Block
        title="Field of Study"
        rows={fields}
        nameKey="name"
        createUrl={`${BASE_URL}/admin/field/of/study/store`}
        updateUrl={(id) => `${BASE_URL}/admin/field/of/study/${id}/update`}
        deleteUrl={(id) => `${BASE_URL}/admin/field/of/study/${id}/delete`}
      />

      {/* EDIT MODAL (Generic) */}
      {edit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="font-bold mb-3">Edit</h3>
            <input
              className="border w-full p-2 mb-4"
              value={edit.payload[Object.keys(edit.payload)[0]]}
              onChange={(e) =>
                setEdit({
                  ...edit,
                  payload: { ...edit.payload, [Object.keys(edit.payload)[0]]: e.target.value },
                })
              }
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setEdit(null)} className="px-4 py-1 bg-gray-400 rounded text-white">
                Cancel
              </button>
              <button onClick={handleUpdate} className="px-4 py-1 bg-green-600 rounded text-white">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL (Intake Month) */}
      {editMonth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="font-bold mb-3">Edit Intake Month</h3>
            <select
              className="border p-2 w-full mb-2"
              value={editMonth.intake_id}
              onChange={(e) => setEditMonth({ ...editMonth, intake_id: e.target.value })}
            >
              <option value="">Select Intake</option>
              {intakes.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="border p-2 w-full mb-2"
              placeholder="Month Name"
              value={editMonth.month}
              onChange={(e) => setEditMonth({ ...editMonth, month: e.target.value })}
            />
            <input
              type="date"
              className="border p-2 w-full mb-2"
              placeholder="Open Date"
              value={editMonth.open_date}
              onChange={(e) => setEditMonth({ ...editMonth, open_date: e.target.value })}
            />
            <input
              type="date"
              className="border p-2 w-full mb-2"
              placeholder="Submission Deadline"
              value={editMonth.submission_deadline}
              onChange={(e) => setEditMonth({ ...editMonth, submission_deadline: e.target.value })}
            />
            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setEditMonth(null)}
                className="px-4 py-1 bg-gray-400 rounded text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateMonth}
                className="px-4 py-1 bg-green-600 rounded text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramFiltersCrud;
