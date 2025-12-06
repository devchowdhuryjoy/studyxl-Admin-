// import React from "react";
// import mainImg from "../../image/university-main.jpg"; 
// import logoImg from "../../image/university-logo.png"; 


// const UniversityShowing = () => {
//   const uni = {
//     university_name: "Sample University",
//     location: "Toronto, Canada",
//     founded: "1965",
//     institution_type: "Public",
//     dli_number: "O123456789",
//     phone_number: "+1 234 567 890",
//     application_fee: "$120",
//     address: "123 Sample Street, Toronto",
//     destinations: "USA, UK, Australia",
//     application_short_desc: "A short description about this university.",
//     average_graduate_program: "MBA",
//     average_graduate_program_short_desc: "Highly ranked program",
//     average_undergraduate_program: "BBA",
//     average_undergraduate_program_short_desc: "Popular among intl. students",
//     cost_of_living: "$12,000/year",
//     cost_of_living_short_desc: "Moderate expenses",
//     average_gross_tuition: "$18,000/year",
//     average_gross_tuition_short_desc: "Affordable tuition rates",
//   };

//   const disciplines = [
//     { discipline: "Engineering", percentage: 35 },
//     { discipline: "Business", percentage: 30 },
//     { discipline: "Health Science", percentage: 20 },
//   ];

//   const safeDisplay = (value, fallback = "N/A") => {
//     return value ? value : fallback;
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6">University Showing</h2>

//       <div className="bg-white rounded-3xl shadow-md border border-black overflow-hidden hover:shadow-lg transition cursor-pointer">
        
//         {/* Image */}
//         <div className="relative">
//           <img
//             src={mainImg}
//             alt={uni.university_name}
//             className="w-full h-48 object-cover"
//             onError={(e) => (e.currentTarget.src = "/assets/default-university.jpg")}
//           />

//           <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
//             ● Featured
//           </span>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-5">
          
//           {/* Logo + Name */}
//           <div className="flex items-center border-b pb-3">
//             <img
//               src={logoImg}
//               alt="University logo"
//               className="w-10 h-10 mr-3 object-contain"
//               onError={(e) => (e.currentTarget.src = "/assets/default-university.jpg")}
//             />

//             <div>
//               <h3 className="text-xl font-bold text-black">
//                 {safeDisplay(uni.university_name)}
//               </h3>
//               <p className="text-sm text-black italic">{safeDisplay(uni.location)}</p>
//             </div>
//           </div>

//           {/* Short Description */}
//           <div className="border-b pb-3">
//             <p className="text-base md:text-lg text-black leading-relaxed">
//               {safeDisplay(uni.application_short_desc, "No description available")}
//             </p>
//           </div>

//           {/* Quick Info */}
//           <div className="border-b pb-3">
//             <h4 className="text-lg font-semibold underline underline-offset-4 mb-2">
//               Quick Info
//             </h4>
//             <ul className="text-sm md:text-base text-black space-y-1">
//               <li><strong>Founded:</strong> {safeDisplay(uni.founded)}</li>
//               <li><strong>Type:</strong> {safeDisplay(uni.institution_type)}</li>
//               <li><strong>DLI #:</strong> {safeDisplay(uni.dli_number)}</li>
//               <li><strong>Phone:</strong> {safeDisplay(uni.phone_number)}</li>
//               <li><strong>Application Fee:</strong> {safeDisplay(uni.application_fee)}</li>
//               <li><strong>Address:</strong> {safeDisplay(uni.address)}</li>
//               <li><strong>Destinations:</strong> {safeDisplay(uni.destinations)}</li>
//             </ul>
//           </div>

//           {/* Programs */}
//           <div className="border-b pb-3">
//             <h4 className="text-lg font-semibold underline underline-offset-4 mb-2">
//               Programs
//             </h4>
//             <p className="text-sm md:text-base text-black">
//               <strong>Graduate:</strong> {safeDisplay(uni.average_graduate_program)} – {safeDisplay(uni.average_graduate_program_short_desc)}
//             </p>
//             <p className="text-sm md:text-base text-black">
//               <strong>Undergraduate:</strong> {safeDisplay(uni.average_undergraduate_program)} – {safeDisplay(uni.average_undergraduate_program_short_desc)}
//             </p>
//           </div>

//           {/* Costs */}
//           <div className="border-b pb-3">
//             <h4 className="text-lg font-semibold underline underline-offset-4 mb-2">
//               Costs
//             </h4>
//             <p className="text-sm md:text-base text-black">
//               <strong>Cost of Living:</strong> {safeDisplay(uni.cost_of_living)} – {safeDisplay(uni.cost_of_living_short_desc)}
//             </p>
//             <p className="text-sm md:text-base text-black">
//               <strong>Gross Tuition:</strong> {safeDisplay(uni.average_gross_tuition)} – {safeDisplay(uni.average_gross_tuition_short_desc)}
//             </p>
//           </div>

//           {/* Top Disciplines */}
//           <div>
//             <h4 className="text-lg font-semibold underline underline-offset-4 mb-2">
//               Top Disciplines
//             </h4>

