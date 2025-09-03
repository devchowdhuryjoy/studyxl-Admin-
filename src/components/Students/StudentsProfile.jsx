import React, { useState } from 'react';


const StudentsProfile = () => {
  
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    passportNumber: '',
    passportExpiry: '',
    nationality: '',
    countryOfResidence: '',
    desiredProgram: '',
    preferredIntake: '',
    studyLevel: '',
    specialization: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md relative">
    

      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <p className="text-gray-600 mb-6">Complete your profile information below.</p>
      
      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold col-span-full mb-4">Personal Information</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter full name"
            />
          </div>
          {/* Add other fields as before */}
        </div>

        {/* Passport / Program Details sections here ... */}

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentsProfile;

