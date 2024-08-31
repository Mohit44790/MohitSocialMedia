import { createSlice } from "@reduxjs/toolkit";

const rtnSlice = createSlice({
  name: "realTimeNotification",
  initialState: {
    likeNotification: [],
    followNotifications: [],
  },
  reducers: {
    setLikeNotification: (state, action) => {
      if (action.payload.type === "like") {
        state.likeNotification.push(action.payload);
      } else if (action.payload.type === "dislike") {
        state.likeNotification = state.likeNotification.filter(
          (item) => item.userId !== action.payload.userId
        );
      }
    },
    setFollowNotification: (state, action) => {
      state.followNotifications.push(action.payload); // Handle follow notifications
    },
  },
});
export const { setLikeNotification, setFollowNotification } = rtnSlice.actions;
export default rtnSlice.reducer;
