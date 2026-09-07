import { useParams, Navigate } from 'react-router'
import H1 from "../../components/ui/H1"
import H2 from "../../components/ui/H2"
import LabelTrait from "../../components/ui/LabelTrait"
import ZoneFilterTabs from "../../components/ui/ZoneFilterTabs"
import LocalOrgCard from "../../components/ui/LocalOrgCard"
import MemberCard from "../../components/ui/MemberCard"
import ContactInfoBlock from "../../components/ui/ContactInfoBlock"
import { zonesData } from "../../utils/zonesData"

const ZonePage = () => {
  const { zone } = useParams()
  const data = zonesData[zone]

  if (!data) return <Navigate to="/organisations-locales" replace />

  return (
    <div className='min-h-screen font-poppins flex flex-col items-center pt-28 pb-10 px-6 lg:px-32'>
      <LabelTrait>présentation</LabelTrait>

      <div className='flex flex-col gap-4 items-center text-center max-w-3xl mt-4'>
        <H1>{data.label}</H1>
        <p className='text-[14px] font-normal text-jci-black/80'>
          Sous le lead et l'accompagnement de {data.vp}, Vice-Président(e) National(e) {data.label.replace("Zone ", "")} 2026,
          la {data.label} est composée d'Organisations Locales engagées sur tout le territoire.
        </p>
      </div>

      <ZoneFilterTabs />

      {data.organisations.length > 0 ? (
        <div className='flex flex-row flex-wrap gap-8 justify-center mt-6 max-w-4xl'>
          {data.organisations.map((org) => (
            <LocalOrgCard key={org} Name={org} />
          ))}
        </div>
      ) : (
        <p className='text-[13px] text-jci-black/50 mt-6'>Liste des Organisations Locales à venir.</p>
      )}

      <div className='flex flex-col gap-8 mt-16 w-full items-center'>
        <H2>les membres du bureau local</H2>

        {data.bureauLocal.length > 0 ? (
          <div className='flex flex-row flex-wrap gap-x-10 gap-y-10 justify-center max-w-4xl'>
            {data.bureauLocal.map((member, index) => (
              <MemberCard key={index} Name={member.Name} Role={member.Role} />
            ))}
          </div>
        ) : (
          <p className='text-[13px] text-jci-black/50'>Liste du bureau local à venir.</p>
        )}
      </div>

      {data.contact && (
        <div className='mt-16'>
          <ContactInfoBlock
            Title="Coordonnées"
            Address={data.contact.ville}
            Phone={data.contact.phone}
            Email={data.contact.email}
          />
        </div>
      )}
    </div>
  )
}

export default ZonePage
