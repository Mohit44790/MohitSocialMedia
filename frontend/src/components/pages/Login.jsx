import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../../redux/authSlice";

import { displayPhone, loginImages } from "./DataImg";
import useInterval from "../../hook/useInterval";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://mohitsocialmedia.onrender.com/api/v1/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
        setInput({ email: "", password: "" });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useInterval(() => {
    if (activeIndex === loginImages.length - 1) {
      setActiveIndex(-1);
    }
    setActiveIndex((prevState) => prevState + 1);
  }, 2000);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="relative lg:w-1/2 flex justify-center mb-8 lg:mb-0">
        <img src={displayPhone} alt="phone" className="hidden lg:block" />
        <img
          src={loginImages[activeIndex]}
          alt="insta"
          className="absolute lg:right-24 left-64 bottom-16 lg:w-86 lg:h-[549px] object-cover rounded-lg"
        />
      </div>
      <form
        onSubmit={signupHandler}
        className="shadow-lg flex flex-col p-4 bg-white rounded w-full max-w-sm lg:w-1/3"
      >
        <div className="my-4 text-center">
          <h1 className="text-2xl text-blue-600 font-bold">
            Login Mohit Social media app{" "}
          </h1>
        </div>
        <div className="my-2">
          <label htmlFor="email" className="block font-medium">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="border rounded p-2 w-full"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="my-2">
          <label htmlFor="password" className="block font-medium">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="border rounded p-2 w-full"
            placeholder="Enter password"
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            loading ? "cursor-not-allowed opacity-50" : "hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
