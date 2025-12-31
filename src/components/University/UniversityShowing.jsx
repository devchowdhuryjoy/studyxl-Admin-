


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import BASE_URL from '../../Api/ApiBaseUrl';
// import IMAGE_URL from '../../Api/ImageUrl';
// import { FaEdit, FaTrash, FaPlus, FaEye, FaMapMarkerAlt, FaCalendarAlt, FaUniversity, FaTimes, FaPhone, FaHome, FaGraduationCap, FaMoneyBillWave, FaGlobe } from 'react-icons/fa';

// const UniversityShowing = () => {
//   const [universities, setUniversities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
  
//   // Modal state
//   const [selectedUniversity, setSelectedUniversity] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   // Get token from localStorage
//   const getToken = () => {
//     return localStorage.getItem('auth_token') || 'your-default-token-here';
//   };

//   // Fetch all universities
//   const fetchUniversities = async () => {
//     try {
//       setLoading(true);
//       const token = getToken();
      
//       const myHeaders = new Headers();
//       myHeaders.append("Accept", "application/json");
//       myHeaders.append("Authorization", `Bearer ${token}`);

//       const requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow"
//       };

//       const response = await fetch(`${BASE_URL}/admin/alluniversities`, requestOptions);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result = await response.json();
      
//       // Check if data exists in response
//       if (result && Array.isArray(result.data)) {
//         setUniversities(result.data);
//       } else if (Array.isArray(result)) {
//         setUniversities(result);
//       } else {
//         setUniversities([]);
//       }
      
//       setError('');
//     } catch (err) {
//       setError('Failed to load universities. Please check your API connection.');
//       console.error('Error fetching universities:', err);
//       // Set dummy data for demo if API fails
//       setUniversities(getDummyData());
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete university function
//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this university?')) return;

//     try {
//       const token = getToken();
      
//       const myHeaders = new Headers();
//       myHeaders.append("Accept", "application/json");
//       myHeaders.append("Authorization", `Bearer ${token}`);

//       const requestOptions = {
//         method: "DELETE",
//         headers: myHeaders,
//         redirect: "follow"
//       };

//       const response = await fetch(`${BASE_URL}/admin/universities/${id}`, requestOptions);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       // Remove from state
//       setUniversities(prev => prev.filter(uni => uni.id !== id));
//       alert('University deleted successfully!');
//     } catch (err) {
//       alert('Failed to delete university: ' + err.message);
//       console.error('Error:', err);
//     }
//   };

//   // Handle View Details - Open Modal
//   const handleViewDetails = (university) => {
//     setSelectedUniversity(university);
//     setActiveImageIndex(0);
//     setShowModal(true);
//   };

//   // Handle image navigation
//   const nextImage = () => {
//     if (selectedUniversity && selectedUniversity.images) {
//       setActiveImageIndex((prev) => 
//         (prev + 1) % selectedUniversity.images.length
//       );
//     }
//   };

//   const prevImage = () => {
//     if (selectedUniversity && selectedUniversity.images) {
//       setActiveImageIndex((prev) => 
//         prev === 0 ? selectedUniversity.images.length - 1 : prev - 1
//       );
//     }
//   };

//   // Filter universities based on search
//   const filteredUniversities = universities.filter(uni => {
//     if (!searchTerm.trim()) return true;
    
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       (uni.university_name && uni.university_name.toLowerCase().includes(searchLower)) ||
//       (uni.location && uni.location.toLowerCase().includes(searchLower)) ||
//       (uni.institution_type && uni.institution_type.toLowerCase().includes(searchLower)) ||
//       (uni.dli_number && uni.dli_number.toLowerCase().includes(searchLower))
//     );
//   });

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchUniversities();
//   }, []);

