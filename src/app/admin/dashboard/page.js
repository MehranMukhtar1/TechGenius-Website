"use client"

import React, {useState, useEffect} from 'react'
import jwt from "jsonwebtoken";
import AdminCard from '@/components/AdminCard';
import Link from 'next/link';
function page() {

  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [articlesNumber, setArticlesNumber] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("jwt_token");


    if (token != null) {
      const data = jwt.decode(token, process.env.NEXT_JWT_TOKEN);
     if (data){
      setFullName(data.username);
      setIsAdmin(data.isAdmin);
     }
    }
    
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/all-articles`)
        .then(res=>res.json())
        .then(data => {
          setArticlesNumber(data.articles.length)
        })

    setIsLoading(false);


    
  }, [])
  
  return (
<>
{
  isAdmin?"":<div className='text-center font-bold text-4xl flex justify-center items-center w-full h-screen'>You are not admin</div>
}
{
  isLoading?<div className='flex justify-center items-center w-full h-screen'><span className="loading loading-spinner loading-md"></span></div>:isAdmin?(
    <div
    className='my-10 flex justify-center items-center w-full h-[150vh] flex-col'
    style={{
      minWidth: "120vh"
    }}>
   <Link href={"/"} className="my-10 btn btn-primary">Back to Homepage</Link>
<h1 className=' text-center text-[50px] font-bold'>Dashboard</h1>
<h1 className='my-5 text-center text-2xl font-bold'>Welcome, {fullName}</h1>



<div className="flex justify-between items-center flex-row">
  <AdminCard title={"Articles"} body={articlesNumber}/>
  <AdminCard title={"Visitors"} body={"10k"}/>
  <AdminCard title={"Earning"} body={"100$"}/>
</div>



<h1 className='my-20 text-center text-[40px] font-bold'>Actions</h1>


<div className='my-10 flex justify-center items-center flex-row'>
<Link href={"/admin/dashboard/articles"} className="btn btn-primary">Show All Articles</Link>
<Link href={"/admin/dashboard/articles/add-article"} className="mx-2 btn btn-primary">Add New Article</Link>
</div>
</div>
  ):""
}


    </>
  )
}

export default page;