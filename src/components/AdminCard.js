import React from 'react'
import {RiArticleFill} from "react-icons/ri";
import {FaUserAlt} from "react-icons/fa";
import {BiDollar} from "react-icons/bi";

function AdminCard({title, body}) {
  return (
    <div className="mx-5 card w-80 bg-base-100 shadow-xl">
    <div className="flex justify-center items-center flex-col card-body">
        {
            title=="Articles"?<RiArticleFill style={{
                fontSize: "50px"
            }}/>:""
            }
        {
            title=="Visitors"?<FaUserAlt style={{
                fontSize: "50px"
            }}/>:""
            }
        {
            title=="Earning"?<BiDollar style={{
                fontSize: "50px"
            }}/>:""
            }
        
      <h2 className="text-2xl my-5 card-title">{title}</h2>
      <p className='text-[75px] font-bold'>{body}</p>
      <div className="card-actions justify-end">
      </div>
    </div>
  </div>
  )
}

export default AdminCard