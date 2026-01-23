


// import { useState } from "react";

// const BASE_URL = "https://stdxl.globalrouteway.com/api";

// const UserCreate = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "",
//     permissions: [],
//   });

 
//   const permissionOptions = [
//     "university.create","university.edit","university.update","university.delete",
//     "program.create","program.edit","program.update","program.delete",
//     "destination.view","destination.create","destination.edit","destination.update","destination.delete",
//     "program-level.view","program-level.create","program-level.edit","program-level.update","program-level.delete",
//     "field-of-study.view","field-of-study.create","field-of-study.edit","field-of-study.update","field-of-study.delete",
//     "subject.view","subject.create","subject.edit","subject.update","subject.delete",
//     "intake.view","intake.create","intake.edit","intake.update","intake.delete",
//     "intake-month.view","intake-month.create","intake-month.edit","intake-month.update","intake-month.delete",
//     "program-tag.view","program-tag.create","program-tag.edit","program-tag.update","program-tag.delete",
//     "student.view","student.update","agent.view","agent.update",
//     "task.view","task.view.agent","task.view.student","task.create","task.edit","task.update","task.delete","task.assign",
//     "transaction.view","transaction.create","transaction.update","transaction.delete",
//     "application.view","application.edit","agent.employee.manage"
//   ];

  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

 
//   const handlePermissionChange = (permission) => {
//     setFormData((prev) => ({
//       ...prev,
//       permissions: prev.permissions.includes(permission)
//         ? prev.permissions.filter((p) => p !== permission)
//         : [...prev.permissions, permission],
//     }));
//   };

  
//   const handleSelectAll = () => {
//     if (formData.permissions.length === permissionOptions.length) {
//       setFormData({ ...formData, permissions: [] });
//     } else {
//       setFormData({ ...formData, permissions: [...permissionOptions] });
//     }
//   };

