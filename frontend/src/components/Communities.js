import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const participants = [
  { name: "John Doe", email: "john@example.com", avatar: "/path/to/avatar1.jpg" },
  { name: "Jane Smith", email: "jane@example.com", avatar: "/path/to/avatar2.jpg" },
];

const Communities = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    desc: "",
    image: "",
    social_links: [],
    messages: [],
  });
  const [photoPreview, setPhotoPreview] = useState("");

  const userJoinedCommunities = [
    {
      id: 1,
      name: "Tech Innovators",
      desc: "Link community for discussing technology innovations.",
      image: "https://via.placeholder.com/150",
      social_links: {
        twitter: "https://twitter.com/techinnovators",
        facebook: "https://facebook.com/techinnovators",
      },
      user_id: [1, 2, 3],
      messages: [
        { user: "Alice", content: "Hey, how's everyone doing?" },
        { user: "Bob", content: "Doing great! Excited for the next meetup." },
      ],
    },
    {
      id: 2,
      name: "Art Lovers",
      desc: "Link place to share and discuss art pieces.",
      image: "https://via.placeholder.com/150",
      social_links: {
        twitter: "https://twitter.com/artlovers",
        instagram: "https://instagram.com/artlovers",
      },
      user_id: [4, 5, 6],
      messages: [
        { user: "Eve", content: "Check out this new artwork I just made!" },
        { user: "Dave", content: "Wow, that's beautiful!" },
      ],
    },
  ];

  const userCreatedCommunities = [
    {
      id: 1,
      name: "Tech Innovators",
      desc: "Link community for discussing technology innovations.",
      image: "https://via.placeholder.com/150",
      social_links: {
        twitter: "https://twitter.com/techinnovators",
        facebook: "https://facebook.com/techinnovators",
      },
      user_id: [1, 2, 3],
      messages: [
        { user: "Alice", content: "Hey, how's everyone doing?" },
        { user: "Bob", content: "Doing great! Excited for the next meetup." },
      ],
    },
    {
      id: 2,
      name: "Art Lovers",
      desc: "Link place to share and discuss art pieces.",
      image: "https://via.placeholder.com/150",
      social_links: {
        twitter: "https://twitter.com/artlovers",
        instagram: "https://instagram.com/artlovers",
      },
      user_id: [4, 5, 6],
      messages: [
        { user: "Eve", content: "Check out this new artwork I just made!" },
        { user: "Dave", content: "Wow, that's beautiful!" },
      ],
    },
  ];

  const allCommunities = [
    {
      id: 1,
      name: "Tech Innovators",
      desc: "Link community for discussing technology innovations.",
      image: "https://via.placeholder.com/150",
      social_links: {
        twitter: "https://twitter.com/techinnovators",
        facebook: "https://facebook.com/techinnovators",
      },
      user_id: [1, 2, 3],
      messages: [
        { user: "Alice", content: "Hey, how's everyone doing?" },
        { user: "Bob", content: "Doing great! Excited for the next meetup." },
      ],
    },
    {
      id: 2,
      name: "Art Lovers",
      desc: "Link place to share and discuss art pieces.",
      image: "https://via.placeholder.com/150",
      social_links: {
        twitter: "https://twitter.com/artlovers",
        instagram: "https://instagram.com/artlovers",
      },
      user_id: [4, 5, 6],
      messages: [
        { user: "Eve", content: "Check out this new artwork I just made!" },
        { user: "Dave", content: "Wow, that's beautiful!" },
      ],
    },
  ];

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
      setFormValues({ ...formValues, dormPhotos: [file] });
      setPhotoPreview(preview);
    }
  };

  const handleCreateCommunity = () => {
    const { name, desc, image, social_links, messages } = formValues;

    if (name && desc && image && social_links && messages === 1) {
      const newCommunity = {
        id: Date.now(),
        name,
        desc,
        image,
        social_links,
        messages,
      };
      console.log("New community added:", newCommunity);
      setShowForm(false);
      setFormValues({
        name: "",
        desc: "",
        image: "",
        social_links: [],
        messages: [],
      });
      setPhotoPreview("");
    } else {
      alert("Please fill all fields and upload one photo.");
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit community with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete community with id: ${id}`);
  };

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
                name="desc"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.desc}
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
              <label className="block text-white">Social Links</label>{" "}
              <input
                name="social_links"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-4"
                value={formValues.social_links}
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
                onClick={() => navigate("/chat")}
                className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center cursor-pointer"
              >
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {community.name}
                  </h3>
                  <p className="text-gray-400">{community.desc}</p>
                  <div className="mt-2 space-x-2">
                  <Link
                      to={community.social_links.discord}
                      className="text-yellow-400 hover:text-yellow-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Discord
                    </Link>
                    <Link
                      to={community.social_links.twitter}
                      className="text-yellow-400 hover:text-yellow-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Joined Communities */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Joined Communities
          </h2>
          <div className="space-y-6">
            {filterCommunities(userJoinedCommunities).map((community) => (
              <div
                key={community.id}
                onClick={() => navigate("/chat")}
                className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center cursor-pointer"
              >
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {community.name}
                  </h3>
                  <p className="text-gray-400">{community.desc}</p>
                  <div className="mt-2 space-x-2">
                  <Link
                      to={community.social_links.discord}
                      className="text-yellow-400 hover:text-yellow-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Discord
                    </Link>
                    <Link
                      to={community.social_links.twitter}
                      className="text-yellow-400 hover:text-yellow-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
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
                onClick={() => navigate("/community")}
                className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center cursor-pointer"
              >
                <img
                  src={community.image}
                  alt={community.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {community.name}
                  </h3>
                  <p className="text-gray-400">{community.desc}</p>
                  <div className="mt-2 space-x-2">
                    <Link
                      to={community.social_links.discord}
                      className="text-yellow-400 hover:text-yellow-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Discord
                    </Link>
                    <Link
                      to={community.social_links.twitter}
                      className="text-yellow-400 hover:text-yellow-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
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
