import React, { useEffect, useState } from "react";


const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getSubUsers();
      if (response.status) {
        setUsers(response.users || []);
      } else {
        setUsers([]);
      }
    } catch (error) {
      handleApiError(error, "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = await showConfirmation(
      "Delete User?",
      `Are you sure you want to delete ${name}?`,
      "Yes, delete"
    );

    if (confirmed) {
      try {
        // Add delete API call here
        // const response = await adminAPI.deleteUser(id);
        showSuccess("User deleted successfully");
        fetchUsers(); // Refresh list
      } catch (error) {
        handleApiError(error, "Failed to delete user");
      }
    }
  };

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Employeer List</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Sub-User
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-gray-500 text-lg">No sub-users found</p>
          <p className="text-gray-400 mt-2">Click the "Add Sub-User" button to create your first sub-user</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-primary text-white">
                <th className="p-3 border">SL</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Permissions</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="text-center hover:bg-gray-50 transition">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border font-medium">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {user.permissions_count || 0} permissions
                    </span>
                  </td>
                  <td className="p-3 border">
                    <div className="flex justify-center gap-2">
                      <button
                        className="px-3 py-1 rounded text-white text-xs font-medium bg-blue-500 hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        className="px-3 py-1 rounded text-white text-xs font-medium bg-red-500 hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <AdminUserCreate
              onSuccess={() => {
                setShowCreateModal(false);
                fetchUsers(); // Refresh list
              }}
              onClose={() => setShowCreateModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserList;