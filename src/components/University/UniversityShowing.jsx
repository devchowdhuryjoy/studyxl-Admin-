// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import BASE_URL from '../../Api/ApiBaseUrl';

// const UniversityShowing = () => {
//   const [universities, setUniversities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   // Modal state
//   const [selectedUniversity, setSelectedUniversity] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   // Dynamic token function
//   const getToken = () => {
//     const token = localStorage.getItem('auth_token') ||
//                   localStorage.getItem('token') ||
//                   sessionStorage.getItem('auth_token');

//     return token;
//   };

//   // Fetch all universities
//   const fetchUniversities = async () => {
//     try {
//       setLoading(true);
//       const token = getToken();

//       const response = await fetch(`${BASE_URL}/admin/alluniversities`, {
//         method: "GET",
//         headers: {
//           "Accept": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json"
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();

//       let universitiesData = [];

//       if (result && result.data && Array.isArray(result.data)) {
//         universitiesData = result.data;
//       } else if (Array.isArray(result.data)) {
//         universitiesData = result.data;
//       } else if (Array.isArray(result)) {
//         universitiesData = result;
//       }

//       console.log('First university images:', universitiesData[0]?.images);

//       setUniversities(universitiesData);
//       setError('');

//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError(`Failed to load universities: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Image URL builder - FIXED
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) {
//       // Use local fallback instead of external URL
//       return '/images/placeholder-university.jpg';
//     }

//     console.log('Original image path:', imagePath);

//     // Case 1: Already full URL
//     if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
//       return imagePath;
//     }

//     // Case 2: Your images are in uploads/ folder
//     // Remove /api from BASE_URL for images
//     const baseUrlWithoutApi = BASE_URL.replace('/api', '');

//     let cleanPath = imagePath;

//     // Remove leading slash if exists
//     if (cleanPath.startsWith('/')) {
//       cleanPath = cleanPath.substring(1);
//     }

//     // If starts with 'uploads/', Laravel needs it to be accessible from public
//     // Assuming you have setup the route or symlink
//     const finalUrl = `${baseUrlWithoutApi}/${cleanPath}`;
//     console.log('Final image URL:', finalUrl);

//     return finalUrl;
//   };

//   // Alternative image URL builder - try this if above doesn't work
//   const getAlternativeImageUrl = (imagePath) => {
//     if (!imagePath) {
//       return '/images/placeholder-university.jpg';
//     }

//     // Try direct URL without any modifications
//     if (imagePath.startsWith('http')) {
//       return imagePath;
//     }

//     // If it's a relative path starting with uploads/
//     if (imagePath.startsWith('uploads/')) {
//       // Try with storage/ prefix
//       const withStorage = `storage/${imagePath}`;
//       const baseUrl = BASE_URL.replace('/api', '');
//       return `${baseUrl}/${withStorage}`;
//     }

//     return imagePath;
//   };

//   // Handle image error with local fallback
//   const handleImageError = (e, fallbackText = 'University') => {
//     console.log('Image error, using fallback');
//     e.target.onerror = null; // Prevent infinite loop

//     // Create a colored background with text
//     const canvas = document.createElement('canvas');
//     canvas.width = 400;
//     canvas.height = 200;
//     const ctx = canvas.getContext('2d');

//     // Background color
//     ctx.fillStyle = '#3B82F6';
//     ctx.fillRect(0, 0, 400, 200);

//     // Text
//     ctx.fillStyle = '#FFFFFF';
//     ctx.font = 'bold 20px Arial';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText(fallbackText, 200, 100);

//     // Convert to data URL
//     e.target.src = canvas.toDataURL();
//   };

//   // Delete university
//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this university?')) return;

//     try {
//       const token = getToken();

//       const response = await fetch(`${BASE_URL}/admin/universities/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Accept": "application/json",
//           "Authorization": `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       setUniversities(prev => prev.filter(uni => uni.id !== id));
//       alert('University deleted successfully!');
//     } catch (err) {
//       alert('Failed to delete university: ' + err.message);
//       console.error('Error:', err);
//     }
//   };

//   // Handle View Details
//   const handleViewDetails = (university) => {
//     console.log('University for modal:', university);
//     console.log('University images:', university.images);
//     setSelectedUniversity(university);
//     setActiveImageIndex(0);
//     setShowModal(true);
//   };

//   // Filter universities
//   const filteredUniversities = universities.filter(uni => {
//     if (!searchTerm.trim()) return true;

//     const searchLower = searchTerm.toLowerCase();
//     return (
//       (uni.university_name && uni.university_name.toLowerCase().includes(searchLower)) ||
//       (uni.location && uni.location.toLowerCase().includes(searchLower)) ||
//       (uni.institution_type && uni.institution_type.toLowerCase().includes(searchLower))
//     );
//   });

//   useEffect(() => {
//     fetchUniversities();
//   }, []);

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
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-800">University All</h1>
//               <p className="text-gray-600 mt-2">Browse and manage all registered universities</p>
//             </div>

//           </div>

//           {/* Search */}
//           <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//               <div className="w-full md:w-auto">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search universities..."
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
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
//             <div className="flex items-center">
//               <svg className="h-5 w-5 text-red-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//               <div>
//                 <p className="text-red-700">{error}</p>
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
//             </div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredUniversities.map((uni) => {
//               // Get images
//               const images = Array.isArray(uni.images) ? uni.images : [];
//               const firstImage = images.length > 0 ? images[0] : null;

//               // Try both methods
//               const imageUrl = getImageUrl(firstImage);
//               const altImageUrl = getAlternativeImageUrl(firstImage);

//               return (
//                 <div
//                   key={uni.id}
//                   className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
//                 >
//                   {/* Card Image */}
//                   <div className="relative h-48 bg-gray-100">
//                     <img
//                       src={imageUrl}
//                       alt={uni.university_name || 'University'}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         // Try alternative URL on error
//                         if (e.target.src !== altImageUrl) {
//                           e.target.src = altImageUrl;
//                         } else {
//                           handleImageError(e, uni.university_name || 'U');
//                         }
//                       }}
//                       loading="lazy"
//                     />

//                     {/* University Initial */}
//                     <div className="absolute -bottom-6 left-6">
//                       <div className="bg-white p-2 rounded-xl shadow-lg">
//                         <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                           <span className="text-xl font-bold text-blue-600">
//                             {uni.university_name ? uni.university_name.charAt(0).toUpperCase() : 'U'}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Card Content */}
//                   <div className="pt-8 px-6 pb-6">
//                     <h3 className="text-xl font-bold text-gray-800 truncate mb-2">
//                       {uni.university_name || 'University Name'}
//                     </h3>

//                     <div className="flex items-center text-gray-600 mb-4">
//                       <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                       </svg>
//                       <span className="text-sm">{uni.location || 'Location'}</span>
//                     </div>

//                     {/* Quick Info */}
//                     <div className="grid grid-cols-2 gap-3 mb-6">
//                       <div className="bg-gray-50 p-3 rounded">
//                         <p className="text-xs text-gray-500">Type</p>
//                         <p className="font-medium">{uni.institution_type || 'N/A'}</p>
//                       </div>
//                       <div className="bg-gray-50 p-3 rounded">
//                         <p className="text-xs text-gray-500">DLI #</p>
//                         <p className="font-medium text-sm truncate">{uni.dli_number || 'N/A'}</p>
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex justify-between pt-4 border-t">
//                       <button
//                         onClick={() => handleViewDetails(uni)}
//                         className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
//                       >
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                         View
//                       </button>

//                       <div className="flex space-x-4">
//                         <Link
//                           to={`/admin/universities/edit/${uni.id}`}
//                           className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center"
//                         >
//                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                           </svg>
//                           Edit
//                         </Link>

//                         <button
//                           onClick={() => handleDelete(uni.id)}
//                           className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center"
//                         >
//                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                           </svg>
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {showModal && selectedUniversity && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)}></div>

