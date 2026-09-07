// import React, { useContext } from 'react'
// import Header from './Header'
import { Navigate, Outlet } from 'react-router'
import Header from '../components/layout/Header'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
// import { UserContext } from '../context/UserContext';


const PublicLayout = () => {
//     const {user, loading} = useContext(UserContext);
//     // console.log("BackOffice==", user)
//     if (loading) {
//     return <div>Chargement...</div>;
//   }
//   if(user){
//     return <Navigate to ="/admin/services" replace/>
//   }
  return (
    <>
    <Header/>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default PublicLayout