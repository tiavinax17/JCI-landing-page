import ZoneFilterTabs from "../../components/layout/ZoneFilterTabs"
import Mada from "../../images/MadaLocalOrg.png"
import LabelTraitSimple from "../../components/ui/LabelTraitSimple"
import JCIAmbilobe from "../../images/JCI/JCI Ambilobe/JCI Ambilobe background marine blue logo.webp"
import JCIAntananarivo from "../../images/JCI/JCI Antananarivo/JCI Antananarivo background blue logo.webp"
import JCIAntsiranana from "../../images/JCI/JCI Antsiaranana/JCI Antsiranana color.webp"
import JCIAntsohihy from "../../images/JCI/JCI Antsohihy/JCI Antsohihy background marine blue logo.webp"
import JCIFaradofay from "../../images/JCI/JCI Faradofay/JCI Faradofay background blue logo.webp"
import JCIIarivo from "../../images/JCI/JCI Iarivo/JCI Iarivo color logo.webp"
import JCIIlonIarivo from "../../images/JCI/JCI Ilon_Iarivo/JCI Ilon_Iarivo background marine blue logo.webp"
import JCIIvonea from "../../images/JCI/JCI Ivonea/JCI Ivonea color logo.webp"
import JCIMahajanga from "../../images/JCI/JCI Mahajanga/JCI Mahajanga background marine blue logo.webp"
import JCIMayendeleyo from "../../images/JCI/JCI Mayendeleyo/JCI Mayendeleyo background blue logo.webp"
import JCINosyBe from "../../images/JCI/JCI Nosy Be/JCI Nosy Be color logo.webp"
import JCISambava from "../../images/JCI/JCI Sambava/JCI Sambava background marine blue logo.webp"
import JCIToamasina from "../../images/JCI/JCI Toamasina/JCI Toamasina background blue logo.webp"
import JCIToliara from "../../images/JCI/JCI Toliara/JCI Toliara color logo.webp"

const listeOl1 =[
  { name: "JCI Ambilobe", logo: JCIAmbilobe },
  { name: "JCI Antananarivo", logo: JCIAntananarivo },
  { name: "JCI Antsiranana", logo: JCIAntsiranana },
  { name: "JCI Antsohihy", logo: JCIAntsohihy },
  { name: "JCI Faradofay", logo: JCIFaradofay },
  { name: "JCI Iarivo", logo: JCIIarivo },
  { name: "JCI Ilon Iarivo", logo: JCIIlonIarivo },
 
]
const listeOl2 = [
  { name: "JCI Ivonea", logo: JCIIvonea },
  { name: "JCI Mahajanga", logo: JCIMahajanga },
  { name: "JCI Mayendeleyo", logo: JCIMayendeleyo },
  { name: "JCI Nosy Be", logo: JCINosyBe },
  { name: "JCI Sambava", logo: JCISambava },
  { name: "JCI Toamasina", logo: JCIToamasina },
  { name: "JCI Toliara", logo: JCIToliara },
]

const OrganisationsLocalesPage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-start pt-25 pb-10 px-6 lg:pl-33 lg:pr-20 bg-jci-black gap-2'>
      <ZoneFilterTabs />
      <div className="group flex flex-col gap-0 lg:ml-20 lg:mr-1 mr-0">
        <div className="flex lg:flex-row flex-col md:justify-center md:items-center lg:items-start bg-jci-white gap-10 rounded-xl  md:pl-10 pt-5  px-5 md:pr-10 lg:pr-0">
          <div className='flex flex-1 md:flex-2 flex-col gap-1 items-start text-start max-w-full '>
            
            <LabelTraitSimple Label="Présentation" H1Text="LES 14 ORGANISATIONS LOCALES" />
            <p className='lg:text-[12px] md:text-[12px] text-[10px] font-normal font-poppins text-jci-black text-justify'>
              Un réseau national, un impact local. Découvrez les 14 Organisations Locales de JCI Madagascar à travers nos zones Nord, Centre et 
              Sud, et rejoignez le mouvement des jeunes leaders engagés sur tout l'île. 
            </p>
            <div className='flex flex-col gap-0 mt-10 items-center justify-center w-full'>
              <div className='flex flex-row'>
                {listeOl1.map((ol, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img src={ol.logo} alt={ol.name} className="w-30 aspect-[50/50] object-cover"/>
                  </div>
                ))}
              </div>
              <div className='flex flex-row'>
                {listeOl2.map((ol, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img src={ol.logo} alt={ol.name} className="w-30 object-cover aspect-[50/50]"/>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-1 rounded-b-xl '>
            <img src={Mada} alt="Madagascar Map" className="h-full w-auto object-cover rounded-none lg:rounded-b-xl "/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganisationsLocalesPage
