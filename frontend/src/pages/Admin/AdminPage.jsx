import AdminPopup from '@/components/Admin/AdminPopup'
import React from 'react'
import { useSelector } from 'react-redux'

function AdminPage() {
  const isAdmin = useSelector((state) => state?.admin?.status);

  return (
    <>
      {/* {!isAdmin && <AdminPopup />} */}
      <div className='w-full p-10 text-white'>
        <h1>Welcome to Admin Dashboard</h1>
      </div>
    </>
  );
}

export default AdminPage;
