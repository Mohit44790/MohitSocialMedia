import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaPlus, FaImage, FaUserCircle } from "react-icons/fa"; // Add FaPlus for the plus icon

import { setStorys } from "../redux/storySlice";

const CreateStory = () => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // Initialize the open state
  const { user } = useSelector((store) => store.auth);
  const { storys } = useSelector((store) => store.story);
  const dispatch = useDispatch();

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const createStoryHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (imagePreview) formData.append("image", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://mksocialmedia.onrender.com/stories/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setStorys([res.data.story, ...storys])); // Update stories in the Redux store
        setOpen(false); // Close modal after successful story creation
        toast.success(res.data.message); // Show success toast
        setImagePreview(""); // Reset image preview
        setFile(""); // Reset file input
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Rounded box with plus icon to open the modal */}
      <div
        onClick={() => setOpen(true)}
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center  cursor-pointer"
      >
        {user?.profilePicture ? (
          <img
            src={user?.profilePicture}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <FaUserCircle className="w-14 h-14 bg-white rounded-full flex  cursor-pointer " />
        )}
        <FaPlus className="relative  text-xl text-blue-500  -left-4 -bottom-3 translate-x-1/4 translate-y-1/4 bg-white rounded-full p-1 border border-blue-500" />
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-5 shadow-lg mx-4">
            <button
              className="text-gray-500 float-right"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-center font-semibold mb-4">Create New Story</h2>
            <div className="flex gap-3 items-center mb-4">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="profile"
                  className="w-14 h-14 rounded-full"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-400" />
              )}
              <div>
                <h1 className="font-semibold">{user?.username}</h1>
              </div>
            </div>
            <form onSubmit={createStoryHandler}>
              <div className="w-full h-64 mb-4 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="preview_img"
                    className="object-cover h-full w-full rounded-md"
                  />
                ) : (
                  <FaImage className="text-gray-400 text-6xl" />
                )}
              </div>
              <input
                ref={imageRef}
                type="file"
                className="hidden"
                onChange={fileChangeHandler}
              />

              <button
                type="button"
                onClick={() => imageRef.current.click()}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded mb-4"
              >
                Choose Image
              </button>
              {imagePreview && (
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : "Post Story"}
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateStory;
