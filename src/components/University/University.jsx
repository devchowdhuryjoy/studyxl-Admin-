// import React, { useRef, useState, useEffect } from "react";
// import BASE_URL from "../../Api/ApiBaseUrl";

// const emptyForm = {
//   university_name: "",
//   address: "",
//   location: "",
//   destinations: "",
//   phone_number: "",
//   founded: "",
//   school_id: "",
//   institution_type: "",
//   dli_number: "",
//   top_disciplines: "",
//   application_fee: "",
//   application_short_desc: "",
//   average_graduate_program: "",
//   average_graduate_program_short_desc: "",
//   average_undergraduate_program: "",
//   average_undergraduate_program_short_desc: "",
//   cost_of_living: "",
//   cost_of_living_short_desc: "",
//   average_gross_tuition: "",
//   average_gross_tuition_short_desc: "",
//   imageFile: null,
//   imagePreview: "",
//   featured: true,
// };

// const AdminUniversityForm = ({ onCreate }) => {
//   const [form, setForm] = useState(emptyForm);
//   const [errors, setErrors] = useState({});
//   const [destinations, setDestinations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef();

//   const token = localStorage.getItem("token")

//   useEffect(() => {
//     fetchDestinations();
//   }, []);

//   const fetchDestinations = async () => {
//     try {
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${token}`);
//       myHeaders.append("Accept", "application/json");

//       const requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow"
//       };

//       const response = await fetch(`${BASE_URL}/admin/destinations/`, requestOptions);
//       const result = await response.json();

//       if (response.ok) {
//         setDestinations(result.data || []);
//       } else {
//         console.error("Failed to fetch destinations:", result);
//       }
//     } catch (error) {
//       console.error("Error fetching destinations:", error);
//     }
//   };

//   const validate = () => {
//     const e = {};
//     if (!form.university_name.trim())
//       e.university_name = "University name is required";
//     if (!form.location.trim()) e.location = "Location is required";
//     if (!form.address.trim()) e.address = "Address is required";
//     if (!form.destinations) e.destinations = "Destination is required";
//     if (!form.imageFile) e.imageFile = "An image is required";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleFile = (file) => {
//     if (!file) return;
//     if (!file.type.startsWith("image/")) {
//       setErrors((p) => ({ ...p, imageFile: "Please select an image file" }));
//       return;
//     }
//     const preview = URL.createObjectURL(file);
//     setForm((p) => ({ ...p, imageFile: file, imagePreview: preview }));
//     setErrors((p) => ({ ...p, imageFile: undefined }));
//   };

//   const onDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];
//     handleFile(file);
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);
//     try {
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${token}`);
//       myHeaders.append("Accept", "application/json");

//       const formdata = new FormData();

//       // Basic information
//       formdata.append("university_name", form.university_name);
//       formdata.append("address", form.address);
//       formdata.append("location", form.location);
//       formdata.append("phone_number", form.phone_number);
//       formdata.append("founded", form.founded);
//       formdata.append("school_id", form.school_id);
//       formdata.append("institution_type", form.institution_type);
//       formdata.append("dli_number", form.dli_number);
//       formdata.append("destinations", form.destinations); // Add destination to form data

//       if (form.top_disciplines) {
//         const disciplinesArray = form.top_disciplines.split(',').map(discipline => ({
//           discipline: discipline.trim(),
//           percentage: 0
//         }));
//         formdata.append("top_disciplines", JSON.stringify(disciplinesArray));
//       }

//       // Other fields
//       formdata.append("application_fee", form.application_fee);
//       formdata.append("application_short_desc", form.application_short_desc);
//       formdata.append("average_graduate_program", form.average_graduate_program);
//       formdata.append("average_graduate_program_short_desc", form.average_graduate_program_short_desc);
//       formdata.append("average_undergraduate_program", form.average_undergraduate_program);
//       formdata.append("average_undergraduate_program_short_desc", form.average_undergraduate_program_short_desc);
//       formdata.append("cost_of_living", form.cost_of_living);
//       formdata.append("cost_of_living_short_desc", form.cost_of_living_short_desc);
//       formdata.append("average_gross_tuition", form.average_gross_tuition);
//       formdata.append("average_gross_tuition_short_desc", form.average_gross_tuition_short_desc);
//       formdata.append("featured", form.featured);

//       // Image append
//       if (form.imageFile) {
//         formdata.append("images[]", form.imageFile);
//       }

//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: formdata,
//         redirect: "follow"
//       };

//       // Updated API endpoint - removed destination ID from URL
//       const response = await fetch(
//         `${BASE_URL}/admin/universities/create`,
//         requestOptions
//       );

//       const result = await response.json();

//       if (response.ok) {
//         // Success case
//         const card = {
//           id: crypto.randomUUID(),
//           ...form,
//           image: form.imagePreview,
//         };
//         onCreate?.(card);

//         // Reset form
//         setForm(emptyForm);
//         setErrors({});
//         fileInputRef.current.value = "";

//         alert("University created successfully!");
//       } else {
//         console.error("API Error:", result);
//         alert(`Failed to create university: ${result.message || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while creating university");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold">Add University</h1>
//         <p className="text-gray-600 mt-1">Fill all fields carefully</p>
//       </div>

