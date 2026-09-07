import SubNav from "../../components/layout/SubNav"
import H1 from "../../components/ui/H1"
import H2 from "../../components/ui/H2"
import LabelTrait from "../../components/ui/LabelTrait"

const SenatPage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-center pt-28 pb-10 px-6 lg:px-32'>
      <SubNav />

      <div className='flex flex-col gap-4 items-center text-center max-w-3xl mt-8'>
        <LabelTrait>présentation</LabelTrait>
        <H1>Le sénat - Madagascar</H1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mt-14 w-full max-w-5xl'>
        <div className='flex flex-col gap-3'>
          <H2>Le titre de Sénateur JCI</H2>
          <p className='text-[13px] text-jci-black/80 leading-relaxed'>
            Un sénateur JCI est un membre de la Jeune Chambre Internationale reconnu pour son mérite et son exemplarité dans
            son parcours dans l'association. Il s'agit d'une distinction interne remise sur proposition d'une organisation
            Locale, après validation de l'organisation nationale et toujours sur décision du président mondial de la JCI.
          </p>
          <p className='text-[13px] text-jci-black/80 leading-relaxed'>
            Un membre recevant le sénat JCI, devient « membre à vie » de l'organisation. Il peut de ce fait continuer à
            soutenir le mouvement et aider à répandre les valeurs de la JCI. À partir de 40 ans, un sénateur JCI n'est plus
            adhérent mais une sorte de membre « honoraire ».
          </p>
        </div>
        <div className='flex flex-col gap-3'>
          <H2>Objectifs d'un sénateur</H2>
          <p className='text-[13px] text-jci-black/80 leading-relaxed'>
            Le rôle d'un sénateur est de promouvoir la solidarité et l'amitié des sénateurs à travers le monde, de constituer
            une ressource pour le sponsoring des projets de son Organisation Locale ainsi que pour le mentoring des membres
            et le développement de JCI.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SenatPage