//   // Dummy data for demo purposes
//   const getDummyData = () => {
//     return [
//       {
//         id: 1,
//         university_name: "University of Toronto",
//         location: "Toronto, Canada",
//         founded: "1827",
//         institution_type: "Public",
//         dli_number: "O19332746152",
//         application_fee: "$120",
//         featured: true,
//         application_short_desc: "One of Canada's top research universities",
//         phone_number: "+1 416-978-2011",
//         address: "27 King's College Cir, Toronto, ON M5S, Canada",
//         destinations: "USA, UK, Australia",
//         average_gross_tuition: "$45,000/year",
//         cost_of_living: "$15,000/year",
//         average_graduate_program: "MBA, MSc",
//         average_undergraduate_program: "BSc, BA",
//         top_disciplines: '[{"discipline": "Engineering", "percentage": 35}, {"discipline": "Business", "percentage": 30}]',
//         images: ["university1.jpg", "university2.jpg"]
//       },
//       {
//         id: 2,
//         university_name: "McGill University",
//         location: "Montreal, Canada",
//         founded: "1821",
//         institution_type: "Public",
//         dli_number: "O19359098667",
//         application_fee: "$115",
//         featured: true,
//         application_short_desc: "World-renowned for excellence in teaching and research",
//         phone_number: "+1 514-398-4455",
//         address: "845 Sherbrooke St W, Montreal, Quebec H3A 0G4, Canada",
//         destinations: "USA, Europe",
//         average_gross_tuition: "$40,000/year",
//         cost_of_living: "$12,000/year",
//         images: ["mcgill1.jpg"]
//       }
//     ];
//   };

//   // Parse disciplines from JSON string
//   const parseDisciplines = (disciplinesString) => {
//     try {
//       if (!disciplinesString) return [];
//       return JSON.parse(disciplinesString);
//     } catch (error) {
//       console.error('Error parsing disciplines:', error);
//       return [];
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex justify-center items-center h-96">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading universities...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-800">University All</h1>
//               <p className="text-gray-600 mt-2">Browse and manage all registered universities</p>
//             </div>
            
//             <Link
//               to="/admin/universities/add"
//               className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
//             >
//               <FaPlus className="mr-2" /> Add New University
//             </Link>
//           </div>

//           {/* Search and Stats */}
//           <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//               <div className="w-full md:w-auto">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search universities by name, location, or type..."
//                     className="w-full md:w-96 px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                   <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </div>
//               </div>
              
