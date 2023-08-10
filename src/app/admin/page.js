"use client"
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import {useRouter} from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");

  const handleOnChange = (e) => {
    if (e.target.name == "username") {
      setUsername(e.target.value);
    }
    else {
      setPassword(e.target.value);
    }
  }
  const login = () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: username, password: password})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data.message);
      if (data.type == "success") {
        toast.success(data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });

          localStorage.setItem("jwt_token", data.token);

          router.push("/admin/dashboard")
      }

      else {
        toast.error(data.message, {
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
    })
  }
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
    <div style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/hero.jpg')",
        backgroundSize: "cover"
    }}>
    <div className="hero min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <div className='text-center'>

    <h1 style={{
    color: "#fafafa"
  }} className='my-5 text-4xl text-center font-bold'>Login to Admin Panel</h1>
    <div className='flex justify-center items-center flex-col'>
    <input type="text" name="username" value={username} onChange={handleOnChange} placeholder="Username" className="input input-bordered input-primary w-full max-w-xs" />


    <input name="password" value={password} onChange={handleOnChange} type="password" placeholder="password" className="my-5 input input-bordered input-primary w-full max-w-xs" />

    <button onClick={login} className="btn btn-primary">Login</button>
    </div>
    </div>
  </div>
</div>  
    </div>


    </>
  )
}
