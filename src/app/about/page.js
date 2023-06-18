import React from 'react'
import {BsTelephoneForward} from "react-icons/bs";
import {HiOutlineMail} from "react-icons/hi"
import {IoLocationOutline} from "react-icons/io5";
import dynamic from 'next/dynamic';
import Link from 'next/link';


function Contact() {
 
  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row">
      <img src="/about.jpg" className="max-w-sm rounded-lg shadow-2xl" />
      <div>
        <h1 className="text-5xl font-bold">About Us!</h1>
        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        <Link href={"/contact"} className="btn btn-primary">Contact Now</Link>
      </div>
    </div>
  </div>
  )
}

export default Contact;