//             <div className="flex flex-wrap gap-2">
//               {disciplines.map((disc, idx) => (
//                 <span
//                   key={idx}
//                   className="bg-gray-100 text-black px-3 py-1 rounded-lg text-sm md:text-base shadow-sm"
//                 >
//                   {disc.discipline} ({disc.percentage}%)
//                 </span>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// };

// export default UniversityShowing;


import React from "react";
import mainImg from "../../image/university-main.jpg";
import logoImg from "../../image/university-logo.png";

const UniversityShowing = () => {
  // Full data according to your University interface
  const uni = {
    id: 1,
    university_name: "Sample University",
    address: "123 Sample Street, Toronto",
    location: "Toronto, Canada",
    phone_number: "+1 234 567 890",
    founded: "1965",
    school_id: "S123456",
    institution_type: "Public",
    dli_number: "O123456789",
    application_fee: "$120",
    application_short_desc: "A short description about this university.",
    average_graduate_program: "MBA",
    average_graduate_program_short_desc: "Highly ranked program",
    average_undergraduate_program: "BBA",
    average_undergraduate_program_short_desc: "Popular among international students",
    cost_of_living: "$12,000/year",
    cost_of_living_short_desc: "Moderate expenses",
    average_gross_tuition: "$18,000/year",
    average_gross_tuition_short_desc: "Affordable tuition rates",
    destinations: "USA, UK, Australia",
    top_disciplines: [
      { discipline: "Engineering", percentage: 35 },
      { discipline: "Business", percentage: 30 },
      { discipline: "Health Science", percentage: 20 },
    ],
    images: [mainImg, logoImg],
    featured: true,
    created_at: "2025-12-01",
    updated_at: "2025-12-06",
  };

  const safeDisplay = (value, fallback = "N/A") => value || fallback;

  return (
    <div className="p-6">
      
      {/* University Card */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition cursor-pointer">

        {/* Main Image */}
        <div className="relative">
          <img
            src={uni.images[0] || "/assets/default-university.jpg"}
            alt={uni.university_name}
            className="w-full h-52 object-cover"
            onError={(e) => (e.currentTarget.src = "/assets/default-university.jpg")}
          />

          {uni.featured && (
            <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              ● Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">

          {/* Logo + Name */}
          <div className="flex items-center border-b pb-3">
            <img
              src={uni.images[1] || "/assets/default-university.jpg"}
              alt={`${uni.university_name} logo`}
              className="w-12 h-12 mr-4 object-contain"
              onError={(e) => (e.currentTarget.src = "/assets/default-university.jpg")}
            />
            <div>
              <h3 className="text-xl font-bold text-black">{safeDisplay(uni.university_name)}</h3>
              <p className="text-sm text-gray-600 italic">{safeDisplay(uni.location)}</p>
            </div>
          </div>

          {/* Short Description */}
          <div className="border-b pb-3">
            <p className="text-base text-gray-700 leading-relaxed">
              {safeDisplay(uni.application_short_desc, "No description available")}
            </p>
          </div>

          {/* Quick Info */}
          <div className="border-b pb-3">
            <h4 className="text-lg font-semibold underline underline-offset-4 mb-2">Quick Info</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li><strong>Founded:</strong> {safeDisplay(uni.founded)}</li>
              <li><strong>Type:</strong> {safeDisplay(uni.institution_type)}</li>
              <li><strong>DLI #:</strong> {safeDisplay(uni.dli_number)}</li>
              <li><strong>Phone:</strong> {safeDisplay(uni.phone_number)}</li>
              <li><strong>Application Fee:</strong> {safeDisplay(uni.application_fee)}</li>
              <li><strong>Address:</strong> {safeDisplay(uni.address)}</li>
              <li><strong>Destinations:</strong> {safeDisplay(uni.destinations)}</li>
            </ul>
          </div>

          {/* Programs */}
          <div className="border-b pb-3">
            <h4 className="text-lg font-semibold underline underline-offset-4 mb-2">Programs</h4>
            <p className="text-sm text-gray-700">
              <strong>Graduate:</strong> {safeDisplay(uni.average_graduate_program)} – {safeDisplay(uni.average_graduate_program_short_desc)}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Undergraduate:</strong> {safeDisplay(uni.average_undergraduate_program)} – {safeDisplay(uni.average_undergraduate_program_short_desc)}
            </p>
          </div>

          {/* Costs */}
          <div className="border-b pb-3">
            <h4 className="text-lg font-semibold underline underline-offset-4 mb-2">Costs</h4>
            <p className="text-sm text-gray-700">
              <strong>Cost of Living:</strong> {safeDisplay(uni.cost_of_living)} – {safeDisplay(uni.cost_of_living_short_desc)}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Gross Tuition:</strong> {safeDisplay(uni.average_gross_tuition)} – {safeDisplay(uni.average_gross_tuition_short_desc)}
            </p>
          </div>

          {/* Top Disciplines */}
          <div>
            <h4 className="text-lg font-semibold underline underline-offset-4 mb-2">Top Disciplines</h4>
            <div className="flex flex-wrap gap-2">
              {uni.top_disciplines.map((disc, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg text-sm shadow-sm">
                  {disc.discipline} ({disc.percentage}%)
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UniversityShowing;

