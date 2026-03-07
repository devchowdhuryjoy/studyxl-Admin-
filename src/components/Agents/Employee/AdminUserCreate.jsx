
// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// import BASE_URL from "../../../Api/ApiBaseUrl";

// const AdminUserCreate = ({ onSuccess, onClose }) => {
//   const [loading, setLoading] = useState(false);
//   const [agents, setAgents] = useState([]);
//   const [fetchingAgents, setFetchingAgents] = useState(true);
//   const [selectedAgent, setSelectedAgent] = useState("");

//   const permissionOptions = [
//     "Student Profile",
//     "All Student Data",
//     "Program and University",
//     "Application",
//     "Task",
//     "Announcements",
//   ];

//   const [selectedPermissions, setSelectedPermissions] = useState([]);
//   const [permissionStrings, setPermissionStrings] = useState([]);

//   // Use the hardcoded token from your first example
//   const HARDCODED_TOKEN = "112|BamRZHvKo7M2dxhjUy5alV1UESBEibIZnvjy0nDfced84a63";

//   // Get token - first try localStorage, fallback to hardcoded
//   const getToken = () => {
//     const localStorageToken = localStorage.getItem("token");
//     if (localStorageToken) {
//       return localStorageToken.replace(/['"]+/g, '');
//     }
//     console.log("Using hardcoded token");
//     return HARDCODED_TOKEN;
//   };

//   useEffect(() => {
//     fetchAgents();
//   }, []);

//   // Based on your first example, only "employee.create" is valid
//   const getPermissionsForOption = (option) => {
//     switch(option) {
//       case "Student Profile":
//         return ["employee.create"];

//       case "All Student Data":
//         return ["employee.create"];

//       case "Program and University":
//         return ["employee.create"];

//       case "Application":
//         return ["employee.create"];

//       case "Task":
//         return ["employee.create"];

//       case "Announcements":
//         return ["employee.create"];

//       default:
//         return [];
//     }
//   };

//   const updatePermissionStrings = (options) => {
//     let permissions = [];
//     options.forEach(option => {
//       permissions = [...permissions, ...getPermissionsForOption(option)];
//     });
//     // Remove duplicates - only "employee.create" will remain
//     const uniquePermissions = [...new Set(permissions)];
//     setPermissionStrings(uniquePermissions);
//     console.log("Generated permissions:", uniquePermissions);
//   };

//   const fetchAgents = async () => {
//     setFetchingAgents(true);
//     try {
//       const token = getToken();
      
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${token}`);
//       myHeaders.append("Accept", "application/json");
//       myHeaders.append("Content-Type", "application/json");

//       const requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow"
//       };

//       console.log("Fetching agents from:", `${BASE_URL}/admin/all-user`);

//       const response = await fetch(
//         `${BASE_URL}/admin/all-user`,
//         requestOptions
//       );

//       const result = await response.json();
//       console.log("Agents Response:", result);

//       if (!response.ok) {
//         throw new Error(result.message || `Failed to fetch agents (Status: ${response.status})`);
//       }

//       // Handle different response structures
//       if (Array.isArray(result)) {
//         setAgents(result);
//       } else if (result?.data && Array.isArray(result.data)) {
//         setAgents(result.data);
//       } else if (result?.users && Array.isArray(result.users)) {
//         setAgents(result.users);
//       } else if (result?.agents && Array.isArray(result.agents)) {
//         setAgents(result.agents);
//       } else {
//         console.log("No agents array found in response:", result);
//         setAgents([]);
//       }

//     } catch (error) {
//       console.error("Fetch Agents Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Failed to fetch agents",
//         text: error.message
//       });
//     } finally {
//       setFetchingAgents(false);
//     }
//   };

//   const handleAgentChange = (e) => {
//     setSelectedAgent(e.target.value);
//   };

//   const handlePermissionChange = (option) => {
//     let newOptions;
//     if (selectedPermissions.includes(option)) {
//       newOptions = selectedPermissions.filter(item => item !== option);
//     } else {
//       newOptions = [...selectedPermissions, option];
//     }
//     setSelectedPermissions(newOptions);
//     updatePermissionStrings(newOptions);
//   };

//   const handleSelectAll = () => {
//     let newOptions;
//     if (selectedPermissions.length === permissionOptions.length) {
//       newOptions = [];
//     } else {
//       newOptions = [...permissionOptions];
//     }
//     setSelectedPermissions(newOptions);
//     updatePermissionStrings(newOptions);
//   };

//   // Try to get the actual permissions from the server
//   const checkPermissions = async () => {
//     try {
//       const token = getToken();
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${token}`);
//       myHeaders.append("Accept", "application/json");

//       // Try different endpoints that might return permissions
//       const endpoints = [
//         `${BASE_URL}/permissions`,
//         `${BASE_URL}/admin/permissions`,
//         `${BASE_URL}/all-permissions`
//       ];

