import React, { useState, useEffect } from "react";
import {
  MdAttachFile,
  MdEmojiEmotions,
  MdSend,
  MdClose,
  MdMoreVert,
  MdSearch,
  MdClear,
  MdExitToApp,
} from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();

  const participants = [
    {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/path/to/avatar1.jpg",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/path/to/avatar2.jpg",
    },
  ];

  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there!", user: "John", timestamp: "10:30 AM" },
    { id: 2, text: "Hi, how's it going?", user: "You", timestamp: "10:32 AM" },
    { id: 3, text: "I'm good, thanks!", user: "Alice", timestamp: "10:35 AM" },
  ]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const [file, setFile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCommunityInfo, setShowCommunityInfo] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectMode, setSelectMode] = useState(false); // To enable message selection

  const handleSend = () => {
    if (message.trim() || file) {
      const newMessage = {
        id: Date.now(),
        text: message,
        user: "You",
        timestamp: "Now",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      setFile(null);
      setTypingUser("");
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      console.log("File selected:", uploadedFile.name);
    }
  };

  const handleTyping = (event) => {
    setMessage(event.target.value);
    if (event.target.value.length > 0) {
      setTypingUser("You are typing...");
    } else {
      setTypingUser("");
    }
  };

  const handleSelectMessage = (id) => {
    setSelectedMessages((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((messageId) => messageId !== id)
        : [...prevSelected, id]
    );
  };

  const handleClearInput = () => {
    setMessage("");
    setTypingUser("");
  };

  const handleDeleteMessages = () => {
    setMessages(messages.filter((msg) => !selectedMessages.includes(msg.id)));
    setSelectedMessages([]);
    setSelectMode(false); // Exit select mode after deletion
  };

  const filteredMessages = messages.filter((msg) =>
    msg.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highlightMessage = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-yellow-300 text-gray-900">
          {part}
        </mark>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const handleMenuAction = (action) => {
    switch (action) {
      case "groupInfo":
        setShowCommunityInfo(true);
        setMenuOpen(false);
        break;
      case "clearChat":
        if (window.confirm("Are you sure you want to clear the chat?")) {
          setMessages([]);
        }
        setMenuOpen(false);
        break;
      case "exitCommunity":
        navigate("/communities");
        break;
      case "selectMessages":
        setSelectMode(true); // Enable select mode when this option is clicked
        setMenuOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".emoji-picker") === null) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col pl-4 md:pl-20">
      <div className="bg-gray-900 flex flex-col flex-grow">
        {/* Top Bar */}
        <div className="flex justify-between items-center p-4 bg-gray-800 shadow-md border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <h1
              className="text-xl font-bold text-white cursor-pointer hover:text-gray-300"
              onClick={() => setShowCommunityInfo(true)}
            >
              Community Name
            </h1>
            <div className="relative">
              <MdMoreVert
                className="text-white cursor-pointer hover:text-gray-300"
                size={24}
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="absolute top-12 right-0 bg-gray-800 rounded-lg shadow-lg w-48 z-50">
                  <ul className="text-white">
                    <li
                      className="p-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleMenuAction("groupInfo")}
                    >
                      Group Info
                    </li>
                    <li
                      className="p-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleMenuAction("selectMessages")}
                    >
                      Select Messages
                    </li>
                    <li
                      className="p-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleMenuAction("clearChat")}
                    >
                      Clear Chat
                    </li>
                    <li
                      className="p-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleMenuAction("exitCommunity")}
                    >
                      Exit Community
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-lg pl-10 pr-4 focus:outline-none"
            />
            <MdSearch
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={24}
            />
            <MdClear
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              size={24}
              onClick={() => setSearchQuery("")}
            />
          </div>
        </div>

        {/* Chat Area */}
        {!showCommunityInfo ? (
          <div className="flex-grow p-4 overflow-y-auto">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-4 ${
                  msg.user === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="max-w-xs flex items-center space-x-2">
                  {selectMode && (
                    <input
                      type="checkbox"
                      checked={selectedMessages.includes(msg.id)}
                      onChange={() => handleSelectMessage(msg.id)}
                    />
                  )}
                  <div
                    className={`p-3 rounded-lg ${
                      msg.user === "You"
                        ? "bg-yellow-500 text-gray-900"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    <p>{highlightMessage(msg.text, searchQuery)}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {typingUser && <p className="text-gray-500 italic">{typingUser}</p>}
            {selectedMessages.length > 0 && (
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={handleDeleteMessages}
                  className="bg-red-600 text-white p-2 rounded-lg opacity-70"
                >
                  Delete Selected
                </button>
                <button
                  onClick={() => setSelectedMessages([])}
                  className="bg-gray-600 text-white p-2 rounded-lg opacity-70"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 bg-gray-800 text-white">
            <h2 className="text-xl font-bold mb-4">Community Info</h2>
            <p>Name: Awesome Community</p>
            <p>Description: This is a detailed description of the community.</p>
            <p>Participants:</p>
            <ul className="mt-2">
              {participants.map((participant, index) => (
                <li key={index} className="flex items-center space-x-2 mb-2">
                  <img
                    src={participant.avatar}
                    alt={participant.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">{participant.name}</p>
                    <p className="text-xs text-gray-400">{participant.email}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowCommunityInfo(false)}
              className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg mt-4"
            >
              Back to Chat
            </button>
          </div>
        )}

        {/* Input Area */}
        <div className="flex items-center p-4 bg-gray-800 border-t border-gray-700">
          <div className="relative">
            <MdEmojiEmotions
              className="text-white cursor-pointer hover:text-gray-300"
              size={28}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            {showEmojiPicker && (
              <div className="absolute bottom-12 left-0 emoji-picker">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <label htmlFor="fileInput" className="ml-4 cursor-pointer">
            <MdAttachFile
              className="text-white cursor-pointer hover:text-gray-300"
              size={28}
            />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={handleTyping}
            className="bg-gray-700 text-white p-2 rounded-lg flex-grow mx-4 focus:outline-none"
          />
          {message && (
            <MdClose
              className="text-white cursor-pointer hover:text-gray-300"
              size={28}
              onClick={handleClearInput}
            />
          )}
          <MdSend
            className="text-white cursor-pointer hover:text-gray-300"
            size={28}
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
