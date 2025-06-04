import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './store/Slices/authSlice';
import { getCurrentAdmin } from './store/Slices/adminSlice';
import Layout from './Layout';
import AdminLayout from './AdminLayout';
import AuthLayout from './components/AuthLayout';


// Lazy loaded components
const Signup = React.lazy(() => import('./components/Signup'));
const Login = React.lazy(() => import('./components/Login'));
const TermsAndConditions = React.lazy(() => import('./components/TermsAndConditons'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const Movies = React.lazy(() => import('./pages/Movies'));
const MovieDetail = React.lazy(() => import('./pages/MovieDetail'));
const MovieByTheater = React.lazy(() => import('./pages/show/MovieByTheater'));
const Show = React.lazy(() => import('./pages/show/Show'));
const BookingPage = React.lazy(() => import('./pages/BookingPage'));
const UserBooking = React.lazy(() => import('./pages/UserBooking'));
const AdminLogin = React.lazy(() => import('./components/Admin/AdminLogin'));
const AdminSignup = React.lazy(() => import('./components/Admin/AdminSignup'));
const DashBoard = React.lazy(() => import('./pages/Admin/DashBoard'));
const MovieManage = React.lazy(() => import('./pages/Admin/MovieManage'));
const EditMovie = React.lazy(() => import('./components/Admin/MovieManage/EditMovie'));
const CreateMovie = React.lazy(() => import('./components/Admin/MovieManage/CreateMovie'));
const Actors = React.lazy(() => import('./pages/Actors/Actors'));
const ActorProfile = React.lazy(() => import('./components/Admin/Actors/ActorProfile'));
const CreateActor = React.lazy(() => import('./pages/Actors/CreateActor'));
const AllShows = React.lazy(() => import('./pages/show/AllShows'));
const AllBooking = React.lazy(() => import('./pages/AllBooking'));
const Theaters = React.lazy(() => import('./pages/Theaters/Theaters'));
const CreateTheater = React.lazy(() => import('./pages/Theaters/CreateTheater'));
const AssignMovie = React.lazy(() => import('./pages/Theaters/AssignMovie'));
const CreateShow = React.lazy(() => import('./pages/show/CreateShow'));
const EditTheater = React.lazy(() => import('./pages/Theaters/EditTheater'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));
const EditProfile = React.lazy(() => import('./pages/profile/EditProfile'));
const EditPersonalInfo = React.lazy(() => import('./components/EditPersonalInfo'));
const ChangePassword = React.lazy(() => import('./components/changePassword'));


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
    
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurrentAdmin());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<React.Suspense fallback={<div>Loading...</div>}><HomePage /></React.Suspense>} />
          <Route path="/movies" element={<React.Suspense fallback={<div>Loading...</div>}><Movies /></React.Suspense>} />
          <Route path="/movies/:movieId" element={<React.Suspense fallback={<div>Loading...</div>}><MovieDetail /></React.Suspense>} />
          <Route path="/movie/:movieId" element={<React.Suspense fallback={<div>Loading...</div>}><MovieDetail /></React.Suspense>} />
          <Route path="/show/:movieId" element={<React.Suspense fallback={<div>Loading...</div>}><MovieByTheater /></React.Suspense>} />
          <Route path="/seatbooking/:showId" element={<React.Suspense fallback={<div>Loading...</div>}><Show /></React.Suspense>} />
          <Route path="signup" element={<React.Suspense fallback={<div>Loading...</div>}><Signup /></React.Suspense>} />
          <Route path="login" element={<React.Suspense fallback={<div>Loading...</div>}><AuthLayout authentication={false}><Login /></AuthLayout></React.Suspense>} />
          <Route path="terms&conditions" element={<React.Suspense fallback={<div>Loading...</div>}><TermsAndConditions /></React.Suspense>} />
          <Route path="/booking/:bookingId" element={<React.Suspense fallback={<div>Loading...</div>}><BookingPage /></React.Suspense>} />
          <Route path="/bookingbyUser/:userId" element={<React.Suspense fallback={<div>Loading...</div>}><AuthLayout authentication={true}><UserBooking /></AuthLayout></React.Suspense>} />
          <Route path="/profile/:username" element={<React.Suspense fallback={<div>Loading...</div>}><AuthLayout authentication={true}><Profile /></AuthLayout></React.Suspense>} />
          <Route
  path="profile/edit"
  element={
    <React.Suspense fallback={<div>Loading...</div>}>
      <AuthLayout authentication={true}>
        <EditProfile />
      </AuthLayout>
    </React.Suspense>
  }
