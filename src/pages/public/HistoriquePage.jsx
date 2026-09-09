import SubNav from "../../components/layout/SubNav"
import H1 from "../../components/ui/H1"
import H2 from "../../components/ui/H2"
import LabelTrait from "../../components/ui/LabelTrait"
import StatBlock from "../../components/ui/StatBlock"
import TimelineItem from "../../components/ui/TimelineItem"
import TestImg from "../../images/testImg.jpg"
import Timeline from "../../images/timeline.png"

// données de remplacement en attendant la liste officielle des présidents nationaux
const presidents = [
  { Year: "1959", Name: "ANDRIATSITOHAINA Charles", Role: "Président Fondateur", Image: TestImg },
  { Year: "1987", Name: "RAZAFIMANDIMBY Christian", Role: "Président (Renaissance)", Image: TestImg },
  { Year: "1996", Name: "ANDRIATSITOHAINA Charles", Role: "Président National", Image: TestImg },
  { Year: "2005", Name: "ANDRIATSITOHAINA Charles", Role: "Président National", Image: TestImg },
  { Year: "2015", Name: "ANDRIATSITOHAINA Charles", Role: "Président National", Image: TestImg },
  { Year: "2026", Name: "RAKOTOBE Manjatosoa Minah", Role: "Présidente Nationale", Image: TestImg },
]

const HistoriquePage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-start pt-25 pb-10 px-6 lg:pl-33 lg:pr-10 bg-jci-black gap-2'>
      <SubNav />

      <div className="flex flex-col gap-0 lg:ml-20 lg:mr-1">
        <div className='flex flex-row gap-20 items-start text-start max-w-full  bg-jci-white  rounded-t-xl p-5 lg:pr-20'>
          <div className='flex flex-col gap-5'>
            <div>
              <div className='flex flex-row items-center'>
                <p className='text-jci-teal text-[8px] font-bold font-noto'>HISTORIQUE</p>
                <div className='ml-2 h-[0.5px] w-20 bg-jci-yellow '> </div>
              </div>
              <H1>LA JCI MADAGASCAR</H1>
              <p className='text-[11px] font-normal text-jci-black text-justify'>
                La JCI Madagascar est affiliée à la JCI depuis 1960 grâce à son Président Fondateur Charles Andriantsitohaina.
                Après quelques années de sommeil, la renaissance a été initiée par le Président Christian RAZAFIMANDIMBY en 1987,
                avec le soutien des Organisations Nationales sœurs de La Réunion, de Maurice, de France, de Suisse, et d'autres encore.
              </p>
              <p className='text-[11px] font-normal text-jci-black text-justify'>
                Retrouvant les membres des premières années et intégrant de nouveaux, plusieurs projets pour booster l'économie ont été
                mis en place : Opérez Vite et Bien (24 fascicules des secteurs porteurs pour informer les investisseurs), Passeport PME
                (premier guide de création d'entreprise en 10.000 exemplaires), Trophée JCE (award qui récompensait les entreprises performantes).
              </p>
            </div>
            <div className='flex flex-row gap-3 mt-10 items-center  justify-center w-full'>
              <StatBlock Value="36" Label="ANS" TextColor2="text-jci-black" BGColor="bg-jci-teal" TextColor3="text-jci-white" />
              <StatBlock Value="14" Label="OLs" TextColor2="text-jci-black" BGColor="bg-jci-teal" TextColor3="text-jci-white" />
              <StatBlock Value="384" Label="Membres" TextColor2="text-jci-black" BGColor="bg-jci-teal" TextColor3="text-jci-white" />
            </div>
            <div>
              <img src={Timeline} alt="" className="h-auto w-full " />
            </div>
          </div>
          <div className='flex flex-col gap-1 w-full'>
            <img src={TestImg} alt="" className="h-60 w-auto rounded" loading="lazy" />
            <img src={TestImg} alt="" className="h-60 w-auto rounded" loading="lazy" />
          </div>
        </div>

        <div className='flex flex-col flex-wrap gap-3 justify-start max-w-full   bg-jci-white  p-5 lg:pr-20 rounded-b-xl'>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-row items-center'>
              <p className='text-jci-teal text-[8px] font-bold font-noto'>LISTES</p>
              <div className='ml-2 h-[0.5px] w-20 bg-jci-yellow '> </div>
            </div>
            <H1>DES PRÉSIDENTS NATIONAUX</H1>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-1  items-start'>
            {presidents.map((president, index) => (
              <div key={index} className='relative flex flex-col gap-1 p-2 border border-[#F9F9F9] bg-[#F9F9F9] rounded'>
                <div className="flex flex-row gap-3">
                  <div className="rounded-full border-2 border-jci-yellow">
                    <div className="rounded-full border border-green-500">
                      <img src={president.Image} alt={president.Name} className="h-10 w-10 rounded-full object-cover" loading="lazy"/>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-[0.5px]">
                    <p className='text-[12px] font-bold text-jci-black'>{president.Name}</p>
                    <p className='text-[11px] font-normal text-jci-black/50'>{president.Role}</p>
                  </div>
                </div>
                <div className="px-3 md:px-2 py-0.5 bg-jci-yellow text-[7px] md:text-[9px] text-jci-black font-extrabold font-roboto text-center absolute bottom-1 right-0">
                  {president.Year}
                </div>
              </div>  
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoriquePage
