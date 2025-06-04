import React from 'react'
import {Link} from 'react-router-dom'
import { RiMovie2AiFill } from "react-icons/ri";

function Logo({size = "30" ,name}) {
  return (
   <>
   <Link to={"/"} className='flex gap-2 items-center '>
   <RiMovie2AiFill 
   size={size}
   color='#F84464'
   />

   <span className='font-bold #FFFFFF'>{name}</span>


   </Link>
   </>
  )
}

export default Logo