import React from 'react'

function Hero() {
  return (
    <div style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('/hero.jpg')",
        backgroundSize: "cover"
    }}>
    <div className="hero min-h-screen">
  <div style={{
    color: "#fafafa"
  }} className="hero-content flex-col lg:flex-row">
    <div className='text-center'>
      <h1 className="text-5xl  font-bold">Welcome to TechGenius!</h1>
      <p className="py-6">Welcome to our tech blog, your ultimate destination for all things technology! We strive to provide you with the latest news, insights, and updates from the ever-evolving world of technology. Whether you're a tech enthusiast, a professional in the industry, or simply curious about the latest gadgets and innovations, you've come to the right place.</p>
      <button className="text-center btn btn-primary">Get Started</button>
    </div>
  </div>
</div>  
    </div>
  )
}

export default Hero
