import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function CaptainLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState({});

  
    const handleSubmit = (e) => {
      e.preventDefault();
      setData({
        email: email,
        password: password,
      });
      console.log(data);
  
      setEmail("");
      setPassword("");
    };
  return (
    <>
      <div className=" w-full flex items-center justify-center">
      <div className="p-7 h-screen flex flex-col justify-between w-[400px]  bg-gray-300 rounded">
        <div>
          <img
            className="w-25 h-20 mb-5"
            src="https://pngimg.com/d/uber_PNG24.png"
            alt=""
          />
          <h1 className="text-center mb-5 font-bold  text-2xl">Captain Login</h1>
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@example.com"
              className="bg-[#eeeeee] rounded p-2 border w-full text-lg placeholder:text-base mb-7"
            />
            <h3 className="text-lg mb-2 font-medium">Enter Password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="password"
              className="bg-[#eeeeee] rounded p-2 border w-full text-lg placeholder:text-base mb-7"
            />
            <button className="bg-[#111] text-white font-semibold rounded p-2 mb-2 w-full text-lg placeholder:text-base">
              Login
            </button>
          </form>
          <p>
            Join a fleet?{" "}
            <Link to="/captain-register" className="text-blue-600">
              Register as Captain
            </Link>
          </p>
        </div>
        <div>
          <Link
            to="/user-login"
            className="bg-[#d5622d] text-white font-semibold mt-7 rounded p-2 w-full text-lg placeholder:text-base flex items-center justify-center mb-5"
          >
            Log in as User
          </Link>
        </div>
      </div>
      </div>
    </>
  )
}

export default CaptainLogin
