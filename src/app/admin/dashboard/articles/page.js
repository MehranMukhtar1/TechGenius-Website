"use client"

import React, {useState, useEffect} from 'react'
import jwt from "jsonwebtoken";
import AdminArticlesCard from '@/components/AdminArticlesCard';
import Link from 'next/link';
function page() {

  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false)




  useEffect(() => {
    const token = localStorage.getItem("jwt_token");


    if (token != null) {
      const data = jwt.decode(token, process.env.NEXT_JWT_TOKEN);
     if (data){
      setFullName(data.username);
      setIsAdmin(data.isAdmin);
      console.log(data)
     }
    }
    
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/all-articles`)
        .then(res=>res.json())
        .then(data => {
          setArticles(data.articles)
        })

    setIsLoading(false);


    
  }, [])
  
  return (
<>
{
  isAdmin?"":<div className='text-center font-bold text-4xl flex justify-center items-center w-full h-screen'>You are not admin</div>
}
{
  isLoading?<div className='flex justify-center items-center w-full h-screen'><span className="loading loading-spinner loading-md"></span></div>:(
    <div
    className='my-10 flex justify-center items-center w-full flex-col'
    style={{
      
    }}>
  

<h1 className='my-5 text-center text-[40px] font-bold'>All Articles</h1> 
{
  isAdmin && articles.map(article=> {
    return <AdminArticlesCard onDeleteFunction={()=> {
      deleteArticle(article.slug);
    }} key={article._id} author={article.author} content={article.content} title={article.title} slug={article.slug} poster={article.poster}/>

  })
}

</div>
  )
}


    </>
  )
}

export default page;