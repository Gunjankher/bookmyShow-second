import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function AuthLayout({ children, authentication, adminOnly = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Access user and admin status from Redux state
  const userData = useSelector((state) => state.auth.userData);
  const adminData = useSelector((state) => state.admin.adminData);

  console.log(`adminData`,adminData);
  

  // Check if the admin has a role 'admin'
  const isAdmin = adminData?.role === "admin";

  const isUser = userData?.role ==="user"

  useEffect(() => {
    if (authentication) {
      // Route requires login
      if (adminOnly && !isAdmin) {
        // If the route is for admins only and user is not an admin
        navigate("/admin/login", { replace: true, state: { from: location } });
      } else if (!adminOnly && !userData) {
        // If the route is for general users and user is not logged in
        navigate("/login", { replace: true, state: { from: location } });
      }
    } else {
      // Route is public, but if user/admin is logged in, prevent access to login/signup
      if (adminOnly && isAdmin) {
        // If the route is for admins only and admin is logged in, redirect to admin dashboard
        navigate("/admin", { replace: true });
      } else if (!adminOnly && userData) {
        // If the route is for general users and user is logged in, redirect to home
        navigate("/", { replace: true });
      }
    }
  }, [authentication, adminOnly, userData, isAdmin, navigate, location]);

  // Don't render children if not authorized yet
  if (
    (authentication && adminOnly && !isAdmin) || // Admin route but not an admin
    (authentication && !adminOnly && !userData) // General route but not logged in
  ) {
    return null;
  }

  return children;
}

export default AuthLayout;
