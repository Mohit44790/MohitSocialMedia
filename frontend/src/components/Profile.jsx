import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useGetUserProfile from "../hook/useGetUserProfile";
import { useSelector } from "react-redux";
import { FaHeart, FaUserCircle } from "react-icons/fa";
import { FiAtSign, FiMessageCircle } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);

  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Update the isFollowing state when the userProfile changes
  useEffect(() => {
    if (userProfile && user) {
      setIsFollowing(userProfile.followers?.includes(user._id) || false);
    }
  }, [userProfile, user]);

  const followOrUnfollowHandler = async () => {
    try {
      const action = isFollowing ? "unfollow" : "follow";
      const res = await axios.post(
        `https://mksocialmedia.onrender.com/api/v1/user/followerorunfollow/${userProfile._id}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsFollowing(!isFollowing); // Toggle the follow state
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="flex flex-col max-w-7xl w-full lg:mx-8 mx-auto p-4">
      {/* Container adjusted for mobile responsiveness */}
      <div className="flex flex-col gap-4 w-full">
        {/* User profile information layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <section className="flex justify-center">
            {userProfile?.profilePicture ? (
              <img
                src={userProfile?.profilePicture}
                alt="profile"
                className="w-24 h-24 md:w-44 md:h-44 rounded-full"
              />
            ) : (
              <FaUserCircle className="w-24 h-24 text-gray-400" />
            )}
          </section>
          <section>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-lg md:text-xl font-semibold">
                  {userProfile?.fullName}
                </span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <button className="hover:bg-gray-200 h-8 px-4 border rounded">
                        Edit profile
                      </button>
                    </Link>
                    <button className="hover:bg-gray-200 h-8 px-4 border rounded">
                      View archive
                    </button>
                    <button className="hover:bg-gray-200 h-8 px-4 border rounded">
                      Ad tools
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={followOrUnfollowHandler}
                      className={`h-8 px-4 border rounded ${
                        isFollowing
                          ? "bg-gray-200 text-black"
                          : "bg-[#0095F6] hover:bg-[#3192d2] text-white"
                      }`}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                    {isFollowing && (
                      <button className="h-8 px-4 border rounded">
                        Message
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center gap-6 text-sm">
                <p>
                  <span className="font-semibold">
                    {userProfile?.posts?.length || 0}
                  </span>{" "}
                  posts
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.followers?.length || 0}
                  </span>{" "}
                  followers
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.following?.length || 0}
                  </span>{" "}
                  following
                </p>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <span className="flex items-center gap-1">
                  <FiAtSign />
                  <span>{userProfile?.username}</span>
                </span>
                <span className="font-semibold">
                  {userProfile?.bio || "Bio here..."}
                </span>
                <span className="font-semibold">
                  {userProfile?.location || "Add location..."}
                </span>
              </div>
            </div>
          </section>
        </div>
        {/* Tabs and posts section */}
        <div className="border-t border-gray-200">
          <div className="flex items-center justify-center gap-4 text-sm mt-4">
            <span
              className={`py-2 cursor-pointer ${
                activeTab === "posts" ? "font-bold border-b-2 border-black" : ""
              }`}
              onClick={() => handleTabChange("posts")}
            >
              POSTS
            </span>
            <span
              className={`py-2 cursor-pointer ${
                activeTab === "saved" ? "font-bold border-b-2 border-black" : ""
              }`}
              onClick={() => handleTabChange("saved")}
            >
              SAVED
            </span>
            <span
              className={`py-2 cursor-pointer ${
                activeTab === "reels" ? "font-bold border-b-2 border-black" : ""
              }`}
              onClick={() => handleTabChange("reels")}
            >
              REELS
            </span>
            <span
              className={`py-2 cursor-pointer ${
                activeTab === "tags" ? "font-bold border-b-2 border-black" : ""
              }`}
              onClick={() => handleTabChange("tags")}
            >
              TAGS
            </span>
          </div>
          {/* Posts grid with responsive columns */}
          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:mx-56 gap-2 mt-4">
            {displayedPost?.map((post) => (
              <div key={post?._id} className="relative group cursor-pointer">
                <img
                  src={post.image}
                  alt="post"
                  className="rounded-sm w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-white space-x-4">
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <FaHeart />
                      <span>{post?.likes?.length || 0}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <FiMessageCircle />
                      <span>{post?.comments?.length || 0}</span>
                    </button>
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

export default Profile;
