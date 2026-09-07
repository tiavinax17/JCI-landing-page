import ButtonFull from "../../components/ui/ButtonFull"
import ButtonVoid from "../../components/ui/ButtonVoid"
import EventCard from "../../components/ui/EventCard"
import H1 from "../../components/ui/H1"
import H2 from "../../components/ui/H2"
import LabelTrait from "../../components/ui/LabelTrait"
import StatBlock from "../../components/ui/StatBlock"
import TimelineItem from "../../components/ui/TimelineItem"
import MemberCard from "../../components/ui/MemberCard"
import ProgramCard from "../../components/ui/ProgramCard"
import ValueCredoBlock from "../../components/ui/ValueCredoBlock"
import PartnerBlock from "../../components/ui/PartnerBlock"
import LocalOrgCard from "../../components/ui/LocalOrgCard"
import ZoneFilterTabs from "../../components/ui/ZoneFilterTabs"
import Pagination from "../../components/ui/Pagination"
import ContactForm from "../../components/ui/ContactForm"
import ContactInfoBlock from "../../components/ui/ContactInfoBlock"
import SocialIconsRow from "../../components/ui/SocialIconsRow"
import ImgTest from "../../images/testImg.jpg"

// Section wrapper pour la démo de style-guide, à retirer une fois la page d'accueil finalisée
const Section = ({ Title, children }) => (
  <div className='flex flex-col gap-6 items-center w-full max-w-5xl py-10 border-b border-black/10'>
    <LabelTrait>{Title}</LabelTrait>
    {children}
  </div>
)

const AcceuilPage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-center pt-28 pb-20 px-6 lg:px-32 gap-2'>

      <Section Title="H1 / H2">
        <H1>RESTEZ CONNECTÉ</H1>
        <H2>Sous-titre H2</H2>
      </Section>

      <Section Title="Boutons">
        <div className='flex flex-row gap-4'>
          <ButtonFull path="/">J'adhère</ButtonFull>
          <ButtonVoid>Devenir membre</ButtonVoid>
        </div>
      </Section>

      <Section Title="EventCard">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <EventCard Img={ImgTest} Day="01" Month="DEC" Type="EVENT" Title="Convention nationale 2026" Content="La Convention Nationale est la rencontre de tous les jaycees de la Grande Île pour faire le bilan de l'année et préparer la prochaine." />
          <EventCard Img={ImgTest} Day="01" Month="DEC" Type="ACTUS" Title="Convention nationale 2026 XXX" Content="La Convention Nationale est la rencontre de tous les jaycees de la Grande Île pour faire le bilan de l'année et préparer la prochaine." />
        </div>
      </Section>

      <Section Title="StatBlock">
        <div className='flex flex-row gap-16'>
          <StatBlock Value="36" Label="ANS" />
          <StatBlock Value="14" Label="OLs" />
          <StatBlock Value="384" Label="Membres" />
        </div>
      </Section>

      <Section Title="TimelineItem">
        <div className='flex flex-row flex-wrap gap-10 justify-center'>
          <TimelineItem Year="1959" Name="ANDRIATSITOHAINA Charles" Role="Président Fondateur" />
          <TimelineItem Year="2026" Name="RAKOTOBE Manjatosoa Minah" Role="Présidente Nationale" />
        </div>
      </Section>

      <Section Title="MemberCard">
        <div className='flex flex-row flex-wrap gap-10 justify-center'>
          <MemberCard Name="Manjatosoa Minah RAKOTOBE" Role="Présidente nationale" />
          <MemberCard Name="Jouber MAYET" Role="Trésorier national" />
        </div>
      </Section>

      <Section Title="ProgramCard">
        <div className='flex flex-col gap-4 w-full max-w-xl'>
          <ProgramCard Title="La JMA (JCI Malagasy Academy)" Content="10 jours d'immersion internationale, de partage et d'apprentissage." Active />
          <ProgramCard Title="CYE (Creative Young Entrepreneur)" Content="Le programme met en lumière les jeunes entrepreneurs innovants." />
        </div>
      </Section>

      <Section Title="ValueCredoBlock">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>
          <ValueCredoBlock Title="Que la foi en Dieu donne à la vie son véritable sens" Content="Cette phrase signifie que vous devez croire à quelque chose." />
          <ValueCredoBlock Title="Que la personne humaine est la plus précieuse des richesses" Content="Chaque individu possède une personnalité unique qui lui est propre." />
        </div>
      </Section>

      <Section Title="PartnerBlock">
        <div className='w-full max-w-2xl'>
          <PartnerBlock Name="Orange Madagascar" Content="Partenaire télécommunications, soutenant la connectivité des membres." />
        </div>
      </Section>

      <Section Title="LocalOrgCard">
        <div className='flex flex-row flex-wrap gap-8 justify-center'>
          <LocalOrgCard Name="JCI Ambilobe" />
          <LocalOrgCard Name="JCI Sambava" />
        </div>
      </Section>

      <Section Title="ZoneFilterTabs">
        <ZoneFilterTabs />
      </Section>

      <Section Title="Pagination">
        <Pagination CurrentPage={2} TotalPages={10} />
      </Section>

      <Section Title="ContactForm / ContactInfoBlock">
        <div className='flex flex-col md:flex-row gap-16 w-full'>
          <ContactInfoBlock Title="Coordonnées" Address="Kentia Ambatonakanga" Phone="+261 34 00 000 00" Email="contact@jcimada.org" />
          <ContactForm />
        </div>
      </Section>

      <Section Title="SocialIconsRow">
        <SocialIconsRow TextColor="text-jci-black" />
      </Section>

    </div>
  )
}

export default AcceuilPage