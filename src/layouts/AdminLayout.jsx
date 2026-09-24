import React, { useContext } from 'react'
// import Sidebar from './Sidebar'
import { Outlet, Navigate } from 'react-router'
import { UserContext } from '../context/UserContext'
import SidebarAdmin from './../components/layout/SidebarAdmin';
import AnimationLoading from '../images/LoadingLogoJCIM.gif';

const AdminLayout = () => {
      const {user, loading} = useContext(UserContext);
      if (loading) {
      return (
        <div className='bg-jci-blue flex flex-col justify-center items-center h-screen text-[20px] text-jci-white gap-3 font-poppins'>
          <img src={AnimationLoading} alt="Loading..." className='h-50 w-auto' />
          <p>Loading...</p>
        </div>
      )
    }
    if(!user){
      return <Navigate to ="/" replace/>
    }
  return (
    <div className='flex flex-row'>
      <SidebarAdmin/>
       <main className="md:ml-60 w-full">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout