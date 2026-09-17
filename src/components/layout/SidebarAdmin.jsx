import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { NavLink } from 'react-router'

import JCILogo from "../../images/JCI/JCI Madagascar/JCI_Madagascar_background_marine_blue_name_blue_logo-removebg-preview.png" 
import { authAPI } from '../../services/api';
import { useNavigate } from 'react-router';
import { LogIn } from 'lucide-react';
const navActiveClass = ({ isActive }) => isActive ? "text-jci-yellow scale-105 " : "text-jci-white hover:scale-105 transition-transform duration-300 hover:text-jci-yellow";


const SidebarAdmin = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext)
    const [userLabel, setUserLabel] = useState(user.role)
    const navLinks = (user.role === "SUPER_ADMIN" || user.role ==="ADMIN_NATIONAL") ? [
            { to: "/admin", label: "Utilisateurs", end: true },
            { to: "/admin/bureau-national", label: "Bureau National" },
            { to: "/admin/zones", label: "Zones" },
            { to: "/admin/past-president", label: "Past Presidents" }
        ] : [
            { to: "/admin/mon-ol", label: "Mon Ol", end: true },
            { to: "/admin/membres", label: "Membres" }
        ]
    const handleLogout = async () => {
        try {
            const res = await authAPI.logout();
            console.log(res)
            setUser(null)
            navigate("/");
        } catch (error) {
        alert(error);
        }
    }

    useEffect(() => {
        switch(user.role) {
            case "ADMIN_NATIONAL":
                setUserLabel("Administrateur National");
                break;
            case "SUPER_ADMIN":
                setUserLabel("Super Administrateur");
                break;
            case "ADMIN_LOCAL":
                setUserLabel("Administrateur Local");
                break;
            default:
                setUserLabel("Utilisateur");
        }
    }, [user.role]);

  return (
    <div 
        className={`fixed top-0 left-0 lg:flex lg:h-screen max-w-60 w-60  flex-col gap-10 justify-start 
        ${user.role === 'SUPER_ADMIN'
            ? 'bg-red-900 '
            : user.role === 'ADMIN_NATIONAL'
            ? 'bg-jci-black '
            : 'bg-green-900 '
        } py-5 px-10`}
    >
        <div className='flex flex-col gap-2'>
            <img src={JCILogo} className='h-15 w-auto object-contain hover:scale-105 transition-transform duration-300'/> 
            <p className='text-jci-white/80 text-[12px] font-bold mt-2'>{userLabel}</p>
        </div> 
        <div className='flex flex-col gap-6 justify-between h-full'>
            <div className="flex flex-col gap-4 text-jci-white/80 text-[12px] font-bold">
                {navLinks.map((link) => (
                    <NavLink key={link.to} to={link.to} className={navActiveClass} end={link.end}>{link.label}</NavLink>
                ))}

                <div className='w-full h-[0.5px] bg-jci-white/50'></div>
                
                <NavLink to="/admin/evenements" className={navActiveClass}>Evenements</NavLink>
            </div>
            <div className='flex flex-col gap-2 text-jci-white/80 text-[12px] font-bold'>

                <button onClick={handleLogout}
                className='flex flex-row items-center gap-2 bg-jci-yellow px-3 py-2 text-jci-black border border-jci-yellow rounded hover:text-jci-yellow hover:bg-transparent hover:border  hover:border-jci-yellow cursor-pointer'
                >Se déconnecter <LogIn size={16}/></button>
            </div>   
        </div>
    </div> 
  )
}

export default SidebarAdmin