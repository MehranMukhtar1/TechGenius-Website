"use client"
import ArticlesCard from '@/components/ArticlesCard'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { useState, useEffect} from 'react'

export default function Home() {

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
   fetch("http://localhost:3000/api/all-articles")
   .then(res => res.json())
    .then(data=> {

  setArticles(data.articles);
  setIsLoading(false);

    })
    }, [])
  
  return (
    <>

<h1 className='my-5 text-4xl text-center font-bold'>Blogs</h1>
   <div  className='my-10 flex justify-center items-center flex-col'>
   {
  isLoading?<span className="loading loading-spinner loading-md"></span>:""}
   {
articles.map(article=> {
  return <ArticlesCard key={article._id} author={article.author} content={article.content} title={article.title} slug={article.slug} poster={article.poster}/>
})
     }
   </div>
    
    </>
  )
}
