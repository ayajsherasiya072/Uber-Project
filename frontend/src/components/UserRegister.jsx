import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function UserRegister() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [username,setUsername]=useState('')
  const [data,setData]=useState({})

  const handleSubmit=(e)=>{
    e.preventDefault()
    setData({
      username:username,
      email:email,
      password:password
    })

    
    setEmail('')
    setPassword('')
    setUsername('')


  }
  return (
    <>
      <div className=" w-full flex items-center justify-center">
      <div className="h-screen p-7 flex flex-col justify-between w-[400px]  bg-gray-300 rounded">
        <div>
          <img
            className="w-25 mb-5"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/800px-Uber_logo_2018.png"
            alt=""
          />
          <h1 className="text-center mb-4 font-bold  text-2xl">User Register</h1>
          <form onSubmit={handleSubmit}>
          <h3 className="text-base font-medium mb-2">What's your Username</h3>
            <input
              type="text"
              required
              value={username}
              onChange={(e)=>{
                setUsername(e.target.value)
              }}
              placeholder="username"
              className="bg-[#eeeeee] rounded p-2 border w-full text-base placeholder:text-sm mb-5"
            />
            <h3 className="text-base font-medium mb-2">What's your email</h3>
            <input
              type="email"
              required
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
              placeholder="email@example.com"
              className="bg-[#eeeeee] rounded p-2 border w-full text-base placeholder:text-sm mb-5"
            />
            <h3 className="text-base mb-2 font-medium">Enter Password</h3>
            <input
              type="password"
              required
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
              placeholder="password"
              className="bg-[#eeeeee] rounded p-2 border w-full text-base placeholder:text-sm mb-5"
            />
            <button className="bg-[#111] text-white font-semibold rounded p-2 mb-2 w-full text-lg placeholder:text-base">
              Register
            </button>
          </form>
          <p>
            Alreay have an account?{" "}
            <Link to="/user-login" className="text-blue-600">
              LogIn
            </Link>
          </p>
        </div>
        <div>
          <Link
            to="/captain-register"
            className="bg-[#10b461] text-white font-semibold mt-7 rounded p-2 w-full text-lg placeholder:text-base flex items-center justify-center mb-5"
          >
            Register as Captain
          </Link>
        </div>
      </div>
      </div>
    </>
  )
}

export default UserRegister
