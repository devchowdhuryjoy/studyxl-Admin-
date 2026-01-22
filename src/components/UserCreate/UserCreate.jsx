import { useState } from "react";

const UserCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    permissions: [],
  });

  const permissionOptions = [
    "Create User",
    "Edit User",
    "Delete User",
    "View Student",
    "Manage Agent",
    "Manage University",
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create User
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />
        </div>

        {/* Role Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 bg-white focus:ring-2 focus:ring-orange-400 outline-none"
            required
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="agent">Agent</option>
            <option value="student">Student</option>
          </select>
        </div>

        {/* Permissions Checkbox */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Permissions
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {permissionOptions.map((permission) => (
              <label
                key={permission}
                className="flex items-center gap-2 border rounded px-3 py-2 cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={formData.permissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                  className="w-4 h-4 text-orange-500"
                />
                <span className="text-sm">{permission}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-[#f16f22] text-white px-8 py-2 rounded hover:bg-orange-600 transition"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserCreate;
