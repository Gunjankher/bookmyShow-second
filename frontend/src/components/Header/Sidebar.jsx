import { FaHome, FaFilm, FaCalendarAlt, FaThLarge, FaUser } from "react-icons/fa";
import { IoMdHome, IoMdLogOut } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { MdRecommend } from "react-icons/md";
import { MdPayments } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import {userLogout} from '../../store/Slices/authSlice'
import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CiSettings } from "react-icons/ci";
import { RiAdminFill } from "react-icons/ri";



const Sidebar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth?.userData?.username);
  const userId = useSelector((state) => state.auth?.userData?._id);



  const logout = async()=>{
    try {
      await dispatch(userLogout()).unwrap()
      navigate('/')
    } catch (error) {
      console.error("logout failed", error)
    }
  }

  const sidebarTopItems = [
    {
      icon: < IoMdHome size={25}/>,
      title:"Home",
      url:"/"
    },
    {
      icon: < FaVideo size={25}/>,
      title:"movies",
      url:"/movies"
    },
    {
      icon:< BsFillTicketPerforatedFill size={25}/>,
      title:"events",
      url:"/events"
    },
    // {
    //   icon: <  BiCategory size={25}/>,
    //   title:"categories",
    //   url:"/categories"
    // },
    // {
    //   icon: < MdRecommend size={25}/>,
    //   title:"recommended",
    //   url:"/recommended"
    // },
    {
      icon: < MdPayments size={25}/>,
      title:"bookings",
      url:`/bookingbyUser/${userId}`
    },
    // {
    //   icon: < FaHistory size={25}/>,
    //   title:"history",
    //   url:"/history"
    // },
    {
      icon: < RiAdminFill size={25}/>,
      title:"Admin",
      url:"/admin"
    },
    {
      icon: < CgProfile size={25}/>,
      title:"profile",
      url:`/profile/${username}`
    },
  
  ]
  
  
  const bottomBarItems = [
    {
      icon:< IoMdHome size={25}/>,
      title:"Home",
      url:"/"
    },
  
    {
      icon: < FaVideo size={25}/>,
      title:"movies",
      url:"/movies"
    },
  
    {
      icon: < RiAdminFill size={25}/>,
      title:"Admin",
      url:"/admin/"
    },
  
    {
      icon: < CgProfile size={25}/>,
      title:"profile",
      url:`/profile/${username}`
    },
  ]


  return (
    <>
     <div className="sm:block hidden ">
                <div className=" text-white lg:w-55 md:w-44 w-16 sm:p-3 p-2 border-slate-600 border-r h-screen flex flex-col justify-between">
                    <div className="flex flex-col gap-4 mt-5">
                        {sidebarTopItems.map((item) => (
                            <NavLink
                                to={item.url}
                                key={item.title}
                                className={({ isActive }) =>
                                    isActive ? "bg-[#eabac3]" : ""
                                }
                            >
                                <div className="flex items-center gap-2 justify-center sm:justify-start hover:bg-[#F84464] text-black font-semibold cursor-pointer py-1 px-2 border border-slate-600">
                                    {item.icon}
                                    <span className="text-base hidden md:block">
                                        {item.title}
                                    </span>
                                </div>
                            </NavLink>
                        ))}
                    </div>

                    <div className="space-y-4 mb-10">
                        {username && (
                            <div
                                className="flex items-center gap-2 justify-center sm:justify-start hover:bg-[#F84464] cursor-pointer py-1 px-2 border border-slate-600"
                                onClick={() => logout()}
                            >
                                <IoMdLogOut size={25} fill="bg-black" />
                                <span className="text-base hidden md:block">
                                    Logout
                                </span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 justify-center sm:justify-start hover:bg-[#F84464] cursor-pointer py-1 px-2 border border-slate-600">
                            <CiSettings size={25} fill="bg-black" />
                            <span className="text-base hidden md:block">
                                Settings
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* for mobile sidebar is bottom bar*/}
            <div className="border-t-2  h-16 sm:hidden z-20 p-1 w-full flex justify-around fixed bottom-0 bg-white">
    {bottomBarItems.map((item) => (
        <NavLink
            to={item.url}
            key={item.title}
            className={({ isActive }) =>
                isActive ? "text-pink-500" : ""
            }
        >
            <div className="flex flex-col items-center gap-1 cursor-pointer p-2">
                {item.icon}
                <span className="text-sm">{item.title}</span>
            </div>
        </NavLink>
    ))}
</div>

    </>
  )
}

export default Sidebar