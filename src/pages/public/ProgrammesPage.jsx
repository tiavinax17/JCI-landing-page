import SubNav from "../../components/layout/SubNav"
import H1 from "../../components/ui/H1"
import H2 from "../../components/ui/H2"
import LabelTrait from "../../components/ui/LabelTrait"
import ProgramCard from "../../components/ui/ProgramCard"

const programmes = [
  { Title: "La JMA (JCI Malagasy Academy)", Content: "10 jours d'immersion internationale, de partage, d'apprentissage aux côtés des plus grands leaders JCI du monde entier." },
  { Title: "Art Oratoire & Débat", Content: "Un programme qui renforce la prise de parole en public et l'art du débat argumenté." },
  { Title: "TOYP (Ten Outstanding Young Persons)", Content: "Le programme met en lumière de jeunes leaders âgés de 18 à 40 ans dont les réalisations exceptionnelles inspirent leur communauté." },
  { Title: "CYE (Creative Young Entrepreneur)", Content: "Le programme CYE de la JCI met en lumière les jeunes entrepreneurs innovants, ambitieux et à fort impact." },
]

const ProgrammesPage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-center pt-28 pb-10 px-6 lg:px-32'>
      <SubNav />

      <div className='flex flex-col gap-4 items-center text-center max-w-3xl mt-8'>
        <LabelTrait>nos programmes nationaux</LabelTrait>
        <H1>Que faisons-nous ?</H1>
        <p className='text-[14px] font-normal text-jci-black/80'>
          À la Jeune Chambre Internationale de Madagascar, nous plaçons le développement humain et l'impact au cœur de notre
          engagement. Nous nous lançons le défi d'identifier les leviers stratégiques mondiaux permettant à nos membres de
          maximiser l'efficacité de leurs actions pour résoudre les problématiques qu'encourt notre société tout en renforçant
          leurs compétences et leur leadership.
        </p>
      </div>

      <div className='flex flex-col gap-2 items-center mt-10'>
        <H2>comment ?</H2>
        <p className='text-[13px] text-jci-black/70'>À travers des divers programmes :</p>
      </div>

      <div className='flex flex-col gap-6 mt-8 w-full max-w-2xl'>
        {programmes.map((programme, index) => (
          <ProgramCard key={index} Title={programme.Title} Content={programme.Content} />
        ))}
      </div>
    </div>
  )
}

export default ProgrammesPage
