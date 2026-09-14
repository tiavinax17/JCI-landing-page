import { useParams, Navigate } from 'react-router'
import H1 from "../../components/ui/H1"
import H2 from "../../components/ui/H2"
import LabelTrait from "../../components/ui/LabelTrait"
import ZoneFilterTabs from "../../components/layout/ZoneFilterTabs"
import LocalOrgCard from "../../components/ui/LocalOrgCard"
import MemberCard from "../../components/ui/MemberCard"
import ContactInfoBlock from "../../components/ui/ContactInfoBlock"
import { zonesData } from "../../utils/zonesData"
import LabelTraitSimple from './../../components/ui/LabelTraitSimple';
import BG from "../../images/CRZNORD.png"
import PSDZN from "../../images/Photos corporate BN/VPN Franco Joël.jpg"

const ZonePage = () => {
  const { zone } = useParams()
  const data = zonesData[zone]

  if (!data) return <Navigate to="/organisations-locales" replace />

  return (
    <div className='min-h-screen font-poppins flex flex-col items-start pt-25 pb-10 px-6 lg:pl-33 lg:pr-20 bg-jci-black gap-2'>
      <ZoneFilterTabs />
      
      <div className="flex flex-col gap-0 lg:ml-20 lg:mr-1 mr-0 w-[90%]">
        <div className="flex lg:flex-col flex-col md:justify-center md:items-center lg:items-start bg-jci-white gap-5 rounded w-full  p-2  "  >
          <div
            className=" group flex flex-col gap-4 items-start w-full h-[40vh] p-5 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0),rgba(0, 0, 0, 0), #0e0b21), url(${BG})`
            }}
          >              
            <LabelTraitSimple Label="présentation" H1Text={data.label} H1Color="text-jci-white" LabelColor="text-jci-teal"/>
            {/* <p className='text-[14px] font-normal text-jci-black/80'>
              Sous le lead et l'accompagnement de {data.vp}, Vice-Président(e) National(e) {data.label.replace("Zone ", "")} 2026,
              la {data.label} est composée d'Organisations Locales engagées sur tout le territoire.
            </p> */}
          </div>
          <div className='relative pl-15 items-end gap-3'>
            <div className='absolute border-4 bg-white border-jci-white rounded-2xl -top-15'>
              <img src={PSDZN} alt="President Zone Nord" className="aspect-[50/50] w-30 rounded-xl object-cover" loading="lazy" />
            </div>
            <div className='flex flex-col gap-1 items-start ml-38'>
              <h1 className='text-[16px] font-poppins font-normal text-jci-black'>
                Franco Joël ANDRIAMAMPIONONA
              </h1>
              <p className='text-jci-black/50 text-[12px]'>
                Sous le lead et l’accompagnement de Franco Joël ANDRIAMAMPIONONA, Vice-Présidente Nationale Nord 2026, la Zone Nord composée de six Organisations Locales
              </p>

            </div>
          </div>



            {data.organisations.length > 0 ? (
              <div className='flex flex-row flex-wrap gap-8 justify-center mt-6 max-w-4xl pl-15'>
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
      </div>
    </div>
  )
}

export default ZonePage
