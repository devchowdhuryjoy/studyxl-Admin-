import React from "react";

const ProgramCreate = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Create a New Program
        </h1>

        <form className="space-y-5">
          {/* Destination */}
          <div>
            <label
              htmlFor="destination"
              className="block text-gray-700 font-medium mb-2"
            >
              Destination
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              placeholder="Enter destination"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          {/* Institution */}
          <div>
            <label
              htmlFor="institution"
              className="block text-gray-700 font-medium mb-2"
            >
              Institution (School)
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              placeholder="Enter institution name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          {/* Program */}
          <div>
            <label
              htmlFor="program"
              className="block text-gray-700 font-medium mb-2"
            >
              Program
            </label>
            <input
              type="text"
              id="program"
              name="program"
              placeholder="Enter program name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          {/* Field of Study */}
          <div>
            <label
              htmlFor="fieldOfStudy"
              className="block text-gray-700 font-medium mb-2"
            >
              Field of Study
            </label>
            <input
              type="text"
              id="fieldOfStudy"
              name="fieldOfStudy"
              placeholder="Enter field of study"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          {/* Intake */}
          <div>
            <label
              htmlFor="intake"
              className="block text-gray-700 font-medium mb-2"
            >
              Intake
            </label>
            <input
              type="text"
              id="intake"
              name="intake"
              placeholder="Enter intake (e.g. January 2025)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          {/* Program Tag */}
          <div>
            <label
              htmlFor="programTag"
              className="block text-gray-700 font-medium mb-2"
            >
              Program Tag
            </label>
            <input
              type="text"
              id="programTag"
              name="programTag"
              placeholder="Enter program tag (e.g. Scholarship, Nursing, etc.)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full md:w-auto bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-all duration-200"
            >
              Create Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramCreate;
