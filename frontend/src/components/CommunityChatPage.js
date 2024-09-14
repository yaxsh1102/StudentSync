import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

// Dummy data for communities
const communities = [
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

const CommunityChatPage = () => {
  const { communityid } = useParams();
  const [newMessage, setNewMessage] = useState("");

  // Find the selected community by its ID
  const community = communities.find(
    (comm) => comm.id === parseInt(communityid)
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = { user: "You", content: newMessage };
      community.messages.push(message);
      setNewMessage("");
    }
  };

  if (!community) {
    return <p className="text-white">Community not found!</p>;
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col p-6 pl-24">
      <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center">
          <img
            src={community.image}
            alt={community.name}
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-3xl font-bold text-white">{community.name}</h1>
            <p className="text-gray-400">{community.desc}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to={community.social_links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400"
          >
            Twitter
          </Link>
          <Link
            to={
              community.social_links.facebook ||
              community.social_links.instagram
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400"
          >
            Facebook
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default CommunityChatPage;
