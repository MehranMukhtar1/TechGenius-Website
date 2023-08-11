"use client"
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import {useUserStore} from '../store/store';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Link from 'next/link';
var jwt = require('jsonwebtoken');
import ProfileDropdown from './ProfileDropdown'
import { useRouter } from 'next/navigation'
function NavBar() {
  const router = useRouter();
  const { isAlert, alertMsg, alertType, setIsAlert, setAlertMsg, setAlertType, setIsLogin, isLogin, username, setUsername, setAvatar } = useUserStore();

  const tokenVerification = async()=> {
    let key = process.env.JWT_TOKEN;
    console.log(`JWT TOKEN: ${key}`)
    var token = localStorage.getItem("token")
    if (token != null) {
      var verification = await jwt.decode(token, key);
      console.log(verification)

      if (verification != null) {
        setIsLogin(true)
        setUsername(verification.username)
        setAvatar(verification.avatar)
      }
      else {
        setIsLogin(false)
      }
    }
  }

  useEffect(() => {
   tokenVerification();
  }, [])
  

    useEffect(() => {
     if(isAlert) {
      if (alertType == "success") {
        toast.success(alertMsg, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
      else if (alertType == "error") {
        toast.error(alertMsg, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
      setIsAlert(false)
     }
    }, [isAlert])
    
  return (
    <>
    <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <li><Link href={"/"}>Home</Link></li>
      <li><Link href={"/articles"}>Blog</Link></li>
      <li><Link href={"/about"}>About</Link></li>
      <li><Link href={"/contact"}>Contact</Link></li>
      </ul>
    </div>

    <a className="btn btn-ghost normal-case text-xl">TechGenius</a>

  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link href={"/"}>Home</Link></li>
      <li><Link href={"/articles"}>Blog</Link></li>
      <li><Link href={"/about"}>About</Link></li>
      <li><Link href={"/contact"}>Contact</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
 
{
isLogin?(
  <>
 
  <ProfileDropdown />
  </>
):(
<>
<Link href={"/login"} className="mx-2 btn-primary btn">Login</Link>
    <Link href={"/signup"} className="btn-primary btn">Sign Up</Link>
</>
)
}
   
  </div>
</div>
</>
  )
}

export default NavBar