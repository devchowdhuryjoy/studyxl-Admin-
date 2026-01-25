import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Search, ChevronLeft, ChevronRight, Eye, Edit } from "lucide-react";
import BASE_URL from "../../Api/ApiBaseUrl";

const AllProgram = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    if (imagePath.startsWith("http")) return imagePath;

    const domain = BASE_URL.replace("/api", "").replace(/\/$/, "");

    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

    return `${domain}${cleanPath}`;
  };

  const getAlternativeImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;

    const baseUrl = BASE_URL.replace("/api", "");
    const cleanPath = imagePath.startsWith("/")
      ? imagePath.substring(1)
      : imagePath;
    return `${baseUrl}/storage/${cleanPath}`;
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
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/university-programs`);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data;
      setPrograms(data || []);
    } catch (error) {
      console.error("Error fetching programs:", error);
      Swal.fire("Error", "Failed to load programs", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (program) => {
    const { id, university_id } = program;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this program!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("admin_token");

      const response = await fetch(
        `${BASE_URL}/admin/universities/${university_id}/programs/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Status: ${response.status}`);
      }

      setPrograms((prev) => prev.filter((p) => p.id !== id));

      // Success Message
      Swal.fire({
        title: "Deleted!",
        text: "Program has been removed successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } catch (err) {
      // Error Message
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: `Failed to delete program: ${err.message}`,
        confirmButtonColor: "#d33",
      });
      console.error("Error:", err);
    }
  };

  const handleViewDetails = async (program) => {
    const programId = program.id;

    try {
      setModalLoading(true);
      setShowModal(true);

      const response = await axios.get(
        `${BASE_URL}/university-programs/details/${programId}`,
      );

      const details = response.data.data || response.data;
      let data = Array.isArray(details) ? details[0] : details;

      if (!data.images) {
        data.images = [];
      } else if (typeof data.images === "string") {
        try {
          data.images = JSON.parse(data.images);
        } catch (e) {
          data.images = data.images.split(",").filter((x) => x);
        }
      }

      setSelectedProgram(data);
      setActiveImageIndex(0);
    } catch (error) {
      console.error("Error fetching program details:", error);
      Swal.fire("Error", "Could not load program details", "error");
      setShowModal(false);
    } finally {
      setModalLoading(false);
    }
  };

  const filteredPrograms = programs.filter(
    (p) =>
      p.program_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.university_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  useEffect(() => {
    if (searchTerm && filteredPrograms.length === 0) {
      setError(`No programs found matching "${searchTerm}"`);
    } else {
      setError(null);
    }
  }, [searchTerm, filteredPrograms.length]);

  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
  const currentItems = filteredPrograms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading Programs...</p>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              University Programs
            </h1>
            <p className="text-sm text-gray-500">
              Manage all educational programs and intakes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search program or uni..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {programs.length}
                </div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </div>
          </div>
        </div>
        {/* Error Message Section */}
        {error && (
          <div className="max-w-7xl mx-auto mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-bold text-red-800">Search Alert</p>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-auto text-xs font-bold text-red-500 hover:underline uppercase tracking-widest"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((program) => {
            let images = [];
            try {
              if (Array.isArray(program.images)) {
                images = program.images;
              } else if (
                typeof program.images === "string" &&
                program.images.trim() !== ""
              ) {
                images = program.images.startsWith("[")
                  ? JSON.parse(program.images)
                  : program.images.split(",").filter((x) => x.trim());
              }
            } catch (e) {
              console.error("Image parsing error", e);
              images = [];
            }

            const displayImg = images.length > 0 ? images[0] : null;
            const primaryUrl = getImageUrl(displayImg);
            const secondaryUrl = getAlternativeImageUrl(displayImg);
            return (
              <div
                key={program.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="relative h-44 bg-gray-200">
                  <img
                    src={primaryUrl}
                    alt={program.program_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (e.target.src !== secondaryUrl && secondaryUrl) {
                        e.target.src = secondaryUrl;
                      } else {
                        handleImageError(e, program.program_name);
                      }
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                    {program.program_tag_name || "Active"}
                  </div>
                </div>

                <div className="pt-8 px-6 pb-6">
                  <h3 className="text-xl font-bold text-gray-800 truncate mb-1">
                    {program.program_name}
                  </h3>
                  <p className="text-sm text-blue-600 font-semibold mb-4">
                    {program.university_name}
                  </p>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPinIcon />
                    <span className="text-sm">
                      {program.campus_city || "City Not Specified"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">
                        Tuition
                      </p>
                      <p className="font-bold text-gray-800 text-sm">
                        ${program.average_gross_tuition || "N/A"}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">
                        Duration
                      </p>
                      <p className="font-bold text-gray-800 text-sm truncate">
                        {program.duration || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t items-center">
                    <button
                      onClick={() => handleViewDetails(program)}
                      className="text-blue-600 hover:text-blue-800 font-bold text-sm flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-1" /> View
                    </button>

                    <div className="flex space-x-4">
                      <Link
                        to={`/dashboard/programs/edit/${program.id}`}
                        className="text-green-600 hover:text-green-800 font-bold text-sm flex items-center"
                      >
                        <Edit className="w-4 h-4 mr-1" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(program)}
                        className="text-red-600 hover:text-red-800 font-bold text-sm flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
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
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination logic */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-2 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-40 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-bold text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-2 border rounded-lg bg-white hover:bg-gray-100 disabled:opacity-40 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
              onClick={() => setShowModal(false)}
            ></div>

            <div className="flex items-center justify-center min-h-screen p-4">
              <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col">
                {modalLoading ? (
                  <div className="p-20 text-center flex flex-col items-center">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-500 font-medium">
                      Fetching detailed information...
                    </p>
                  </div>
                ) : (
                  selectedProgram && (
                    <>
                      {/* Modal Header */}
                      <div className="sticky top-0 z-20 bg-white border-b border-slate-100 p-5 flex justify-between items-center">
                        <div>
                          <h2 className="text-2xl font-extrabold text-blue-900 leading-tight">
                            {selectedProgram.program_name}
                          </h2>
                          <p className="text-blue-500 text-sm font-medium flex items-center gap-1">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            Program Details
                          </p>
                        </div>
                        <button
                          onClick={() => setShowModal(false)}
                          className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-slate-50 transition-all"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Modal Content */}
                      <div className="overflow-y-auto flex-1 p-6 space-y-8 scrollbar-thin scrollbar-thumb-slate-200">
                        {/* 1. Image Gallery Section */}
                        {selectedProgram.images?.length > 0 && (
                          <div className="space-y-3">
                            <div className="relative h-80 rounded-2xl overflow-hidden border border-slate-100 shadow-inner bg-slate-50">
                              <img
                                src={getImageUrl(
                                  selectedProgram.images[activeImageIndex],
                                )}
                                className="w-full h-full object-contain"
                                onError={(e) => handleImageError(e, "Preview")}
                              />
                              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                                Image {activeImageIndex + 1} of{" "}
                                {selectedProgram.images.length}
                              </div>
                            </div>

                            {/* Thumbnails */}
                            {selectedProgram.images.length > 1 && (
                              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {selectedProgram.images.map((img, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-x-auto border-2 transition-all 
                                    ${idx === activeImageIndex ? "border-blue-600 ring-2 ring-blue-100" : "border-transparent opacity-70 hover:opacity-100"}`}
                                  >
                                    <img
                                      key={idx}
                                      src={getImageUrl(img)}
                                      onClick={() => setActiveImageIndex(idx)}
                                      className={`w-20 h-20 rounded-lg object-cover cursor-pointer border-2 ${idx === activeImageIndex ? "border-blue-600" : "border-transparent"}`}
                                      onError={(e) =>
                                        handleImageError(e, "Img")
                                      }
                                    />
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* 2. Top Stats & Contact Info */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <p className="text-[10px] text-slate-400 uppercase font-black mb-1">
                                Level
                              </p>
                              <p className="text-sm font-bold text-slate-800">
                                {selectedProgram.program_level}
                              </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <p className="text-[10px] text-slate-400 uppercase font-black mb-1">
                                Duration
                              </p>
                              <p className="text-sm font-bold text-slate-800">
                                {selectedProgram.duration}
                              </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <p className="text-[10px] text-slate-400 uppercase font-black mb-1">
                                Study Field
                              </p>
                              <p className="text-sm font-bold text-slate-800">
                                {selectedProgram.field_of_study_name}
                              </p>
                            </div>
                            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                              <p className="text-[10px] text-emerald-500 uppercase font-black mb-1">
                                Success
                              </p>
                              <p className="text-sm font-bold text-emerald-700">
                                {selectedProgram.success_chance}
                              </p>
                            </div>
                          </div>

                          <div className="p-5 bg-slate-900 rounded-2xl text-white">
                            <h4 className="text-[10px] text-slate-400 uppercase font-black mb-3 tracking-widest">
                              Contact Information
                            </h4>
                            <div className="space-y-3 text-xs">
                              <p className="flex items-center gap-2">
                                <span className="text-blue-400">📍</span>{" "}
                                {selectedProgram.address},{" "}
                                {selectedProgram.location}
                              </p>
                              <p className="flex items-center gap-2">
                                <span className="text-blue-400">📞</span>{" "}
                                {selectedProgram.phone_number}
                              </p>
                              <p className="flex items-center gap-2">
                                <span className="text-blue-400">🏢</span>{" "}
                                {selectedProgram.campus_city}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 3. English Score Matrix */}
                        <section className="space-y-4">
                          <h3 className="text-lg font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                            English Proficiency
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* IELTS Box */}
                            <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
                              <div className="flex justify-between items-center mb-4">
                                <span className="font-black text-blue-600">
                                  IELTS
                                </span>
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-lg font-black">
                                  {selectedProgram.ielts_overall}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-400 uppercase">
                                <div className="flex justify-between border-b pb-1">
                                  <span>Read:</span>{" "}
                                  <span className="text-slate-700">
                                    {selectedProgram.ielts_reading}
                                  </span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                  <span>Write:</span>{" "}
                                  <span className="text-slate-700">
                                    {selectedProgram.ielts_writing}
                                  </span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                  <span>List:</span>{" "}
                                  <span className="text-slate-700">
                                    {selectedProgram.ielts_listening}
                                  </span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                  <span>Speak:</span>{" "}
                                  <span className="text-slate-700">
                                    {selectedProgram.ielts_speaking}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* TOEFL */}
                            <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
                              <div className="flex justify-between items-center mb-4">
                                <span className="font-black text-blue-600">
                                  TOEFL
                                </span>
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-lg font-black">
                                  {selectedProgram.toefl_overall}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-400 uppercase">
                                <div className="flex justify-between border-b pb-1">
                                  <span>Read:</span>{" "}
                                  <span className="text-slate-700">
                                    {selectedProgram.toefl_reading}
                                  </span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                  <span>Write:</span>{" "}
                                  <span className="text-slate-700">
                                    {selectedProgram.toefl_writing}
                                  </span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                  <span>List:</span>{" "}
                                  <span className="text-slate-700">
                                    {selectedProgram.toefl_listening}
                                  </span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                  <span>Speak:</span>{" "}
                                  <span className="text-slate-700">
                                    {selectedProgram.toefl_speaking}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {/* PTE Box */}
                            <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
                              <div className="flex justify-between items-center mb-4">
                                <span className="font-black text-indigo-600">
                                  PTE
                                </span>
                                <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-lg font-black">
                                  {selectedProgram.pte_overall}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-400 uppercase">
                                <div className="flex justify-between border-b pb-1">
                                  <span>Read:</span>{" "}
                                  <span className="text-slate-700">
                                    {selectedProgram.pte_reading}
                                  </span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                  <span>Write:</span>{" "}
                                  <span className="text-slate-700">
                                    {selectedProgram.pte_writing}
                                  </span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                  <span>List:</span>{" "}
                                  <span className="text-slate-700">
                                    {selectedProgram.pte_listening}
                                  </span>
                                </div>
                                <div className="flex justify-between border-b pb-1">
                                  <span>Speak:</span>{" "}
                                  <span className="text-slate-700">
                                    {selectedProgram.pte_speaking}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {/* Duolingo Box */}
                            <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col items-center justify-center">
                              <span className="font-black text-purple-600 mb-1">
                                DUOLINGO
                              </span>
                              <span className="text-4xl font-black text-slate-800">
                                {selectedProgram.duolingo_total}
                              </span>
                              <span className="text-[10px] text-slate-400 mt-2 uppercase font-black">
                                Total Score
                              </span>
                            </div>
                          </div>
                        </section>

                        {/* 4. Costs Section */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200">
                            <h4 className="text-emerald-800 font-bold mb-4 flex items-center gap-2">
                              <span className="p-1 bg-emerald-200 rounded text-xs">
                                💰
                              </span>{" "}
                              Tuition & Fees
                            </h4>
                            <div className="space-y-4">
                              <div>
                                <p className="text-3xl font-black text-emerald-700">
                                  ${selectedProgram.average_gross_tuition}
                                </p>
                                <p className="text-xs text-emerald-600 mt-1">
                                  {
                                    selectedProgram.average_gross_tuition_short_desc
                                  }
                                </p>
                              </div>
                              <div className="pt-4 border-t border-emerald-200">
                                <p className="text-xs font-bold text-emerald-800 uppercase">
                                  Application Fee
                                </p>
                                <p className="text-xl font-black text-emerald-600">
                                  ${selectedProgram.application_fee}
                                </p>
                                <p className="text-[10px] text-emerald-600">
                                  {selectedProgram.application_short_desc}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200">
                            <h4 className="text-amber-800 font-bold mb-4 flex items-center gap-2">
                              <span className="p-1 bg-amber-200 rounded text-xs">
                                🏠
                              </span>{" "}
                              Cost of Living
                            </h4>
                            <div className="space-y-2">
                              <p className="text-3xl font-black text-amber-700">
                                ${selectedProgram.cost_of_living}
                              </p>
                              <p className="text-xs text-amber-600">
                                {selectedProgram.cost_of_living_short_desc}
                              </p>
                              <div className="mt-6 p-3 bg-white/50 rounded-xl text-[11px] text-amber-900 italic">
                                "Estimated annual costs for housing, food, and
                                local transport."
                              </div>
                            </div>
                          </div>
                        </section>

                        {/* 5. Summary Section */}
                        <section className="space-y-6">
                          <h3 className="text-lg font-bold text-slate-900 border-l-4 border-blue-600 pl-3">
                            Program Overviews
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Graduate Info Card */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                                  Graduate
                                </span>
                                <h4 className="font-bold text-slate-800">
                                  {selectedProgram.average_graduate_program}
                                </h4>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 italic">
                                "
                                {selectedProgram.average_graduate_program_short_desc ||
                                  "No description available."}
                                "
                              </p>
                            </div>

                            {/* Undergraduate Info Card */}
                            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                                  Undergraduate
                                </span>
                                <h4 className="font-bold text-slate-800">
                                  {
                                    selectedProgram.average_undergraduate_program
                                  }
                                </h4>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 italic">
                                "
                                {selectedProgram.average_undergraduate_program_short_desc ||
                                  "No description available."}
                                "
                              </p>
                            </div>
                          </div>

                          {/* Full Description Section */}
                          <div className="bg-slate-900 p-6 rounded-2xl text-white relative overflow-hidden">
                            {/* Decorative Background Icon */}
                            <div className="absolute -right-4 -bottom-4 opacity-10 transform -rotate-12">
                              <svg
                                className="w-32 h-32"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2L1 21h22L12 2zm0 3.45l8.15 14.1H3.85L12 5.45z" />
                              </svg>
                            </div>

                            <h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] mb-3">
                              Main Program Summary
                            </h3>
                            <p className="text-slate-300 leading-relaxed text-sm md:text-base relative z-10">
                              {selectedProgram.program_summary}
                            </p>
                          </div>
                        </section>
                      </div>

                      {/* Modal Footer */}
                      <div className="sticky bottom-0 bg-white border-t border-slate-100 p-5 flex justify-end gap-3">
                        <button
                          onClick={() => setShowModal(false)}
                          className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-all"
                        >
                          Close
                        </button>
                        <Link
                          to={`/dashboard/programs/edit/${selectedProgram.id}`}
                          className="px-8 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all"
                        >
                          Edit Program
                        </Link>
                      </div>
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper SVG component for location
const MapPinIcon = () => (
  <svg
    className="w-4 h-4 mr-2 text-gray-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

export default AllProgram;
