import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const profileData = {
    name: "Alex Johnson",
    gender: "Non-binary",
    age: 28,
    city: "San Francisco",
    state: "California",
    contactNumber: "+1 (555) 123-4567",
    email: "alex.johnson@example.com",
    picture: "https://via.placeholder.com/150",
    area: "Uajal",
  };

  return (
<<<<<<< HEAD
    <div id="profile" className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden max-w-md w-full">
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 text-white">
=======
    <div
      id="profile"
      className="bg-gray-900 min-h-screen flex items-center justify-center p-6"
    >
      <div className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden max-w-md w-full">
        <div className="bg-gray-700 p-6 text-white">
>>>>>>> be47ff2 (added toast)
          <div className="flex flex-col items-center">
            <img
              src={profileData.picture}
              alt={`${profileData.name}'s profile`}
<<<<<<< HEAD
              className="w-32 h-32 rounded-full border-4 border-gray-800 shadow-xl object-cover"
            />
            <h2 className="mt-4 text-3xl font-extrabold">{profileData.name}</h2>
            <p className="text-lg opacity-80">{profileData.email}</p>
=======
              className="w-32 h-32 rounded-full border-4 border-gray-800 shadow-lg object-cover"
            />
            <h2 className="mt-4 text-3xl font-bold text-yellow-400">
              {profileData.name}
            </h2>
            <p className="text-lg opacity-90 text-gray-300">
              {profileData.email}
            </p>
>>>>>>> be47ff2 (added toast)
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <InfoItem label="Gender" value={profileData.gender} />
            <InfoItem label="Age" value={profileData.age} />
            <InfoItem label="Area" value={profileData.area} />
            <InfoItem label="City" value={profileData.city} />
            <InfoItem label="State" value={profileData.state} />
            <InfoItem
              label="Contact Number"
              value={profileData.contactNumber}
            />
          </div>
          <button
            onClick={() => navigate('/edit-profile')}
            className="mt-6 w-full py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors duration-200 ease-in-out"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
<<<<<<< HEAD
  <div className="flex justify-between items-center border-b p-2 border-gray-700 hover:bg-gray-800 transition-colors duration-200 ease-in-out rounded-md">
    <span className="text-gray-400 font-medium">{label}</span>
    <span className="text-gray-300">{value}</span>
=======
  <div className="flex justify-between items-center border-b border-gray-700 pb-2">
    <span className="text-yellow-400 font-medium">{label}</span>
    <span className="text-gray-200">{value}</span>
>>>>>>> be47ff2 (added toast)
  </div>
);

export default Profile;
