
// import React, { useEffect, useRef, useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, logout!",
//     }).then((result) => {
//       if (result.isConfirmed) {
        
//         Swal.fire("Logged out!", "You have been logged out.", "success").then(
//           () => {
//             setOpen(false);
//             navigate("/");
//           }
//         );
//       }
//     });
//   };

//     useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       <header className="flex justify-between items-center bg-white shadow px-4 py-3 relative">
//         <h1 className="text-lg font-semibold">Study-XL</h1>
//         <div className="relative">
//           <div
//             className="flex items-center gap-3 cursor-pointer"
//             onClick={() => setOpen(!open)}
//           >
//             <span>Admin</span>
//             <img
//               src="/profileright.jpg"
//               alt="profile"
//               className="w-10 h-10 rounded-full"
//             />
//           </div>

//           {open && (
//             <div className="absolute right-2 mt-4 w-32 bg-[#f16f22] border rounded-lg shadow-lg z-50">
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </header>
//     </>
//   );
// };

// export default Navbar;



import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logged out!", "You have been logged out.", "success").then(
          () => {
            setOpen(false);
            navigate("/");
          }
        );
      }
    });
  };

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="flex justify-between items-center bg-white shadow px-4 py-3 relative">
        <h1 className="text-lg font-semibold">Study-XL</h1>
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <span>Admin</span>
            <img
              src="/profileright.jpg"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          </div>

          {open && (
            <div className="absolute right-2 mt-4 w-32 bg-[#f16f22] border rounded-lg shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;

