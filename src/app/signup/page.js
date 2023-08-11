"use client"
import React, {useEffect, useState} from 'react'
import {useUserStore} from '../../store/store';

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter()
  const { setIsAlert, setAlertMsg, setAlertType } = useUserStore();


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = () => {

    const data = {
      "username": username,
      "email": email,
      "password": password,
      "avatar": "",
      "isAdmin": false,
      "isBlocked": false,

    }
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/signup`, {
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
        router.push("/login")
      }


    })
  }

  return (
    <div style={{
      backgroundImage: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/signup-bg.jpg')",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundSize: "cover" }}>
    <div style={{
      height: "80vh !important",
      maxHeight: "100vh !important"
    }} className='text-white w-full flex justify-evenly items-center flex-col'>
     <h1 className='font-bold text-4xl'>
      Create an Account
     </h1>
     <input value={username} onChange={(e)=> {
       setUsername(e.target.value)    
      }} type="text" placeholder="Username..." className="my-5 input input-bordered input-primary w-full max-w-xs" />
     <input value={email} onChange={(e)=> {
       setEmail(e.target.value)    
      }} type="email" placeholder="Email..." className="my-5 input input-bordered input-primary w-full max-w-xs" />

     <input type="password" value={password} onChange={(e)=> {
       setPassword(e.target.value)
     }} placeholder="Password..." className="my-5 input input-bordered input-primary w-full max-w-xs" />
  
     <button onClick={createAccount} className='btn btn-primary'>Create Account</button>
     <p className='my-5'>Already have an account? </p>
     <Link href={"/login"} className="btn btn-primary">Login</Link>
     </div>
       </div>
      
  )
}