//       for (const endpoint of endpoints) {
//         try {
//           const response = await fetch(endpoint, {
//             method: "GET",
//             headers: myHeaders
//           });
//           const result = await response.json();
//           console.log(`Permissions from ${endpoint}:`, result);
//         } catch (e) {
//           console.log(`Failed to fetch from ${endpoint}`);
//         }
//       }
//     } catch (error) {
//       console.error("Error checking permissions:", error);
//     }
//   };

//   // Call this to debug permissions
//   useEffect(() => {
//     checkPermissions();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedAgent) {
//       Swal.fire({
//         icon: "warning",
//         title: "Select Agent",
//         text: "Please select an agent first"
//       });
//       return;
//     }

//     if (selectedPermissions.length === 0) {
//       Swal.fire({
//         icon: "warning",
//         title: "Select Permissions",
//         text: "Please select at least one permission"
//       });
//       return;
//     }

//     setLoading(true);

//     try {
//       const token = getToken();

//       const myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");
//       myHeaders.append("Authorization", `Bearer ${token}`);
//       myHeaders.append("Accept", "application/json");

//       // Send only "employee.create" permission as that's the only one we know works
//       const permissionsToSend = ["employee.create"];
      
//       const raw = JSON.stringify({
//         permissions: permissionsToSend
//       });

//       console.log("Submitting to:", `${BASE_URL}/admin/agent/${selectedAgent}/permissions`);
//       console.log("With permissions:", permissionsToSend);

//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow"
//       };

//       const response = await fetch(
//         `${BASE_URL}/admin/agent/${selectedAgent}/permissions`,
//         requestOptions
//       );

//       const result = await response.json();
//       console.log("Submit Response:", result);

//       if (response.ok) {
//         await Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: result.message || "Permissions assigned successfully",
//           timer: 2000,
//           timerProgressBar: true
//         });

//         // Reset form
//         setSelectedAgent("");
//         setSelectedPermissions([]);
//         setPermissionStrings([]);

//         if (onSuccess) onSuccess(result);
//         if (onClose) onClose();
//       } else {
//         if (result.errors) {
//           console.error("Validation errors:", result.errors);
//           const errorMessages = Object.values(result.errors).flat().join("\n");
//           throw new Error(errorMessages || result.message);
//         } else {
//           throw new Error(result.message || `Failed to assign permissions (Status: ${response.status})`);
//         }
//       }

//     } catch (error) {
//       console.error("Submission Error:", error);
      
//       let errorMessage = error.message;
//       if (error.message.includes("Unauthenticated")) {
//         errorMessage = "Authentication failed. The token might be invalid or expired.";
//       } else if (error.message.includes("permissions")) {
//         errorMessage = "Some permissions are invalid. Please check and try again.\n\n" + error.message;
//       }

