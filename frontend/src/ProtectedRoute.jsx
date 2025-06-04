 import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminPopup from './components/Admin/AdminPopup'



 
 function ProtectedRoute({children,authentication}) {

  const navigate = useNavigate()
  const authStatus = useSelector((state)=>state.admin.status)

  useEffect(() => {
    if (!authentication && authStatus !== authentication) {
        return
    }
}, [authStatus, authentication, navigate]);

if (authentication && authStatus !== authentication) {
    return <AdminPopup />;
}

return children;
 }
 
 export default ProtectedRoute