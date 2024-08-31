// src/hooks/useSocket.js
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "../redux/chatSlice";
import {
  setLikeNotification,
  setFollowNotification,
} from "../redux/realTimeNotiSlice";

const useSocket = (user) => {
  const socket = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      socket.current = io("https://mksocialmedia.onrender.com", {
        query: {
          userId: user?._id,
        },
        transports: ["websocket"],
      });

      // Listen for online users
      socket.current.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      // Listen for notifications
      socket.current.on("notification", (notification) => {
        dispatch(setLikeNotification(notification));
      });
      socket.current.on("followNotification", (notification) => {
        dispatch(setFollowNotification(notification));
      });
      return () => {
        socket.current.disconnect();
      };
    }
  }, [user, dispatch]);

  return socket.current;
};

export default useSocket;
