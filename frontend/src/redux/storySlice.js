import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
  name: "story",
  initialState: {
    storys: [],
    selectedStory: null,
  },
  reducers: {
    setStorys: (state, action) => {
      state.storys = action.payload;
    },
    setSelectedStory: (state, action) => {
      state.selectedStory = action.payload;
    },
  },
});

export const { setStorys, setSelectedStory } = storySlice.actions;
export default storySlice.reducer;
