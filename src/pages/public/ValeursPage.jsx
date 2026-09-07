import SubNav from "../../components/layout/SubNav"
import H1 from "../../components/ui/H1"
import H2 from "../../components/ui/H2"
import LabelTrait from "../../components/ui/LabelTrait"
import ValueCredoBlock from "../../components/ui/ValueCredoBlock"

const credo = [
  {
    Title: "Que la foi en Dieu donne à la vie son véritable sens",
    Content: "Dans cette phrase, « Dieu » ne fait référence à aucun Dieu spécifique, mais se rapporte à une puissance suprême omnipotente. Cette phrase signifie que vous devez croire à quelque chose.",
  },
  {
    Title: "Que le gouvernement doit s'appuyer sur la loi et non sur l'arbitraire",
    Content: "Ce principe du Credo signifie simplement que personne n'est au-dessus de la loi et que la loi doit être la même pour tous les individus, indépendamment du statut particulier d'une personne au sein de la société.",
  },
  {
    Title: "Que la fraternité humaine transcende la souveraineté des nations",
    Content: "Cela signifie que nous sommes avant tout des êtres humains, au-delà de nos frontières, de nos pays et de nos différences. La JCI défend ainsi l'idée que l'entraide, le respect et la solidarité doivent unir les peuples.",
  },
  {
    Title: "Que la liberté des individus et des entreprises assurent au mieux la justice économique",
    Content: "Les membres de la Jeune Chambre croient que l'Homme doit être libre d'utiliser ses compétences et capacités à leur maximum pour améliorer sa situation économique.",
  },
  {
    Title: "Que la personne humaine est la plus précieuse des richesses",
    Content: "Chaque individu possède une personnalité unique qui lui est propre. Cette particularité reconnaît que l'être humain est le trésor le plus précieux sur la terre.",
  },
  {
    Title: "Et que servir l'humanité constitue l'œuvre la plus noble d'une vie",
    Content: "Une vie vécue au service des autres est plus enrichissante, plus profonde et plus complète. Le bonheur est plus durable et la tranquillité d'âme plus certaine.",
  },
]

const ValeursPage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-center pt-28 pb-10 px-6 lg:px-32'>
      <SubNav />

      <div className='flex flex-col gap-4 items-center text-center max-w-3xl mt-8'>
        <LabelTrait>le credo</LabelTrait>
        <H1>Le début d'une grande histoire</H1>
        <p className='text-[14px] font-normal text-jci-black/80'>
          C'est en 1946 à Milwaukee, lors de la Convention Nationale des Jaycees des États-Unis qu'est née l'idée du Credo de la JCI.
          Chacun doit croire à un idéal, à un principe ou à une philosophie particulière. Croire, signifie mettre en application
          ce que l'on croit être vrai.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mt-14 w-full max-w-5xl'>
        {credo.map((item, index) => (
          <ValueCredoBlock key={index} Title={item.Title} Content={item.Content} />
        ))}
      </div>

      <div className='flex flex-col md:flex-row gap-16 mt-20 w-full max-w-5xl justify-center'>
        <div className='flex flex-col gap-2 items-center text-center max-w-sm'>
          <H2>notre mission</H2>
          <p className='text-[13px] text-jci-black/70'>
            Offrir aux jeunes des opportunités de développement de leadership en leur donnant la capacité de créer des changements positifs.
          </p>
        </div>
        <div className='flex flex-col gap-2 items-center text-center max-w-sm'>
          <H2>notre vision</H2>
          <p className='text-[13px] text-jci-black/70'>
            Être le principal réseau mondial de jeunes leaders.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ValeursPage
