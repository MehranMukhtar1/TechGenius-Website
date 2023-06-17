"use client"
import ArticlesCard from '@/components/ArticlesCard'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import {BiTimeFive} from "react-icons/bi";
import {AiOutlineRead} from "react-icons/ai";

import { useState, useEffect} from 'react'

export default function Home({params}) {
  const {articleSlug} = params;
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [readTime, setReadTime] = useState(0);
  useEffect(() => {
   fetch("http://localhost:3000/api/get-article", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({slug:articleSlug})
   })
   .then(res => res.json())
    .then(data=> {
setArticle(data.article)
console.log(article)
setIsLoading(false)

const text = data.article[0].content;
        const wpm = 225;
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);

        setReadTime(time);
    })
    }, [])
  
  return (
    <>
<h1 className='my-5 text-4xl text-center font-bold'>Blogs</h1>
   <div  className='my-10 flex justify-center items-center flex-col'>
{
  isLoading?<span className="loading loading-spinner loading-md"></span>:(
    <>
   <img src={article[0].poster} alt="Article Poster"/>
   <h1 className='font-bold text-5xl my-10'>{article[0].title}</h1>


   <div className="contact-div w-full flex justify-evenly items-center text-center sm:flex-col md:flex-row lg:flex-row xl:flex-row">

        <div className="flex justify-center items-center flex-col">
         <span>
         <div className="avatar mr-2">
  <div className="w-8 rounded-full">
    <img src={`https://ui-avatars.com/api/?name=${article[0].author}`} />
  </div>
  </div>
         </span>
          <p>{article[0].author}</p>
        </div>


        <div className="flex justify-center items-center flex-col">
          <BiTimeFive style={{
          fontSize: "30px",
         }}/>
          <p>{new Date(article[0].createdAt).toLocaleString()}</p>
        </div>


        <div className="flex justify-center items-center flex-col">
          <AiOutlineRead style={{
          fontSize: "30px"
         }}/>
          <p>{readTime} Min Read</p>
        </div>





      </div>
        <div className='mx-10 my-[100px]' dangerouslySetInnerHTML={{__html: article[0].content}}></div>
    </>
  )
}
   </div>
    
    </>
  )
}