//       <form onSubmit={onSubmit} className="grid lg:grid-cols-3 gap-6">
//         {/* Image uploader */}
//         <div className="lg:col-span-1">
//           <div
//             onDrop={onDrop}
//             onDragOver={(e) => e.preventDefault()}
//             className={`group relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 h-64 cursor-pointer transition shadow-sm hover:shadow-md ${
//               errors.imageFile ? "border-red-400" : "border-gray-300"
//             }`}
//             onClick={() => fileInputRef.current.click()}
//           >
//             {form.imagePreview ? (
//               <>
//                 <img
//                   src={form.imagePreview}
//                   alt="preview"
//                   className="absolute inset-0 w-full h-full object-cover rounded-2xl"
//                 />
//                 <div className="absolute inset-0 rounded-2xl bg-black/30 flex items-end p-3">
//                   <span className="text-white text-sm">
//                     Click to replace • or drag & drop
//                   </span>
//                 </div>
//               </>
//             ) : (
//               <div className="text-center space-y-2">
//                 <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
//                   ⬆️
//                 </div>
//                 <div className="text-gray-800 font-medium">
//                   Drag & drop image here
//                 </div>
//                 <div className="text-gray-500 text-sm">or click to browse</div>
//                 <div className="text-[11px] text-gray-400">
//                   JPG / PNG / WEBP • up to 5MB
//                 </div>
//               </div>
//             )}
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => handleFile(e.target.files?.[0])}
//             />
//           </div>
//           {errors.imageFile && (
//             <p className="text-red-500 text-sm mt-2">{errors.imageFile}</p>
//           )}

//           {/* Featured toggle */}
//           <label className="mt-4 flex items-center gap-3">
//             <input
//               type="checkbox"
//               className="peer sr-only"
//               checked={form.featured}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, featured: e.target.checked }))
//               }
//             />
//             <span className="w-12 h-7 rounded-full bg-gray-300 peer-checked:bg-primary relative transition-all">
//               <span className="absolute top-1 left-1 h-5 w-5 bg-white rounded-full shadow transition-all peer-checked:translate-x-5" />
//             </span>
//             <span className="text-sm text-gray-700">Mark as Featured</span>
//           </label>
//         </div>

//         {/* Text fields */}
//         <div className="lg:col-span-2 space-y-4">
//           {/* University Name */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               University Name
//             </label>
//             <input
//               type="text"
//               value={form.university_name}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, university_name: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="Western University"
//             />
//             {errors.university_name && (
//               <p className="text-red-500 text-sm mt-1">{errors.university_name}</p>
//             )}
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Address</label>
//             <input
//               type="text"
//               value={form.address}
//               onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="123 Main St"
//             />
//             {errors.address && (
//               <p className="text-red-500 text-sm mt-1">{errors.address}</p>
//             )}
//           </div>

//           {/* Location */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Location</label>
//             <input
//               type="text"
//               value={form.location}
//               onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="London, Ontario, CA"
//             />
//             {errors.location && (
//               <p className="text-red-500 text-sm mt-1">{errors.location}</p>
//             )}
//           </div>

//           {/* Destinations dropdown */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Destinations</label>
//             <select
//               value={form.destinations}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, destinations: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//             >
//               <option value="">Select Destination</option>
//               {destinations.map((dest) => (
//                 <option key={dest.id} value={dest.id}>
//                   {dest.destinations_name}
//                 </option>
//               ))}
//             </select>
//             {errors.destinations && (
//               <p className="text-red-500 text-sm mt-1">{errors.destinations}</p>
//             )}
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Phone Number</label>
//             <input
//               type="text"
//               value={form.phone_number}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, phone_number: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="+1 234 567 890"
//             />
//           </div>

//           {/* Founded Year */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Founded Year</label>
//             <input
//               type="number"
//               value={form.founded}
//               onChange={(e) => setForm((p) => ({ ...p, founded: e.target.value }))}
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="1878"
//             />
//           </div>

//           {/* School ID */}
//           <div>
//             <label className="block text-sm font-medium mb-1">School ID</label>
//             <input
//               type="text"
//               value={form.school_id}
//               onChange={(e) => setForm((p) => ({ ...p, school_id: e.target.value }))}
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="SCH12345"
//             />
//           </div>

//           {/* Institution Type */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Institution Type
//             </label>
//             <select
//               value={form.institution_type}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, institution_type: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//             >
//               <option value="">Select Type</option>
//               <option value="Public">Public</option>
//               <option value="Private">Private</option>
//             </select>
//           </div>

//           {/* DLI Number */}
//           <div>
//             <label className="block text-sm font-medium mb-1">DLI Number</label>
//             <input
//               type="text"
//               value={form.dli_number}
//               onChange={(e) => setForm((p) => ({ ...p, dli_number: e.target.value }))}
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="DLI-123456"
//             />
//           </div>

//           {/* Top Disciplines */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Top Disciplines</label>
//             <input
//               type="text"
//               value={form.top_disciplines}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, top_disciplines: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="Engineering, Business, Arts"
//             />
//             <p className="text-xs text-gray-400">
//               Separate disciplines with commas
//             </p>
//           </div>

//           {/* Application Fee */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Application Fee</label>
//             <input
//               type="text"
//               value={form.application_fee}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, application_fee: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="$100"
//             />
//           </div>

//           {/* Application Short Description */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Application Short Description
//             </label>
//             <textarea
//               rows={3}
//               value={form.application_short_desc}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   application_short_desc: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//             />
//           </div>

//           {/* Average Graduate Program */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Average Graduate Program
//             </label>
//             <input
//               type="text"
//               value={form.average_graduate_program}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   average_graduate_program: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="Masters in Engineering"
//             />
//           </div>

