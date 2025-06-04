import React from 'react'
import { Navbar, Sidebar } from './components'
import { Outlet, useLocation } from 'react-router-dom'

function Layout() {
  const location = useLocation();

  // Add any paths where you want to hide the main Sidebar
  const hideSidebarRoutes = ['/admin'];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <>
     {/* {!shouldHideSidebar && (
          <div>
          
          </div>
        )} */}
       <Navbar />
      <div className='sm:flex flex-none overflow-y-hidden'>
        {/* Conditionally render Sidebar */}
        {!shouldHideSidebar && (
          <div>
            <Sidebar />
          </div>
        )}
        <div className='sm:flex min-h-screen justify-center w-full mb-16 mt-3 overflow-y-hidden overflow-x-hidden'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout

