import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
import useGetAllPost from "../../hook/useGetAllPost";

const Posts = () => {
  useGetAllPost();
  const { posts } = useSelector((store) => store.post);

  return (
    <div className="container mx-auto p-4">
      {/* Container centered with padding */}
      <div className=" sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Grid layout with responsive columns */}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
