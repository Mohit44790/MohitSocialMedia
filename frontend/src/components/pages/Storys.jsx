import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Story from "./Story";
import useGetAllStory from "../../hook/useGetAllStory.jsx";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CreateStory from "../CreateStory.jsx";

const Stories = () => {
  useGetAllStory(); // Hook to fetch all stories

  const { storys } = useSelector((store) => store.story); // Get the storys state from Redux

  const scrollRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      top: 0,
      left: -200,
      behavior: "smooth",
    });
  };

  // Function to scroll right
  const scrollRight = () => {
    scrollRef.current.scrollBy({
      top: 0,
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="relative">
        {/* Scroll left button */}
        <button
          className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full"
          onClick={scrollLeft}
        >
          <FaChevronLeft />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll no-scrollbar space-x-4"
        >
          <CreateStory />
          {storys && storys.length > 0 ? (
            storys.map((story) => <Story key={story._id} story={story} />)
          ) : (
            <p>No stories available</p> // Handle the case when there are no stories
          )}
        </div>

        {/* Scroll right button */}
        <button
          className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full"
          onClick={scrollRight}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Stories;
