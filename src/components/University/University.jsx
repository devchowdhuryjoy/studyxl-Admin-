import React, { useRef, useState } from "react";

const emptyForm = {
  name: "",
  location: "",
  description: "",
  featured: true,
  imageFile: null,
  imagePreview: "",
};

const AdminUniversityForm = ({ onCreate }) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "University name is required";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.imageFile) e.imageFile = "An image is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((p) => ({ ...p, imageFile: "Please select an image file" }));
      return;
    }
    const preview = URL.createObjectURL(file);
    setForm((p) => ({ ...p, imageFile: file, imagePreview: preview }));
    setErrors((p) => ({ ...p, imageFile: undefined }));
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const card = {
      id: crypto.randomUUID(),
      name: form.name,
      location: form.location,
      description: form.description,
      featured: form.featured,
      image: form.imagePreview,
    };
    onCreate?.(card);

    // reset
    setForm(emptyForm);
    setErrors({});
    fileInputRef.current.value = "";
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add University</h1>
        <p className="text-gray-600 mt-1">
          Upload the banner image and fill the details to create a featured card.
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Image uploader */}
        <div className="lg:col-span-1">
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`group relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 h-64 cursor-pointer transition shadow-sm hover:shadow-md ${
              errors.imageFile ? "border-red-400" : "border-gray-300"
            }`}
            onClick={() => fileInputRef.current.click()}
          >
            {form.imagePreview ? (
              <>
                <img
                  src={form.imagePreview}
                  alt="preview"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 rounded-2xl bg-black/30 flex items-end p-3">
                  <span className="text-white text-sm">
                    Click to replace • or drag & drop
                  </span>
                </div>
              </>
            ) : (
              <div className="text-center space-y-2">
                <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  ⬆️
                </div>
                <div className="text-gray-800 font-medium">
                  Drag & drop image here
                </div>
                <div className="text-gray-500 text-sm">or click to browse</div>
                <div className="text-[11px] text-gray-400">
                  JPG / PNG / WEBP • up to 5MB
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>
          {errors.imageFile && (
            <p className="text-red-500 text-sm mt-2">{errors.imageFile}</p>
          )}

          {/* Featured toggle */}
          <label className="mt-4 flex items-center gap-3">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={form.featured}
              onChange={(e) =>
                setForm((p) => ({ ...p, featured: e.target.checked }))
              }
            />
            <span className="w-12 h-7 rounded-full bg-gray-300 peer-checked:bg-primary relative transition-all">
              <span className="absolute top-1 left-1 h-5 w-5 bg-white rounded-full shadow transition-all peer-checked:translate-x-5" />
            </span>
            <span className="text-sm text-gray-700">Mark as Featured</span>
          </label>
        </div>

        {/* Text fields */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm((p) => ({ ...p, name: e.target.value }))
              }
              className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50 ${
                errors.name ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Western University"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) =>
                setForm((p) => ({ ...p, location: e.target.value }))
              }
              className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50 ${
                errors.location ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="London, Ontario, CA"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows={6}
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-600/50 ${
                errors.description ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Write a short highlight about the university..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-primary text-white font-semibold shadow hover:bg-secondary transition"
            >
              Save University
            </button>
            <button
              type="button"
              onClick={() => {
                setForm(emptyForm);
                setErrors({});
                fileInputRef.current.value = "";
              }}
              className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

/* ---- Optional: preview the created cards below the form ---- */
const Card = ({ uni }) => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden">
    <div className="relative">
      <img src={uni.image} alt={uni.name} className="w-full h-48 object-cover" />
      {uni.featured && (
        <span className="absolute top-2 left-2 bg-purple-700 text-white text-xs px-3 py-1 rounded-full">
          • Featured
        </span>
      )}
    </div>
    <div className="p-4">
      <h2 className="text-lg font-bold">{uni.name}</h2>
      <p className="text-sm text-gray-600 mb-2">{uni.location}</p>
      <p className="text-gray-700 text-sm line-clamp-4">{uni.description}</p>
    </div>
  </div>
);

const University = () => {
  const [list, setList] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminUniversityForm onCreate={(card) => setList((l) => [card, ...l])} />

      {list.length > 0 && (
        <div className="max-w-5xl mx-auto p-6 pt-0">
          <h3 className="text-xl font-semibold mb-4">Preview</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {list.map((u) => (
              <Card key={u.id} uni={u} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default University;
