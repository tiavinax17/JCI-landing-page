import { Link } from 'react-router'
import JCILogo from "../../images/JCI/JCI Madagascar/JCI_Madagascar_background_marine_blue_name_blue_logo-removebg-preview.png"
import { IoLogoLinkedin, IoMail } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { RiInstagramFill, RiFacebookCircleFill } from "react-icons/ri";
import { eventAPI } from "../../services/api"
import { useState, useEffect } from "react";
import { SiLinktree } from "react-icons/si";



  const Year = new Date().getFullYear();

const Footer = () => {
  const [actuEvents, setActuEvents] = useState([]);

  const footerColumns = [
  {
    title: "Liens utiles",
    links: [
      { label: "Nos valeurs", to: "/jci-madagascar/valeurs" },
      { label: "Nos programmes", to: "/jci-madagascar/programmes" },
      { label: "Nos organisations locales", to: "/organisations-locales" },
      { label: "Blog", to: "/blog" },
    ],
  },
{
  title: "Derniers articles",
  links: actuEvents.slice(0, 4).map((event) => ({
    label: `${event.type} - ${event.title}`,
    to: `/blog/evenements/${event.id}`,
  })),
},
  {
    title: "Informations légales",
    links: [
      { label: "Conditions générales d'utilisation", to: "/conditions-generales-utilisation" },
      { label: "Conditions générales de vente", to: "/conditions-generales-de-vente" },
      { label: "Politique de confidentialité", to: "/politique-de-confidentialite" },
    ],
  },
]
  useEffect(() => {
      const fetchActuEvents = async () => {
        try {
          const response = await eventAPI.getAllActu();
          const data = response.data;
          setActuEvents(data);
        } catch (error) {
          console.error("Failed to fetch actu events:", error);
        }
      };
      fetchActuEvents();
    }, []);
  return (
    <footer className='w-full flex flex-col bg-[#0C091E] text-jci-white gap-0 font-poppins pl-0 lg:pl-40 '>
      <div className='max-w-8xl px-6 lg:px-0  py-14 grid grid-cols-2 md:grid-cols-5 gap-10 w-fit  lg:ml-10 '>
        <div className=' flex justify-center -mt-3'>
          <img src={JCILogo} alt="JCI Madagascar" className='h-13 w-auto' />
        </div>

        {footerColumns.map((col) => (
          <div key={col.title} className='flex flex-col gap-5'>
            <h3 className='font-poppins font-bold text-[18px] '>{col.title}</h3>
            <div className='flex flex-col  items-start justify-start font-bold gap-2 text-[10px] text-jci-white/80'>
              {col.links.map((link) => (
                <Link key={link.label} to={link.to} className='hover:text-jci-yellow'>{link.label}</Link>
              ))}
            </div>
          </div>
        ))}
        <div  className='flex flex-col gap-5'>
            <a href="mailto:contact@jcimada.org" className='flex flex-row gap-2 items-center border-2 border-jci-white md:text-[12px] text-[8px] font-poppins py-1 px-3 font-semibold w-fit hover:bg-jci-white hover:text-jci-black'>
              Nous contacter <IoMailOutline size={15} /> 
            </a>
          </div>
        
      </div>

      <div className=' py-2 bg-jci-dark px-6 lg:px-5 w-full flex flex-col md:flex-row gap-3 items-center justify-between max-w-6xl mx-auto text-[10px] text-jci-white font-light'>
        <span>Copyright © {Year}. iSeven Studio</span>
        <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2'>
          <a href="mailto:contact@jcimada.org" className='flex flex-row gap-2 items-center'>
            <IoMail size={20} />
            contact@jcimada.org
          </a>
          <a href="https://www.facebook.com/jcimadagascar" target="_blank" rel="noopener noreferrer" className='flex flex-row gap-2 items-center'>
            <RiFacebookCircleFill size={20} />
            JCI Madagascar
          </a>
          <a href="https://www.instagram.com/jcimadagascar?stkn=ejBqNHU1YWZseWU3" target="_blank" rel="noopener noreferrer" className='flex flex-row gap-2 items-center'>
            <RiInstagramFill size={20} />
            JCI Instagram
          </a>
          <a href="https://www.linkedin.com/company/jcimadagascar" target="_blank" rel="noopener noreferrer" className='flex flex-row gap-2 items-center'>
            <IoLogoLinkedin size={20} />
            JCI LinkedIn
          </a>
          <a href="https://linktr.ee/JCI_Madagascar" target="_blank" rel="noopener noreferrer" className='flex flex-row gap-2 items-center'>
            <SiLinktree size={20} />
            JCI Linktree
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer