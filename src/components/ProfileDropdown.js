import Image from 'next/image'
import React from 'react'

// Icons for dropdown
import {FaUserAlt} from "react-icons/fa";
import {IoSettingsSharp} from "react-icons/io5";
import {RiLogoutBoxRFill} from "react-icons/ri";


import {useUserStore} from '../store/store';
import Link from 'next/link';


function ProfileDropdown() {
  const { firstName, lastName, avatar, setIsLogin, setIsAlert, setAlertMsg, setAlertType, username, isLogin } = useUserStore();



  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem("token");
    setAlertMsg("Logged out Successfully");
    setAlertType("success")
    setIsAlert(true);
  }
  return (
    <div className="dropdown dropdown-end shadow-5xl">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
             <img src={`https://ui-avatars.com/api/?name=${username}`} loading='lazy'/>
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
  
            <p className='ml-3 font-bold text-1xl'>Hi, {username}</p>
      
        {/* <li>
          <Link href={"/dashboard"}>
            <FaUserAlt/>Dashboard
          </Link>
        </li>
        <li><a><IoSettingsSharp/>Settings</a></li> */}
        <li><button onClick={handleLogout}><RiLogoutBoxRFill/>Logout</button></li>
      </ul>
    </div>
  )
}

export default ProfileDropdown