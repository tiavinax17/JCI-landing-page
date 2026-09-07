import H1 from "../../components/ui/H1"
import LabelTrait from "../../components/ui/LabelTrait"
import PartnerBlock from "../../components/ui/PartnerBlock"

// Données de démonstration en attendant le contenu officiel des partenaires
const partners = [
  { Name: "Midi Madagascar", Content: "Partenaire média officiel de la JCI Madagascar, relayant les actualités et événements de l'organisation." },
  { Name: "Groupe Kentia | Koon Space", Content: "Partenaire d'hébergement et d'espaces de coworking pour les événements et réunions de la JCI Madagascar." },
  { Name: "Orange Madagascar", Content: "Partenaire télécommunications, soutenant la connectivité des membres et des programmes nationaux." },
  { Name: "iSeven Studio", Content: "Partenaire technologique, en charge de la conception et du développement du site web de la JCI Madagascar." },
]

const PartenairesPage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-center pt-28 pb-10 px-6 lg:px-32'>
      <div className='flex flex-col gap-4 items-center text-center max-w-3xl mt-8'>
        <LabelTrait>partenaires type</LabelTrait>
        <H1>Nos partenaires</H1>
      </div>

      <div className='flex flex-col w-full max-w-3xl mt-14'>
        {partners.map((partner, index) => (
          <PartnerBlock key={partner.Name} Name={partner.Name} Content={partner.Content} Reverse={index % 2 === 1} />
        ))}
      </div>
    </div>
  )
}

export default PartenairesPage
