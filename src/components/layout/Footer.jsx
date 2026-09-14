import { Link } from 'react-router'
import JCILogo from "../../images/JCI/JCI Madagascar/JCI_Madagascar_background_marine_blue_name_blue_logo-removebg-preview.png"
import SocialIconsRow from "../ui/SocialIconsRow"
import { IoLogoLinkedin, IoMail } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { RiInstagramFill, RiFacebookCircleFill } from "react-icons/ri";
import MidiMadagascar from "../../images/LOGO-OTHER/logo_midi_madagasikara.png"
import OrangeMadagascar from "../../images/LOGO-OTHER/SIGNATURE_ORANGE_EST_LA_Plan de travail pour fond noir.png"
import GroupeKentia from "../../images/LOGO-OTHER/Logo Kentia.png"
import KoonSpace from "../../images/LOGO-OTHER/Logo Koonspace.png" 

const footerColumns = [
  {
    title: "Liens utiles",
    links: [
      { label: "Nos valeurs", to: "/jci-madagascar/valeurs" },
      { label: "Nos programmes", to: "/jci-madagascar/programmes" },
      { label: "JCI business", to: "/jci-madagascar/business" },
      { label: "JCI RISE", to: "/jci-madagascar/rise" },
    ],
  },
  {
    title: "Derniers articles",
    links: [
      { label: "Event - Rentrée Solennelle 2025", to: "/blog" },
      { label: "Event - Academie des Présidents Locaux", to: "/blog" },
      { label: "Actus - Lancement du Programme CYE", to: "/blog" },
    ],
  },
  {
    title: "Informations légales",
    links: [
      { label: "Conditions générales d'utilisation", to: "#" },
      { label: "Conditions générales de vente", to: "#" },
      { label: "Politique de confidentialité", to: "#" },
    ],
  },
]
  const Year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className='w-full flex flex-col bg-[#0C091E] text-jci-white gap-0 font-poppins pl-0 lg:pl-40 '>
      <div className='max-w-8xl px-6 lg:px-0  py-14 grid grid-cols-2 md:grid-cols-5 gap-10 w-fit  lg:ml-10 '>
        <div className=' flex justify-center -mt-3'>
          <img src={JCILogo} alt="JCI Madagascar" className='h-13 w-auto' />
        </div>

        {footerColumns.map((col) => (
          <div key={col.title} className='flex flex-col gap-5'>
            <h3 className='font-poppins font-bold text-[18px] '>{col.title}</h3>
            <div className='flex flex-col font-bold gap-2 text-[10px] text-jci-white/80'>
              {col.links.map((link) => (
                <Link key={link.label} to={link.to} className='hover:text-jci-yellow'>{link.label}</Link>
              ))}
            </div>
          </div>
        ))}
        <div  className='flex flex-col gap-5'>
            {/* <h3 className='font-poppins font-bold text-[18px] '>C</h3> */}
            {/* <div className='grid grid-cols-2 gap-1 w-fit '>
              <div className='flex items-center justify-center rounded w-[90px] max-w-full mx-auto h-[50px] sm:h-[60px] overflow-hidden bg-jci-white py-3'>
                <img src={MidiMadagascar} alt="" className="h-8 w-auto" />
              </div>
              <div className='flex items-start justify-center rounded w-[90px] max-w-full mx-auto h-[50px] sm:h-[60px] overflow-hidden bg-jci-white py-3'>
                <img src={OrangeMadagascar} alt="" className="h-13 w-auto" />
              </div>
              <div className='flex items-center justify-center rounded w-[90px] max-w-full mx-auto h-[50px] sm:h-[60px] overflow-hidden bg-jci-white py-3'>
                <img src={GroupeKentia} alt=""  className="h-10 w-auto" />
              </div>
              <div className='flex items-center justify-center rounded w-[90px] max-w-full mx-auto h-[50px] sm:h-[60px] overflow-hidden bg-jci-white py-3'>
                <img src={KoonSpace} alt="" className="h-9 w-auto" />
              </div>
              <div className='flex items-center justify-center rounded w-[90px] max-w-full mx-auto h-[50px] sm:h-[60px] overflow-hidden bg-jci-white py-3'>
                <img src={KoonSpace} alt="" className="h-9 w-auto" />
              </div>
            </div> */}
            <a href="mailto:Contact@jcimada.org" className='flex felx-row gap-2 items-center border-2 border-jci-white md:text-[12px] text-[8px] font-poppins py-1 px-3 font-semibold w-fit hover:bg-jci-white hover:text-jci-black'>
              Nous contacter <IoMailOutline size={15} /> 
            </a>
          </div>
        
      </div>

      <div className=' py-2 bg-jci-dark px-6 lg:px-5 w-full flex flex-col md:flex-row gap-3 items-center justify-between max-w-6xl mx-auto text-[10px] text-jci-white font-light'>
        <span>Copyright © {Year}. iSeven Studio</span>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2'>
          <a href="mailto:Contact@jcimada.org" className='flex felx-row gap-2 items-center'>
            <IoMail size={20} />
            Contact@jcimada.org
          </a>
          <a href="https://www.facebook.com/jcimadagascar" target="_blank" rel="noopener noreferrer" className='flex felx-row gap-2 items-center'>
            <RiFacebookCircleFill size={20} />
            JCI Madagascar
          </a>
          <a href="https://www.instagram.com/jcimadagascar" target="_blank" rel="noopener noreferrer" className='flex felx-row gap-2 items-center'>
            <RiInstagramFill size={20} />
            JCI Instagram
          </a>
          <a href="https://www.linkedin.com/company/jci-madagascar" target="_blank" rel="noopener noreferrer" className='flex felx-row gap-2 items-center'>
            <IoLogoLinkedin size={20} />
            JCI LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer