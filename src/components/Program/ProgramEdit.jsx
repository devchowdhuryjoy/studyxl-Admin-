import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../Api/ApiBaseUrl";
import Swal from "sweetalert2";

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
        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
      />
    )}
  </div>
);

const ProgramEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [formData, setFormData] = useState({
    program_name: "",
    program_description: "",
    program_summary: "",
    program_level: "",
    duration: "",
    campus_city: "",
    success_chance: "",
    university_id: "",
    university_name: "",
    address: "",
    location: "",
    phone_number: "",
    program_level_id: "",
    intake_id: "",
    program_tag_id: "",
    field_of_study_id: "",
    field_of_study_name: "",
    program_tag_name: "",
    intake_name: "",
    study_permit_or_visa: "",
    nationality: "",
    education_country: "",
    last_level_of_study: "",
    grading_scheme: "",
    no_exam_status: "",
    open_date: "",
    submission_deadline: "",
    ielts_required: false,
    ielts_reading: "",
    ielts_writing: "",
    ielts_listening: "",
    ielts_speaking: "",
    ielts_overall: "",
    toefl_required: false,
    toefl_reading: "",
    toefl_writing: "",
    toefl_listening: "",
    toefl_speaking: "",
    toefl_overall: "",
    pte_required: false,
    pte_reading: "",
    pte_writing: "",
    pte_listening: "",
    pte_speaking: "",
    pte_overall: "",
    duolingo_required: false,
    duolingo_total: "",
    application_fee: "",
    application_short_desc: "",
    average_graduate_program: "",
    average_graduate_program_short_desc: "",
    average_undergraduate_program: "",
    average_undergraduate_program_short_desc: "",
    cost_of_living: "",
    cost_of_living_short_desc: "",
    average_gross_tuition: "",
    average_gross_tuition_short_desc: "",
    images: [],
    intake_months: [],
  });

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    if (imagePath.startsWith("http")) return imagePath;

    const domain = BASE_URL.replace("/api", "").replace(/\/$/, "");

    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

    return `${domain}${cleanPath}`;
  };

  const handleImageError = (e, fallbackText = "Program") => {
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
      const fetchProgram = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("admin_token");
          const response = await axios.get(
            `${BASE_URL}/admin/university-programs/${id}/edit`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          if (response.data.program) {
            let programData = response.data.program;

            if (
              typeof programData.images === "string" &&
              programData.images !== ""
            ) {
              try {
                programData.images = JSON.parse(programData.images);
              } catch (e) {
                programData.images = programData.images
                  .split(",")
                  .filter((x) => x);
              }
            } else if (!programData.images) {
              programData.images = [];
            }

            setFormData(programData);
          }
        } catch (error) {
          console.error("Error fetching program:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProgram();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    const monthId = formData.intake_months?.[0]?.id || formData.intake_id || 1;
    const {
      university_id,
      program_level_id,
      intake_id,
      program_tag_id,
      field_of_study_id,
    } = formData;

    const updateUrl = `${BASE_URL}/admin/university-programs/${university_id}/${program_level_id}/${intake_id}/${program_tag_id}/${field_of_study_id}/${monthId}/store`;

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (
        key === "images" ||
        key === "intake_months" ||
        key === "existing_images"
      )
        return;

      let value = formData[key];

      if (value === null || value === undefined) value = "";
      if (typeof value === "boolean") value = value ? 1 : 0;

      data.append(key, value);
    });

    if (Array.isArray(formData.images)) {
      formData.images.forEach((img, index) => {
        data.append(`existing_images[${index}]`, img);
      });
    }

    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        data.append("images[]", file);
      });
    }

    data.append("_method", "POST");
    Swal.fire({
      title: "Updating...",
      text: "Saving program changes.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const response = await axios.post(updateUrl, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Program has been updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => navigate("/dashboard/programs"));
      }
    } catch (err) {
      console.error("Update failed:", err.response?.data);
      const errorMsg =
        err.response?.data?.message || "An error occurred during update.";
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
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-primary p-6 text-white">
          <h2 className="text-2xl font-bold">Edit Full Program Profile</h2>
          <p className="text-green-100 text-sm">
            Update details and media for this program.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-12">
          {/* 1. University & Basic Info */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-3">
              <h3 className="font-bold text-lg text-blue-600 border-b pb-2">
                1. University & Basic Information
              </h3>
            </div>
            <FormField
              label="University Name"
              name="university_name"
              value={formData.university_name}
              onChange={handleInputChange}
            />
            <FormField
              label="University Phone"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
            <FormField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
            <FormField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <FormField
              label="Program Name"
              name="program_name"
              value={formData.program_name}
              onChange={handleInputChange}
            />
            <FormField
              label="Program Level"
              name="program_level"
              value={formData.program_level}
              onChange={handleInputChange}
            />
            <FormField
              label="Field of Study"
              name="field_of_study_name"
              value={formData.field_of_study_name}
              onChange={handleInputChange}
            />
            <FormField
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
            />
            <FormField
              label="Campus City"
              name="campus_city"
              value={formData.campus_city}
              onChange={handleInputChange}
            />
            <FormField
              label="Success Chance"
              name="success_chance"
              value={formData.success_chance}
              onChange={handleInputChange}
            />
            <FormField
              label="Program Tag"
              name="program_tag_name"
              value={formData.program_tag_name}
              onChange={handleInputChange}
            />
            <div className="md:col-span-3">
              <FormField
                label="Program Description"
                name="program_description"
                isTextArea
                value={formData.program_description}
                onChange={handleInputChange}
              />
            </div>
            <div className="md:col-span-3">
              <FormField
                label="Program Summary"
                name="program_summary"
                isTextArea
                value={formData.program_summary}
                onChange={handleInputChange}
              />
            </div>
          </section>

          {/* 2. Admission Details */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-gray-50 p-6 rounded-xl">
            <div className="md:col-span-3">
              <h3 className="font-bold text-lg text-emerald-600 border-b pb-2">
                2. Admission & Deadlines
              </h3>
            </div>
            <FormField
              label="Open Date"
              name="open_date"
              type="datetime-local"
              value={
                formData.open_date ? formData.open_date.substring(0, 16) : ""
              }
              onChange={handleInputChange}
            />
            <FormField
              label="Deadline"
              name="submission_deadline"
              type="datetime-local"
              value={
                formData.submission_deadline
                  ? formData.submission_deadline.substring(0, 16)
                  : ""
              }
              onChange={handleInputChange}
            />
            <FormField
              label="Intake Name"
              name="intake_name"
              value={formData.intake_name}
              onChange={handleInputChange}
            />
            <FormField
              label="Nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
            />
            <FormField
              label="Education Country"
              name="education_country"
              value={formData.education_country}
              onChange={handleInputChange}
            />
            <FormField
              label="Grading Scheme"
              name="grading_scheme"
              value={formData.grading_scheme}
              onChange={handleInputChange}
            />
            <FormField
              label="Visa Type"
              name="study_permit_or_visa"
              value={formData.study_permit_or_visa}
              onChange={handleInputChange}
            />
            <FormField
              label="Last Level of Study"
              name="last_level_of_study"
              value={formData.last_level_of_study}
              onChange={handleInputChange}
            />
            <FormField
              label="No Exam Status"
              name="no_exam_status"
              value={formData.no_exam_status}
              onChange={handleInputChange}
            />
          </section>

          {/* 3. Language Requirements */}
          <section className="space-y-8">
            <div className="md:col-span-3">
              <h3 className="font-bold text-lg text-orange-600 border-b pb-2">
                3. Language Requirements
              </h3>
            </div>

            {/* IELTS */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 border rounded-lg bg-white">
              <div className="col-span-full font-bold text-sm flex items-center gap-2 border-b pb-2">
                <input
                  type="checkbox"
                  name="ielts_required"
                  checked={formData.ielts_required}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />{" "}
                IELTS Requirements
              </div>
              <FormField
                label="Overall"
                name="ielts_overall"
                value={formData.ielts_overall}
                onChange={handleInputChange}
              />
              <FormField
                label="Reading"
                name="ielts_reading"
                value={formData.ielts_reading}
                onChange={handleInputChange}
              />
              <FormField
                label="Writing"
                name="ielts_writing"
                value={formData.ielts_writing}
                onChange={handleInputChange}
              />
              <FormField
                label="Listening"
                name="ielts_listening"
                value={formData.ielts_listening}
                onChange={handleInputChange}
              />
              <FormField
                label="Speaking"
                name="ielts_speaking"
                value={formData.ielts_speaking}
                onChange={handleInputChange}
              />
            </div>

            {/* TOEFL */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 border rounded-lg bg-white">
              <div className="col-span-full font-bold text-sm flex items-center gap-2 border-b pb-2">
                <input
                  type="checkbox"
                  name="toefl_required"
                  checked={formData.toefl_required}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />{" "}
                TOEFL Requirements
              </div>
              <FormField
                label="Overall"
                name="toefl_overall"
                value={formData.toefl_overall}
                onChange={handleInputChange}
              />
              <FormField
                label="Reading"
                name="toefl_reading"
                value={formData.toefl_reading}
                onChange={handleInputChange}
              />
              <FormField
                label="Writing"
                name="toefl_writing"
                value={formData.toefl_writing}
                onChange={handleInputChange}
              />
              <FormField
                label="Listening"
                name="toefl_listening"
                value={formData.toefl_listening}
                onChange={handleInputChange}
              />
              <FormField
                label="Speaking"
                name="toefl_speaking"
                value={formData.toefl_speaking}
                onChange={handleInputChange}
              />
            </div>

            {/* PTE */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 border rounded-lg bg-white">
              <div className="col-span-full font-bold text-sm flex items-center gap-2 border-b pb-2">
                <input
                  type="checkbox"
                  name="pte_required"
                  checked={formData.pte_required}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />{" "}
                PTE Requirements
              </div>
              <FormField
                label="Overall"
                name="pte_overall"
                value={formData.pte_overall}
                onChange={handleInputChange}
              />
              <FormField
                label="Reading"
                name="pte_reading"
                value={formData.pte_reading}
                onChange={handleInputChange}
              />
              <FormField
                label="Writing"
                name="pte_writing"
                value={formData.pte_writing}
                onChange={handleInputChange}
              />
              <FormField
                label="Listening"
                name="pte_listening"
                value={formData.pte_listening}
                onChange={handleInputChange}
              />
              <FormField
                label="Speaking"
                name="pte_speaking"
                value={formData.pte_speaking}
                onChange={handleInputChange}
              />
            </div>

            {/* Duolingo */}
            <div className="p-4 border rounded-lg bg-white flex flex-wrap gap-10 items-center">
              <div className="font-bold text-sm flex items-center gap-2">
                <input
                  type="checkbox"
                  name="duolingo_required"
                  checked={formData.duolingo_required}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />{" "}
                Duolingo Required
              </div>
              <div className="w-32">
                <FormField
                  label="Total Score"
                  name="duolingo_total"
                  value={formData.duolingo_total}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>

          {/* 4. Financial Details */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <h3 className="font-bold text-lg text-purple-600 border-b pb-2">
                4. Financial Cost & Program Details
              </h3>
            </div>
            <div className="space-y-4">
              <FormField
                label="Application Fee"
                name="application_fee"
                value={formData.application_fee}
                onChange={handleInputChange}
              />
              <FormField
                label="App Fee Description"
                name="application_short_desc"
                isTextArea
                value={formData.application_short_desc}
                onChange={handleInputChange}
              />

              <FormField
                label="Tuition Fee"
                name="average_gross_tuition"
                value={formData.average_gross_tuition}
                onChange={handleInputChange}
              />
              <FormField
                label="Tuition Description"
                name="average_gross_tuition_short_desc"
                isTextArea
                value={formData.average_gross_tuition_short_desc}
                onChange={handleInputChange}
              />

              <FormField
                label="Living Cost"
                name="cost_of_living"
                value={formData.cost_of_living}
                onChange={handleInputChange}
              />
              <FormField
                label="Living Cost Description"
                name="cost_of_living_short_desc"
                isTextArea
                value={formData.cost_of_living_short_desc}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-4">
              <FormField
                label="Undergraduate Program "
                name="average_undergraduate_program"
                value={formData.average_undergraduate_program}
                onChange={handleInputChange}
              />
              <FormField
                label="Undergraduate Description"
                name="average_undergraduate_program_short_desc"
                isTextArea
                value={formData.average_undergraduate_program_short_desc}
                onChange={handleInputChange}
              />

              <FormField
                label="Graduate Program "
                name="average_graduate_program"
                value={formData.average_graduate_program}
                onChange={handleInputChange}
              />
              <FormField
                label="Graduate Description"
                name="average_graduate_program_short_desc"
                isTextArea
                value={formData.average_graduate_program_short_desc}
                onChange={handleInputChange}
              />
            </div>
          </section>

          {/* Section 4: Gallery Management */}
          <section className="border-t pt-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
              Program Gallery
            </h3>

            {/* Existing Images Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
              {Array.isArray(formData.images) &&
                formData.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square group">
                    <img
                      src={getImageUrl(img)}
                      alt="Program"
                      onError={(e) =>
                        handleImageError(e, formData.program_name)
                      }
                      className="w-full h-full object-cover rounded-xl border shadow-sm group-hover:opacity-75 transition-opacity"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.images.filter(
                          (_, i) => i !== idx,
                        );
                        setFormData({ ...formData, images: updated });
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
            </div>

            {/* File Upload Box */}
            <div className="p-6 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/30">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload New Images
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white file:font-semibold hover:file:bg-blue-700 cursor-pointer"
              />

              {/* New Upload Previews */}
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
                      onClick={() => {
                        setSelectedFiles((prev) =>
                          prev.filter((_, i) => i !== idx),
                        );
                        setPreviews((prev) => prev.filter((_, i) => i !== idx));
                      }}
                      className="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* Form Actions */}
          <div className="frelative z-10 flex flex-col-reverse lg:flex-row lg:justify-end gap-4 pt-10 border-t">
            <button
              type="button"
              onClick={() => {
                if (window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate("/dashboard/programshow");
                }
              }}
              className="w-full lg:w-auto px-8 py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-12 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramEdit;
