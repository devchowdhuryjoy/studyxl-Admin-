import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../Api/ApiBaseUrl";

const EditApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    status: "",
  });
  const [applicationInfo, setApplicationInfo] = useState({});

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(`${BASE_URL}/admin/agent-applications/${id}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await res.json();

        if (!res.ok) throw new Error(result.message || "Failed to fetch");

        if (!result.data) {
          throw new Error("No application data found");
        }

        const application = result.data;

        // Set application info for display
        setApplicationInfo({
          // student_name: application.student_name,
          // student_id: application.student_id,
          // program_name: application.program_name,
          // university_name: application.university_name,
          // agent_name: application.agent_name,
          student_name: application.student_snapshot?.student_name,
          student_id: application.student_snapshot?.student_id,
          program_name: application.program_snapshot?.program_name,
          university_name: application.program_snapshot?.university_name,
          agent_name: application.student_snapshot?.company_name,
        });

        // Set only status in form data
        setFormData({
          status: application.status || "Pending",
        });
      } catch (err) {
        console.error("Error fetching application:", err);
        setError(err.message);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: err.message,
          confirmButtonColor: "#EF4444",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Update Status?",
      text: `Do you want to change status to "${formData.status}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, update status!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setSubmitting(true);

    try {
      const token = localStorage.getItem("admin_token");

      // Send only status field
      const submitData = { status: formData.status };

      const response = await fetch(
        `${BASE_URL}/admin/agent-applications/update/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(submitData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update application");
      }

      if (!result.success) {
        throw new Error(result.message || "Update failed");
      }

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Application status updated successfully!",
        confirmButtonColor: "#10B981",
      });

      navigate(`/dashboard/agent-application/application-details/${id}`);
    } catch (err) {
      console.error("Update error:", err);

      await Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: err.message,
        confirmButtonColor: "#EF4444",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Discard Changes?",
      text: "Any unsaved changes will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, discard",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/dashboard/agent-application/application-details/${id}`);
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading application...
          </p>
          <p className="text-sm text-gray-500 mt-2">Application ID: {id}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
            Error Loading Application
          </h3>
          <p className="text-gray-600 text-center mb-2">{error}</p>
          <p className="text-sm text-gray-500 text-center mb-6">
            Application ID: {id}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusOptions = [
    {
      value: "Pending",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    { value: "Reviewed", color: "bg-blue-100 text-blue-800 border-blue-200" },
    {
      value: "Accepted",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    { value: "Rejected", color: "bg-red-100 text-red-800 border-red-200" },
  ];

  const getStatusColor = (status) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option ? option.color : "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition duration-200"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Update Application Status
                </h1>
                <p className="text-sm text-gray-600 mt-1">Application #{id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(formData.status)}`}
              >
                Current: {formData.status}
              </span>
            </div>
          </div>
        </div>

        {/* Application Info Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Application Information
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Student Name
                  </span>
                  <p className="text-lg font-semibold text-gray-900">
                    {applicationInfo.student_name || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Student ID
                  </span>
                  <p className="text-lg font-semibold text-gray-900">
                    {applicationInfo.student_id || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Agent Name
                  </span>
                  <p className="text-lg font-semibold text-gray-900">
                    {applicationInfo.agent_name || "N/A"}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Program Name
                  </span>
                  <p className="text-lg font-semibold text-gray-900">
                    {applicationInfo.program_name || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    University
                  </span>
                  <p className="text-lg font-semibold text-gray-900">
                    {applicationInfo.university_name || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">
                    Application ID
                  </span>
                  <p className="text-lg font-semibold text-gray-900">{id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Update Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Update Status
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select New Status
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <div className="space-y-4">
                  {statusOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`status-${option.value}`}
                        name="status"
                        value={option.value}
                        checked={formData.status === option.value}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label
                        htmlFor={`status-${option.value}`}
                        className="ml-3 flex items-center gap-2 cursor-pointer"
                      >
                        <span
                          className={`px-3 py-1.5 rounded-full text-sm font-medium border ${option.color}`}
                        >
                          {option.label}
                        </span>
                        <span className="text-gray-900">{option.value}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={submitting}
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Updating Status...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Update Status
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditApplication;