//               <div className="flex items-center space-x-4">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-blue-600">{universities.length}</div>
//                   <div className="text-sm text-gray-500">Total</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-green-600">
//                     {universities.filter(u => u.featured).length}
//                   </div>
//                   <div className="text-sm text-gray-500">Featured</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Universities Grid */}
//         {filteredUniversities.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-lg p-12 text-center">
//             <div className="max-w-md mx-auto">
//               <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//               <h3 className="mt-4 text-xl font-medium text-gray-900">No universities found</h3>
//               <p className="mt-2 text-gray-500">
//                 {searchTerm ? 'No universities match your search criteria.' : 'Start by adding your first university.'}
//               </p>
//               <div className="mt-6">
//                 <Link
//                   to="/admin/universities/add"
//                   className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//                 >
//                   <FaPlus className="mr-2 h-4 w-4" />
//                   Add University
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredUniversities.map((uni) => (
//               <div
//                 key={uni.id}
//                 className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//               >
//                 {/* Card Header with Image */}
//                 <div className="relative h-48">
//                   {/* University Image */}
//                   {uni.images && uni.images.length > 0 ? (
//                     <img 
//                       src={`${IMAGE_URL}/storage/${uni.images[0]}`}
//                       alt={uni.university_name}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.src = 'https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=University+Image';
//                       }}
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
//                       <span className="text-white text-3xl font-bold">
//                         {uni.university_name ? uni.university_name.charAt(0).toUpperCase() : 'U'}
//                       </span>
//                     </div>
//                   )}
                  
//                   {uni.featured && (
//                     <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center">
//                       <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                       Featured
//                     </span>
//                   )}
//                 </div>

//                 {/* Card Content */}
//                 <div className="p-6">
//                   {/* University Name */}
//                   <h3 className="text-xl font-bold text-gray-800 truncate mb-2">
//                     {uni.university_name || 'University Name'}
//                   </h3>

//                   {/* Location and Type */}
//                   <div className="flex items-center text-gray-600 mb-4">
//                     <FaMapMarkerAlt className="w-4 h-4 mr-1 text-gray-400" />
//                     <span className="text-sm">{uni.location || 'Location not specified'}</span>
//                     <span className="mx-2">•</span>
//                     <FaUniversity className="w-4 h-4 mr-1 text-gray-400" />
//                     <span className="text-sm">{uni.institution_type || 'Type not specified'}</span>
//                   </div>

//                   {/* Description Preview */}
//                   <p className="text-gray-600 text-sm mb-6 line-clamp-2">
//                     {uni.application_short_desc || 'No description available'}
//                   </p>

//                   {/* Quick Info Grid */}
//                   <div className="grid grid-cols-2 gap-3 mb-6">
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <div className="flex items-center text-gray-500 mb-1">
//                         <FaCalendarAlt className="w-3 h-3 mr-1" />
//                         <span className="text-xs">Founded</span>
//                       </div>
//                       <p className="font-semibold text-gray-800">{uni.founded || 'N/A'}</p>
//                     </div>
                    
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <div className="text-xs text-gray-500 mb-1">DLI #</div>
//                       <p className="font-semibold text-gray-800 text-sm truncate">
//                         {uni.dli_number || 'N/A'}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Application Fee */}
//                   <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6">
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm text-blue-700 font-medium">Application Fee</span>
//                       <span className="font-bold text-blue-800">
//                         {uni.application_fee || 'Not specified'}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex justify-between items-center pt-4 border-t">
//                     <div className="flex space-x-3">
//                       <button
//                         onClick={() => handleViewDetails(uni)}
//                         className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
//                         title="View Details"
//                       >
//                         <FaEye className="mr-1.5" />
//                         View
//                       </button>
                      
//                       <Link
//                         to={`/admin/universities/edit/${uni.id}`}
//                         className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm"
//                         title="Edit University"
//                       >
//                         <FaEdit className="mr-1.5" />
//                         Edit
//                       </Link>
//                     </div>
                    
//                     <button
//                       onClick={() => handleDelete(uni.id)}
//                       className="inline-flex items-center text-red-600 hover:text-red-800 font-medium text-sm"
//                       title="Delete University"
//                     >
//                       <FaTrash className="mr-1.5" />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination or Footer Info */}
//         <div className="mt-8 pt-6 border-t border-gray-200">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="text-gray-600 text-sm">
//               Showing <span className="font-semibold">{filteredUniversities.length}</span> of{' '}
//               <span className="font-semibold">{universities.length}</span> universities
//             </div>
            
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm('')}
//                 className="mt-2 md:mt-0 text-sm text-blue-600 hover:text-blue-800"
//               >
//                 Clear search
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* University Details Modal */}
//       {showModal && selectedUniversity && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           {/* Backdrop */}
//           <div 
//             className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
//             onClick={() => setShowModal(false)}
//           ></div>

//           {/* Modal */}
//           <div className="flex items-center justify-center min-h-screen p-4">
//             <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              
//               {/* Modal Header */}
//               <div className="sticky top-0 bg-white border-b z-10 p-4 flex justify-between items-center">
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {selectedUniversity.university_name}
//                 </h2>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
//                 >
//                   <FaTimes className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* Modal Content */}
//               <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
                
//                 {/* Image Gallery */}
//                 {selectedUniversity.images && selectedUniversity.images.length > 0 && (
//                   <div className="mb-8">
//                     <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-4">
//                       <img
//                         src={`${IMAGE_URL}/storage/${selectedUniversity.images[activeImageIndex]}`}
//                         alt={`${selectedUniversity.university_name} - Image ${activeImageIndex + 1}`}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.src = 'https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=University+Image';
//                         }}
//                       />
                      
//                       {/* Image Navigation */}
//                       {selectedUniversity.images.length > 1 && (
//                         <>
//                           <button
//                             onClick={prevImage}
//                             className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full hover:bg-opacity-100"
//                           >
//                             ←
//                           </button>
//                           <button
//                             onClick={nextImage}
//                             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-gray-800 p-2 rounded-full hover:bg-opacity-100"
//                           >
//                             →
//                           </button>
//                         </>
//                       )}
//                     </div>
                    
