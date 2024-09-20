import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loading from "./Loading";

const Profile = () => {
  const {param}= useParams()
  const navigate = useNavigate();
  const {user,showToast,loader,setLoader} = useContext(AppContext) ;
  const [profileData,setProfileData] = useState(user)

  useEffect(()=>{
    const getProfile = async ()=>{
      setLoader(true)
      try{
        const res = await axios.post('http://localhost:8000/api/v1/getprofile/',{'id':param})

        if (res.data.status===200){
          setProfileData(res.data.profile)
          setLoader(false)
        }else{
          showToast("Couldn't fetch Profile")
        }
      }catch(err){
        showToast("Couldn't fetch Profile"+err)
      }
    }
    getProfile();
  },[param])

  // const userPic ="C:\\Users\\91903\\Desktop\\Full-Stack Development\\StudentSync-Sem-4-GroupProject\\studentsync\\frontend\\public\\user.png"

  if (loader){
    return(<Loading/>)
  }

  return (
    <div id="profile" className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden max-w-md w-full">
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 text-white">
          <div className="flex flex-col items-center">
            <img
              src={profileData.image ? "http://localhost:8000"+profileData.image : "user.png" }
              alt={`${profileData.name}'s profile`}
              className="w-32 h-32 rounded-full border-4 border-gray-800 shadow-xl object-cover"
            />
            <h2 className="mt-4 text-3xl font-extrabold">{profileData.name}</h2>
            <p className="text-lg opacity-80">{profileData.email}</p>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <InfoItem label="Gender" value={profileData.gender} />
            <InfoItem label="Age" value={profileData.birthdate} />
            <InfoItem label="Area" value={profileData.area} />
            <InfoItem label="City" value={profileData.city} />
            <InfoItem label="State" value={profileData.state} />
            <InfoItem
              label="Contact Number"
              value={profileData.phone}
            />
          </div>
          {param==user.id && <button
            onClick={() => navigate(`/edit-profile/${user.id}`)}
            className="mt-6 w-full py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors duration-200 ease-in-out"
          >
            Edit Profile
          </button>}
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="flex justify-between items-center border-b p-2 border-gray-700 hover:bg-gray-800 transition-colors duration-200 ease-in-out rounded-md">
    <span className="text-gray-400 font-medium">{label}</span>
    <span className="text-gray-300">{value}</span>
  </div>
);

export default Profile;
