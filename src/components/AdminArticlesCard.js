import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

function ArticlesCard({onDeleteFunction, title, poster, slug, content, author}) {
  const router = useRouter();
  const deleteArticle = () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/delete-article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({slug:slug})
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      router.refresh();
      
    })
  }
  return (

<div className="my-5 card w-[50%] h-[500px] card-compact bg-base-100 shadow-xl">
  <figure><img src={poster} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
   <div className='flex  items-center flex-row'>
   <div className="avatar mr-2">
  <div className="w-8 rounded-full">
    <img src={`https://ui-avatars.com/api/?name=${author}`} />
  </div>
</div>
    <span>{author}</span>
   </div>
    <p>{content.substring(0,100)}....</p>
    <div className="card-actions justify-end">
      <Link href={`/admin/dashboard/articles/${slug}`} className="btn btn-primary">Edit</Link>
      <button onClick={onDeleteFunction} className="mx-2 btn btn-error">Delete</button>
        
    </div>
  </div>
</div>
  )
}

export default ArticlesCard
