import React, { useState } from 'react'
import { Search, Button, Logo, SearchForSmallScreen } from '../index.js'
import { Link, useAsyncError } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { BsFillTicketPerforatedFill } from 'react-icons/bs';
import { MdPayments } from 'react-icons/md';
import { FaHistory } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { SlMenu } from "react-icons/sl";
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '@/store/Slices/authSlice.js';

function Navbar() {

    const [toggleMenu, setToggleMenu] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const authStatus = useSelector((state) => state.auth.status);
    const username = useSelector((state) => state.auth?.userData?.username);
    const profileImg = useSelector((state) => state.auth.userData?.avatar);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const logout = async()=>{
         await dispatch(userLogout())
         navigate('/')
    }


    const sidePanelItems = [
        {
            icon: < BsFillTicketPerforatedFill size={25} />,
            title: "events",
            url: "/events"
        },

        {
            icon: < MdPayments size={25} />,
            title: "bookings",
            url: "/bookings"
        },

        {
            icon: < FaHistory size={25} />,
            title: "history",
            url: "/history"
        },
    ]

    return (
        // <>
        //     <nav className='w-full bg-[#0E0F0F] flex justify-between items-center p-4 sm:gap-5 border-b-2 border-gray-500 sticky top-0 z-50'>

        //         {/* logo */}
        //         <div className='flex  items-center justify-center gap-2 cursor-pointe'>
        //             <Logo />
        //         </div>

        //         {/* search for large Screens */}

        //         <div className='w-full sm:1/3 hidden sm:block'>
        //             <Search />
        //         </div>

        //         {/* Search for small screens */}

        //         <div className='text-white w-full inline-flex justify-end sm:hidden pr-4'>
        //             <CiSearch
        //                 size={30}
        //                 fontWeight={'bold'}
        //                 onClick={() => setOpenSearch((prev) => !prev)}
        //             />
        //             {
        //                 openSearch && (
        //                     <SearchForSmallScreen
        //                         open={openSearch}
        //                         setOpenSearch={(setOpenSearch)}
        //                     />
        //                 )
        //             }
        //         </div>

        //         {/* Login and Signup buttons for Larger Screens */}

        //              {/* login and signup butons for larger screens */}
        //              {authStatus ? (
        //             <div className="rounded-full sm:block hidden">
        //                 <img
        //                     src={profileImg}
        //                     alt="profileImg"
        //                     className="rounded-full w-10 h-10 object-cover"
        //                 />
        //             </div>
        //         ) : (
        //             <div className="space-x-2 sm:block hidden text-white">
        //                 <Link to={"/login"}>
        //                     <Button className="bg-[#222222] border hover:bg-black border-slate-500 sm:px-4 sm:py-2 p-2">
        //                         Login
        //                     </Button>
        //                 </Link>
        //                 <Link to={"/signup"}>
        //                     <Button className="font-semibold border hover:bg-[#222222] border-slate-500 sm:px-4 sm:py-2 ">
        //                         Sign up
        //                     </Button>
        //                 </Link>
        //             </div>
        //         )}

        //              {/* hamburger for smaller screens */}
        //         <div className="sm:hidden block">
        //             <div className="text-white ">
        //                 <SlMenu
        //                     size={24}
        //                     onClick={() => setToggleMenu((prev) => !prev)}
        //                 />
        //             </div>
        //         </div>

        //             {/* SideBar for Smaller Screens */}

        //             {toggleMenu && (
        //             <div className="fixed right-0 top-0 text-white flex flex-col border-l h-screen w-[70%] bg-[#0F0F0F] sm:hidden rounded-lg outline-none">
        //                 <div className="w-full border-b h-20 flex items-center mb-2 justify-between px-3">
        //                     <div className="flex items-center gap-2">
        //                         <Logo />
        //                     </div>
        //                     <IoCloseCircleOutline
        //                         size={35}
        //                         onClick={() => setToggleMenu((prev) => !prev)}
        //                     />
        //                 </div>

        //                 <div className="flex flex-col justify-between h-full py-5 px-3 j">
        //                     <div className="flex flex-col gap-5">
        //                         {sidePanelItems.map((item) => (
        //                             <NavLink
        //                                 to={item.url}
        //                                 key={item.title}
        //                                 onClick={() =>
        //                                     setToggleMenu((prev) => !prev)
        //                                 }
        //                                 className={({ isActive }) =>
        //                                     isActive ? "bg-purple-500" : ""
        //                                 }
        //                             >
        //                                 <div className="flex items-center border border-slate-500 gap-5 px-3 py-1 hover:bg-purple-500">
        //                                     <div>{item.icon}</div>
        //                                     <span className="text-lg">
        //                                         {item.title}
        //                                     </span>
        //                                 </div>
        //                             </NavLink>
        //                         ))}
        //                     </div>

        //                     {!authStatus ? (
        //                         <div className="flex flex-col space-y-5 mb-3">
        //                             <Link to={"/login"}>
        //                                 <Button className="w-full bg-[#222222] border hover:bg-white hover:text-black border-slate-500 py-1 px-3">
        //                                     Login
        //                                 </Button>
        //                             </Link>
        //                             <Link to={"/signup"}>
        //                                 <Button className=" w-full font-semibold border border-slate-500 hover:bg-white hover:text-black py-1 px-3">
        //                                     Sign up
        //                                 </Button>
        //                             </Link>
        //                         </div>
        //                     ) : (
        //                         <div
        //                             className="flex gap-2 justify-start items-start cursor-pointer py-1 px-2 border border-slate-600"
        //                             onClick={() => logout()}
        //                         >
        //                             <IoMdLogOut size={25} />
        //                             <span className="text-base">Logout</span>
        //                         </div>
        //                     )}
        //                 </div>
        //             </div>
        //         )}

        //     </nav>
        // </>


        <>
            <nav className="w-full bg-[#f8f3f3] flex justify-between items-center p-4 sm:gap-5 gap-2 border-b-2 border-gray-500 sticky top-0 z-50 ">
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                    <Logo  name={"BookMyShow"} />
                </div>

                {/* search for large screens */}
                <div className="w-full sm:w-1/3 hidden sm:block bg-white ">
                    <Search
                    
                    />
                </div>

                {/* search for small screens */}
                <div className="text-white w-full inline-flex justify-end sm:hidden pr-4">
                    <CiSearch
                        size={30}
                        fontWeight={"bold"}
                        fill='bg-black'
                        onClick={() => setOpenSearch((prev) => !prev)}
                    />
                    {openSearch && (
                        <SearchForSmallScreen
                            open={openSearch}
                            setOpenSearch={setOpenSearch}
                        />
                    )}
                </div>

                {/* login and signup butons for larger screens */}
                {authStatus ? (
                    <div className="rounded-full sm:block hidden">
                        <img
                            src={profileImg}
                            alt="profileImg"
                            className="rounded-full w-10 h-10 object-cover"
                        />
                    </div>
                ) : (
                    <div className="space-x-2 sm:block hidden text-white ">
                        <Link to={"/login"}>
                            <Button className="bg-[#F84464] border hover:bg-[#F84464] rounded-[12px] sm:px-4 sm:py-2 p-2">
                                Login
                            </Button>
                        </Link>
                        <Link to={"/signup"}>
                            <Button className="font-semibold bg-[#F84464] border hover:bg-[#F84464] rounded-[12px] sm:px-4 sm:py-2 ">
                                Sign up
                            </Button>
                        </Link>
                    </div>
                )}

                {/* hamburger for smaller screens */}
                <div className="sm:hidden block">
                    <div className="text-white ">
                        <SlMenu
                            size={24}
                            fill='bg-black'
                            onClick={() => setToggleMenu((prev) => !prev)}
                        />
                    </div>
                </div>

                {/* Side bar for smaller screens */}
                {toggleMenu && (
                    <div className="fixed right-0 top-0 text-black flex flex-col border-l h-screen w-[70%] bg-white sm:hidden rounded-lg outline-none">
                        <div className="w-full border-b h-20 flex items-center mb-2 justify-between px-3">
                            <div className="flex items-center gap-2">
                                <Logo />
                            </div>
                            <IoCloseCircleOutline
                                size={35}
                                onClick={() => setToggleMenu((prev) => !prev)}
                            />
                        </div>

                        <div className="flex flex-col justify-between h-full py-5 px-3 j">
                            <div className="flex flex-col gap-5">
                                {sidePanelItems.map((item) => (
                                    <NavLink
                                        to={item.url}
                                        key={item.title}
                                        onClick={() =>
                                            setToggleMenu((prev) => !prev)
                                        }
                                        className={({ isActive }) =>
                                            isActive ? "bg-pink-500" : ""
                                        }
                                    >
                                        <div className="flex items-center border border-slate-500 gap-5 px-3 py-1  hover:bg-[#F84464] rounded-[12px]">
                                            <div>{item.icon}</div>
                                            <span className="text-lg">
                                                {item.title}
                                            </span>
                                        </div>
                                    </NavLink>
                                ))}
                            </div>

                            {!authStatus ? (
                                <div className="flex flex-col space-y-5 mb-3">
                                    <Link to={"/login"}>
                                        <Button className="w-full bg-white border hover:bg-pink-600 hover:text-black border-slate-500 py-1 px-3">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to={"/signup"}>
                                        <Button className=" w-full font-semibold border border-slate-600 hover:bg-pink-400 hover:text-black py-1 px-3">
                                            Sign up
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div
                                    className="flex gap-2 justify-start items-start cursor-pointer py-1 px-2 border border-slate-600"
                                    onClick={() => logout()}
                                >
                                    <IoMdLogOut size={25} />
                                    <span className="text-base">Logout</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Navbar