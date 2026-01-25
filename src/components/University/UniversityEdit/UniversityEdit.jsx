import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import BASE_URL from "../../../Api/ApiBaseUrl";

const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  isTextArea = false,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    {isTextArea ? (
      <textarea
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        rows="3"
        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      />
    )}
  </div>
);

const UniversityEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [formData, setFormData] = useState({
    university_name: "",
    address: "",
    phone_number: "",
    destination_id: "",
    founded: "",
    school_id: "",
    institution_type: "",
    dli_number: "",
    university_desc: "",
    application_fee: "",
    application_short_desc: "",
    cost_of_living: "",
    cost_of_living_short_desc: "",
    average_gross_tuition: "",
    average_gross_tuition_short_desc: "",
    average_graduate_program: "",
    average_graduate_program_short_desc: "",
    average_undergraduate_program: "",
    average_undergraduate_program_short_desc: "",
    images: [],
    top_disciplines: [{ discipline: "", percentage: "" }],
  });

 
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    const domain = BASE_URL.replace("/api", "").replace(/\/$/, "");
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${domain}${cleanPath}`;
  };

  const handleImageError = (e, fallbackText = "University") => {
    e.target.onerror = null;
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 250;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#E5E7EB";
    ctx.fillRect(0, 0, 400, 250);
    ctx.fillStyle = "#6B7280";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(fallbackText, 200, 125);
    e.target.src = canvas.toDataURL();
  };

  useEffect(() => {
    if (id) {
      const fetchUniversity = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("admin_token");
          const response = await axios.get(
            `${BASE_URL}/admin/universities/edit/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          if (response.data.status && response.data.data) {
            const uniData = Array.isArray(response.data.data)
              ? response.data.data[0]
              : response.data.data;
            console.log(uniData);
            setFormData(uniData);
          }
        } catch (error) {
          console.error("Error fetching university:", error);
          Swal.fire("Error", "Failed to load university data", "error");
        } finally {
          setLoading(false);
        }
      };
      fetchUniversity();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDisciplineChange = (index, field, value) => {
    const updatedDisciplines = [...formData.top_disciplines];
    updatedDisciplines[index][field] = value;
    setFormData({ ...formData, top_disciplines: updatedDisciplines });
  };

  const addDiscipline = () => {
    setFormData({
      ...formData,
      top_disciplines: [
        ...formData.top_disciplines,
        { discipline: "", percentage: "" },
      ],
    });
  };

  const removeDiscipline = (index) => {
    const updatedDisciplines = formData.top_disciplines.filter(
      (_, i) => i !== index,
    );
    setFormData({ ...formData, top_disciplines: updatedDisciplines });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeExistingImage = (imgIndex) => {
    const updatedImages = formData.images.filter(
      (_, index) => index !== imgIndex,
    );
    setFormData({ ...formData, images: updatedImages });
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previews[index]);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCancel = () => navigate("/dashboard/universityshow");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");

    Swal.fire({
      title: "Updating...",
      text: "Please wait while we save the changes.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const universityId = id;
    const destinationId = formData.destination_id || "1";
    const updateUrl = `${BASE_URL}/admin/universities/update/${universityId}/${destinationId}`;

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "top_disciplines") {
        data.append(
          "top_disciplines",
          JSON.stringify(formData.top_disciplines),
        );
      } else if (key === "images") {
        formData.images.forEach((img) => {
          data.append("existing_images[]", img);
        });
      } else {
        data.append(key, formData[key] ?? "");
      }
    });

    selectedFiles.forEach((file) => data.append("images[]", file));
    data.append("_method", "POST");

    try {
      const response = await axios.post(updateUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status) {
       
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "University profile has been updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/dashboard/universityshow");
        });
      }
    } catch (err) {
      console.error("Update failed:", err);
   
      const errorMsg =
        err.response?.data?.errors?.top_disciplines?.[0] ||
        err.response?.data?.message ||
        "An error occurred during update.";
      Swal.fire("Update Failed", errorMsg, "error");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading all data</p>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-primary p-6">
          <h2 className="text-2xl font-bold text-white">
            Edit University Profile
          </h2>
          <p className="text-green-100 text-sm">
            Update details and media for this institution.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-10">
          {/* Section 1: Basic Info */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="University Name"
                name="university_name"
                value={formData.university_name}
                onChange={handleInputChange}
              />
              <FormField
                label="Institution Type"
                name="institution_type"
                value={formData.institution_type}
                onChange={handleInputChange}
                placeholder="e.g. Public, Private"
              />
              <FormField
                label="DLI Number"
                name="dli_number"
                value={formData.dli_number}
                onChange={handleInputChange}
              />
              <FormField
                label="School ID"
                name="school_id"
                value={formData.school_id}
                onChange={handleInputChange}
              />
              <FormField
                label="Founded Year"
                name="founded"
                type="number"
                value={formData.founded}
                onChange={handleInputChange}
              />
              <FormField
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
              />
              <div className="md:col-span-2">
                <FormField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:col-span-2">
                <FormField
                  label="General Description"
                  name="university_desc"
                  isTextArea
                  value={formData.university_desc}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* Section 2: Programs */}
          <section className="bg-gray-50 -mx-6 md:-mx-8 p-6 md:p-8 border-y border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
              Programs & Admissions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                label="Application Fee"
                name="application_fee"
                value={formData.application_fee}
                onChange={handleInputChange}
              />
              <div className="md:col-span-2">
                <FormField
                  label="Application Overview"
                  name="application_short_desc"
                  isTextArea
                  value={formData.application_short_desc}
                  onChange={handleInputChange}
                />
              </div>
              <FormField
                label="Graduate Program"
                name="average_graduate_program"
                value={formData.average_graduate_program}
                onChange={handleInputChange}
              />
              <div className="md:col-span-2">
                <FormField
                  label="Graduate Description"
                  name="average_graduate_program_short_desc"
                  isTextArea
                  value={formData.average_graduate_program_short_desc}
                  onChange={handleInputChange}
                />
              </div>
              <FormField
                label="Undergraduate Program"
                name="average_undergraduate_program"
                value={formData.average_undergraduate_program}
                onChange={handleInputChange}
              />
              <div className="md:col-span-2">
                <FormField
                  label="Undergraduate Description"
                  name="average_undergraduate_program_short_desc"
                  isTextArea
                  value={formData.average_undergraduate_program_short_desc}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* Section 3: Cost */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
              Cost & Financials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <FormField
                  label="Living Cost"
                  name="cost_of_living"
                  value={formData.cost_of_living}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Living Cost Details"
                  name="cost_of_living_short_desc"
                  isTextArea
                  value={formData.cost_of_living_short_desc}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  label="Tuition Fee"
                  name="average_gross_tuition"
                  value={formData.average_gross_tuition}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Tuition Details"
                  name="average_gross_tuition_short_desc"
                  isTextArea
                  value={formData.average_gross_tuition_short_desc}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* Section 4: Disciplines */}
          <section className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                Top Disciplines
              </h3>
              <button
                type="button"
                onClick={addDiscipline}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold border border-blue-200 hover:bg-blue-100"
              >
                Add Discipline
              </button>
            </div>
            <div className="space-y-3">
              {formData.top_disciplines?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-4 items-end bg-white border border-gray-200 p-4 rounded-xl shadow-sm"
                >
                  <div className="flex-1 w-full">
                    <label className="text-xs font-bold text-blue-600 uppercase mb-1 block">
                      Discipline Name
                    </label>
                    <input
                      placeholder="e.g. Computer Science"
                      value={item.discipline}
                      onChange={(e) =>
                        handleDisciplineChange(
                          index,
                          "discipline",
                          e.target.value,
                        )
                      }
                      className="w-full border-b-2 border-gray-100 focus:border-blue-500 outline-none p-2"
                    />
                  </div>
                  <div className="w-full sm:w-32">
                    <label className="text-xs font-bold text-blue-600 uppercase mb-1 block">
                      Percentage (%)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={item.percentage}
                      onChange={(e) =>
                        handleDisciplineChange(
                          index,
                          "percentage",
                          e.target.value,
                        )
                      }
                      className="w-full border-b-2 border-gray-100 focus:border-blue-500 outline-none p-2"
                    />
                  </div>
                  {formData.top_disciplines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDiscipline(index)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Gallery */}
          <section className="border-t pt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Gallery Management
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
              {formData.images?.map((img, idx) => (
                <div key={idx} className="relative aspect-square">
                  <img
                    src={getImageUrl(img)}
                    alt="University"
                    onError={(e) =>
                      handleImageError(e, formData.university_name)
                    }
                    className="w-full h-full object-cover rounded-xl border"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="p-6 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/30">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white"
              />
              <div className="mt-4 flex gap-3 flex-wrap">
                {previews.map((url, idx) => (
                  <div key={idx} className="relative w-20 h-20">
                    <img
                      src={url}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg border shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(idx)}
                      className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 text-[10px]"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-3 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-10 py-3 bg-primary text-white rounded-lg font-bold shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UniversityEdit;
