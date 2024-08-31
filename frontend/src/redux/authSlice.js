import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    suggestedUsers: [],
    userProfile: null,
    selectedUser: null,
  },
  reducers: {
    // Set user details
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setsuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    // Reset auth state
    resetAuthState: (state) => {
      state.user = null;
      state.suggestedUsers = [];
      state.userProfile = null;
      state.selectedUser = null;
    },
  },
});

// Export actions and reducer
export const {
  setAuthUser,
  setsuggestedUsers,
  setUserProfile,
  setSelectedUser,
  resetAuthState, // Exporting the new reset action
} = authSlice.actions;
export default authSlice.reducer;
