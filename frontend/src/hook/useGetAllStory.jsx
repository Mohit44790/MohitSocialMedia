import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setStorys } from "../redux/storySlice";

const useGetAllStory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllStory = async () => {
      try {
        const res = await axios.get(
          "https://mohitsocialmedia.onrender.com/api/v1/stories/allStory",
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setStorys(res.data.storys));
        }
      } catch (error) {
        console.error("Failed to fetch story:", error);
      }
    };
    fetchAllStory();
  }, [dispatch]);
};

export default useGetAllStory;
