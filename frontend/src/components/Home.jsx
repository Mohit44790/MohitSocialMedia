import React from "react";
import Feed from "./pages/Feed";
import { Outlet } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import useGetAllPost from "../hook/useGetAllPost";
import useGetSuggestedUsers from "../hook/useGetSuggestedUsers";

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-grow md:w-3/4">
        <Feed />

        <Outlet />
      </div>
      <RightSidebar className="hidden md:block md:w-1/4" />
    </div>
  );
};

export default Home;
