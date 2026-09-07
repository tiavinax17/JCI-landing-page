import SubNav from "../../components/layout/SubNav"
import H1 from "../../components/ui/H1"
import LabelTrait from "../../components/ui/LabelTrait"
import MemberCard from "../../components/ui/MemberCard"

// Source: content/Bureau national 2026.pdf
const members = [
  { Name: "Manjatosoa Minah RAKOTOBE", Role: "Présidente nationale" },
  { Name: "Miharisoa Barinia RAKOTONIRINA", Role: "Secrétaire général" },
  { Name: "Tianjara Hugues HAMBA", Role: "Immediat past président" },
  { Name: "Jouber MAYET", Role: "Trésorier national" },
  { Name: "Ando RATSIRAHONANA", Role: "Conseiller juridique national" },
  { Name: "Mialitiana RALALA", Role: "Vice Présidente Exécutive National" },
  { Name: "Fanco Joël ANDRIAMAMPIONONA", Role: "Vice Président National zone nord" },
  { Name: "Anjarasoa RAKOTONARIVO", Role: "Vice Président National zone centre" },
  { Name: "Emilie RASOANINDRINA", Role: "Vice Présidente National zone Sud" },
  { Name: "Tamby ANDRIANARIVONY", Role: "Directeur de l'innovation Numérique" },
  { Name: "Mamy RABEARILAZA", Role: "Directeur Partenariat et Fundraising" },
  { Name: "Tiffany RANDRIANARIVO", Role: "Directeur de Développement de Compétence" },
  { Name: "Melissa Martina MANITRIAVY", Role: "Directeur des Programmes Nationaux" },
  { Name: "Ando Nirina RABEFARIHY", Role: "Directeur du membership" },
]

const BureauNationalPage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-center pt-28 pb-10 px-6 lg:px-32'>
      <SubNav />

      <div className='flex flex-col gap-4 items-center text-center max-w-3xl mt-8'>
        <LabelTrait>bureau national 2026</LabelTrait>
        <H1>Les membres du bureau national 2026</H1>
        <p className='text-[14px] font-normal text-jci-black/80'>
          Découvrez les membres du Bureau National 2026 de la JCI Madagascar. Une équipe engagée de jeunes leaders dédiée à la
          conduite des projets stratégiques, au renforcement des compétences et à la création d'impacts positifs à travers
          toutes les organisations locales de la Grande Île.
        </p>
      </div>

      <div className='flex flex-row flex-wrap gap-x-10 gap-y-12 justify-center mt-14 max-w-5xl'>
        {members.map((member, index) => (
          <MemberCard key={index} Name={member.Name} Role={member.Role} />
        ))}
      </div>
    </div>
  )
}

export default BureauNationalPage
