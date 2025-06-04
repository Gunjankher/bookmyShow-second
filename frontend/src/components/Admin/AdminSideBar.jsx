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
import { adminLogout } from "@/store/Slices/adminSlice";




const AdminSidebar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminName = useSelector((state) => state.admin?.adminData?.username);


  const logout = async()=>{
    try {
      await dispatch(adminLogout()).unwrap()
      navigate('/')
    } catch (error) {
      console.error("logout failed", error)
    }
  }

  const sidebarTopItems = [
    {
      icon: < IoMdHome size={25}/>,
      title:"DashBoard",
      url:"/admin/dashboard"
    },
    {
      icon: < FaVideo size={25}/>,
      title:"MovieMange",
      url:"/admin/movieManage"
    },
    {
      icon:< BsFillTicketPerforatedFill size={25}/>,
      title:"Actor",
      url:"/admin/actor"
    },
    {
      icon: <  BiCategory size={25}/>,
      title:"Shows",
      url:"/admin/shows/all"
    },
    {
      icon: < MdRecommend size={25}/>,
      title:"Theaters",
      url:"/admin/theaters"
    },
    {
      icon: < MdPayments size={25}/>,
      title:"bookings",
      url:"/admin/bookings/all"
    },
    
    // {
    //   icon: < RiAdminFill size={25}/>,
    //   title:"Admin",
    //   url:"/admin"
    // },
    {
      icon: < CgProfile size={25}/>,
      title:"profile",
      url:"/profile"
    },
  
  ]
  
  
  const bottomBarItems = [
    {
      icon:< IoMdHome size={25}/>,
      title:"Home",
      url:"/admin/dashboard"
    },
  
    {
      icon: < FaVideo size={25}/>,
      title:"MovieMange",
      url:"/admin/movieManage"
    },
  
    {
      icon:< BsFillTicketPerforatedFill size={25}/>,
      title:"Actor",
      url:"/admin/actor"
    },
  
    {
      icon:< CgProfile size={25}/>,
      title:"profile",
      url:"/profile"
    },
  ]


  return (
    <>
     <div className="sm:block hidden">
                <div className=" text-black lg:w-55 md:w-44 w-16 sm:p-3 p-2 border-slate-600 border-r h-screen flex flex-col justify-between">
                    <div className="flex flex-col gap-4 mt-5">
                        {sidebarTopItems.map((item) => (
                            <NavLink
                                to={item.url}
                                key={item.title}
                                className={({ isActive }) =>
                                    isActive ? "bg-pink-300" : ""
                                }
                            >
                                <div className="flex items-center gap-2 justify-center sm:justify-start hover:bg-pink-400 cursor-pointer py-1 px-2 border border-slate-600">
                                    {item.icon}
                                    <span className="text-base hidden md:block">
                                        {item.title}
                                    </span>
                                </div>
                            </NavLink>
                        ))}
                    </div>

                    <div className="space-y-4 mb-10">
                        {adminName && (
                            <div
                                className="flex items-center gap-2 justify-center sm:justify-start hover:bg-purple-500 cursor-pointer py-1 px-2 border border-slate-600"
                                onClick={() => logout()}
                            >
                                <IoMdLogOut size={25} />
                                <span className="text-base hidden md:block">
                                    Logout
                                </span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 justify-center sm:justify-start hover:bg-purple-500 cursor-pointer py-1 px-2 border border-slate-600">
                            <CiSettings size={25} />
                            <span className="text-base hidden md:block">
                                Settings
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* for mobile sidebar is bottom bar*/}
            <div className="border-t-2 text-white h-16 sm:hidden z-20 p-1 w-full flex justify-around fixed bottom-0 bg-[#0E0F0F]">
    {bottomBarItems.map((item) => (
        <NavLink
            to={item.url}
            key={item.title}
            className={({ isActive }) =>
                isActive ? "text-purple-500" : ""
            }
        >
            <div className="flex flex-col items-center gap-1 cursor-pointer p-1">
                {item.icon}
                <span className="text-sm">{item.title}</span>
            </div>
        </NavLink>
    ))}
</div>

    </>
  )
}

export default AdminSidebar