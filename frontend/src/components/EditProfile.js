import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    gender: "Non-binary",
    age: 28,
    city: "San Francisco",
    state: "California",
    contactNumber: "+1 (555) 123-4567",
    email: "alex.johnson@example.com",
    area: "Uajal",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Updated profile data:", formData);
    navigate("/profile");
  };

  return (
    <div id="edit-profile" className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen flex items-center justify-center p-6">
      <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-6 text-white">
          <h2 className="text-3xl font-extrabold">Edit Profile</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <InputField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
              />
              <InputField
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
              <InputField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
              <InputField
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                type="number"
              />
              <InputField
                label="Area"
                name="area"
                value={formData.area}
                onChange={handleChange}
              />
              <InputField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <InputField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-slate-900 font-bold rounded-lg hover:bg-blue-400 transition-colors duration-200 ease-in-out"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-slate-300 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default EditProfile;