//           {/* Graduate Program Short Desc */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Graduate Program Short Description
//             </label>
//             <textarea
//               rows={2}
//               value={form.average_graduate_program_short_desc}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   average_graduate_program_short_desc: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//             />
//           </div>

//           {/* Undergraduate Program */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Average Undergraduate Program
//             </label>
//             <input
//               type="text"
//               value={form.average_undergraduate_program}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   average_undergraduate_program: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="Bachelors in Business"
//             />
//           </div>

//           {/* Undergraduate Short Desc */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Undergraduate Program Short Description
//             </label>
//             <textarea
//               rows={2}
//               value={form.average_undergraduate_program_short_desc}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   average_undergraduate_program_short_desc: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//             />
//           </div>

//           {/* Cost of Living */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Cost of Living</label>
//             <input
//               type="text"
//               value={form.cost_of_living}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, cost_of_living: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="$1200/month"
//             />
//           </div>

//           {/* Cost of Living Short Desc */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Cost of Living Short Description
//             </label>
//             <textarea
//               rows={2}
//               value={form.cost_of_living_short_desc}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   cost_of_living_short_desc: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//             />
//           </div>

//           {/* Average Gross Tuition */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Average Gross Tuition
//             </label>
//             <input
//               type="text"
//               value={form.average_gross_tuition}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   average_gross_tuition: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="$25,000"
//             />
//           </div>

//           {/* Average Gross Tuition Short Desc */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Average Gross Tuition Short Description
//             </label>
//             <textarea
//               rows={2}
//               value={form.average_gross_tuition_short_desc}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   average_gross_tuition_short_desc: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex items-center gap-3">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold shadow transition ${
//                 loading
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-primary text-white hover:bg-secondary'
//               }`}
//             >
//               {loading ? 'Creating...' : 'Save University'}
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setForm(emptyForm);
//                 setErrors({});
//                 fileInputRef.current.value = "";
//               }}
//               className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
//             >
//               Reset
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// /* ---- Preview Card ---- */
// const Card = ({ uni }) => (
//   <div className="bg-white rounded-2xl shadow-md overflow-hidden">
//     <div className="relative">
//       <img src={uni.image} alt={uni.university_name} className="w-full h-48 object-cover" />
//       {uni.featured && (
//         <span className="absolute top-2 left-2 bg-purple-700 text-white text-xs px-3 py-1 rounded-full">
//           • Featured
//         </span>
//       )}
//     </div>
//     <div className="p-4">
//       <h2 className="text-lg font-bold">{uni.university_name}</h2>
//       <p className="text-sm text-gray-600 mb-2">{uni.location}</p>
//       <p className="text-gray-700 text-sm line-clamp-4">{uni.application_short_desc}</p>
//     </div>
//   </div>
// );

// const University = () => {
//   const [list, setList] = useState([]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <AdminUniversityForm onCreate={(card) => setList((l) => [card, ...l])} />

//       {list.length > 0 && (
//         <div className="max-w-6xl mx-auto p-6 pt-0">
//           <h3 className="text-xl font-semibold mb-4">Preview</h3>
//           <div className="grid md:grid-cols-3 gap-6">
//             {list.map((u) => (
//               <Card key={u.id} uni={u} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default University;






// import React, { useRef, useState, useEffect } from "react";
// import Swal from 'sweetalert2';
// import BASE_URL from "../../Api/ApiBaseUrl";

// const emptyForm = {
//   university_name: "",
//   address: "",
//   location: "",
//   destinations: "",
//   phone_number: "",
//   founded: "",
//   school_id: "",
//   institution_type: "",
//   dli_number: "",
//   top_disciplines: "",
//   application_fee: "",
//   application_short_desc: "",
//   average_graduate_program: "",
//   average_graduate_program_short_desc: "",
//   average_undergraduate_program: "",
//   average_undergraduate_program_short_desc: "",
//   cost_of_living: "",
//   cost_of_living_short_desc: "",
//   average_gross_tuition: "",
//   average_gross_tuition_short_desc: "",
//   imageFile: null,
//   imagePreview: "",
//   featured: true,
// };

// const AdminUniversityForm = ({ onCreate }) => {
//   const [form, setForm] = useState(emptyForm);
//   const [errors, setErrors] = useState({});
//   const [destinations, setDestinations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showAddDestination, setShowAddDestination] = useState(false);
//   const [newDestination, setNewDestination] = useState("");
//   const [addingDestination, setAddingDestination] = useState(false);
//   const fileInputRef = useRef();

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchDestinations();
//   }, []);

//   const fetchDestinations = async () => {
//     try {
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${token}`);
//       myHeaders.append("Accept", "application/json");

//       const requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow",
//       };

//       const response = await fetch(
//         `${BASE_URL}/admin/destinations`,
//         requestOptions
//       );

//       if (response.ok) {
//         const result = await response.json();
//         setDestinations(result.data || []);
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Failed to fetch destinations',
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching destinations:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while fetching destinations',
//       });
//     }
//   };

//   const addNewDestination = async () => {
//     if (!newDestination.trim()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Warning',
//         text: 'Please enter a destination name',
//       });
//       return;
//     }

//     setAddingDestination(true);
//     try {
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${token}`);
//       myHeaders.append("Content-Type", "application/json");

//       const raw = JSON.stringify({
//         destinations_name: newDestination.trim(),
//       });

//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//       };

//       const response = await fetch(`${BASE_URL}/admin/destinations`, requestOptions);
//       const result = await response.json();

