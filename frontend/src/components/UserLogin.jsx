import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserLogin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          toast.success(res.message);
          localStorage.setItem("token", res.data.accessToken);
          setTimeout(() => navigate("/home"), 2000); // Delay navigation for better UX
        } else {
          toast.error(res.message);
        }
      })
      .catch((error) => toast.error("Something went wrong!"));
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full flex items-center justify-center">
        <div className="h-screen p-7 flex flex-col justify-between w-[400px] bg-gray-300 rounded">
          <div>
            <img
              className="w-25 mb-5"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/800px-Uber_logo_2018.png"
              alt="Uber Logo"
            />
            <h1 className="text-center mb-5 font-bold text-2xl">User Login</h1>
            <form onSubmit={handleSubmit}>
              <h3 className="text-lg font-medium mb-2">What's your email</h3>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
                placeholder="email@example.com"
                className="bg-[#eeeeee] rounded p-2 border w-full text-lg placeholder:text-base mb-7"
              />
              <h3 className="text-lg mb-2 font-medium">Enter Password</h3>
              <input
                type="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
                placeholder="password"
                className="bg-[#eeeeee] rounded p-2 border w-full text-lg placeholder:text-base mb-7"
              />
              <button className="bg-[#111] text-white font-semibold rounded p-2 mb-2 w-full text-lg">
                Login
              </button>
            </form>
            <p>
              Don't have an account?{" "}
              <Link to="/user-register" className="text-blue-600">
                Create new Account
              </Link>
            </p>
          </div>
          <div>
            <Link
              to="/captain-login"
              className="bg-[#10b461] text-white font-semibold mt-7 rounded p-2 w-full text-lg flex items-center justify-center mb-5"
            >
              Log in as Captain
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
