// App.js
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Login from './views/auths/login';
import Forgotpassword from './views/auths/Forgotpassword';
import ForgotpasswordArtisan from './views/auths/ForgotpasswordArtisan';
import ForgotpasswordBuyer from './views/auths/ForgotpasswordBuyer';



import ArtisanLogin from './views/auths/ArtisanLogin';
import BuyerLogin from './views/auths/BuyerLogin';

import Signup from './views/Signup';
import ErrorPage from './partials/ErrorPage';
import GoogleAuthLogin from './models/googleAuthLogin';

//  protected dashboard component
import Dashboard from './views/dashboard/Home';
import ProfilePage from './views/dashboard/ProfilePage';
import UsersPage from './views/dashboard/UsersPage';
import AddNewUserPage from './views/dashboard/AddNewUserPage';
import EditUserProfilePage from './views/dashboard/EditUserProfilePage';
import Artisans from './views/dashboard/Artisans';
import PreviewArtisan from './views/dashboard/PreviewArtisan';
import Buyers from './views/dashboard/Buyers';
import DashboardServices from './views/dashboard/dashboardServices';

//platform
import Platform from './views/platform/index';
import About from './views/platform/about';
import Contact from './views/platform/contact';
import Services from './views/platform/services';
import ServicesProviders from './views/platform/servicesProviders';
import HistoryPage from './views/platform/HistoryPage';



//artisan dashboar


//create
import CreateBuyer from './views/platform/CreateBuyer';
import CreateArtisan from './views/platform/CreateArtisan';


//artisan dashboard
import ArtitsanHome from './views/platform/ArtisansDashbaord/ArtitsanHome';
import ArtisanCreateServicesForm from './views/platform/ArtisansDashbaord/ArtisanCreateServicesForm'
import BuyerHome from './views/platform/BuyerDashboard/BuyerHome';
import PreviewBuyer from './views/dashboard/PreviewBuyer';
import ArtisanPlatformServices from './views/platform/ArtisansDashbaord/ArtisanPlatformServices'
import Booking from './views/platform/includes/Booking';

// end
function App() {

  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={< Signup />} />


        <Route path="/login" element={<Login />} />

        <Route path="/login-buyer" element={<BuyerLogin />} />
        <Route path="/login-artisan" element={<ArtisanLogin />} />

        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/forgot-password-artisan" element={<ForgotpasswordArtisan />} />
        <Route path="/forgot-password-buyer" element={<ForgotpasswordBuyer />} />


        <Route path="/auth/google/callback" element={<GoogleAuthLogin />} />


        <Route path="/" element={< Platform />} />
        <Route path="/about" element={< About />} />
        <Route path="/contact" element={< Contact />} />
        <Route path="/services" element={< Services />} />
        
        
        
        <Route path="/service-provider/:artisanId" element={< ServicesProviders />} />
        <Route path="/create-buyer" element={< CreateBuyer />} />
        <Route path="/create-artisan" element={< CreateArtisan />} />
        <Route path="/auth/customer/book-service" element={< Booking/>} />


        <Route path="*" element={<ErrorPage />} />
        {isAuthenticated ? (

          <>
            <Route path="/auth/dashboard" element={<Dashboard />} />
            <Route path="/auth/dashboard/profile" element={<ProfilePage />} />
            <Route path="/auth/dashboard/users" element={<UsersPage />} />
            <Route path="/auth/dashboard/create-users" element={<AddNewUserPage />} />
            <Route path="/auth/dashboard/edit-user-profile" element={<EditUserProfilePage />} />


            <Route path="/auth/dashboard/artisans" element={<Artisans />} />
            <Route path="/auth/dashboard/preview-artisan" element={<PreviewArtisan />} />
            <Route path="/auth/dashboard/preview-buyer" element={<PreviewBuyer />} />
            <Route path="/auth/dashboard/buyers" element={<Buyers />} />
            <Route path="/auth/dashboard/services" element={<DashboardServices />} />

            <Route path="/auth/customer/book-history" element={< HistoryPage />} />
            
            <Route path="/auth/artisan/dashboard/home" element={<ArtitsanHome />} />
            <Route path="/auth/artisan/dashboard/create-service-artisan" element={< ArtisanCreateServicesForm/>} />
            <Route path="/auth/artisan/dashboard/home/service-platform" element={< ArtisanPlatformServices/>} />


            <Route path="/auth/buyer/dashboard/home" element={<BuyerHome/>} />
            
            <Route path="/auth/dashboard" element={<Dashboard />} />

          
          </>

        ) : (
          <Route path="/auth/dashboard" element={<Navigate to="/" />} />
        )}


      </Routes>
    </Router>
  );
}

export default App;
