import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import useGetAllMessage from "../hook/useGetAllMessage";
import useGetRTM from "../hook/useGetRTM";

const Messages = ({ selectedUser }) => {
  useGetRTM();
  useGetAllMessage();
  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="overflow-y-auto flex-1 p-4 h-full max-h-screen">
      {/* Main container with responsive padding and scrollable area */}
      <div className="flex justify-center mb-4">
        {/* User info container */}
        <div className="flex flex-col items-center justify-center w-full max-w-xs">
          {selectedUser?.profilePicture ? (
            <img
              src={selectedUser?.profilePicture}
              alt="profile"
              className="w-16 h-16 md:w-12 md:h-12 lg:w-10 lg:h-10 rounded-full"
            />
          ) : (
            <FaUserCircle className="w-16 h-16 md:w-12 md:h-12 lg:w-10 lg:h-10 text-gray-400" />
          )}
          <span className="text-center text-sm md:text-base mt-2">
            {selectedUser?.username}
          </span>
          <Link to={`/profile/${selectedUser?._id}`}>
            <button className="bg-gray-300 hover:bg-gray-400 text-black text-sm px-4 py-1 mt-2 rounded">
              View profile
            </button>
          </Link>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex flex-col gap-2">
        {messages &&
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.senderId === user?._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg max-w-[90%] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg break-words ${
                  msg.senderId === user?._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Messages;