//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: errorMessage,
//         confirmButtonColor: "#f16f22"
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetchingAgents) {
//     return (
//       <div className="w-full mx-auto bg-white p-10 rounded-xl shadow-md text-center">
//         <div className="flex justify-center items-center space-x-2">
//           <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           <span className="text-gray-600">Loading Agents...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full mx-auto bg-white p-6 rounded-xl shadow-md">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Assign Agent Permissions</h2>
//         {onClose && (
//           <button
//             type="button"
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
//             disabled={loading}
//           >
//             &times;
//           </button>
//         )}
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Agent Selection */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Select Agent <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={selectedAgent}
//             onChange={handleAgentChange}
//             className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
//             disabled={loading}
//             required
//           >
//             <option value="">Select an Agent</option>
//             {agents.length > 0 ? (
//               agents.map(agent => (
//                 <option key={agent.id} value={agent.id}>
//                   {agent.id} - {agent.company_name || agent.agency_name || agent.name || agent.email || `Agent ${agent.id}`}
//                 </option>
//               ))
//             ) : (
//               <option value="" disabled>No agents available</option>
//             )}
//           </select>
//         </div>

//         {/* Permissions Section */}
//         <div>
//           <div className="flex justify-between items-center mb-3">
//             <label className="block text-sm font-medium">
//               Permissions <span className="text-red-500">*</span>
//             </label>
//             <button
//               type="button"
//               onClick={handleSelectAll}
//               className="px-3 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition disabled:opacity-50"
//               disabled={loading || agents.length === 0}
//             >
//               {selectedPermissions.length === permissionOptions.length
//                 ? "Deselect All"
//                 : "Select All"}
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border rounded-lg p-4 max-h-80 overflow-y-auto">
//             {permissionOptions.map(option => (
//               <label
//                 key={option}
//                 className={`flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer ${
//                   loading ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedPermissions.includes(option)}
//                   onChange={() => handlePermissionChange(option)}
//                   className="w-4 h-4 text-orange-500"
//                   disabled={loading || agents.length === 0}
//                 />
//                 <span className="text-sm font-medium">{option}</span>
//               </label>
//             ))}
//           </div>

//           <div className="mt-2 text-sm text-gray-600">
//             {selectedPermissions.length} permission group(s) selected
//             {permissionStrings.length > 0 && (
//               <div className="mt-1 text-xs text-gray-500">
//                 Note: Only "employee.create" permission will be assigned as it's the only valid permission.
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="pt-4">
//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white px-8 py-2 rounded hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={loading || agents.length === 0}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Assigning...
//               </span>
//             ) : (
//               "Assign Permissions"
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AdminUserCreate;




import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../../Api/ApiBaseUrl";

const AdminUserCreate = ({ onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState([]);
  const [fetchingAgents, setFetchingAgents] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [permissionGroups, setPermissionGroups] = useState([]);
  const [fetchingPermissions, setFetchingPermissions] = useState(true);

  // Fallback permission groups (if API fails)
  const fallbackPermissionGroups = [
    {
      group: "Application",
      permissions: [
        "application.create",
        "application.delete",
        "application.detail",
        "application.edit",
        "application.update",
        "application.view.all",
        "application.view.info"
      ]
    },
    {
      group: "Student",
      permissions: [
        "student.create",
        "student.delete",
        "student.edit",
        "student.update",
        "student.view.all",
        "student.view.by-agent"
      ]
    },
    {
      group: "Employee",
      permissions: [
        "employee.create",
        "employee.login",
        "employee.view"
      ]
    },
    {
      group: "Agent Profile",
      permissions: [
        "agent.profile.view"
      ]
    },
    {
      group: "Task",
      permissions: [
        "task.update",
        "task.view"
      ]
    },
    {
      group: "Transaction",
      permissions: [
        "transaction.view"
      ]
    }
  ];

  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [selectedPermissionNames, setSelectedPermissionNames] = useState([]);

  // Token management
  const getToken = () => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      return localStorageToken.replace(/['"]+/g, '');
    }
    return "111|uucuU31pHYwswSF9q09iADpAamsVv5EI709VN8iCd0336d85"; // Fallback token
  };

  // Fetch permissions from API
  useEffect(() => {
    fetchPermissions();
    fetchAgents();
  }, []);

  const fetchPermissions = async () => {
    setFetchingPermissions(true);
    try {
      const token = getToken();
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Accept", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      console.log("Fetching permissions from API...");
      const response = await fetch(
        "https://studyxl.globalrouteway.com/api/admin/agent-permissions",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Permissions API Response:", result);

      // Process the API response and format it into groups
      if (result.status && result.permissions) {
        const groupedPermissions = groupPermissionsByModule(result.permissions);
        setPermissionGroups(groupedPermissions);
      } else {
        // If API response format is unexpected, use fallback
        console.log("Unexpected API response format, using fallback permissions");
        setPermissionGroups(fallbackPermissionGroups);
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
      // Use fallback permissions on error
      setPermissionGroups(fallbackPermissionGroups);
      
      Swal.fire({
        icon: "warning",
        title: "Using Default Permissions",
        text: "Could not fetch permissions from server. Using default permission list.",
        timer: 3000,
        timerProgressBar: true
      });
    } finally {
      setFetchingPermissions(false);
    }
  };

  // Helper function to group permissions by module
  const groupPermissionsByModule = (permissions) => {
    const groups = {};
    
    permissions.forEach(perm => {
      // Extract module name from permission (e.g., "application.create" -> "Application")
      const parts = perm.name.split('.');
      const moduleName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      
      if (!groups[moduleName]) {
        groups[moduleName] = {
          group: moduleName,
          permissions: []
        };
      }
      groups[moduleName].permissions.push(perm.name);
    });

    return Object.values(groups);
  };

  const fetchAgents = async () => {
    setFetchingAgents(true);
    try {
      const token = getToken();
      
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Accept", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(
        `${BASE_URL}/admin/all-user`,
        requestOptions
      );

      const result = await response.json();
      console.log("Agents Response:", result);

      if (!response.ok) {
        throw new Error(result.message || `Failed to fetch agents (Status: ${response.status})`);
      }

      // Handle different response structures
      if (Array.isArray(result)) {
        setAgents(result);
      } else if (result?.data && Array.isArray(result.data)) {
        setAgents(result.data);
      } else if (result?.users && Array.isArray(result.users)) {
        setAgents(result.users);
      } else if (result?.agents && Array.isArray(result.agents)) {
        setAgents(result.agents);
      } else {
        console.log("No agents array found in response:", result);
        setAgents([]);
      }

    } catch (error) {
      console.error("Fetch Agents Error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to fetch agents",
        text: error.message
      });
    } finally {
      setFetchingAgents(false);
    }
  };

  const handleGroupSelect = (groupName) => {
    const group = permissionGroups.find(g => g.group === groupName);
    if (!group) return;

    if (selectedPermissions.includes(groupName)) {
      // Remove group and its permissions
      setSelectedPermissions(prev => prev.filter(g => g !== groupName));
      setSelectedPermissionNames(prev => prev.filter(perm => !group.permissions.includes(perm)));
    } else {
      // Add group and its permissions
      setSelectedPermissions(prev => [...prev, groupName]);
      setSelectedPermissionNames(prev => [...prev, ...group.permissions]);
    }
  };

  const handleSelectAll = () => {
    const allGroups = permissionGroups.map(g => g.group);
    const allPermissionNames = permissionGroups.flatMap(group => group.permissions);

    if (selectedPermissions.length === allGroups.length) {
      setSelectedPermissions([]);
      setSelectedPermissionNames([]);
    } else {
      setSelectedPermissions(allGroups);
      setSelectedPermissionNames(allPermissionNames);
    }
  };

  const handleAgentChange = (e) => {
    setSelectedAgent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAgent) {
      Swal.fire({
        icon: "warning",
        title: "Select Agent",
        text: "Please select an agent first"
      });
      return;
    }

    if (selectedPermissionNames.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Select Permissions",
        text: "Please select at least one permission"
      });
      return;
    }

    setLoading(true);

    try {
      const token = getToken();

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Accept", "application/json");

      // Send permission names instead of IDs
      const raw = JSON.stringify({
        permissions: selectedPermissionNames  // Changed from permission_ids to permissions
      });

      console.log("Submitting permissions:", selectedPermissionNames);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch(
        `${BASE_URL}/admin/agent/${selectedAgent}/permissions`,
        requestOptions
      );

      const result = await response.json();
      console.log("Submit Response:", result);

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: result.message || "Permissions assigned successfully",
          timer: 2000,
          timerProgressBar: true
        });

        setSelectedAgent("");
        setSelectedPermissions([]);
        setSelectedPermissionNames([]);

        if (onSuccess) onSuccess(result);
        if (onClose) onClose();
      } else {
        if (result.errors) {
          console.error("Validation errors:", result.errors);
          const errorMessages = Object.values(result.errors).flat().join("\n");
          throw new Error(errorMessages || result.message);
        } else {
          throw new Error(result.message || `Failed to assign permissions (Status: ${response.status})`);
        }
      }

    } catch (error) {
      console.error("Submission Error:", error);
      
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message,
        confirmButtonColor: "#f16f22"
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingAgents || fetchingPermissions) {
    return (
      <div className="w-full mx-auto bg-white p-10 rounded-xl shadow-md text-center">
        <div className="flex justify-center items-center space-x-2">
          <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-gray-600">Loading Data...</span>
        </div>
      </div>
    );
  }

  const permissionOptions = permissionGroups.map(group => group.group);

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Assign Agent Permissions</h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            disabled={loading}
          >
            &times;
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Agent Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Agent <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedAgent}
            onChange={handleAgentChange}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            disabled={loading}
            required
          >
            <option value="">Select an Agent</option>
            {agents.length > 0 ? (
              agents.map(agent => (
                <option key={agent.id} value={agent.id}>
                  {agent.id} - {agent.company_name || agent.agency_name || agent.name || agent.email || `Agent ${agent.id}`}
                </option>
              ))
            ) : (
              <option value="" disabled>No agents available</option>
            )}
          </select>
        </div>

        {/* Permissions Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium">
              Permissions <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleSelectAll}
              className="px-3 py-1 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition disabled:opacity-50"
              disabled={loading || agents.length === 0}
            >
              {selectedPermissions.length === permissionOptions.length
                ? "Deselect All"
                : "Select All"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border rounded-lg p-4 max-h-80 overflow-y-auto">
            {permissionGroups.map(group => (
              <label
                key={group.group}
                className={`flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(group.group)}
                  onChange={() => handleGroupSelect(group.group)}
                  className="w-4 h-4 text-orange-500"
                  disabled={loading || agents.length === 0}
                />
                <div>
                  <span className="text-sm font-medium">{group.group}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({group.permissions.length} permissions)
                  </span>
                </div>
              </label>
            ))}
          </div>

          <div className="mt-2 text-sm text-gray-600">
            {selectedPermissions.length} permission group(s) selected
            {selectedPermissionNames.length > 0 && (
              <div className="mt-1 text-xs text-gray-500">
                Total {selectedPermissionNames.length} permission(s) will be assigned
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-orange-500 text-white px-8 py-2 rounded hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || agents.length === 0}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Assigning...
              </span>
            ) : (
              "Assign Permissions"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUserCreate;

