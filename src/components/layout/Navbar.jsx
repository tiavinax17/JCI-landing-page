import JCILogo from "../../images/Logo-JCI.png" 
import { NavLink } from 'react-router'
import ButtonVoid from "../ui/ButtonVoid"
import SocialIconsRow from "../ui/SocialIconsRow"
import { LogIn } from "lucide-react"

const navActiveClass = ({ isActive }) => isActive ? "text-jci-yellow" : "text-jci-white";

const Navbar = () => {
  return (
    <div className='fixed top-2 left-5 h-screen w-fit  px-1  rounded flex flex-col gap-1 z-50 justify-start'> 
        <div className="bg-jci-black rounded-xl py-1 px-7 flex items-center"> 
            <img src={JCILogo} className='h-10 w-auto'/> 
        </div>
        <div className='flex flex-col h-screen bg-jci-black rounded-xl py-7 px-2  mb-5 text-jci-white text-[12px] font-roboto font-bold items-center justify-between '> 
            
            <div className="flex flex-col gap-4">
                <NavLink to="/" className={navActiveClass} end>Accueil</NavLink>
                <NavLink to="/jci-madagascar/historique" className={navActiveClass}>JCI Madagascar</NavLink>
                <NavLink to="/organisations-locales" className={navActiveClass}>Organisations Locales</NavLink>
                <NavLink to="/blog" className={navActiveClass}>Blog</NavLink>
                <NavLink to="/partenaires" className={navActiveClass}>Partenaires</NavLink>
                <NavLink to="/contact" className={navActiveClass}>Contact</NavLink>
            </div>
            <div className="flex flex-col gap-4">
                <SocialIconsRow />
                <ButtonVoid
                    TextColor="text-jci-white"
                    SizeText="12px"
                >Devenir membre <LogIn size={20}/></ButtonVoid>
            </div>
        </div> 
    </div>
  )
}

export default Navbar