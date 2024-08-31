import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.auth);

  const [followingStatus, setFollowingStatus] = useState({});

  useEffect(() => {
    if (suggestedUsers && user) {
      const status = suggestedUsers.reduce((acc, curr) => {
        acc[curr._id] = curr.followers?.includes(user._id) || false;
        return acc;
      }, {});
      setFollowingStatus(status);
    }
  }, [suggestedUsers, user]);

  const followOrUnfollowHandler = async (userId) => {
    try {
      const action = followingStatus[userId] ? "unfollow" : "follow";
      const res = await axios.post(
        `https://mohitsocialmedia.onrender.com/api/v1/user/followerorunfollow/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setFollowingStatus((prevStatus) => ({
          ...prevStatus,
          [userId]: !prevStatus[userId],
        }));

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="my-10 hidden md:block">
      {/* Container is hidden on small screens, visible on md and larger */}
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-medium cursor-pointer">See All</span>
      </div>
      {suggestedUsers?.length > 0 ? (
        suggestedUsers.map((userItem) => {
          const isFollowing = followingStatus[userItem._id];
          return (
            <div
              key={userItem._id}
              className="flex items-center justify-between my-5"
            >
              <div className="flex items-center gap-2">
                <Link to={`/profile/${userItem._id}`}>
                  {userItem.profilePicture ? (
                    <img
                      src={userItem.profilePicture}
                      alt="profile"
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="w-10 h-10 text-gray-400" />
                  )}
                </Link>
                <div>
                  <h1 className="font-semibold text-sm">
                    <Link to={`/profile/${userItem._id}`}>
                      {userItem.username}
                    </Link>
                  </h1>
                  <span className="text-gray-600 text-sm">
                    {userItem.bio || "Bio here..."}
                  </span>
                </div>
              </div>
              {user && user._id !== userItem._id && (
                <span className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]">
                  <button
                    onClick={() => followOrUnfollowHandler(userItem._id)}
                    className="ml-4 text-blue-500"
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                </span>
              )}
            </div>
          );
        })
      ) : (
        <p>No suggested users available.</p>
      )}
    </div>
  );
};

export default SuggestedUsers;
