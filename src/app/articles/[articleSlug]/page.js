"use client"
import ArticlesCard from '@/components/ArticlesCard'
import Hero from '@/components/Hero'
import Navbar from '@/components/NavbarOld'
import Image from 'next/image'
import {BiTimeFive} from "react-icons/bi";
import 'react-toastify/dist/ReactToastify.css';
import {useUserStore} from "../../../store/store"
import { ToastContainer, toast } from 'react-toastify';

import {AiOutlineRead} from "react-icons/ai";

import { useState, useEffect} from 'react'
import CommentCard from '@/components/CommentCard'

export default function Home({params}) {
  const { isAlert, alertMsg, alertType, setIsAlert, setAlertMsg, setAlertType, setIsLogin, isLogin, username, setUsername, setAvatar } = useUserStore();

  const {articleSlug} = params;
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [readTime, setReadTime] = useState(0);
  const [comments, setComments] = useState([]);
  const [slug, setSlug] = useState("");

  const [commentName, setCommentName] = useState("");
  const [commentContent, setCommentContent] = useState("");

  const updateComments = async() => {
    console.log("updating articles")
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-comments`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json"

      },
      body: JSON.stringify({slug:articleSlug})
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setComments(data.comments);
    })
  }

  const onCommentChange = (e) => {
    if (e.target.name == "name") {
      setCommentName(e.target.value);
    }
    else {
      setCommentContent(e.target.value)
    }
  }

  const addComment = async() => {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/add-comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: username,slug:articleSlug,content: commentContent})
     })
     .then(res => res.json())
      .then(data=> {
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
      updateComments();
      setCommentContent("");
      setCommentName("")
  }
  useEffect(() => {
   const getData = async() => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-article`, {
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
   }

   getData();

    const getComments = async() => {
      console.log("Fetching comments", articleSlug);
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/get-comments`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
  
        },
        body: JSON.stringify({slug:articleSlug})
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setComments(data.comments);
      })
    }
    getComments();
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
<h1 className='my-5 text-4xl text-center font-bold'>Blog</h1>
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
        
        
        <div className='flex justify-center items-center flex-col'>

          <h1 className='my-4 text-center font-bold text-4xl'>Comments <span className='text-2xl'>({comments.length})</span></h1>
          {
            comments.map(comment => {
              return <CommentCard key={comment._id} name={comment.name} content={comment.content} date={comment.createdAt}/>
            })
          }
          <h1 className='my-4 text-center font-bold text-4xl'>Add a Comment</h1>
         {
          isLogin?(
            <>
             {/* <input type="text" value={commentName} name='name' onChange={onCommentChange} placeholder="Enter name..." className="input input-bordered input-primary w-full max-w-xs" /> */}
      
      <textarea value={commentContent} name='content' onChange={onCommentChange} className="my-4 textarea textarea-primary" placeholder="Enter Comment...."></textarea>

      <button onClick={addComment} className='my-5 btn btn-primary'>Post Comment</button>
            </>
          ): <h2 className='font-bold'>You need to login to add comment</h2>
         }
        </div>
    </>

  )
}
   </div>
    
    </>
  )
}
