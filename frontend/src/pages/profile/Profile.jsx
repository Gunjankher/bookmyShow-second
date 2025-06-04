import ProfileHeader from '@/components/ProfileHeader';
import ProfileNavigate from '@/components/profileNavigate';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';



function Profile() {

    const dispatch = useDispatch();
    const { username } = useParams();

    const profile = useSelector((state) => state.auth?.userData);

    console.log(`this is profile`,profile);
    

  return (
    
    <>
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
  )
}

export default Profile