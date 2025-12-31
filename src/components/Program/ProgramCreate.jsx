



// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2"; // SweetAlert2 import
// import BASE_URL from "../../Api/ApiBaseUrl";

// const ProgramCreate = () => {
//   const [formData, setFormData] = useState({
//     program_name: "",
//     program_description: "",
//     program_tag: "",
//     application_fee: "",
//     application_short_desc: "",
//     average_graduate_program: "",
//     average_graduate_program_short_desc: "",
//     average_undergraduate_program: "",
//     average_undergraduate_program_short_desc: "",
//     cost_of_living: "",
//     cost_of_living_short_desc: "",
//     average_gross_tuition: "",
//     duration: "",
//     campus_city: "",
//     success_chance: "",
//     program_summary: "",
//     average_gross_tuition_short_desc: "",
//     open_date: "",
//     submission_deadline: "",
//     students_requirements: {
//       study_permit_or_visa: "",
//       nationality: "",
//       education_country: "",
//       last_level_of_study: "",
//       grading_scheme: "",
//       english_exam_status: {
//         ielts: { required: false, reading: "", writing: "", listening: "", speaking: "", overall: "" },
//         toefl: { required: false, reading: "", writing: "", listening: "", speaking: "", overall: "" },
//         duolingo: { required: false, total: "" },
//         pte: { required: false, reading: "", writing: "", listening: "", speaking: "", overall: "" },
//         no_exam: { status: "" },
//       },
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/admin/university-programs/1/1/1/1/1/1/store`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer 12|GglMcxnKVS5QnUWWKe6RU7LLmHfLeNnJWp1mrteE7373aa90",
//           },
//         }
//       );

//       // SweetAlert Success
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Program Created Successfully!",
//         confirmButtonColor: "#3085d6",
//       });

//       console.log(response.data);
//     } catch (error) {
//       // SweetAlert Error
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: error.response?.data?.message || "Something went wrong!",
//         confirmButtonColor: "#d33",
//       });

//       console.error(error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
//       <h2 className="text-3xl font-bold mb-8 text-black">Create New Program</h2>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {[
//           { name: "program_name", placeholder: "Program Name" },
//           { name: "program_description", placeholder: "Program Description" },
//           { name: "program_tag", placeholder: "Program Tag" },
//           { name: "application_fee", placeholder: "Application Fee" },
//           { name: "application_short_desc", placeholder: "Application Short Description" },
//           { name: "average_graduate_program", placeholder: "Avg Graduate Program" },
//           { name: "average_graduate_program_short_desc", placeholder: "Avg Graduate Program Short Desc" },
//           { name: "average_undergraduate_program", placeholder: "Avg Undergraduate Program" },
//           { name: "average_undergraduate_program_short_desc", placeholder: "Avg Undergraduate Short Desc" },
//           { name: "cost_of_living", placeholder: "Cost of Living" },
//           { name: "cost_of_living_short_desc", placeholder: "Cost of Living Short Desc" },
//           { name: "average_gross_tuition", placeholder: "Avg Tuition" },
//           { name: "average_gross_tuition_short_desc", placeholder: "Avg Tuition Short Desc" },
//           { name: "duration", placeholder: "Duration" },
//           { name: "campus_city", placeholder: "Campus City" },
//           { name: "success_chance", placeholder: "Success Chance" },
//           { name: "program_summary", placeholder: "Program Summary" },
//         ].map((field) => (
//           <div key={field.name} className="flex flex-col">
//             <label className="mb-1 text-black font-medium">{field.placeholder}</label>
//             <input
//               type="text"
//               name={field.name}
//               placeholder={field.placeholder}
//               value={formData[field.name]}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
//             />
//           </div>
//         ))}

//         {/* Dates */}
//         <div className="flex flex-col">
//           <label className="mb-1 text-black font-medium">Open Date</label>
//           <input
//             type="date"
//             name="open_date"
//             value={formData.open_date}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-1 text-black font-medium">Submission Deadline</label>
//           <input
//             type="datetime-local"
//             name="submission_deadline"
//             value={formData.submission_deadline}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
//           />
//         </div>
//       </form>

//       <button
//         type="submit"
//         onClick={handleSubmit}
//         className="w-full mt-8 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all shadow-md"
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// export default ProgramCreate;



import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BASE_URL from "../../Api/ApiBaseUrl";

const ProgramCreate = () => {
  const [token, setToken] = useState("");

  // 🔥 Load Token Automatically
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      Swal.fire("Error", "Login token not found!", "error");
    }
  }, []);

  // 6 Dynamic IDs
  const [ids, setIds] = useState({
    university_id: "",
    program_level_id: "",
    program_tag_id: "",
    field_of_study_id: "",
    intake_id: "",
    intake_month_id: "",
  });

  const [formData, setFormData] = useState({
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
    average_gross_tuition_short_desc: "",
    duration: "",
    campus_city: "",
    success_chance: "",
    program_summary: "",
    open_date: "",
    submission_deadline: "",
    students_requirements: {},
  });

  const handleIdChange = (e) => {
    setIds({ ...ids, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate IDs
    for (let key in ids) {
      if (!ids[key]) {
        Swal.fire("Missing ID", `${key} is required!`, "error");
        return;
      }
    }

    // 🔥 FINAL URL (Correct)
    const url = `${BASE_URL}/admin/university-programs/${ids.university_id}/${ids.program_level_id}/${ids.program_tag_id}/${ids.field_of_study_id}/${ids.intake_id}/${ids.intake_month_id}/store`;

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      Swal.fire("Success", "Program Created!", "success");
      console.log(response.data);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Something went wrong",
        "error"
      );
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dynamic Program Create</h2>

      {/* Dynamic ID Inputs */}
      {Object.keys(ids).map((key) => (
        <div key={key} className="mb-4">
          <label className="block mb-1 font-semibold">{key}</label>
          <input
            type="number"
            name={key}
            value={ids[key]}
            onChange={handleIdChange}
            className="border p-2 w-full"
            placeholder={`Enter ${key}`}
          />
        </div>
      ))}

      {/* Program Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {[
          "program_name",
          "program_description",
          "program_tag",
          "application_fee",
          "application_short_desc",
          "average_graduate_program",
          "average_graduate_program_short_desc",
          "average_undergraduate_program",
          "average_undergraduate_program_short_desc",
          "cost_of_living",
          "cost_of_living_short_desc",
          "average_gross_tuition",
          "average_gross_tuition_short_desc",
          "duration",
          "campus_city",
          "success_chance",
          "program_summary",
        ].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace(/_/g, " ")}
            value={formData[field]}
            onChange={handleChange}
            className="border p-2"
          />
        ))}

        <div>
          <label>Open Date</label>
          <input
            type="date"
            name="open_date"
            value={formData.open_date}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Submission Deadline</label>
          <input
            type="datetime-local"
            name="submission_deadline"
            value={formData.submission_deadline}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
      </form>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full p-3 bg-blue-600 text-white font-semibold rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default ProgramCreate;



