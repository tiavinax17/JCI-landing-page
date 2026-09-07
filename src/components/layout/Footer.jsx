import { Link } from 'react-router'
import JCILogo from "../../images/Logo-JCI.png"
import SocialIconsRow from "../ui/SocialIconsRow"

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
    title: "Dernières articles",
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
  {
    title: "Partenaires",
    links: [{ label: "Nos partenaires", to: "/partenaires" }],
  },
]

const Footer = () => {
  return (
    <footer className='w-full bg-jci-black text-jci-white font-poppins mt-20'>
      <div className='max-w-6xl mx-auto px-6 lg:px-16 py-14 grid grid-cols-2 md:grid-cols-5 gap-10'>
        {footerColumns.map((col) => (
          <div key={col.title} className='flex flex-col gap-3'>
            <h3 className='text-jci-yellow font-roboto font-bold text-[13px] uppercase'>{col.title}</h3>
            <div className='flex flex-col gap-2 text-[12px] text-jci-white/80'>
              {col.links.map((link) => (
                <Link key={link.label} to={link.to} className='hover:text-jci-yellow'>{link.label}</Link>
              ))}
            </div>
          </div>
        ))}
        <div className='flex flex-col gap-3'>
          <h3 className='text-jci-yellow font-roboto font-bold text-[13px] uppercase'>Nous Contacter</h3>
          <p className='text-[12px] text-jci-white/80'>contact@jcimada.org</p>
          <SocialIconsRow TextColor="text-jci-white" />
        </div>
      </div>
      <div className='border-t border-white/10 py-5 px-6 flex flex-col md:flex-row gap-3 items-center justify-between max-w-6xl mx-auto text-[11px] text-jci-white/60'>
        <span>Copyright © 2026. JCI Madagascar</span>
        <div className='flex items-center gap-2'>
          <img src={JCILogo} className='h-6 w-auto' alt="JCI Madagascar" />
          <span>JCI Madagascar</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer