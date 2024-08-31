import React from "react";
import { useSelector } from "react-redux";
import useGetAllPost from "../hook/useGetAllPost";

const ExplorePage = () => {
  useGetAllPost(); // Fetch posts when component mounts

  const posts = useSelector((state) => state.post.posts); // Retrieve posts from Redux store

  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold mb-2">Explore</h1>
      <div className="grid lg:mx-52 grid-cols-3 gap-1">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`relative p-1 border rounded overflow-hidden ${
              index % 6 === 0
                ? "col-span-1 row-span-1"
                : index % 6 === 1
                ? "col-span-1 row-span-1"
                : index % 6 === 2
                ? "col-span-1 row-span-2" // taller cell
                : index % 6 === 3
                ? "col-span-1 row-span-1"
                : index % 6 === 4
                ? "col-span-1 row-span-1"
                : "col-span-1 row-span-1"
            }`}
          >
            <img
              src={post.image}
              alt={post.title}
              className={`w-full h-full object-cover ${
                index % 6 === 2 ? "h-[515px]" : "h-[250px]" // fixed heights
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
