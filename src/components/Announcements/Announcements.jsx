import React, { useEffect, useState } from "react";
import BASE_URL from "../../Api/ApiBaseUrl";
import Swal from "sweetalert2";

const Announcements = () => {
  const [sections, setSections] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [announcement, setAnnouncement] = useState({
    section_id: "",
    title: "",
    description: "",
    meta_title: "",
    meta_description: "",
  });

  const getHeaders = () => ({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
  });

  // ==============================
  // Fetch Sections (Dropdown)
  // ==============================
  const fetchSections = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/sections`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      setSections(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      Swal.fire("Error", "Failed to load sections", "error");
    }
  };

  // ==============================
  // Fetch Announcements
  // ==============================
  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/announcements`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      setAnnouncements(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      Swal.fire("Error", "Failed to load announcements", "error");
    }
  };

  useEffect(() => {
    fetchSections();
    fetchAnnouncements();
  }, []);

  // ==============================
  // Handle Input Change
  // ==============================
  const handleChange = (e) => {
    setAnnouncement({
      ...announcement,
      [e.target.name]: e.target.value,
    });
  };

  // ==============================
  // Create / Update
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!announcement.section_id || !announcement.title) {
      return Swal.fire("Warning", "Section and Title required", "warning");
    }

    setLoading(true);

    const url = editingId
      ? `${BASE_URL}/admin/announcements/${editingId}`
      : `${BASE_URL}/admin/announcements`;

    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(announcement),
      });

      if (!res.ok) throw new Error("Failed to save");

      const data = await res.json();
      const newData = data.data || data;

      if (editingId) {
        setAnnouncements((prev) =>
          prev.map((item) =>
            item.id === editingId ? newData : item
          )
        );
        Swal.fire("Updated!", "Announcement updated", "success");
      } else {
        setAnnouncements((prev) => [...prev, newData]);
        Swal.fire("Created!", "Announcement created", "success");
      }

      resetForm();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Edit
  // ==============================
  const handleEdit = (item) => {
    setAnnouncement({
      section_id: item.section_id,
      title: item.title,
      description: item.description,
      meta_title: item.meta_title,
      meta_description: item.meta_description,
    });
    setEditingId(item.id);
  };

  // ==============================
  // Delete
  // ==============================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `${BASE_URL}/admin/announcements/${id}`,
            {
              method: "DELETE",
              headers: getHeaders(),
            }
          );

          if (!res.ok) throw new Error("Delete failed");

          setAnnouncements((prev) =>
            prev.filter((item) => item.id !== id)
          );

          Swal.fire("Deleted!", "Announcement removed", "success");
        } catch (err) {
          Swal.fire("Error", err.message, "error");
        }
      }
    });
  };

  const resetForm = () => {
    setAnnouncement({
      section_id: "",
      title: "",
      description: "",
      meta_title: "",
      meta_description: "",
    });
    setEditingId(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-2xl font-bold mb-6">📢 Manage Announcements</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Section Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Section</label>
          <select
            name="section_id"
            value={announcement.section_id}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="">Select Section</option>
            {sections.map((sec) => (
              <option key={sec.id} value={sec.id}>
                {sec.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={announcement.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          value={announcement.description}
          onChange={handleChange}
          rows={4}
          placeholder="Description"
          className="w-full border px-4 py-2 rounded-lg"
        />

        {/* Meta Fields */}
        <input
          type="text"
          name="meta_title"
          value={announcement.meta_title}
          onChange={handleChange}
          placeholder="Meta Title"
          className="w-full border px-4 py-2 rounded-lg"
        />

        <textarea
          name="meta_description"
          value={announcement.meta_description}
          onChange={handleChange}
          rows={3}
          placeholder="Meta Description"
          className="w-full border px-4 py-2 rounded-lg"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            {editingId ? "Update" : "Publish"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Announcement List */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">All Announcements</h3>

        {announcements.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg mb-3 flex justify-between items-center"
          >
            <div>
              <h4 className="font-bold">{item.title}</h4>
              <p className="text-sm text-gray-600">
                Section ID: {item.section_id}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-400 px-3 py-1 rounded text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 px-3 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;