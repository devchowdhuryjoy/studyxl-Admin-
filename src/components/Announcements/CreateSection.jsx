// import React, { useState, useEffect } from "react";
// import BASE_URL from "../../Api/ApiBaseUrl";
// import Swal from "sweetalert2";

// const CreateSection = () => {
//   const [sections, setSections] = useState([]);
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   // Get token from localStorage
//   const getHeaders = () => ({
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
//   });

//   // Fetch all sections
//   const fetchSections = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/admin/sections`, { headers: getHeaders() });
//       if (!res.ok) throw new Error("Failed to fetch sections");
//       const data = await res.json();
//       setSections(data.data || []);
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     }
//   };

//   useEffect(() => {
//     fetchSections();
//   }, []);

//   // Create or Update section
//   const handleSubmit = async () => {
//     if (!name.trim()) return Swal.fire("Warning", "Section name cannot be empty", "warning");

//     setLoading(true);

//     const url = editingId
//       ? `${BASE_URL}/admin/sections/${editingId}`
//       : `${BASE_URL}/admin/sections`;
//     const method = editingId ? "PUT" : "POST";

//     try {
//       const res = await fetch(url, {
//         method,
//         headers: getHeaders(),
//         body: JSON.stringify({ name }),
//       });

//       if (!res.ok) {
//         const errText = await res.text();
//         throw new Error(errText || "Failed to save section");
//       }

//       const data = await res.json();

//       if (editingId) {
//         setSections((prev) => prev.map((s) => (s.id === editingId ? data.data : s)));
//         Swal.fire("Updated!", "Section updated successfully", "success");
//       } else {
//         setSections((prev) => [...prev, data.data]);
//         Swal.fire("Created!", "Section created successfully", "success");
//       }

//       setName("");
//       setEditingId(null);
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete section
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const res = await fetch(`${BASE_URL}/admin/sections/${id}`, {
//             method: "DELETE",
//             headers: getHeaders(),
//           });
//           if (!res.ok) throw new Error("Failed to delete section");

//           setSections((prev) => prev.filter((s) => s.id !== id));
//           Swal.fire("Deleted!", "Section has been deleted.", "success");
//         } catch (err) {
//           Swal.fire("Error", err.message, "error");
//         }
//       }
//     });
//   };

//   // Edit section
//   const handleEdit = (section) => {
//     setName(section.name);
//     setEditingId(section.id);
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//       <h2 className="text-2xl font-bold mb-4">Manage Sections</h2>

//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter section name"
//           className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
//         >
//           {editingId ? (loading ? "Updating..." : "Update") : loading ? "Creating..." : "Create"}
//         </button>
//       </div>

//       {sections.length > 0 ? (
//         <ul className="space-y-4">
//           {sections.map((section) => (
//             <li
//               key={section.id}
//               className="flex justify-between items-center border p-4 rounded-lg shadow-sm hover:bg-gray-50"
//             >
//               <div>
//                 <p className="text-lg font-semibold">{section.name}</p>
//                 <p className="text-gray-500 text-sm">
//                   Created: {new Date(section.created_at).toLocaleString()} | Updated:{" "}
//                   {new Date(section.updated_at).toLocaleString()}
//                 </p>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleEdit(section)}
//                   className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(section.id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">No sections available.</p>
//       )}
//     </div>
//   );
// };

// export default CreateSection;



import React, { useState, useEffect } from "react";
import BASE_URL from "../../Api/ApiBaseUrl";
import Swal from "sweetalert2";

const CreateSection = () => {
  const [sections, setSections] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Auth Headers
  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
  });

  // Fetch Sections
  const fetchSections = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/sections`, {
        headers: getHeaders(),
      });

      if (!res.ok) throw new Error("Failed to fetch sections");

      const data = await res.json();

      // Handle both array and { data: [] } response
      setSections(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  // Create or Update Section
  const handleSubmit = async () => {
    if (!name.trim()) {
      return Swal.fire("Warning", "Section name cannot be empty", "warning");
    }

    setLoading(true);

    const url = editingId
      ? `${BASE_URL}/admin/sections/${editingId}`
      : `${BASE_URL}/admin/sections`;

    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to save section");
      }

      const data = await res.json();
      const newSection = data.data || data;

      if (editingId) {
        // Update in UI
        setSections((prev) =>
          prev.map((section) =>
            section.id === editingId
              ? { ...section, name: newSection.name }
              : section
          )
        );

        Swal.fire("Updated!", "Section updated successfully", "success");
      } else {
        // Add new section
        setSections((prev) => [...prev, newSection]);
        Swal.fire("Created!", "Section created successfully", "success");
      }

      setName("");
      setEditingId(null);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete Section
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${BASE_URL}/admin/sections/${id}`, {
            method: "DELETE",
            headers: getHeaders(),
          });

          if (!res.ok) throw new Error("Failed to delete section");

          setSections((prev) => prev.filter((section) => section.id !== id));

          Swal.fire("Deleted!", "Section has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error", err.message, "error");
        }
      }
    });
  };

  // Edit Section
  const handleEdit = (section) => {
    setName(section.name);
    setEditingId(section.id);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Sections</h2>

      {/* Input Section */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter section name"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {editingId
            ? loading
              ? "Updating..."
              : "Update"
            : loading
            ? "Creating..."
            : "Create"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setName("");
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Section List */}
      {sections.length > 0 ? (
        <ul className="space-y-4">
          {sections.map((section) => (
            <li
              key={section.id}
              className="flex justify-between items-center border p-4 rounded-lg shadow-sm hover:bg-gray-50"
            >
              <div>
                <p className="text-lg font-semibold">{section.name}</p>
                <p className="text-gray-500 text-sm">
                  Created:{" "}
                  {section.created_at
                    ? new Date(section.created_at).toLocaleString()
                    : "N/A"}{" "}
                  | Updated:{" "}
                  {section.updated_at
                    ? new Date(section.updated_at).toLocaleString()
                    : "N/A"}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(section)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(section.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No sections available.</p>
      )}
    </div>
  );
};

export default CreateSection;