import { Link } from 'react-router'
import H1 from "../../components/ui/H1"
import LabelTrait from "../../components/ui/LabelTrait"
import ZoneFilterTabs from "../../components/ui/ZoneFilterTabs"

const zones = [
  { label: "Zone Nord", path: "/organisations-locales/nord" },
  { label: "Zone Centre", path: "/organisations-locales/centre" },
  { label: "Zone Sud", path: "/organisations-locales/sud" },
]

const OrganisationsLocalesPage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-center pt-28 pb-10 px-6 lg:px-32'>
      <div className='flex flex-col gap-4 items-center text-center max-w-3xl mt-8'>
        <LabelTrait>présentation</LabelTrait>
        <H1>les 14 Organisations Locales</H1>
        <p className='text-[14px] font-normal text-jci-black/80'>
          Un réseau national, un impact local. Découvrez les 14 Organisations Locales de JCI Madagascar à travers nos zones
          Nord, Centre et Sud, et rejoignez le mouvement des jeunes leaders engagés sur toute l'île.
        </p>
      </div>

      <ZoneFilterTabs />

      <div className='flex flex-col md:flex-row gap-8 mt-10 w-full max-w-4xl justify-center'>
        {zones.map((zone) => (
          <Link
            key={zone.path}
            to={zone.path}
            className='flex-1 border border-black/10 rounded-lg p-8 text-center font-roboto font-bold text-[15px] text-jci-black hover:border-jci-yellow hover:text-jci-blue transition'
          >
            {zone.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default OrganisationsLocalesPage
