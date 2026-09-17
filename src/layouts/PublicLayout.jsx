import React, { useContext } from 'react'
import { Navigate ,Outlet} from 'react-router'
import Header from '../components/layout/Header'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { UserContext } from '../context/UserContext';
import AnimationLoading from '../images/LoadingLogoJCIM.gif';


const PublicLayout = () => {
    const {user, loading} = useContext(UserContext);
    if (loading) {
      return (
          <div className='bg-jci-blue flex flex-col justify-center items-center h-screen text-[20px] text-jci-white gap-3 font-poppins'>
            <img src={AnimationLoading} alt="Loading..." className='h-50 w-auto' />
            <p>Loading...</p>
          </div>
        )
    }
    if(user){
      return <Navigate to ="/admin" replace/>
    }

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