//       if (response.ok) {
//         setDestinations((prev) => [...prev, result.data]);
//         setForm((prev) => ({ ...prev, destinations: result.data.id }));
//         setNewDestination("");
//         setShowAddDestination(false);
        
//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Destination added successfully!',
//         });
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: result.message || 'Failed to add destination',
//         });
//       }
//     } catch (error) {
//       console.error("Error adding destination:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while adding destination',
//       });
//     } finally {
//       setAddingDestination(false);
//     }
//   };

//   const validate = () => {
//     const e = {};
//     if (!form.university_name.trim()) e.university_name = "University name is required";
//     if (!form.location.trim()) e.location = "Location is required";
//     if (!form.address.trim()) e.address = "Address is required";
//     if (!form.destinations) e.destinations = "Destination is required";
//     if (!form.imageFile) e.imageFile = "An image is required";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleFile = (file) => {
//     if (!file) return;
//     if (!file.type.startsWith("image/")) {
//       setErrors((p) => ({ ...p, imageFile: "Please select an image file" }));
//       return;
//     }
//     const preview = URL.createObjectURL(file);
//     setForm((p) => ({ ...p, imageFile: file, imagePreview: preview }));
//     setErrors((p) => ({ ...p, imageFile: undefined }));
//   };

//   const onDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];
//     handleFile(file);
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);
//     try {
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${token}`);

//       const formdata = new FormData();
      
//       // Append all form data
//       Object.keys(form).forEach(key => {
//         if (key !== 'imageFile' && key !== 'imagePreview') {
//           formdata.append(key, form[key]);
//         }
//       });

//       // Handle images
//       if (form.imageFile) {
//         formdata.append("images[]", form.imageFile);
//       }

//       // Handle top_disciplines as JSON
//       if (form.top_disciplines) {
//         const disciplinesArray = form.top_disciplines
//           .split(",")
//           .map((discipline) => ({
//             discipline: discipline.trim(),
//             percentage: 0,
//           }));
//         formdata.append("top_disciplines", JSON.stringify(disciplinesArray));
//       }

//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: formdata,
//       };

//       const response = await fetch(
//         `${BASE_URL}/admin/universities/create`,
//         requestOptions
//       );

//       const result = await response.json();

//       if (response.ok) {
//         const card = {
//           id: crypto.randomUUID(),
//           ...form,
//           image: form.imagePreview,
//         };
//         onCreate?.(card);

//         setForm(emptyForm);
//         setErrors({});
//         fileInputRef.current.value = "";

//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'University created successfully!',
//         });
//       } else {
//         console.error("API Error:", result);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: result.message || 'Failed to create university',
//         });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred while creating university',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You will lose all form data!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, reset it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setForm(emptyForm);
//         setErrors({});
//         fileInputRef.current.value = "";
//         Swal.fire(
//           'Reset!',
//           'Form has been reset.',
//           'success'
//         );
//       }
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold">Add University</h1>
//         <p className="text-gray-600 mt-1">Fill all fields carefully</p>
//       </div>

//       <form onSubmit={onSubmit} className="grid lg:grid-cols-3 gap-6">
//         {/* Image uploader */}
//         <div className="lg:col-span-1">
//           <div
//             onDrop={onDrop}
//             onDragOver={(e) => e.preventDefault()}
//             className={`group relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 h-64 cursor-pointer transition shadow-sm hover:shadow-md ${
//               errors.imageFile ? "border-red-400" : "border-gray-300"
//             }`}
//             onClick={() => fileInputRef.current.click()}
//           >
//             {form.imagePreview ? (
//               <>
//                 <img
//                   src={form.imagePreview}
//                   alt="preview"
//                   className="absolute inset-0 w-full h-full object-cover rounded-2xl"
//                 />
//                 <div className="absolute inset-0 rounded-2xl bg-black/30 flex items-end p-3">
//                   <span className="text-white text-sm">
//                     Click to replace • or drag & drop
//                   </span>
//                 </div>
//               </>
//             ) : (
//               <div className="text-center space-y-2">
//                 <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
//                   ⬆️
//                 </div>
//                 <div className="text-gray-800 font-medium">
//                   Drag & drop image here
//                 </div>
//                 <div className="text-gray-500 text-sm">or click to browse</div>
//                 <div className="text-[11px] text-gray-400">
//                   JPG / PNG / WEBP • up to 5MB
//                 </div>
//               </div>
//             )}
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={(e) => handleFile(e.target.files?.[0])}
//             />
//           </div>
//           {errors.imageFile && (
//             <p className="text-red-500 text-sm mt-2">{errors.imageFile}</p>
//           )}

//           <label className="mt-4 flex items-center gap-3">
//             <input
//               type="checkbox"
//               className="peer sr-only"
//               checked={form.featured}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, featured: e.target.checked }))
//               }
//             />
//             <span className="w-12 h-7 rounded-full bg-gray-300 peer-checked:bg-primary relative transition-all">
//               <span className="absolute top-1 left-1 h-5 w-5 bg-white rounded-full shadow transition-all peer-checked:translate-x-5" />
//             </span>
//             <span className="text-sm text-gray-700">Mark as Featured</span>
//           </label>
//         </div>

//         <div className="lg:col-span-2 space-y-4">
//           {/* University Name */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               University Name
//             </label>
//             <input
//               type="text"
//               value={form.university_name}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, university_name: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="Western University"
//             />
//             {errors.university_name && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.university_name}
//               </p>
//             )}
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Address</label>
//             <input
//               type="text"
//               value={form.address}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, address: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="123 Main St"
//             />
//             {errors.address && (
//               <p className="text-red-500 text-sm mt-1">{errors.address}</p>
//             )}
//           </div>

//           {/* Location */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Location</label>
//             <input
//               type="text"
//               value={form.location}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, location: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="London, Ontario, CA"
//             />
//             {errors.location && (
//               <p className="text-red-500 text-sm mt-1">{errors.location}</p>
//             )}
//           </div>

//           {/* Destinations dropdown */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Destinations
//             </label>
//             <div className="flex gap-2">
//               <select
//                 value={form.destinations}
//                 onChange={(e) =>
//                   setForm((p) => ({ ...p, destinations: e.target.value }))
//                 }
//                 className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               >
//                 <option value="">Select Destination</option>
//                 {destinations.map((dest) => (
//                   <option key={dest.id} value={dest.id}>
//                     {dest.destinations_name}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 type="button"
//                 onClick={() => setShowAddDestination(true)}
//                 className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 whitespace-nowrap"
//               >
//                 Add New
//               </button>
//             </div>
//             {errors.destinations && (
//               <p className="text-red-500 text-sm mt-1">{errors.destinations}</p>
//             )}

//             {/* Add Destination Modal */}
//             {showAddDestination && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-6 rounded-2xl w-96">
//                   <h3 className="text-lg font-bold mb-4">
//                     Add New Destination
//                   </h3>
//                   <input
//                     type="text"
//                     value={newDestination}
//                     onChange={(e) => setNewDestination(e.target.value)}
//                     className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50 mb-4"
//                     placeholder="Enter destination name"
//                     onKeyPress={(e) => e.key === "Enter" && addNewDestination()}
//                   />
//                   <div className="flex gap-2">
//                     <button
//                       onClick={addNewDestination}
//                       disabled={addingDestination}
//                       className={`flex-1 py-3 rounded-xl text-white ${
//                         addingDestination
//                           ? "bg-gray-400"
//                           : "bg-primary hover:bg-secondary"
//                       }`}
//                     >
//                       {addingDestination ? "Adding..." : "Add"}
//                     </button>
//                     <button
//                       onClick={() => {
//                         setShowAddDestination(false);
//                         setNewDestination("");
//                       }}
//                       className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Rest of the form fields */}
//           {/* Phone Number */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Phone Number
//             </label>
//             <input
//               type="text"
//               value={form.phone_number}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, phone_number: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="+1 234 567 890"
//             />
//           </div>

//           {/* Founded Year */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Founded Year
//             </label>
//             <input
//               type="number"
//               value={form.founded}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, founded: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="1878"
//             />
//           </div>

//           {/* School ID */}
//           <div>
//             <label className="block text-sm font-medium mb-1">School ID</label>
//             <input
//               type="text"
//               value={form.school_id}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, school_id: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="SCH12345"
//             />
//           </div>

//           {/* Institution Type */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Institution Type
//             </label>
//             <select
//               value={form.institution_type}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, institution_type: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//             >
//               <option value="">Select Type</option>
//               <option value="Public">Public</option>
//               <option value="Private">Private</option>
//             </select>
//           </div>

//           {/* DLI Number */}
//           <div>
//             <label className="block text-sm font-medium mb-1">DLI Number</label>
//             <input
//               type="text"
//               value={form.dli_number}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, dli_number: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="DLI-123456"
//             />
//           </div>

//           {/* Top Disciplines */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Top Disciplines
//             </label>
//             <input
//               type="text"
//               value={form.top_disciplines}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, top_disciplines: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="Engineering, Business, Arts"
//             />
//             <p className="text-xs text-gray-400">
//               Separate disciplines with commas
//             </p>
//           </div>

//           {/* Application Fee */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Application Fee
//             </label>
//             <input
//               type="text"
//               value={form.application_fee}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, application_fee: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="$100"
//             />
//           </div>

//           {/* Application Short Description */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Application Short Description
//             </label>
//             <textarea
//               rows={3}
//               value={form.application_short_desc}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   application_short_desc: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//             />
//           </div>

//           {/* Average Graduate Program */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Average Graduate Program
//             </label>
//             <input
//               type="text"
//               value={form.average_graduate_program}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   average_graduate_program: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="Masters in Engineering"
//             />
//           </div>

//           {/* Graduate Program Short Desc */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Graduate Program Short Description
//             </label>
//             <textarea
//               rows={2}
//               value={form.average_graduate_program_short_desc}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   average_graduate_program_short_desc: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//             />
//           </div>

//           {/* Undergraduate Program */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Average Undergraduate Program
//             </label>
//             <input
//               type="text"
//               value={form.average_undergraduate_program}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   average_undergraduate_program: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="Bachelors in Business"
//             />
//           </div>

//           {/* Undergraduate Short Desc */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Undergraduate Program Short Description
//             </label>
//             <textarea
//               rows={2}
//               value={form.average_undergraduate_program_short_desc}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   average_undergraduate_program_short_desc: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//             />
//           </div>

//           {/* Cost of Living */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Cost of Living
//             </label>
//             <input
//               type="text"
//               value={form.cost_of_living}
//               onChange={(e) =>
//                 setForm((p) => ({ ...p, cost_of_living: e.target.value }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="$1200/month"
//             />
//           </div>

//           {/* Cost of Living Short Desc */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Cost of Living Short Description
//             </label>
//             <textarea
//               rows={2}
//               value={form.cost_of_living_short_desc}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   cost_of_living_short_desc: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//             />
//           </div>

//           {/* Average Gross Tuition */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Average Gross Tuition
//             </label>
//             <input
//               type="text"
//               value={form.average_gross_tuition}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   average_gross_tuition: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//               placeholder="$25,000"
//             />
//           </div>

//           {/* Average Gross Tuition Short Desc */}
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Average Gross Tuition Short Description
//             </label>
//             <textarea
//               rows={2}
//               value={form.average_gross_tuition_short_desc}
//               onChange={(e) =>
//                 setForm((p) => ({
//                   ...p,
//                   average_gross_tuition_short_desc: e.target.value,
//                 }))
//               }
//               className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex items-center gap-3">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold shadow transition ${
//                 loading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-primary text-white hover:bg-secondary"
//               }`}
//             >
//               {loading ? "Creating..." : "Save University"}
//             </button>
//             <button
//               type="button"
//               onClick={handleReset}
//               className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
//             >
//               Reset
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// /* ---- Preview Card ---- */
// const Card = ({ uni }) => (
//   <div className="bg-white rounded-2xl shadow-md overflow-hidden">
//     <div className="relative">
//       <img
//         src={uni.image}
//         alt={uni.university_name}
//         className="w-full h-48 object-cover"
//       />
//       {uni.featured && (
//         <span className="absolute top-2 left-2 bg-purple-700 text-white text-xs px-3 py-1 rounded-full">
//           • Featured
//         </span>
//       )}
//     </div>
//     <div className="p-4">
//       <h2 className="text-lg font-bold">{uni.university_name}</h2>
//       <p className="text-sm text-gray-600 mb-2">{uni.location}</p>
//       <p className="text-gray-700 text-sm line-clamp-4">
//         {uni.application_short_desc}
//       </p>
//     </div>
//   </div>
// );

// const University = () => {
//   const [list, setList] = useState([]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <AdminUniversityForm onCreate={(card) => setList((l) => [card, ...l])} />

//       {list.length > 0 && (
//         <div className="max-w-6xl mx-auto p-6 pt-0">
//           <h3 className="text-xl font-semibold mb-4">Preview</h3>
//           <div className="grid md:grid-cols-3 gap-6">
//             {list.map((u) => (
//               <Card key={u.id} uni={u} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default University;






import React, { useRef, useState, useEffect } from "react";
import Swal from 'sweetalert2';
import BASE_URL from "../../Api/ApiBaseUrl";

const emptyForm = {
  university_name: "",
  address: "",
  location: "",
  destinations: "",
  phone_number: "",
  founded: "",
  school_id: "",
  institution_type: "",
  dli_number: "",
  top_disciplines: "",
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
  imageFile: null,
  imagePreview: "",
  featured: true,
};

const AdminUniversityForm = ({ onCreate }) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddDestination, setShowAddDestination] = useState(false);
  const [newDestination, setNewDestination] = useState("");
  const [addingDestination, setAddingDestination] = useState(false);
  const fileInputRef = useRef();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Accept", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        `${BASE_URL}/admin/university-destination`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        if (result.status && result.data) {
          setDestinations(result.data);
        } else {
          // Fallback destinations
          setDestinations([
            { id: 1, destinations_name: "UK" },
            { id: 2, destinations_name: "USA" },
            { id: 3, destinations_name: "Canada" },
            { id: 4, destinations_name: "Australia" }
          ]);
        }
      } else {
        // Fallback if API fails
        setDestinations([
          { id: 1, destinations_name: "UK" },
          { id: 2, destinations_name: "USA" },
          { id: 3, destinations_name: "Canada" },
          { id: 4, destinations_name: "Australia" }
        ]);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
      // Fallback destinations
      setDestinations([
        { id: 1, destinations_name: "UK" },
        { id: 2, destinations_name: "USA" },
        { id: 3, destinations_name: "Canada" },
        { id: 4, destinations_name: "Australia" }
      ]);
    }
  };

  const addNewDestination = async () => {
    if (!newDestination.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please enter a destination name',
      });
      return;
    }

    setAddingDestination(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        destinations_name: newDestination.trim(),
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(`${BASE_URL}/admin/destinations`, requestOptions);
      const result = await response.json();

      if (response.ok) {
        // Refresh destinations list
        fetchDestinations();
        setNewDestination("");
        setShowAddDestination(false);
        
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Destination added successfully!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.message || 'Failed to add destination',
        });
      }
    } catch (error) {
      console.error("Error adding destination:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding destination',
      });
    } finally {
      setAddingDestination(false);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.university_name.trim()) e.university_name = "University name is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.destinations) e.destinations = "Destination is required";
    if (!form.imageFile) e.imageFile = "An image is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((p) => ({ ...p, imageFile: "Please select an image file" }));
      return;
    }
    const preview = URL.createObjectURL(file);
    setForm((p) => ({ ...p, imageFile: file, imagePreview: preview }));
    setErrors((p) => ({ ...p, imageFile: undefined }));
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const formdata = new FormData();
      
      // Append all form data
      formdata.append("university_name", form.university_name);
      formdata.append("address", form.address);
      formdata.append("location", form.location);
      formdata.append("destinations", form.destinations);
      formdata.append("phone_number", form.phone_number);
      formdata.append("founded", form.founded);
      formdata.append("school_id", form.school_id);
      formdata.append("institution_type", form.institution_type);
      formdata.append("dli_number", form.dli_number);
      
      formdata.append("application_fee", form.application_fee);
      formdata.append("application_short_desc", form.application_short_desc);
      formdata.append("average_graduate_program", form.average_graduate_program);
      formdata.append("average_graduate_program_short_desc", form.average_graduate_program_short_desc);
      formdata.append("average_undergraduate_program", form.average_undergraduate_program);
      formdata.append("average_undergraduate_program_short_desc", form.average_undergraduate_program_short_desc);
      formdata.append("cost_of_living", form.cost_of_living);
      formdata.append("cost_of_living_short_desc", form.cost_of_living_short_desc);
      formdata.append("average_gross_tuition", form.average_gross_tuition);
      formdata.append("average_gross_tuition_short_desc", form.average_gross_tuition_short_desc);
      formdata.append("featured", form.featured);

      // Handle images
      if (form.imageFile) {
        formdata.append("images[]", form.imageFile);
      }

      // Handle top_disciplines as JSON
      if (form.top_disciplines) {
        const disciplinesArray = form.top_disciplines
          .split(",")
          .map((discipline) => ({
            discipline: discipline.trim(),
            percentage: 0,
          }));
        formdata.append("top_disciplines", JSON.stringify(disciplinesArray));
      }

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      };

      const response = await fetch(
        `${BASE_URL}/admin/universities/create`,
        requestOptions
      );

      const result = await response.json();

      if (response.ok && result.status) {
        const card = {
          id: crypto.randomUUID(),
          ...form,
          image: form.imagePreview,
        };
        onCreate?.(card);

        setForm(emptyForm);
        setErrors({});
        fileInputRef.current.value = "";

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'University created successfully!',
        });
      } else {
        console.error("API Error:", result);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.message || 'Failed to create university',
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while creating university',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will lose all form data!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setForm(emptyForm);
        setErrors({});
        fileInputRef.current.value = "";
        Swal.fire(
          'Reset!',
          'Form has been reset.',
          'success'
        );
      }
    });
  };

  // Get destination name by ID
  const getDestinationName = (id) => {
    const destination = destinations.find(dest => dest.id == id);
    return destination ? destination.destinations_name : '';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add University</h1>
        <p className="text-gray-600 mt-1">Fill all fields carefully</p>
      </div>

      <form onSubmit={onSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Image uploader */}
        <div className="lg:col-span-1">
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`group relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 h-64 cursor-pointer transition shadow-sm hover:shadow-md ${
              errors.imageFile ? "border-red-400" : "border-gray-300"
            }`}
            onClick={() => fileInputRef.current.click()}
          >
            {form.imagePreview ? (
              <>
                <img
                  src={form.imagePreview}
                  alt="preview"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-black/30 flex items-end p-3">
                  <span className="text-white text-sm">
                    Click to replace • or drag & drop
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center space-y-2">
                <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  ⬆️
                </div>
                <div className="text-gray-800 font-medium">
                  Drag & drop image here
                </div>
                <div className="text-gray-500 text-sm">or click to browse</div>
                <div className="text-[11px] text-gray-400">
                  JPG / PNG / WEBP • up to 5MB
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>
          {errors.imageFile && (
            <p className="text-red-500 text-sm mt-2">{errors.imageFile}</p>
          )}

          <label className="mt-4 flex items-center gap-3">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={form.featured}
              onChange={(e) =>
                setForm((p) => ({ ...p, featured: e.target.checked }))
              }
            />
            <span className="w-12 h-7 rounded-full bg-gray-300 peer-checked:bg-primary relative transition-all">
              <span className="absolute top-1 left-1 h-5 w-5 bg-white rounded-full shadow transition-all peer-checked:translate-x-5" />
            </span>
            <span className="text-sm text-gray-700">Mark as Featured</span>
          </label>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {/* University Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              University Name
            </label>
            <input
              type="text"
              value={form.university_name}
              onChange={(e) =>
                setForm((p) => ({ ...p, university_name: e.target.value }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
              placeholder="Western University"
            />
            {errors.university_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.university_name}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) =>
                setForm((p) => ({ ...p, address: e.target.value }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
              placeholder="123 Main St"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) =>
                setForm((p) => ({ ...p, location: e.target.value }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
              placeholder="London, Ontario, CA"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          {/* Destinations dropdown - SHOWING NAMES */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Destinations
            </label>
            <div className="flex gap-2">
              <select
                value={form.destinations}
                onChange={(e) =>
                  setForm((p) => ({ ...p, destinations: e.target.value }))
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
              >
                <option value="">Select Destination</option>
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.destinations_name}>
                    {dest.destinations_name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowAddDestination(true)}
                className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 whitespace-nowrap"
              >
                Add New
              </button>
            </div>
            {errors.destinations && (
              <p className="text-red-500 text-sm mt-1">{errors.destinations}</p>
            )}
            {form.destinations && (
              <p className="text-green-600 text-sm mt-1">
                Selected: {form.destinations}
              </p>
            )}

            {/* Add Destination Modal */}
            {showAddDestination && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-2xl w-96">
                  <h3 className="text-lg font-bold mb-4">
                    Add New Destination
                  </h3>
                  <input
                    type="text"
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value)}
                    className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50 mb-4"
                    placeholder="Enter destination name"
                    onKeyPress={(e) => e.key === "Enter" && addNewDestination()}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={addNewDestination}
                      disabled={addingDestination}
                      className={`flex-1 py-3 rounded-xl text-white ${
                        addingDestination
                          ? "bg-gray-400"
                          : "bg-primary hover:bg-secondary"
                      }`}
                    >
                      {addingDestination ? "Adding..." : "Add"}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddDestination(false);
                        setNewDestination("");
                      }}
                      className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rest of the form fields */}
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={form.phone_number}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone_number: e.target.value }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
              placeholder="+1 234 567 890"
            />
          </div>

          {/* Founded Year */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Founded Year
            </label>
            <input
              type="number"
              value={form.founded}
              onChange={(e) =>
                setForm((p) => ({ ...p, founded: e.target.value }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
              placeholder="1878"
            />
          </div>

          {/* School ID */}
          <div>
            <label className="block text-sm font-medium mb-1">School ID</label>
            <input
              type="text"
              value={form.school_id}
              onChange={(e) =>
                setForm((p) => ({ ...p, school_id: e.target.value }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
              placeholder="SCH12345"
            />
          </div>

          {/* Institution Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Institution Type
            </label>
            <select
              value={form.institution_type}
              onChange={(e) =>
                setForm((p) => ({ ...p, institution_type: e.target.value }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
            >
              <option value="">Select Type</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* DLI Number */}
          <div>
            <label className="block text-sm font-medium mb-1">DLI Number</label>
            <input
              type="text"
              value={form.dli_number}
              onChange={(e) =>
                setForm((p) => ({ ...p, dli_number: e.target.value }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
              placeholder="DLI-123456"
            />
          </div>

          {/* Top Disciplines */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Top Disciplines
            </label>
            <input
              type="text"
              value={form.top_disciplines}
              onChange={(e) =>
                setForm((p) => ({ ...p, top_disciplines: e.target.value }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
              placeholder="Engineering, Business, Arts"
            />
            <p className="text-xs text-gray-400">
              Separate disciplines with commas
            </p>
          </div>

          {/* Application Fee */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Application Fee
            </label>
            <input
              type="text"
              value={form.application_fee}
              onChange={(e) =>
                setForm((p) => ({ ...p, application_fee: e.target.value }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
              placeholder="$100"
            />
          </div>

          {/* Application Short Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Application Short Description
            </label>
            <textarea
              rows={3}
              value={form.application_short_desc}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  application_short_desc: e.target.value,
                }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
            />
          </div>

          {/* Average Graduate Program */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Average Graduate Program
            </label>
            <input
              type="text"
              value={form.average_graduate_program}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  average_graduate_program: e.target.value,
                }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
              placeholder="Masters in Engineering"
            />
          </div>

          {/* Graduate Program Short Desc */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Graduate Program Short Description
            </label>
            <textarea
              rows={2}
              value={form.average_graduate_program_short_desc}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  average_graduate_program_short_desc: e.target.value,
                }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
            />
          </div>

          {/* Undergraduate Program */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Average Undergraduate Program
            </label>
            <input
              type="text"
              value={form.average_undergraduate_program}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  average_undergraduate_program: e.target.value,
                }))
              }
              className="w-full rounded-xl border px-4py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
              placeholder="Bachelors in Business"
            />
          </div>

          {/* Undergraduate Short Desc */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Undergraduate Program Short Description
            </label>
            <textarea
              rows={2}
              value={form.average_undergraduate_program_short_desc}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  average_undergraduate_program_short_desc: e.target.value,
                }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
            />
          </div>

          {/* Cost of Living */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Cost of Living
            </label>
            <input
              type="text"
              value={form.cost_of_living}
              onChange={(e) =>
                setForm((p) => ({ ...p, cost_of_living: e.target.value }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
              placeholder="$1200/month"
            />
          </div>

          {/* Cost of Living Short Desc */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Cost of Living Short Description
            </label>
            <textarea
              rows={2}
              value={form.cost_of_living_short_desc}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  cost_of_living_short_desc: e.target.value,
                }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
            />
          </div>

          {/* Average Gross Tuition */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Average Gross Tuition
            </label>
            <input
              type="text"
              value={form.average_gross_tuition}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  average_gross_tuition: e.target.value,
                }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
              placeholder="$25,000"
            />
          </div>

          {/* Average Gross Tuition Short Desc */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Average Gross Tuition Short Description
            </label>
            <textarea
              rows={2}
              value={form.average_gross_tuition_short_desc}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  average_gross_tuition_short_desc: e.target.value,
                }))
              }
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold shadow transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-secondary"
              }`}
            >
              {loading ? "Creating..." : "Save University"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

/* ---- Preview Card ---- */
const Card = ({ uni }) => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
    <div className="relative">
      <img
        src={uni.image}
        alt={uni.university_name}
        className="w-full h-48 object-cover"
      />
      {uni.featured && (
        <span className="absolute top-2 left-2 bg-purple-700 text-white text-xs px-3 py-1 rounded-full">
          • Featured
        </span>
      )}
    </div>
    <div className="p-4">
      <h2 className="text-lg font-bold">{uni.university_name}</h2>
      <p className="text-sm text-gray-600 mb-2">{uni.location}</p>
      <p className="text-sm text-gray-700 mb-2">
        <strong>Destination:</strong> {uni.destinations}
      </p>
      <p className="text-gray-700 text-sm line-clamp-4">
        {uni.application_short_desc}
      </p>
    </div>
  </div>
);

const University = () => {
  const [list, setList] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminUniversityForm onCreate={(card) => setList((l) => [card, ...l])} />

      {list.length > 0 && (
        <div className="max-w-6xl mx-auto p-6 pt-0">
          <h3 className="text-xl font-semibold mb-4">Preview</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {list.map((u) => (
              <Card key={u.id} uni={u} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default University;