/>

<Route
  path="/edit/personalInfo"
  element={
    <React.Suspense fallback={<div>Loading...</div>}>
      <AuthLayout authentication={true}>
        <EditPersonalInfo />
      </AuthLayout>
    </React.Suspense>
  }
/>

<Route
  path="/edit/password"
  element={
    <React.Suspense fallback={<div>Loading...</div>}>
      <AuthLayout authentication={true}>
        <ChangePassword />
      </AuthLayout>
    </React.Suspense>
  }
/>

        </Route>

        {/* Admin Auth Pages (Outside layout) */}
        <Route path="/admin/login" element={<React.Suspense fallback={<div>Loading...</div>}><AdminLogin /></React.Suspense>} />
        <Route path="/admin/signup" element={<React.Suspense fallback={<div>Loading...</div>}><AdminSignup /></React.Suspense>} />

        {/* Admin Routes (With Admin Layout) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<React.Suspense fallback={<div>Loading...</div>}><AuthLayout authentication={true} adminOnly={true}><DashBoard /></AuthLayout></React.Suspense>} />
          <Route path="/admin/dashboard" element={<React.Suspense fallback={<div>Loading...</div>}><AuthLayout authentication={true} adminOnly={true}><DashBoard /></AuthLayout></React.Suspense>} />
          <Route path="/admin/movieManage" element={<React.Suspense fallback={<div>Loading...</div>}><AuthLayout authentication={true} adminOnly={true}><MovieManage /></AuthLayout></React.Suspense>} />
          <Route path="/admin/movieManage/create" element={<React.Suspense fallback={<div>Loading...</div>}><AuthLayout authentication={true} adminOnly={true}><CreateMovie /></AuthLayout></React.Suspense>} />
          <Route path="/admin/movieManage/:movieId" element={<React.Suspense fallback={<div>Loading...</div>}><EditMovie /></React.Suspense>} />
          <Route path="/admin/actor" element={<React.Suspense fallback={<div>Loading...</div>}><Actors /></React.Suspense>} />
          <Route path="/admin/actor/:artistId" element={<React.Suspense fallback={<div>Loading...</div>}><ActorProfile /></React.Suspense>} />
          <Route path="/admin/actor/create" element={<React.Suspense fallback={<div>Loading...</div>}><CreateActor /></React.Suspense>} />
          <Route path="/admin/shows/all" element={<React.Suspense fallback={<div>Loading...</div>}><AllShows /></React.Suspense>} />
          <Route path="/admin/bookings/all" element={<React.Suspense fallback={<div>Loading...</div>}><AllBooking /></React.Suspense>} />
          <Route path="/admin/theaters" element={<React.Suspense fallback={<div>Loading...</div>}><Theaters /></React.Suspense>} />
          <Route path="/admin/theaters/create" element={<React.Suspense fallback={<div>Loading...</div>}><CreateTheater /></React.Suspense>} />
          <Route path="/admin/theaters/assign/:theaterId" element={<React.Suspense fallback={<div>Loading...</div>}><AssignMovie /></React.Suspense>} />
          <Route path="/admin/theaters/show/create/:theaterId" element={<React.Suspense fallback={<div>Loading...</div>}><CreateShow /></React.Suspense>} />
          <Route path="/admin/theaters/edit/:theaterId" element={<React.Suspense fallback={<div>Loading...</div>}><EditTheater /></React.Suspense>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
