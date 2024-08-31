import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const Notifications = () => {
  // Fetching notifications from the Redux store
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );

  return (
    <div className="p-4 md:px-8 lg:mx-56 lg:px-16">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Notifications</h1>
      {likeNotification.length === 0 ? (
        <p className="text-sm md:text-base">No new notifications</p>
      ) : (
        <div className="space-y-2">
          {likeNotification.map((notification) => (
            <div
              key={notification.userId}
              className="flex items-start p-2 border border-gray-300 rounded-lg"
            >
              {/* Profile Picture */}
              {notification.userDetails?.profilePicture ? (
                <img
                  src={notification.userDetails.profilePicture}
                  alt="profile"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2"
                />
              ) : (
                <FaUserCircle className="w-8 h-8 md:w-10 md:h-10 text-gray-400 mr-2" />
              )}
              <div className="flex-1">
                {/* Username and notification text */}
                <p className="text-sm md:text-base">
                  <span className="font-bold">
                    {notification.userDetails?.username}
                  </span>{" "}
                  liked your post.
                </p>
                {/* Comment details, if available */}
                {notification.comment && (
                  <p className="text-xs md:text-sm text-gray-600">
                    Comment: {notification.comment}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
