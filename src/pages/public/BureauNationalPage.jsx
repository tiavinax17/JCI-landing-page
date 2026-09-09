import SubNav from "../../components/layout/SubNav"
import H1 from "../../components/ui/H1"
import LabelTrait from "../../components/ui/LabelTrait"
import LabelTraitSimple from "../../components/ui/LabelTraitSimple"
import MemberCard from "../../components/ui/MemberCard"
import DN from "../../images/Photos corporate BN/DN2026.jpg"
import SG from "../../images/Photos corporate BN/DN2026.jpg"
import IPPN from "../../images/Photos corporate BN/IPPN Hugues.jpg"
import TN from "../../images/Photos corporate BN/TRN JOUBER.jpg"
import CJN from "../../images/Photos corporate BN/ANJ ID_JCI.png"
import VPEN from "../../images/Photos corporate BN/VPEN Mialitiana.jpg"
import VPNZN from "../../images/Photos corporate BN/VPN Franco Joël.jpg"
import VPNZC from "../../images/Photos corporate BN/JCI_Anjara VPN _2026_1 (2).jpeg"
import VPNZS from "../../images/Photos corporate BN/VPN Emilie.png"
import DNIN from "../../images/Photos corporate BN/DNIN Tamby.jpg"
import DPF from "../../images/Photos corporate BN/Dir Partenariat- Mamy RABEARILAZA.JPG"
import DINDC from "../../images/Photos corporate BN/DINDC Tiffany RANDRIANARIVO.png"
import DPN from "../../images/Photos corporate BN/DPN 2026 .JPG"
import DNM from "../../images/Photos corporate BN/DNM_2026_Ando Nirina Rabefarihy.jpg"
import { PiBagSimpleDuotone } from "react-icons/pi";
import BNCard from "../../components/ui/BNCard"

// Source: content/Bureau national 2026.pdf
const members = [
  { Name: "RAKOTOBE", FirstName: "Manjatosoa Minah", Role: "Présidente nationale" ,Image: DN },
  { Name: "RAKOTONIRINA", FirstName: "Miharisoa Barinia", Role: "Secrétaire général" ,Image: SG},
  { Name: "HAMBA", FirstName: "Tianjara Hugues", Role: "Immediat past président" ,Image: IPPN },
  { Name: "MAYET", FirstName: "Jouber", Role: "Trésorier national" ,Image: TN },
  { Name: "RATSIRAHONANA", FirstName: "Ando", Role: "Conseiller juridique national" ,Image: CJN },
  { Name: "RALALA", FirstName: "Mialitiana", Role: "Vice Présidente Exécutive National" ,Image: VPEN },
  { Name: "ANDRIAMAMPIONONA", FirstName: "Fanco Joël", Role: "Vice Président National zone nord" ,Image: VPNZN },
  { Name: "RAKOTONARIVO", FirstName: "Anjarasoa", Role: "Vice Président National zone centre" ,Image: VPNZC },
  { Name: "RASOANINDRINA", FirstName: "Emilie", Role: "Vice Présidente National zone Sud" ,Image: VPNZS },
  { Name: "ANDRIANARIVONY", FirstName: "Tamby", Role: "Directeur de l'innovation Numérique" ,Image: DNIN },
  { Name: "RABEARILAZA", FirstName: "Mamy", Role: "Directeur Partenariat et Fundraising" ,Image: DPF },
  { Name: "RANDRIANARIVO", FirstName: "Tiffany", Role: "Directeur de Développement de Compétence" ,Image: DINDC },
  { Name: "MANITRIAVY", FirstName: "Melissa Martina", Role: "Directeur des Programmes Nationaux" ,Image: DPN },
  { Name: "RABEFARIHY", FirstName: "Ando Nirina", Role: "Directeur du membership" ,Image: DNM },
]

const BureauNationalPage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-start pt-25 pb-10 px-6 lg:pl-33 lg:pr-10 bg-jci-black gap-2'>
      <SubNav />
      <div className="flex flex-col gap-0 lg:ml-20 lg:mr-1">
          <div className="flex flex-col  bg-jci-white gap-2 rounded-t-xl px-10 pt-5 lg:pr-20">
            <LabelTraitSimple Label="LES MEMBRES DU" H1Text="BUREAU NATIONAL 2026" />
            <p className='text-[12px] font-normal font-poppins text-jci-black text-justify'>
              Découvrez les membres du Bureau National 2026 de la JCI Madagascar. Une équipe engagée de jeunes leaders dédiée à la
              conduite des projets stratégiques, au renforcement des compétences et à la création d'impacts positifs à travers
              toutes les organisations locales de la Grande Île.
            </p>
        </div>
          <div className="flex flex-col  bg-jci-white gap-2 rounded-b-xl px-10 py-10 lg:pr-20 -mt-1">
         <div className="grid md:grid-cols-3 lg:grid-cols-5 grid-cols-3 gap-3">
            {members.map((member, index) => (
              <BNCard
                key={index}
                image={member.Image}
                firstName={member.FirstName}
                lastName={member.Name}
                role={member.Role}
              />
            ))}
          </div>

        </div>
        </div>
    </div>
  )
}

export default BureauNationalPage
