import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setsuggestedUsers } from "../redux/authSlice";
import { SERVER } from "../components/Server";

const useGetSuggestedUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const res = await axios.get(`${SERVER}/user/suggested`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setsuggestedUsers(res.data.users));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuggestedUsers();
  }, []);
};
export default useGetSuggestedUsers;
