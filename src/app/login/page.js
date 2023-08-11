"use client"
import Image from 'next/image'
import { useState } from 'react';
import {useUserStore} from '../../store/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import signupBg from "../../../public/signup-bg.jpg";
import loginBg from "../../../public/login-bg.jpg";
export default function Home() {
 

  const { isAlert, alertMsg, alertType, setIsAlert, setAlertMsg, setAlertType, setIsLogin, isLogin, setAvatar } = useUserStore();

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const checkLogin = () => {

    const data = {
      "username": username,
      "password": password
    }
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      setAlertMsg(data.message);
      setIsAlert(true);
      setAlertType(data.type);

      if (data.type == "success") {
        setIsLogin(true)
        setUsername(data.username)
        setAvatar(data.avatar)
        localStorage.setItem("token", data.token);
        router.push("/articles")
      }


    })
  }
  return (
    <div style={{
      backgroundImage: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/login-bg.jpg')",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundSize: "cover" }}>
      
      <div style={{
        height: "60vh !important",
      }} className='text-white my-10 w-full flex justify-between items-center flex-col'>
 
   <h1 className='font-bold text-4xl'>
    Login Page
   </h1>
   <input value={username} onChange={(e)=> {
     setUsername(e.target.value)    
   }} type="text" placeholder="Username..." className="my-5 input input-bordered input-primary w-full max-w-xs" />
   
   <input type="password" value={password} onChange={(e)=> {
     setPassword(e.target.value)
    }} placeholder="Password..." className="my-5 input input-bordered input-primary w-full max-w-xs" />

   <button onClick={checkLogin} className='btn btn-primary'>Login</button>
   <p className='my-5'>Don't have an account?</p>
   <Link className='btn btn-primary' href={"/signup"}>Create new Account</Link>
   </div>
    </div>
    
    )
  }