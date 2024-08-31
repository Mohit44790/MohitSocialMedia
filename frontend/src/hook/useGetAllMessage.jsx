import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/chatSlice";
import axios from "axios";
import { useEffect } from "react";

const useGetAllMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.auth);

  useEffect(() => {
    if (!selectedUser?._id) return; // Add check for valid selectedUser

    const fetchAllMessage = async () => {
      try {
        const res = await axios.get(
          `https://mksocialmedia.onrender.com/api/v1/message/all/${selectedUser._id}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setMessages(res.data.messages));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllMessage();
  }, [selectedUser, dispatch]);
};

export default useGetAllMessage;
