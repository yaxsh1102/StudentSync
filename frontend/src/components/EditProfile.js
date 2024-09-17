import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, showToast } = useContext(AppContext);
  const [formData, setFormData] = useState(user);
  const [profileImage, setProfileImage] = useState(null); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]); 
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (profileImage) {
      formDataToSend.append("image", profileImage);
    }

    try {
      const res = await axios.post("http://localhost:8000/api/v1/updateprofile/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

      showToast("Profile updated successfully!", "success");
      navigate("/profile");
    } catch (error) {
      showToast("Failed to update profile", "error");
      console.error("Profile update error:", error);
    }
  };

  return (
    <div id="edit-profile" className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen flex items-center justify-center p-6">
      <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full">
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-6 text-white">
          <h2 className="text-3xl font-extrabold">Edit Profile</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
              <InputField label="Email" name="email" value={formData.email} type="email" disabled={true} />
              <InputField label="Contact Number" name="phone" value={formData.phone} onChange={handleChange} />
              <InputField label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
              <InputField label="Birthdate" name="birthdate" value={formData.birthdate} onChange={handleChange} type="date" />
              <InputField label="Area" name="area" value={formData.area} onChange={handleChange} />
              <InputField label="City" name="city" value={formData.city} onChange={handleChange} />
              <InputField label="State" name="state" value={formData.state} onChange={handleChange} />
              
              {/* Profile Image Upload Field */}
              <div className="flex flex-col space-y-2">
                <label className="text-slate-300 font-medium">Profile Image</label>
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
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

// InputField component
const InputField = ({ label, name, disabled = false, value, onChange, type = "text" }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-slate-300 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="bg-slate-800 text-white p-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default EditProfile;