//           <div className="flex items-center justify-center min-h-screen p-4">
//             <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">

//               {/* Modal Header */}
//               <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {selectedUniversity.university_name}
//                 </h2>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               {/* Modal Content */}
//               <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">

//                 {/* Images */}
//                 {selectedUniversity.images && selectedUniversity.images.length > 0 && (
//                   <div className="mb-6">
//                     <div className="relative h-64 rounded-xl overflow-hidden mb-4 bg-gray-100">
//                       <img
//                         src={getImageUrl(selectedUniversity.images[activeImageIndex])}
//                         alt={`${selectedUniversity.university_name} - Image ${activeImageIndex + 1}`}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           const altUrl = getAlternativeImageUrl(selectedUniversity.images[activeImageIndex]);
//                           if (e.target.src !== altUrl) {
//                             e.target.src = altUrl;
//                           } else {
//                             handleImageError(e, selectedUniversity.university_name);
//                           }
//                         }}
//                       />
//                     </div>

//                     {/* Image Gallery */}
//                     {selectedUniversity.images.length > 1 && (
//                       <div className="flex space-x-2 overflow-x-auto pb-2">
//                         {selectedUniversity.images.map((img, idx) => (
//                           <button
//                             key={idx}
//                             onClick={() => setActiveImageIndex(idx)}
//                             className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${idx === activeImageIndex ? 'border-blue-500' : 'border-gray-300'}`}
//                           >
//                             <img
//                               src={getImageUrl(img)}
//                               alt={`${selectedUniversity.university_name} ${idx + 1}`}
//                               className="w-full h-full object-cover"
//                               onError={(e) => {
//                                 const altUrl = getAlternativeImageUrl(img);
//                                 if (e.target.src !== altUrl) {
//                                   e.target.src = altUrl;
//                                 } else {
//                                   e.target.onerror = null;
//                                   // Simple colored div as fallback
//                                   e.target.style.backgroundColor = '#3B82F6';
//                                   e.target.style.display = 'flex';
//                                   e.target.style.alignItems = 'center';
//                                   e.target.style.justifyContent = 'center';
//                                   e.target.style.color = 'white';
//                                   e.target.style.fontWeight = 'bold';
//                                   e.target.innerHTML = 'Img';
//                                 }
//                               }}
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* University Details */}
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-800 mb-3">Basic Information</h3>
//                       <div className="space-y-2">
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Location:</span>
//                           <span className="font-medium">{selectedUniversity.location || 'N/A'}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Type:</span>
//                           <span className="font-medium">{selectedUniversity.institution_type || 'N/A'}</span>
//                         </div>
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">DLI #:</span>
//                           <span className="font-medium">{selectedUniversity.dli_number || 'N/A'}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-bold text-gray-800 mb-3">Contact</h3>
//                       <div className="space-y-2">
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Phone:</span>
//                           <span className="font-medium">{selectedUniversity.phone_number || 'N/A'}</span>
//                         </div>
//                         <div>
//                           <span className="text-gray-600">Address:</span>
//                           <p className="font-medium mt-1">{selectedUniversity.address || 'N/A'}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Description */}
//                   {selectedUniversity.application_short_desc && (
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
//                       <p className="text-gray-700">{selectedUniversity.application_short_desc}</p>
//                     </div>
//                   )}
//                 </div>
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

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../Api/ApiBaseUrl";
import Swal from "sweetalert2";
const UniversityShowing = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // 6 items per page

  // Modal state
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Dynamic token function
  const getToken = () => {
    const token =
      localStorage.getItem("auth_token") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("auth_token");

    return token;
  };

  // Fetch all universities
  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const token = getToken();

      const response = await fetch(`${BASE_URL}/admin/alluniversities`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      let universitiesData = [];

      if (result && result.data && Array.isArray(result.data)) {
        universitiesData = result.data;
        console.log(universitiesData);
      } else if (Array.isArray(result.data)) {
        universitiesData = result.data;
      } else if (Array.isArray(result)) {
        universitiesData = result;
      }

      console.log("First university images:", universitiesData[0]?.images);

      setUniversities(universitiesData);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError(`Failed to load universities: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Image URL builder - FIXED
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      // Use local fallback instead of external URL
      return "/images/placeholder-university.jpg";
    }

    console.log("Original image path:", imagePath);

    // Case 1: Already full URL
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    // Case 2: Your images are in uploads/ folder
    // Remove /api from BASE_URL for images
    const baseUrlWithoutApi = BASE_URL.replace("/api", "");

    let cleanPath = imagePath;

    // Remove leading slash if exists
    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.substring(1);
    }

    // If starts with 'uploads/', Laravel needs it to be accessible from public
    // Assuming you have setup the route or symlink
    const finalUrl = `${baseUrlWithoutApi}/${cleanPath}`;
    console.log("Final image URL:", finalUrl);

    return finalUrl;
  };

  // Alternative image URL builder - try this if above doesn't work
  const getAlternativeImageUrl = (imagePath) => {
    if (!imagePath) {
      return "/images/placeholder-university.jpg";
    }

    // Try direct URL without any modifications
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // If it's a relative path starting with uploads/
    if (imagePath.startsWith("uploads/")) {
      // Try with storage/ prefix
      const withStorage = `storage/${imagePath}`;
      const baseUrl = BASE_URL.replace("/api", "");
      return `${baseUrl}/${withStorage}`;
    }

    return imagePath;
  };

  // Handle image error with local fallback
  const handleImageError = (e, fallbackText = "University") => {
    console.log("Image error, using fallback");
    e.target.onerror = null; // Prevent infinite loop

    // Create a colored background with text
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");

    // Background color
    ctx.fillStyle = "#3B82F6";
    ctx.fillRect(0, 0, 400, 200);

    // Text
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(fallbackText, 200, 100);
    e.target.src = canvas.toDataURL();
  };

  // Delete university
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! All programs linked to this university might be affected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("admin_token");

      Swal.fire({
        title: "Deleting...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch(`${BASE_URL}/admin/universities/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server error: ${response.status}`,
        );
      }

      setUniversities((prev) => prev.filter((uni) => uni.id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The university has been removed.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err.message,
      });
    }
  };
  // Handle View Details
  const handleViewDetails = (university) => {
    console.log("University for modal:", university);
    console.log("University images:", university.images);
    setSelectedUniversity(university);
    setActiveImageIndex(0);
    setShowModal(true);
  };

  // Filter universities based on search
  const filteredUniversities = universities.filter((uni) => {
    if (!searchTerm.trim()) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      (uni.university_name &&
        uni.university_name.toLowerCase().includes(searchLower)) ||
      (uni.location && uni.location.toLowerCase().includes(searchLower)) ||
      (uni.institution_type &&
        uni.institution_type.toLowerCase().includes(searchLower))
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUniversities = filteredUniversities.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const halfMax = Math.floor(maxPagesToShow / 2);
      let startPage = Math.max(1, currentPage - halfMax);
      let endPage = Math.min(totalPages, currentPage + halfMax);

      if (currentPage <= halfMax) {
        endPage = maxPagesToShow;
      }

      if (currentPage >= totalPages - halfMax) {
        startPage = totalPages - maxPagesToShow + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      if (startPage > 1) {
        if (startPage > 2) {
          pageNumbers.unshift("...");
        }
        pageNumbers.unshift(1);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
              <h1 className="text-3xl  font-bold text-gray-800">
                University All
              </h1>
              <p className="text-gray-600 mt-2">
                Browse and manage all registered universities
              </p>
            </div>
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
                  <svg
                    className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {universities.length}
                  </div>
                  <div className="text-sm text-gray-500">Total</div>
                </div>

                {/* Items per page selector */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                  </select>
                  <span className="text-sm text-gray-500">per page</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-center">
              <svg
                className="h-5 w-5 text-red-400 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Universities Grid */}
        {currentUniversities.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                No universities found
              </h3>
              <p className="mt-2 text-gray-500">
                {searchTerm
                  ? "No universities match your search criteria."
                  : "Start by adding your first university."}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentUniversities.map((uni) => {
                // Get images
                const images = Array.isArray(uni.images) ? uni.images : [];
                const firstImage = images.length > 0 ? images[0] : null;

                // Try both methods
                const imageUrl = getImageUrl(firstImage);
                const altImageUrl = getAlternativeImageUrl(firstImage);

                return (
                  <div
                    key={uni.id}
                    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {/* Card Image */}
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={imageUrl}
                        alt={uni.university_name || "University"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Try alternative URL on error
                          if (e.target.src !== altImageUrl) {
                            e.target.src = altImageUrl;
                          } else {
                            handleImageError(e, uni.university_name || "U");
                          }
                        }}
                        loading="lazy"
                      />

                      {/* University Initial */}
                      <div className="absolute -bottom-6 left-6">
                        <div className="bg-white p-2 rounded-xl shadow-lg">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-xl font-bold text-blue-600">
                              {uni.university_name
                                ? uni.university_name.charAt(0).toUpperCase()
                                : "U"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="pt-8 px-6 pb-6">
                      <h3 className="text-xl font-bold text-gray-800 truncate mb-2">
                        {uni.university_name || "University Name"}
                      </h3>

                      <div className="flex items-center text-gray-600 mb-4">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm">
                          {uni.location || "Location"}
                        </span>
                      </div>

                      {/* Quick Info */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-xs text-gray-500">Type</p>
                          <p className="font-medium">
                            {uni.institution_type || "N/A"}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="text-xs text-gray-500">DLI #</p>
                          <p className="font-medium text-sm truncate">
                            {uni.dli_number || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between pt-4 border-t">
                        <button
                          onClick={() => handleViewDetails(uni)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          View
                        </button>

                        <div className="flex space-x-4">
                          <Link
                            to={`/dashboard/universities/edit/${uni.id}`}
                            className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDelete(uni.id)}
                            className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 bg-white rounded-xl shadow-sm p-4">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(endIndex, filteredUniversities.length)} of{" "}
                    {filteredUniversities.length} universities
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-lg flex items-center space-x-1 ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
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
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      <span>Previous</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center space-x-1">
                      {getPageNumbers().map((pageNumber, index) =>
                        pageNumber === "..." ? (
                          <span
                            key={`ellipsis-${index}`}
                            className="px-3 py-2 text-gray-500"
                          >
                            ...
                          </span>
                        ) : (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                              currentPage === pageNumber
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        ),
                      )}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded-lg flex items-center space-x-1 ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>Next</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Go to page:</span>
                    <input
                      type="number"
                      min="1"
                      max={totalPages}
                      value={currentPage}
                      onChange={(e) => {
                        const page = Math.min(
                          Math.max(1, parseInt(e.target.value) || 1),
                          totalPages,
                        );
                        handlePageChange(page);
                      }}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                    />
                    <span className="text-sm text-gray-600">
                      of {totalPages}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedUniversity && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white border-b border-blue-100 p-5 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-extrabold text-blue-900 leading-tight">
                    {selectedUniversity.university_name}
                  </h2>
                  <p className="text-blue-500 text-sm font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    University Profile Details
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-blue-600 p-2 rounded-xl hover:bg-blue-50 transition-all"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-blue-200">
                {/* Image Section */}
                {selectedUniversity.images &&
                  selectedUniversity.images.length > 0 && (
                    <div className="space-y-3">
                      <div className="relative h-72 rounded-2xl overflow-hidden shadow-inner bg-slate-100 border border-blue-50">
                        <img
                          src={getImageUrl(
                            selectedUniversity.images[activeImageIndex],
                          )}
                          alt="University Hero"
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      {selectedUniversity.images.length > 1 && (
                        <div className="flex space-x-3 overflow-x-auto pb-2 px-1">
                          {selectedUniversity.images.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveImageIndex(idx)}
                              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                                idx === activeImageIndex
                                  ? "border-blue-600 scale-105 ring-4 ring-blue-50"
                                  : "border-slate-200 hover:border-blue-300"
                              }`}
                            >
                              <img
                                src={getImageUrl(img)}
                                alt="Thumbnail"
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                {/* --- UNIVERSITY DESCRIPTION--- */}
                {selectedUniversity.university_desc && (
                  <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                      <h3 className="text-xl font-bold text-slate-900">
                        About the University
                      </h3>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                      <p className="text-slate-700 leading-relaxed text-base whitespace-pre-line">
                        {selectedUniversity.university_desc}
                      </p>
                    </div>
                  </section>
                )}
                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Info Block 1 */}
                  <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                    <h3 className="text-blue-800 font-bold mb-4 flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Core Information
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          label: "Location",
                          value: selectedUniversity.location,
                        },
                        {
                          label: "Type",
                          value: selectedUniversity.institution_type,
                        },
                        {
                          label: "DLI #",
                          value: selectedUniversity.dli_number,
                        },
                        {
                          label: "Destination",
                          value: selectedUniversity.destinations,
                        },
                        {
                          label: "School ID",
                          value: selectedUniversity.school_id,
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between border-b border-blue-100/50 pb-2"
                        >
                          <span className="text-slate-500 text-sm">
                            {item.label}
                          </span>
                          <span className="text-slate-800 font-semibold text-sm">
                            {item.value || "N/A"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info Block 2 */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Contact Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-slate-500 text-xs uppercase tracking-wider font-bold">
                          Phone
                        </span>
                        <p className="text-blue-700 font-medium">
                          {selectedUniversity.phone_number || "N/A"}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500 text-xs uppercase tracking-wider font-bold">
                          Address
                        </span>
                        <p className="text-slate-700 text-sm leading-relaxed">
                          {selectedUniversity.address || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Disciplines */}
                <section>
                  <h3 className="text-lg font-bold text-blue-900 mb-4">
                    Academic Specializations
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedUniversity.top_disciplines?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white border border-blue-100 rounded-xl hover:bg-blue-50 transition-colors"
                      >
                        <span className="font-medium text-slate-700">
                          {item.discipline}
                        </span>
                        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
                          {item.percentage}%
                        </span>
                      </div>
                    )) || (
                      <p className="text-slate-400 italic">
                        No academic data available
                      </p>
                    )}
                  </div>
                </section>

                {/* Application Details */}
                <section className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                    Admission Requirements
                  </h3>

                  <div className="bg-blue-600 text-white p-5 rounded-2xl flex flex-col shadow-lg shadow-blue-100">
                   <div className="flex justify-between ">
                     <span className="font-semibold">Application Fee</span>
                    <span className="text-2xl font-black">
                      ${selectedUniversity.application_fee}
                    </span>
                   </div>
                    <p className="text-xs leading-relaxed">
                      {selectedUniversity.application_short_desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="text-blue-600 font-bold text-sm uppercase mb-2">
                        Graduate Programs
                      </h4>
                      <p className="font-bold text-slate-800 mb-2">
                        {selectedUniversity.average_graduate_program}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {selectedUniversity.average_graduate_program_short_desc}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="text-blue-600 font-bold text-sm uppercase mb-2">
                        Undergraduate Programs
                      </h4>
                      <p className="font-bold text-slate-800 mb-2">
                        {selectedUniversity.average_undergraduate_program}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {
                          selectedUniversity.average_undergraduate_program_short_desc
                        }
                      </p>
                    </div>
                  </div>
                </section>

                {/* Cost Details */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                  <div className="group border-2 border-blue-50 rounded-2xl p-5 hover:border-blue-200 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-slate-800">Living Cost</h4>
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-2xl font-black text-blue-600 mb-2">
                      {selectedUniversity.cost_of_living}
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {selectedUniversity.cost_of_living_short_desc}
                    </p>
                  </div>

                  <div className="group border-2 border-indigo-50 rounded-2xl p-5 hover:border-indigo-200 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-slate-800">Tuition Fee</h4>
                      <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m.599-1H11.401"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-2xl font-black text-indigo-600 mb-2">
                      {selectedUniversity.average_gross_tuition}
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {selectedUniversity.average_gross_tuition_short_desc}
                    </p>
                  </div>
                </section>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 p-5 flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 font-bold text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <Link
                  to={`/dashboard/universities/edit/${selectedUniversity.id}`}
                  onClick={() => setShowModal(false)}
                  className="px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  Edit Profile
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
