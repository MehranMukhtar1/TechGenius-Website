"use client"
import ArticlesCard from '@/components/ArticlesCard'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { useState, useEffect} from 'react'

export default function Home() {

  const searchArticle =() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({searchValue:searchQuery})
    })
    .then(res=> res.json())
    .then(data => {
      setArticles(data.articles);
      console.log(data.articles)
    })
  }

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
   fetch(`${process.env.NEXT_PUBLIC_URL}/api/all-articles`)
   .then(res => res.json())
    .then(data=> {

  setArticles(data.articles);
  setIsLoading(false);

    })
    }, [])

    const handleOnChange = (e) => {
      setSearchQuery(e.target.value);
    }
  
  return (
    <>

<h1 className='my-5 text-4xl text-center font-bold'>Blogs</h1>
   <div  className='my-10 flex justify-center items-center flex-col'>
   {
  isLoading?<span className="loading loading-spinner loading-md"></span>:<div className='my-5 flex justify-center items-center flex-row'> 
  <input type="text" value={searchQuery} name='search' onChange={handleOnChange} placeholder="Search here" className="input input-bordered input-primary w-full max-w-xs" />
  <button onClick={searchArticle} className='mx-5 btn btn-primary'>Search Article</button>
  </div>}
   {
articles.map(article=> {
  return <ArticlesCard key={article._id} author={article.author} content={article.content} title={article.title} slug={article.slug} poster={article.poster}/>
})
     }
   </div>
    
    </>
  )
}
