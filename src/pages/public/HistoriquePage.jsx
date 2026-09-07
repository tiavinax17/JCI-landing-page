import SubNav from "../../components/layout/SubNav"
import H1 from "../../components/ui/H1"
import H2 from "../../components/ui/H2"
import LabelTrait from "../../components/ui/LabelTrait"
import StatBlock from "../../components/ui/StatBlock"
import TimelineItem from "../../components/ui/TimelineItem"

// données de remplacement en attendant la liste officielle des présidents nationaux
const presidents = [
  { Year: "1959", Name: "ANDRIATSITOHAINA Charles", Role: "Président Fondateur" },
  { Year: "1987", Name: "RAZAFIMANDIMBY Christian", Role: "Président (Renaissance)" },
  { Year: "1996", Name: "ANDRIATSITOHAINA Charles", Role: "Président National" },
  { Year: "2005", Name: "ANDRIATSITOHAINA Charles", Role: "Président National" },
  { Year: "2015", Name: "ANDRIATSITOHAINA Charles", Role: "Président National" },
  { Year: "2026", Name: "RAKOTOBE Manjatosoa Minah", Role: "Présidente Nationale" },
]

const HistoriquePage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-center pt-28 pb-10 px-6 lg:px-32'>
      <SubNav />

      <div className='flex flex-col gap-4 items-center text-center max-w-3xl mt-8'>
        <LabelTrait>historique</LabelTrait>
        <H1>La JCI Madagascar</H1>
        <p className='text-[14px] font-normal text-jci-black/80'>
          La JCI Madagascar est affiliée à la JCI depuis 1960 grâce à son Président Fondateur Charles Andriantsitohaina.
          Après quelques années de sommeil, la renaissance a été initiée par le Président Christian RAZAFIMANDIMBY en 1987,
          avec le soutien des Organisations Nationales sœurs de La Réunion, de Maurice, de France, de Suisse, et d'autres encore.
        </p>
        <p className='text-[14px] font-normal text-jci-black/80'>
          Retrouvant les membres des premières années et intégrant de nouveaux, plusieurs projets pour booster l'économie ont été
          mis en place : Opérez Vite et Bien (24 fascicules des secteurs porteurs pour informer les investisseurs), Passeport PME
          (premier guide de création d'entreprise en 10.000 exemplaires), Trophée JCE (award qui récompensait les entreprises performantes).
        </p>
      </div>

      <div className='flex flex-row gap-16 mt-10'>
        <StatBlock Value="36" Label="ANS" />
        <StatBlock Value="14" Label="OLs" />
        <StatBlock Value="384" Label="Membres" />
      </div>

      <div className='flex flex-col gap-8 mt-16 w-full items-center'>
        <H2>1960 — 2026</H2>
        <p className='text-[13px] text-jci-black/70'>Affiliation à la JCI · Renaissance · L'histoire continue</p>

        <div className='flex flex-col gap-2 items-center'>
          <p className='text-[13px] font-roboto font-bold text-jci-blue'>Listes des présidents nationaux</p>
        </div>

        <div className='flex flex-row flex-wrap gap-10 justify-center'>
          {presidents.map((president, index) => (
            <TimelineItem
              key={index}
              Year={president.Year}
              Name={president.Name}
              Role={president.Role}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HistoriquePage