//                     {/* Image Thumbnails */}
//                     {selectedUniversity.images.length > 1 && (
//                       <div className="flex space-x-2 overflow-x-auto">
//                         {selectedUniversity.images.map((img, index) => (
//                           <button
//                             key={index}
//                             onClick={() => setActiveImageIndex(index)}
//                             className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
//                               index === activeImageIndex ? 'ring-2 ring-blue-500' : ''
//                             }`}
//                           >
//                             <img
//                               src={`${IMAGE_URL}/storage/${img}`}
//                               alt={`Thumbnail ${index + 1}`}
//                               className="w-full h-full object-cover"
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* University Details */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
//                   {/* Left Column - Basic Info */}
//                   <div className="space-y-6">
//                     <div className="bg-gray-50 p-4 rounded-xl">
//                       <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
//                         <FaUniversity className="mr-2 text-blue-600" />
//                         Basic Information
//                       </h3>
//                       <div className="space-y-3">
//                         <div className="flex items-center">
//                           <FaMapMarkerAlt className="text-gray-400 mr-3 w-5" />
//                           <div>
//                             <p className="text-sm text-gray-500">Location</p>
//                             <p className="font-medium">{selectedUniversity.location || 'N/A'}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center">
//                           <FaCalendarAlt className="text-gray-400 mr-3 w-5" />
//                           <div>
//                             <p className="text-sm text-gray-500">Founded Year</p>
//                             <p className="font-medium">{selectedUniversity.founded || 'N/A'}</p>
//                           </div>
//                         </div>
//                         <div className="flex items-center">
//                           <FaHome className="text-gray-400 mr-3 w-5" />
//                           <div>
//                             <p className="text-sm text-gray-500">Institution Type</p>
//                             <p className="font-medium">{selectedUniversity.institution_type || 'N/A'}</p>
//                           </div>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-500">DLI Number</p>
//                           <p className="font-medium">{selectedUniversity.dli_number || 'N/A'}</p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Contact Info */}
//                     <div className="bg-blue-50 p-4 rounded-xl">
//                       <h3 className="text-lg font-bold text-gray-800 mb-3">Contact Information</h3>
//                       <div className="space-y-3">
//                         <div className="flex items-center">
//                           <FaPhone className="text-gray-400 mr-3 w-5" />
//                           <div>
//                             <p className="text-sm text-gray-500">Phone Number</p>
//                             <p className="font-medium">{selectedUniversity.phone_number || 'N/A'}</p>
//                           </div>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-500">Address</p>
//                           <p className="font-medium">{selectedUniversity.address || 'N/A'}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right Column - Additional Info */}
//                   <div className="space-y-6">
//                     {/* Programs */}
//                     <div className="bg-green-50 p-4 rounded-xl">
//                       <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
//                         <FaGraduationCap className="mr-2 text-green-600" />
//                         Programs
//                       </h3>
//                       <div className="space-y-3">
//                         <div>
//                           <p className="text-sm text-gray-500">Graduate Programs</p>
//                           <p className="font-medium">{selectedUniversity.average_graduate_program || 'N/A'}</p>
//                           <p className="text-xs text-gray-600 mt-1">
//                             {selectedUniversity.average_graduate_program_short_desc || ''}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-500">Undergraduate Programs</p>
//                           <p className="font-medium">{selectedUniversity.average_undergraduate_program || 'N/A'}</p>
//                           <p className="text-xs text-gray-600 mt-1">
//                             {selectedUniversity.average_undergraduate_program_short_desc || ''}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Costs */}
//                     <div className="bg-yellow-50 p-4 rounded-xl">
//                       <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
//                         <FaMoneyBillWave className="mr-2 text-yellow-600" />
//                         Costs
//                       </h3>
//                       <div className="space-y-3">
//                         <div>
//                           <p className="text-sm text-gray-500">Application Fee</p>
//                           <p className="font-bold text-lg">{selectedUniversity.application_fee || 'N/A'}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-500">Average Gross Tuition</p>
//                           <p className="font-medium">{selectedUniversity.average_gross_tuition || 'N/A'}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-500">Cost of Living</p>
//                           <p className="font-medium">{selectedUniversity.cost_of_living || 'N/A'}</p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Destinations */}
//                     {selectedUniversity.destinations && (
//                       <div className="bg-purple-50 p-4 rounded-xl">
//                         <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
//                           <FaGlobe className="mr-2 text-purple-600" />
//                           Destinations
//                         </h3>
//                         <div className="flex flex-wrap gap-2">
//                           {selectedUniversity.destinations.split(',').map((dest, idx) => (
//                             <span key={idx} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
//                               {dest.trim()}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="mt-8">
//                   <h3 className="text-lg font-bold text-gray-800 mb-3">Description</h3>
//                   <p className="text-gray-700">
//                     {selectedUniversity.application_short_desc || 'No description available'}
//                   </p>
//                 </div>

