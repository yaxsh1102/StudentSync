import React, { useContext, useEffect, useState } from "react";
import { Search, Plus, Trash2 } from "lucide-react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loading from "./Loading";

const participants = [
  { name: "John Doe", email: "john@example.com", avatar: "/path/to/avatar1.jpg" },
  { name: "Jane Smith", email: "jane@example.com", avatar: "/path/to/avatar2.jpg" },
];

const Communities = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const {user,loader,setLoader,showToast,setRefresher,refresher} = useContext(AppContext)
  const [formValues, setFormValues] = useState({
   name: "",
  description: "",
  image:'' ,
  discord: "",
  x: "",
  }
  );
  const [photoPreview, setPhotoPreview] = useState("");
  const [userCreatedCommunities,setUserCreatedCommunities]= useState([])
  const [allCommunities,setAllCommunities]= useState([])

  useEffect(()=>{
    const getCommunities=async()=>{
      setLoader(true)
      try{
        const res = await axios.post('http://localhost:8000/api/v1/getcommunities/',{'email':user.email})

        if (res.data.status===200){
          setUserCreatedCommunities(res.data.userCreatedCommunities || []);
          setAllCommunities(res.data.allCommunities || [])
          setLoader(false)
          console.log(userCreatedCommunities)
          console.log(allCommunities)
        }else{
          showToast("Couldn't fetch communities")
        }
      }catch(err){
        showToast("some error occured while fetching communities "+err)
      }
    }
    getCommunities();
    
  },[refresher])

  const filterCommunities = (communities) =>
    communities.filter((community) =>
      community.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormValues({ ...formValues, image: file });
      setPhotoPreview(preview);
    }
  };

  const handleCreateCommunity = async() => {
    const { name, description, image, discord,x } = formValues;
  
    if (name && description && image && discord && x) {

      const newCommunity={
        name:name,
        description:description,
        image:image,
        discord:discord,
        x:x,
      }

      const formData = new FormData();
  
      formData.append('email', user.email);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('image', image); 
      formData.append('discord', discord);
      formData.append('x', x);
      
      try{
        setLoader(true)
        const res = await axios.post('http://localhost:8000/api/v1/createcommunity/', formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          })

        if (res.data.status===200){
          setRefresher('community')
          setUserCreatedCommunities([...userCreatedCommunities,newCommunity])
          setShowForm(false);
          setFormValues({
            name: "",
            description: "",
            image: "",
            discord: '',
            x: '',
          });
          setPhotoPreview("");
          showToast("Community Added Successfully !")
          setLoader(false)
          }else{
          showToast("Couldn't create Community")
        }
      }
      catch(err){
        showToast("Some error occured while creating Community "+err)
      }
  
      
    } else {
      console.log(formValues)
      alert("Please fill all fields and upload one photo.");
    }
  };
  

  const handleDelete = async(id) => {
    try{
      setLoader(true)
      const res = await axios.post('http://localhost:8000/api/v1/deletecommunity/', {'id':id})

      if (res.data.status===200){
        setRefresher('')
        setUserCreatedCommunities(userCreatedCommunities.filter((com)=>id!==com.id))
        setLoader(false)
        }else{
        showToast("Couldn't delete Community")
      }
    }
    catch(err){
      showToast("Some error occured while deleting Community "+err)
    }
  };

  if (loader){
    return(<Loading/>)
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col pl-24 px-8">
      <div className="bg-gray-900 pt-4 flex justify-between items-center px-8">
        <h1 className="text-2xl font-bold text-white">Communities</h1>
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search communities..."
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:border-yellow-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
          >
            <Plus size={20} className="mr-2" />
            Create Community
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md m-6 w-[100%] z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">
              Make Link New Community
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-red-400 hover:text-red-300"
            >
              <IoClose size={24} />
            </button>
          </div>
          <form className="space-y-4 w-full mx-auto">
            <div>
              <label className="block text-white">Name</label>
              <input
                type="text"
                name="name"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-white">Description</label>
              <textarea
                type="text"
                name="description"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>
            <div className="flex gap-4 pb-4">
              <div className="relative w-24 h-24 border border-gray-500 flex justify-center items-center">
                <label htmlFor="img-upload" className="cursor-pointer">
                  <MdOutlineAddAPhoto className="text-white" size={24} />
                </label>
                <input
                  type="file"
                  id="img-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="absolute inset-0 object-cover w-full h-full rounded-md"
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-white">Discord</label>{" "}
              <input
                name="discord"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.discord}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-white">X</label>{" "}
              <input
                name="x"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.x}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="button"
              onClick={handleCreateCommunity}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg w-full"
            >
              Create Community
            </button>
          </form>
        </div>
      )}

      <div className="space-y-24 p-8 my-10">
        {/* My Communities */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            My Communities
          </h2>
          <div className="space-y-6">
            {filterCommunities(userCreatedCommunities).map((community) => (
              <div
                key={community.id}
                className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center cursor-pointer"
              >
                
                <img
                  src={"http://localhost:8000"+community.image }
                  alt={community.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="w-full">
                <div  className="flex w-full justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    {community.name} 
                  </h3>
                  <span className="flex space-x-2">
                      <button onClick={()=>{handleDelete(community.id)}} className="text-red-400 hover:text-red-300 inline">
                        <Trash2 size={18} />
                      </button>
                    </span>
                  </div>
                  <p className="text-gray-400">{community.description}</p>
                  <div className="mt-2 space-x-2 text-white"> Links : 
                  <Link
                      to={community.discord}
                      className="text-yellow-400 hover:text-yellow-300 pl-10 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Discord
                    </Link>
                    <Link
                      to={community.x}
                      className="text-yellow-400 hover:text-yellow-300 pl-10 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      X
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            All Communities
          </h2>
          <div className="space-y-6">
            {filterCommunities(allCommunities).map((community) => (
              <div
                key={community.id}
                className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center cursor-pointer"
              >
                <img
                  src={"http://localhost:8000"+community.image}
                  alt={community.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {community.name}
                  </h3>
                  <p className="text-gray-400">{community.description}</p>
                  <div className="mt-2 space-x-2 text-white">
                    Links : 
                    <Link
                      to={community.discord}
                      className="text-yellow-400 hover:text-yellow-300 pl-10 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Discord
                    </Link>
                    <Link
                      to={community.x}
                      className="text-yellow-400 hover:text-yellow-300 pl-10 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      X
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communities;
