import JCILogo from "../../images/JCI/JCI MAdagascar/JCI_Madagascar_background_marine_blue_name_blue_logo-removebg-preview.png" 
import { NavLink } from 'react-router'
import ButtonVoid from "../ui/ButtonVoid"
import SocialIconsRow from "../ui/SocialIconsRow"
import { LogIn, Menu, X } from "lucide-react"
import { useState } from "react"
import ButtonFull from './../ui/ButtonFull';
import { ShoppingCart } from 'lucide-react';
import France from "../../images/flags/Flag_of_France.svg";
import Us from "../../images/flags/Flag_of_the_United_States.svg";
import BuildLegacyLogo from "../../images/Charte Build Legacy Together/BLT Blanc/BLT-07.png"

const navActiveClass = ({ isActive }) => isActive ? "text-jci-yellow scale-105 " : "text-jci-white hover:scale-105 transition-transform duration-300 hover:text-jci-yellow";

const navLinks = [
    { to: "/", label: "Accueil", end: true },
    { to: "/jci-madagascar", label: "JCI Madagascar" },
    { to: "/organisations-locales", label: "Organisations Locales" },
    { to: "/blog", label: "Blog" },
    { to: "/partenaires", label: "Partenaires" },
    { to: "/contact", label: "Contact" },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [flag, setFlag] = useState("fr");

  return (
    <>
    <div className='hidden lg:flex fixed top-4 left-8 h-screen w-fit  px-1  rounded flex-col gap-2 z-50 justify-start '> 
        <NavLink to="/" className="bg-jci-black/50 backdrop-blur rounded-xl py-1 px-7 flex justify-center items-center border border-gray-600/20"> 
            <img src={JCILogo} className='h-10 w-auto hover:scale-105 transition-transform duration-300'/> 
        </NavLink>
        <div className='border border-gray-600/20 flex flex-col h-screen bg-jci-black/50 backdrop-blur rounded-xl py-7 px-2  mb-5 text-jci-white text-[12px] font-roboto font-bold items-center justify-between '> 
            
            <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                    <NavLink key={link.to} to={link.to} className={navActiveClass} end={link.end}>{link.label}</NavLink>
                ))}
            </div>
            <div className="flex flex-col gap-4">
                <SocialIconsRow />
                <ButtonVoid
                    TextColor="text-jci-yellow"
                    SizeText="12px"
                >Devenir membre <LogIn size={20}/></ButtonVoid>
            </div>
        </div> 
    </div>

    {/* Navbar mobile : barre du haut avec logo + bouton menu, visible en dessous de lg */}
    <div className='lg:hidden fixed top-4 left-4 right-4 z-50 flex items-center justify-between rounded-xl px-4 py-2 border border-gray-600/20 bg-jci-black/40 backdrop-blur'>
       <div className="flex flex-row gap-1">
            <img src={JCILogo} className='h-8 w-auto'/>
            <img src={BuildLegacyLogo} className='h-8 w-auto ml-2'/>
       </div>
        <div className="flex flex-row gap-1">
            {/* <div className='flex flex-row items-start gap-1  rounded  p-2'>
                <img src={flag == "fr"? France : Us} className="h-4 w-6"/>
                <select className='text-[10px] text-jci-white outline-none'
                    value={flag}
                        onChange={(e) => setFlag(e.target.value)}
                    >
                        <option className='bg-jci-black/50 backdrop-blur text-jci-white`' value="fr" >FR</option>
                        <option className='bg-jci-black/50 backdrop-blur text-jci-white`' value="us" >US</option>
                </select>
            </div> */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                className='text-jci-white'
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
        
    </div>

    {/* Menu mobile plein écran, affiché quand isOpen est vrai */}
    {isOpen && (
        <div className='lg:hidden fixed inset-0 z-40 bg-jci-black/40 backdrop-blur flex flex-col items-center justify-center gap-8 text-jci-white text-[16px] font-roboto font-bold'>
            <div className="flex flex-col items-start gap-6">
                {navLinks.map((link) => (
                    <NavLink key={link.to} to={link.to} className={navActiveClass} end={link.end} onClick={() => setIsOpen(false)}>{link.label}</NavLink>
                ))}
                <ButtonFull path="#" TextColorHover="hover:text-white ">Boutique en ligne <ShoppingCart size={20} /></ButtonFull>
                <ButtonVoid
                    TextColor="text-jci-yellow"
                    SizeText="12px"
                >
                    Devenir membre <LogIn size={20}/>
                </ButtonVoid>
                {/* <SocialIconsRow /> */}
            </div>
           
        </div>
    )}
    </>
  )
}

export default Navbar