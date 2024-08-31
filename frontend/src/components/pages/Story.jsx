import React from "react";

import { useSelector } from "react-redux";

const Story = ({ story }) => {
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <div className="flex-shrink-0 ">
        <img
          src={story.image}
          alt="story"
          className="w-14 h-14 object-cover rounded-full"
        />
      </div>
    </>
  );
};

export default Story;
