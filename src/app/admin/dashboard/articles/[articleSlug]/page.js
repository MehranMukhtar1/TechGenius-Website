"use client"

import React, {useState, useEffect} from 'react'
import jwt from "jsonwebtoken";
import AdminCard from '@/components/AdminCard';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ArticleEditor from '@/components/ArticleEditor';
function page({params}) {

  const {articleSlug } = params;

  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [poster, setPoster] = useState("");
  const [author, setAuthor] = useState("");
  const [id, setId] = useState("");

  const handleOnChange = (e) => {
    if (e.target.name == "title") {
      setTitle(e.target.value)
    }
    else if (e.target.name == "slug") {
      setSlug(e.target.value)
    }
    else if (e.target.name == "content") {
      setContent(e.target.getContent())
    }

    else if (e.target.name == "poster") {
      setPoster(e.target.value)
    }
    else {
      setAuthor(e.target.value)
    }
  }

  const updateArticle = () => {
    const data = {
      _id: id,
      title: title,
      slug: slug,
      author: author,
      poster: poster,
      content: content
    }
console.log(id, title, slug, poster, author, content);

fetch("http://localhost:3000/api/update-article", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(data=> {
  console.log(data.message);
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
})
  }


  useEffect(() => {
    const token = localStorage.getItem("jwt_token");


    if (token != null) {
      const data = jwt.decode(token, process.env.NEXT_JWT_TOKEN);
     if (data){
      setFullName(data.username);
     }
    }
    
    fetch("http://localhost:3000/api/get-article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({slug: articleSlug})
    })
    .then(res => res.json())
    .then(data => {
      setTitle(data.article[0].title);
      setSlug(data.article[0].slug);
      setContent(data.article[0].content);
      setAuthor(data.article[0].author);
      setPoster(data.article[0].poster);
      setId(data.article[0]._id)
      console.log(data.article[0]._id)
    })

    setIsLoading(false);


    
  }, [])
  
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
<div className='flex justify-evenly items-center flex-col h-[200vh]'>

<input type="text" value={title} onChange={handleOnChange} name="title" placeholder="Enter Article Title" className="input input-bordered input-primary w-[70%] max-w-xs" />
        <input type="text"  value={slug} onChange={handleOnChange} name="slug" placeholder="Enter Article Slug" className="input input-bordered input-primary w-full max-w-xs" />
        <input  value={poster} onChange={handleOnChange} name="poster" type="text" placeholder="Enter Article Poster URL" className="input input-bordered input-primary w-full max-w-xs" />
        <input  value={author} onChange={handleOnChange} name="author" type="text" placeholder="Enter Article Author" className="input input-bordered input-primary w-full max-w-xs" />
<ArticleEditor  content={content} handleContent={
  (e)=> {
    setContent(e.target.getContent())
  }
} name="content"/>

<button onClick={updateArticle} className='btn btn-primary'>Update Article</button>


    </div>
</>
  )
}

export default page;