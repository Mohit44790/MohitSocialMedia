import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const SignUp = () => {
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const { user } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const signupHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://mohitsocialmedia.onrender.com/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setInput({ fullName: "", username: "", email: "", password: "" });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center w-screen h-screen  justify-center">
      <form
        onSubmit={signupHandler}
        className="shadow-lg flex flex-col gap-1 p-4"
      >
        <div className="my-4 mx-auto text-center ">
          <h1 className="text-blue-500 font-bold text-3xl">
            {" "}
            Mohit Social media app
          </h1>
          <p className="semi-bold text-gray-400 ">
            Sign up to see photos and videos <br /> from your friends
          </p>
        </div>
        <div>
          <label htmlFor="fullName">Full Name: </label>
          <input
            type="text"
            name="fullName"
            value={input.fullName}
            onChange={changeEventHandler}
            className="border rounded p-2 w-full"
            placeholder="Enter name"
          />
        </div>
        <div>
          <label htmlFor="username">UserName: </label>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="border rounded p-2 w-full"
            placeholder="Enter username"
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="border rounded p-2 w-full"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            onChange={changeEventHandler}
            value={input.password}
            className="border rounded p-2 w-full"
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Sign Up
        </button>
        <div className="mt-4">
          <p>
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
