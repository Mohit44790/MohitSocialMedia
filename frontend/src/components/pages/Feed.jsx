import React from "react";
import Posts from "./Posts";
import Storys from "./Storys";

const Feed = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4  md:px-8 lg:px-32 lg:mx-32 py-1">
      {/* Main container set to flex and center its content */}

      <div className="max-w-2xl w-full">
        {/* Posts container with a max-width */}
        <Storys />
        <Posts />
      </div>
    </div>
  );
};

export default Feed;