//                 {/* Top Disciplines */}
//                 {selectedUniversity.top_disciplines && (
//                   <div className="mt-8">
//                     <h3 className="text-lg font-bold text-gray-800 mb-3">Top Disciplines</h3>
//                     <div className="space-y-4">
//                       {parseDisciplines(selectedUniversity.top_disciplines).map((disc, idx) => (
//                         <div key={idx}>
//                           <div className="flex justify-between mb-1">
//                             <span className="font-medium text-gray-700">{disc.discipline}</span>
//                             <span className="font-bold text-blue-600">{disc.percentage}%</span>
//                           </div>
//                           <div className="w-full bg-gray-200 rounded-full h-2">
//                             <div 
//                               className="bg-blue-500 h-2 rounded-full"
//                               style={{ width: `${disc.percentage}%` }}
//                             ></div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Modal Footer */}
//               <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end space-x-3">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//                 >
//                   Close
//                 </button>
//                 <Link
//                   to={`/admin/universities/edit/${selectedUniversity.id}`}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Edit University
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UniversityShowing;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BASE_URL from '../../Api/ApiBaseUrl';
import IMAGE_URL from '../../Api/ImageUrl';

const UniversityShowing = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Dynamic token function
  const getToken = () => {
    // Try different storage locations
    const token = localStorage.getItem('auth_token') || 
                  localStorage.getItem('token') ||
                  sessionStorage.getItem('auth_token') ||
                  '12|GglMcxnKVS5QnUWWKe6RU7LLmHfLeNnJWp1mrteE7373aa90'; // fallback token
    
    console.log('Using token:', token ? 'Token found' : 'No token');
    return token;
  };

  // Fetch all universities with better error handling
  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const token = getToken();
      
      console.log('Fetching from:', `${BASE_URL}/admin/alluniversities`);
      
      const response = await fetch(`${BASE_URL}/admin/alluniversities`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('API Response:', result);
      
      // Handle different response formats
      let universitiesData = [];
      
      if (result && result.data && Array.isArray(result.data)) {
        universitiesData = result.data;
      } else if (Array.isArray(result.data)) {
        universitiesData = result.data;
      } else if (Array.isArray(result)) {
        universitiesData = result;
      } else if (result && result.universities && Array.isArray(result.universities)) {
        universitiesData = result.universities;
      }
      
      console.log('Processed universities:', universitiesData);
      console.log('First university images:', universitiesData[0]?.images);
      
      setUniversities(universitiesData);
      setError('');
      
    } catch (err) {
      console.error('Fetch error details:', err);
      setError(`Failed to load universities: ${err.message}`);
      
      // For development, show sample data
      console.log('Showing sample data for development');
      setUniversities(getSampleData());
      
    } finally {
      setLoading(false);
    }
  };

  // Smart image URL builder
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return 'https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=No+Image';
    }
    
    console.log('Building URL for image:', imagePath);
    
    // Case 1: Already full URL
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Case 2: Starts with /storage
    if (imagePath.startsWith('/storage')) {
      return `${IMAGE_URL}${imagePath}`;
    }
    
    // Case 3: Starts with storage (without slash)
    if (imagePath.startsWith('storage/')) {
      return `${IMAGE_URL}/${imagePath}`;
    }
    
    // Case 4: Just filename - try multiple common paths
    const possiblePaths = [
      `${IMAGE_URL}/storage/${imagePath}`,
      `${IMAGE_URL}/storage/images/${imagePath}`,
      `${IMAGE_URL}/storage/uploads/${imagePath}`,
      `${IMAGE_URL}/uploads/${imagePath}`,
      `${IMAGE_URL}/images/${imagePath}`
    ];
    
    // For now return first option
    return possiblePaths[0];
  };

  // Handle image error
  const handleImageError = (e, fallbackText = 'University') => {
    console.log('Image failed to load, using fallback');
    e.target.src = `https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=${encodeURIComponent(fallbackText)}`;
  };

  // Delete university
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this university?')) return;

    try {
      const token = getToken();
      
      const response = await fetch(`${BASE_URL}/admin/universities/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      setUniversities(prev => prev.filter(uni => uni.id !== id));
      alert('University deleted successfully!');
    } catch (err) {
      alert('Failed to delete university: ' + err.message);
      console.error('Error:', err);
    }
  };

  // Handle View Details
  const handleViewDetails = (university) => {
    console.log('Opening modal for:', university);
    console.log('University images:', university.images);
    setSelectedUniversity(university);
    setActiveImageIndex(0);
    setShowModal(true);
  };

  // Filter universities
  const filteredUniversities = universities.filter(uni => {
    if (!searchTerm.trim()) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      (uni.university_name && uni.university_name.toLowerCase().includes(searchLower)) ||
      (uni.location && uni.location.toLowerCase().includes(searchLower)) ||
      (uni.institution_type && uni.institution_type.toLowerCase().includes(searchLower)) ||
      (uni.dli_number && uni.dli_number.toLowerCase().includes(searchLower))
    );
  });

  // Parse disciplines
  const parseDisciplines = (disciplinesString) => {
    try {
      if (!disciplinesString) return [];
      if (typeof disciplinesString === 'object') return disciplinesString;
      return JSON.parse(disciplinesString);
    } catch (error) {
      console.error('Error parsing disciplines:', error);
      return [];
    }
  };

  // Sample data for development
  const getSampleData = () => {
    return [
      {
        id: 1,
        university_name: "University of Toronto",
        location: "Toronto, Canada",
        founded: "1827",
        institution_type: "Public",
        dli_number: "O19332746152",
        application_fee: "$120",
        featured: true,
        application_short_desc: "One of Canada's top research universities",
        phone_number: "+1 416-978-2011",
        address: "27 King's College Cir, Toronto, ON M5S, Canada",
        destinations: "USA, UK, Australia",
        average_gross_tuition: "$45,000/year",
        cost_of_living: "$15,000/year",
        average_graduate_program: "MBA, MSc",
        average_undergraduate_program: "BSc, BA",
        top_disciplines: '[{"discipline": "Engineering", "percentage": 35}, {"discipline": "Business", "percentage": 30}]',
        images: ["university.jpg", "campus.jpg"]
      },
      {
        id: 2,
        university_name: "McGill University",
        location: "Montreal, Canada",
        founded: "1821",
        institution_type: "Public",
        dli_number: "O19359098667",
        application_fee: "$115",
        featured: true,
        application_short_desc: "World-renowned for excellence in teaching and research",
        phone_number: "+1 514-398-4455",
        address: "845 Sherbrooke St W, Montreal, Quebec H3A 0G4, Canada",
        destinations: "USA, Europe",
        average_gross_tuition: "$40,000/year",
        cost_of_living: "$12,000/year",
        images: ["mcgill.jpg"]
      }
    ];
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading universities...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">University All</h1>
              <p className="text-gray-600 mt-2">Browse and manage all registered universities</p>
            </div>
            
            <Link
              to="/admin/universities/add"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add New University
            </Link>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="w-full md:w-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search universities..."
                    className="w-full md:w-96 px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{universities.length}</div>
                  <div className="text-sm text-gray-500">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {universities.filter(u => u.featured).length}
                  </div>
                  <div className="text-sm text-gray-500">Featured</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-red-700">{error}</p>
                <p className="text-red-600 text-sm mt-1">Using sample data for demonstration</p>
              </div>
            </div>
          </div>
        )}

        {/* Universities Grid */}
        {filteredUniversities.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-900">No universities found</h3>
              <p className="mt-2 text-gray-500">
                {searchTerm ? 'No universities match your search criteria.' : 'Start by adding your first university.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.map((uni) => {
              // Get first image
              const images = uni.images || [];
              const firstImage = images.length > 0 ? images[0] : null;
              const imageUrl = getImageUrl(firstImage);
              
              return (
                <div
                  key={uni.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Card Image */}
                  <div className="relative h-48">
                    <img 
                      src={imageUrl}
                      alt={uni.university_name}
                      className="w-full h-full object-cover"
                      onError={(e) => handleImageError(e, uni.university_name?.charAt(0) || 'U')}
                    />
                    
                    {uni.featured && (
                      <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                    
                    {/* University Initial */}
                    <div className="absolute -bottom-6 left-6">
                      <div className="bg-white p-2 rounded-xl shadow-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl font-bold text-blue-600">
                            {uni.university_name ? uni.university_name.charAt(0).toUpperCase() : 'U'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="pt-8 px-6 pb-6">
                    <h3 className="text-xl font-bold text-gray-800 truncate mb-2">
                      {uni.university_name || 'University Name'}
                    </h3>

                    <div className="flex items-center text-gray-600 mb-4">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{uni.location || 'Location'}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm">{uni.institution_type || 'Type'}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                      {uni.application_short_desc || 'No description'}
                    </p>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-xs text-gray-500">Founded</p>
                        <p className="font-medium">{uni.founded || 'N/A'}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <p className="text-xs text-gray-500">DLI #</p>
                        <p className="font-medium text-sm truncate">{uni.dli_number || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Application Fee */}
                    <div className="bg-blue-50 p-3 rounded-lg mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-blue-700">Application Fee</span>
                        <span className="font-bold text-blue-800">
                          {uni.application_fee || 'Free'}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between pt-4 border-t">
                      <button
                        onClick={() => handleViewDetails(uni)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                      
                      <div className="flex space-x-4">
                        <Link
                          to={`/admin/universities/edit/${uni.id}`}
                          className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </Link>
                        
                        <button
                          onClick={() => handleDelete(uni.id)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Results Info */}
        <div className="mt-8 pt-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm">
              Showing {filteredUniversities.length} of {universities.length} universities
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-800 text-sm mt-2 md:mt-0"
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedUniversity && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)}></div>
          
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedUniversity.university_name}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
                
                {/* Images */}
                {selectedUniversity.images && selectedUniversity.images.length > 0 && (
                  <div className="mb-6">
                    <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                      <img
                        src={getImageUrl(selectedUniversity.images[activeImageIndex])}
                        alt={`${selectedUniversity.university_name}`}
                        className="w-full h-full object-cover"
                        onError={(e) => handleImageError(e, selectedUniversity.university_name)}
                      />
                    </div>
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">Basic Information</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">{selectedUniversity.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Founded:</span>
                          <span className="font-medium">{selectedUniversity.founded}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium">{selectedUniversity.institution_type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">DLI #:</span>
                          <span className="font-medium">{selectedUniversity.dli_number}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">Contact</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium">{selectedUniversity.phone_number || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Address:</span>
                          <p className="font-medium mt-1">{selectedUniversity.address || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Programs & Costs */}
                  <div className="space-y-4">
                    {/* Programs */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">Programs</h3>
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-600">Graduate:</span>
                          <p className="font-medium">{selectedUniversity.average_graduate_program || 'N/A'}</p>
                          {selectedUniversity.average_graduate_program_short_desc && (
                            <p className="text-sm text-gray-500">{selectedUniversity.average_graduate_program_short_desc}</p>
                          )}
                        </div>
                        <div>
                          <span className="text-gray-600">Undergraduate:</span>
                          <p className="font-medium">{selectedUniversity.average_undergraduate_program || 'N/A'}</p>
                          {selectedUniversity.average_undergraduate_program_short_desc && (
                            <p className="text-sm text-gray-500">{selectedUniversity.average_undergraduate_program_short_desc}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Costs */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">Costs</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Application Fee:</span>
                          <span className="font-bold text-blue-600">{selectedUniversity.application_fee || 'Free'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tuition:</span>
                          <span className="font-medium">{selectedUniversity.average_gross_tuition || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Living Cost:</span>
                          <span className="font-medium">{selectedUniversity.cost_of_living || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-700">{selectedUniversity.application_short_desc || 'No description'}</p>
                </div>

                {/* Destinations */}
                {selectedUniversity.destinations && (
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Destinations</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedUniversity.destinations.split(',').map((dest, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {dest.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <Link
                  to={`/admin/universities/edit/${selectedUniversity.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => setShowModal(false)}
                >
                  Edit University
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityShowing;



