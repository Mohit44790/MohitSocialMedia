import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import postSlice from "./postSlice";
import authSlice from "./authSlice";
import chatSlice from "./chatSlice";
import socketSlice from "./socketSlice";
import realTimeNotiSlice from "./realTimeNotiSlice";
import storySlice from "./storySlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  post: postSlice,
  story: storySlice,
  chat: chatSlice,
  socketio: socketSlice,
  realTimeNotification: realTimeNotiSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
