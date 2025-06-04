import ProfileHeader from "@/components/ProfileHeader";
import ProfileNavigate from "@/components/profileNavigate";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function EditChannel() {
    const profile = useSelector((state) => state.auth?.userData);
    const loading = useSelector((state) => state.auth?.loading);
    window.scrollTo(0, 0);
    console.log(`this is channel`, channel);
    
    return (
        <>
            {loading && (
                <div className="w-full fixed top-20 flex justify-center z-20">
                    <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
                        <Spinner />
                        <span className="text-md font-bold text-white">
                            wait dude...
                        </span>
                    </div>
                </div>
            )}

{profile && (
                <ProfileHeader
                    username={username}
                    coverImage={profile?.coverImage.url}
                    avatar={profile?.avatar}
                    fullName={profile?.fullName}
                    edit={profile?.username === username} 
                />
            )}
            <ProfileNavigate username={username} />
            <div className="h-[32rem] sm:h-96 mb-20 sm:mb-0 text-black">
                <Outlet />
            </div>
        </>
    );
}

export default EditChannel;