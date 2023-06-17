import Link from 'next/link'
import React from 'react'

function ArticlesCard({title, poster, slug, content, author}) {
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
      <Link href={`/articles/${slug}`} className="btn btn-primary">Read More</Link>
        
    </div>
  </div>
</div>
  )
}

export default ArticlesCard
