import { useState } from 'react'
import ButtonFull from './../ui/ButtonFull';
import { ShoppingCart } from 'lucide-react';
import France from "../../images/flags/Flag_of_France.svg";
import Us from "../../images/flags/Flag_of_the_United_States.svg";

const Header = () => {
    const [flag, setFlag] = useState("fr");

  return (
    <div className='hidden  px-3 py-3 gap-2 border border-gray-600/20 bg-jci-black/40 backdrop-blur-xl rounded-xl md:flex flex-row fixed absolute top-4 right-10 z-50 font-semibold'>
        <div className='flex flex-row items-center gap-1'>
            <img src={flag == "fr"? France : Us} className="h-4 w-6"/>
            <select className='text-[10px] text-jci-white outline-none'
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
            >
                <option className='bg-jci-black text-jci-white`' value="fr" >FRANÇAIS</option>
                <option className='bg-jci-black text-jci-white`' value="us" >US</option>
            </select>
        </div>
        <ButtonFull path="#" TextColorHover="hover:text-white">Boutique en ligne <ShoppingCart size={20} /></ButtonFull>
    </div>
  )
}

export default Header