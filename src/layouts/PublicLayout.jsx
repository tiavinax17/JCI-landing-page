// import React, { useContext } from 'react'
// import Header from './Header'
import { Navigate, Outlet } from 'react-router'
// import Footer from './Footer'
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
    {/* <Header/> */}
    <Outlet/>
    {/* <Footer/> */}
    </>
  )
}

export default PublicLayout