import React, { useContext } from 'react'
import { Link } from 'react-router-dom'


function Home() {

  return (
    <>
        <div className='bg-cover bg-bottom bg-[url(https://plus.unsplash.com/premium_photo-1729018716953-b66d4a3d2659?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-10 w-full flex justify-between flex-col'>
            <img className='w-25 ml-10' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/800px-Uber_logo_2018.png" alt="" />
            <div className='bg-white py-5 px-5'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to="/user-login" className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </>
  )
}

export default Home
