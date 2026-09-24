
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { NavLink, useNavigate } from 'react-router'

import JCILogo from "../../images/JCI/JCI Madagascar/JCI_Madagascar_background_marine_blue_name_blue_logo-removebg-preview.png"
import { authAPI, olAPI } from '../../services/api'
import { LogIn, Menu, X } from 'lucide-react'


const navActiveClass = ({ isActive }) =>
    isActive
        ? "text-jci-yellow scale-105"
        : "text-jci-white hover:scale-105 transition-transform duration-300 hover:text-jci-yellow"


const SidebarAdmin = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)

    const [userLabel, setUserLabel] = useState(user.role)
    const [monOl, setMonOl] = useState(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navLinks =
        (user.role === "SUPER_ADMIN" || user.role === "ADMIN_NATIONAL")
            ? [
                { to: "/admin", label: "Utilisateurs", end: true },
                { to: "/admin/bureau-national", label: "Bureau National" },
                { to: "/admin/zones", label: "Zones" },
                { to: "/admin/past-president", label: "Past Presidents" }
            ]
            : user.role === "ADMIN_LOCAL"
                ? [
                    {
                        to: "/admin/local/mon-organisation-locale",
                        label: "Mon Organisation Locale",
                        end: true
                    }
                ]
                : user.role === "ADMIN_E_COMMERCE"
                    ? [
                        {
                            to: "/admin/e-commerce/boutique",
                            label: "Boutique en ligne",
                            end: true
                        }
                    ]
                    : []


    const getRoleColor = () => {
        if (user.role === 'SUPER_ADMIN') return 'bg-red-900'
        if (user.role === 'ADMIN_NATIONAL') return 'bg-jci-black'
        if (user.role === 'ADMIN_E_COMMERCE') return 'bg-yellow-900'
        return 'bg-green-900'
    }


    const handleLogout = async () => {
        try {
            await authAPI.logout()
            setUser(null)
            navigate("/connexion")
        } catch (error) {
            alert(error)
        }
    }


    const handleMobileNavigate = () => {
        setIsMobileMenuOpen(false)
    }


    useEffect(() => {
        switch (user.role) {
            case "ADMIN_NATIONAL":
                setUserLabel("Administrateur National")
                break

            case "SUPER_ADMIN":
                setUserLabel("Super Administrateur")
                break

            case "ADMIN_LOCAL":
                setUserLabel("Administrateur Local")
                break

            case "ADMIN_E_COMMERCE":
                setUserLabel("Administrateur E-Commerce")
                break

            default:
                setUserLabel("Utilisateur")
        }


        const fetchMonOl = async () => {
            try {
                const res = await olAPI.getById(user.organisationLocalId)
                setMonOl(res.data)
            } catch (error) {
                console.error(error)
            }
        }


        if (user.role === "ADMIN_LOCAL") {
            fetchMonOl()
        }
    }, [user.role])


    return (
        <>
            {/* ================================================= */}
            {/* DESKTOP SIDEBAR */}
            {/* ================================================= */}

            <div
                className={`hidden lg:flex fixed top-0 left-0 h-screen max-w-60 w-60 flex-col gap-10 justify-start ${getRoleColor()} py-5 px-10 z-40`}
            >

                {/* Logo + rôle */}
                <div className='flex flex-col gap-2'>

                    <img
                        src={
                            user.role === 'ADMIN_LOCAL'
                                ? `${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${monOl?.logoImgUrl}`
                                : JCILogo
                        }
                        className='h-15 w-auto object-contain hover:scale-105 transition-transform duration-300'
                    />

                    <p className='text-jci-white/80 text-[12px] font-bold mt-2'>
                        {userLabel}
                    </p>

                </div>


                {/* Navigation */}
                <div className='flex flex-col gap-6 justify-between h-full'>

                    <div className="flex flex-col gap-4 text-jci-white/80 text-[12px] font-bold">

                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={navActiveClass}
                                end={link.end}
                            >
                                {link.label}
                            </NavLink>
                        ))}


                        {(user.role === 'ADMIN_NATIONAL' ||
                            user.role === 'SUPER_ADMIN') && (

                            <>
                                <div className='w-full h-[0.5px] bg-jci-white/50'></div>

                                <NavLink
                                    to="/admin/evenements/national"
                                    className={navActiveClass}
                                >
                                    Evenements
                                </NavLink>

                                <NavLink
                                    to="/admin/e-commerce"
                                    className={navActiveClass}
                                >
                                    Boutique en ligne
                                </NavLink>
                            </>
                        )}

                    </div>


                    {/* Logout */}
                    <div className='flex flex-col gap-2 text-jci-white/80 text-[12px] font-bold'>

                        <button
                            onClick={handleLogout}
                            className='flex flex-row items-center w-fit gap-2 bg-jci-yellow px-3 py-2 text-jci-black border border-jci-yellow rounded hover:text-jci-yellow hover:bg-transparent hover:border-jci-yellow cursor-pointer'
                            title="Se déconnecter"
                        >
                            Se déconnecter
                            <LogIn size={16} />
                        </button>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* MOBILE NAVBAR */}
            {/* ================================================= */}

            <div
                className={`lg:hidden fixed top-0 left-0 w-full ${getRoleColor()} z-50`}
            >

                {/* Top navbar */}
                <div className='h-16 px-5 flex items-center justify-between'>

                    {/* Logo */}
                    <div className='flex items-center gap-3'>

                        <img
                            src={
                                user.role === 'ADMIN_LOCAL'
                                    ? `${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${monOl?.logoImgUrl}`
                                    : JCILogo
                            }
                            className='h-10 w-auto object-contain'
                        />

                        <p className='text-jci-white text-[11px] font-bold'>
                            {userLabel}
                        </p>

                    </div>


                    {/* Menu button */}
                    <button
                        type='button'
                        onClick={() =>
                            setIsMobileMenuOpen(prev => !prev)
                        }
                        className='text-jci-white p-2 rounded hover:bg-jci-white/10 cursor-pointer'
                    >
                        {isMobileMenuOpen
                            ? <X size={24} />
                            : <Menu size={24} />
                        }
                    </button>

                </div>


                {/* Mobile menu */}
                {isMobileMenuOpen && (

                    <div className='px-5 pb-5 border-t border-jci-white/20'>

                        <div className='flex flex-col gap-4 pt-5 text-jci-white/80 text-[12px] font-bold'>

                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    end={link.end}
                                    className={navActiveClass}
                                    onClick={handleMobileNavigate}
                                >
                                    {link.label}
                                </NavLink>
                            ))}


                            {(user.role === 'ADMIN_NATIONAL' ||
                                user.role === 'SUPER_ADMIN') && (

                                <>
                                    <div className='w-full h-[0.5px] bg-jci-white/50'></div>

                                    <NavLink
                                        to="/admin/evenements/national"
                                        className={navActiveClass}
                                        onClick={handleMobileNavigate}
                                    >
                                        Evenements
                                    </NavLink>

                                    <NavLink
                                        to="/admin/e-commerce"
                                        className={navActiveClass}
                                        onClick={handleMobileNavigate}
                                    >
                                        Boutique en ligne
                                    </NavLink>
                                </>
                            )}


                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                className='flex flex-row items-center justify-center gap-2 bg-jci-yellow px-3 py-2.5 text-jci-black border border-jci-yellow rounded hover:text-jci-yellow hover:bg-transparent hover:border-jci-yellow cursor-pointer w-full'
                            >
                                Se déconnecter
                                <LogIn size={16} />
                            </button>

                        </div>

                    </div>
                )}

            </div>
        </>
    )
}

export default SidebarAdmin
