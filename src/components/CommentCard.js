import React from 'react'

function CommentCard({name, content, date}) {
  return (
    <div className="my-4 card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
  <div className='flex  items-center flex-row'>
   <div className="avatar mr-2">
  <div className="w-8 rounded-full">
    <img src={`https://ui-avatars.com/api/?name=${name}`} />
  </div>
</div>
    <span className='mx-2 font-bold text-1xl'>{name}</span>
   </div>
    <span>{new Date(date).toDateString()} on {new Date(date).toLocaleTimeString()}</span>
    <p>{content}</p>
  </div>
</div>
  )
}

export default CommentCard
