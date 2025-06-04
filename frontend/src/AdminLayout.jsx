import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './components/Admin/AdminNavBar'
import AdminSidebar from './components/Admin/AdminSideBar'


function AdminLayout() {
  return (
<>
<AdminNavbar />

<div className='sm:flex flex-none'>

<div className=''>
<AdminSidebar />
</div>

<div className='sm:flex-1 mb-16'>
<Outlet />
</div>

</div>

</>
  )
}

export default AdminLayout