//   // 
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append(
//       "Authorization",
//       "Bearer 10|BUBnfii0wdL1FFrypveJlcti3Bf4IE7e3K0lV7JVcf81fd52"
//     );

//     const raw = JSON.stringify({
//       name: formData.name,
//       email: formData.email,
//       password: formData.password,
//       permissions: formData.permissions,
//     });

//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };

//     fetch(`${BASE_URL}/admin/admin-user`, requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);
//         alert("Sub-User created successfully!");
//       })
//       .catch((error) => console.error(error));
//   };

//   return (
//     <div className="w-full mx-auto bg-white p-6 rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Create User</h2>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Name */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
//             required
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
//             required
//           />
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Phone</label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
//           />
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
//             required
//           />
//         </div>

//         {/* Role Dropdown */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Role</label>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2 bg-white focus:ring-2 focus:ring-orange-400 outline-none"
//             required
//           >
//             <option value="">Select role</option>
//             <option value="admin">Admin</option>
//             <option value="agent">Agent</option>
//             <option value="student">Student</option>
//           </select>
//         </div>

//         {/* Permissions Checkbox */}
//         <div>
//           <label className="block text-sm font-medium mb-2">Permissions</label>
//           <button
//             type="button"
//             onClick={handleSelectAll}
//             className="mb-2 px-3 py-1 bg-orange-400 text-white rounded hover:bg-orange-500"
//           >
//             {formData.permissions.length === permissionOptions.length
//               ? "Deselect All"
//               : "Select All"}
//           </button>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto border p-2 rounded">
//             {permissionOptions.map((permission) => (
//               <label
//                 key={permission}
//                 className="flex items-center gap-2 border rounded px-3 py-2 cursor-pointer hover:bg-gray-50"
//               >
//                 <input
//                   type="checkbox"
//                   checked={formData.permissions.includes(permission)}
//                   onChange={() => handlePermissionChange(permission)}
//                   className="w-4 h-4 text-orange-500"
//                 />
//                 <span className="text-sm">{permission}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Submit */}
//         <div className="pt-4">
//           <button
//             type="submit"
//             className="w-full md:w-auto bg-[#f16f22] text-white px-8 py-2 rounded hover:bg-orange-600 transition"
//           >
//             Create User
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserCreate;



// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// const BASE_URL = "https://stdxl.globalrouteway.com/api";

// const UserCreate = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     permissions: [],
//   });

//   const [permissionOptions, setPermissionOptions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // টোকেন localStorage থেকে নিবে
//   const getToken = () => {
//     return localStorage.getItem("admin_token");
//   };

//   // API থেকে সব পারমিশন ফেচ করতে
//   useEffect(() => {
//     fetchPermissions();
//   }, []);

//   const fetchPermissions = async () => {
//     try {
//       const token = getToken();
//       if (!token) {
//         console.error("No token found");
//         return;
//       }

//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${token}`);

//       const response = await fetch(`${BASE_URL}/admin/my-permissions`, {
//         method: "GET",
//         headers: myHeaders,
//       });

//       const result = await response.json();
      
//       if (result.permissions) {
//         setPermissionOptions(result.permissions);
//       } else {
//         // যদি API থেকে পারমিশন না আসে, default list ব্যবহার করবে
//         const defaultPermissions = [
//           "university.create","university.edit","university.update","university.delete",
//           "program.create","program.edit","program.update","program.delete",
//           "destination.view","destination.create","destination.edit","destination.update","destination.delete",
//           "program-level.view","program-level.create","program-level.edit","program-level.update","program-level.delete",
//           "field-of-study.view","field-of-study.create","field-of-study.edit","field-of-study.update","field-of-study.delete",
//           "subject.view","subject.create","subject.edit","subject.update","subject.delete",
//           "intake.view","intake.create","intake.edit","intake.update","intake.delete",
//           "intake-month.view","intake-month.create","intake-month.edit","intake-month.update","intake-month.delete",
//           "program-tag.view","program-tag.create","program-tag.edit","program-tag.update","program-tag.delete",
//           "student.view","student.update","agent.view","agent.update",
//           "task.view","task.view.agent","task.view.student","task.create","task.edit","task.update","task.delete","task.assign",
//           "transaction.view","transaction.create","transaction.update","transaction.delete",
//           "application.view","application.edit","agent.employee.manage"
//         ];
//         setPermissionOptions(defaultPermissions);
//       }
//     } catch (error) {
//       console.error("Error fetching permissions:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePermissionChange = (permission) => {
//     setFormData((prev) => ({
//       ...prev,
//       permissions: prev.permissions.includes(permission)
//         ? prev.permissions.filter((p) => p !== permission)
//         : [...prev.permissions, permission],
//     }));
//   };

//   const handleSelectAll = () => {
//     if (formData.permissions.length === permissionOptions.length) {
//       setFormData({ ...formData, permissions: [] });
//     } else {
//       setFormData({ ...formData, permissions: [...permissionOptions] });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = getToken();
//       if (!token) {
//         Swal.fire("Error", "Please login first", "error");
//         return;
//       }

//       const myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");
//       myHeaders.append("Authorization", `Bearer ${token}`);

//       const raw = JSON.stringify({
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         permissions: formData.permissions,
//       });

//       const response = await fetch(`${BASE_URL}/admin/admin-user`, {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//       });

//       const result = await response.json();
      
//       if (response.ok) {
//         Swal.fire("Success", "Sub-User created successfully!", "success");
        
//         // ফর্ম রিসেট
//         setFormData({
//           name: "",
//           email: "",
//           password: "",
//           permissions: [],
//         });
//       } else {
//         Swal.fire("Error", result.message || "Error creating user", "error");
//       }
//     } catch (error) {
//       console.error(error);
//       Swal.fire("Error", "Network error. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // পারমিশনগুলো গ্রুপ করে দেখাতে
//   const groupedPermissions = permissionOptions.reduce((groups, permission) => {
//     const parts = permission.split('.');
//     const group = parts[0];
//     if (!groups[group]) {
//       groups[group] = [];
//     }
//     groups[group].push(permission);
//     return groups;
//   }, {});

//   return (
//     <div className="w-full mx-auto bg-white p-6 rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Sub-User</h2>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Name */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
//             required
//             placeholder="Enter full name"
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
//             required
//             placeholder="Enter email address"
//           />
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
//             required
//             placeholder="Enter password (min 4 characters)"
//             minLength="4"
//           />
//         </div>

//         {/* Permissions Checkbox */}
//         <div>
//           <div className="flex justify-between items-center mb-3">
//             <label className="block text-sm font-medium">Permissions</label>
//             <button
//               type="button"
//               onClick={handleSelectAll}
//               className="px-3 py-1 bg-orange-400 text-white text-sm rounded hover:bg-orange-500"
//             >
//               {formData.permissions.length === permissionOptions.length
//                 ? "Deselect All"
//                 : "Select All"}
//             </button>
//           </div>

//           <div className="border rounded-lg p-4 max-h-96 overflow-y-auto">
//             {Object.entries(groupedPermissions).map(([group, perms]) => (
//               <div key={group} className="mb-4 last:mb-0">
//                 <h3 className="font-medium text-gray-700 mb-2 capitalize">
//                   {group.replace(/-/g, ' ')}
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-2">
//                   {perms.map((permission) => (
//                     <label
//                       key={permission}
//                       className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={formData.permissions.includes(permission)}
//                         onChange={() => handlePermissionChange(permission)}
//                         className="w-4 h-4 text-orange-500"
//                       />
//                       <span className="text-sm">
//                         {permission.split('.').pop().replace(/-/g, ' ')}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="mt-2 text-sm text-gray-600">
//             {formData.permissions.length} permissions selected
//           </div>
//         </div>

//         {/* Submit */}
//         <div className="pt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-[#f16f22] text-white px-8 py-2 rounded hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Creating..." : "Create Sub-User"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserCreate;


import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../Api/ApiBaseUrl"; 

const UserCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    permissions: [],
  });

  const [permissionOptions, setPermissionOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingPermissions, setFetchingPermissions] = useState(true);

  // API 
  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        Swal.fire("Error", "Please login first", "error");
        setFetchingPermissions(false);
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`${BASE_URL}/admin/my-permissions`, {
        method: "GET",
        headers: myHeaders,
      });

      const result = await response.json();
      
      if (result.permissions && Array.isArray(result.permissions)) {
        setPermissionOptions(result.permissions);
      } else {
        // 
        const defaultPermissions = [
          "university.create","university.edit","university.update","university.delete",
          "program.create","program.edit","program.update","program.delete",
          "destination.view","destination.create","destination.edit","destination.update","destination.delete",
          "program-level.view","program-level.create","program-level.edit","program-level.update","program-level.delete",
          "field-of-study.view","field-of-study.create","field-of-study.edit","field-of-study.update","field-of-study.delete",
          "subject.view","subject.create","subject.edit","subject.update","subject.delete",
          "intake.view","intake.create","intake.edit","intake.update","intake.delete",
          "intake-month.view","intake-month.create","intake-month.edit","intake-month.update","intake-month.delete",
          "program-tag.view","program-tag.create","program-tag.edit","program-tag.update","program-tag.delete",
          "student.view","student.update","agent.view","agent.update",
          "task.view","task.view.agent","task.view.student","task.create","task.edit","task.update","task.delete","task.assign",
          "transaction.view","transaction.create","transaction.update","transaction.delete",
          "application.view","application.edit","agent.employee.manage"
        ];
        setPermissionOptions(defaultPermissions);
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
      Swal.fire("Error", "Failed to load permissions", "error");
    } finally {
      setFetchingPermissions(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePermissionChange = (permission) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleSelectAll = () => {
    if (formData.permissions.length === permissionOptions.length) {
      setFormData({ ...formData, permissions: [] });
    } else {
      setFormData({ ...formData, permissions: [...permissionOptions] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        Swal.fire("Error", "Please login first", "error");
        setLoading(false);
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const raw = JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        permissions: formData.permissions,
      });

      const response = await fetch(`${BASE_URL}/admin/admin-user`, {
        method: "POST",
        headers: myHeaders,
        body: raw,
      });

      const result = await response.json();
      
      if (response.ok) {
        Swal.fire("Success", "Sub-User created successfully!", "success");
        
        //
        setFormData({
          name: "",
          email: "",
          password: "",
          permissions: [],
        });
      } else {
        Swal.fire("Error", result.message || "Error creating user", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // 
  const groupedPermissions = permissionOptions.reduce((groups, permission) => {
    const parts = permission.split('.');
    const group = parts[0];
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(permission);
    return groups;
  }, {});

  if (fetchingPermissions) {
    return (
      <div className="w-full mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Sub-User</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#f16f22]"></div>
          <span className="ml-3 text-gray-600">Loading permissions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Sub-User</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            required
            placeholder="Enter full name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            required
            placeholder="Enter email address"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            required
            placeholder="Enter password (min 4 characters)"
            minLength="4"
          />
        </div>

        {/* Permissions Checkbox */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium">Permissions</label>
            <button
              type="button"
              onClick={handleSelectAll}
              className="px-3 py-1 bg-orange-400 text-white text-sm rounded hover:bg-orange-500"
            >
              {formData.permissions.length === permissionOptions.length
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>

          <div className="border rounded-lg p-4 max-h-96 overflow-y-auto">
            {Object.entries(groupedPermissions).map(([group, perms]) => (
              <div key={group} className="mb-4 last:mb-0">
                <h3 className="font-medium text-gray-700 mb-2 capitalize">
                  {group.replace(/-/g, ' ')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-2">
                  {perms.map((permission) => (
                    <label
                      key={permission}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={() => handlePermissionChange(permission)}
                        className="w-4 h-4 text-orange-500"
                      />
                      <span className="text-sm">
                        {permission.split('.').pop().replace(/-/g, ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            {formData.permissions.length} permissions selected
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f16f22] text-white px-8 py-2 rounded hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Sub-User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserCreate;