import ButtonFull from "../../components/ui/ButtonFull"
import ButtonVoid from "../../components/ui/ButtonVoid"
import EventCard from "../../components/ui/EventCard"
import H1 from "../../components/ui/H1"
import LabelTrait from "../../components/ui/LabelTrait"
import StatBlock from "../../components/ui/StatBlock"
import PartnerBlock from "../../components/ui/PartnerBlock"
import ImgTest from "../../images/testImg.jpg"
import { LogIn } from "lucide-react"
import Mada from "../../images/mada.png"
import BG from "../../images/HomeBG.png"
import LogoJCIMNoBg from "../../images/JCI/JCI Madagascar/JCI Madagascar background marine blue name blue logo.png"
import LogoBLTNoBgRow from "../../images/Charte Build Legacy Together/BLT Couleur/BLT-02.png"
import PSD2026 from "../../images/Photos corporate BN/DN2026.jpg"
import MidiMadagascar from "../../images/LOGO-OTHER/logo_midi_madagasikara.png"
import OrangeMadagascar from "../../images/LOGO-OTHER/SIGNATURE_ORANGE_EST_LA_Plan de travail pour fond noir.png"
import GroupeKentia from "../../images/LOGO-OTHER/Logo Kentia.png"
import KoonSpace from "../../images/LOGO-OTHER/Logo Koonspace.png" 

const cadresAction = [
  { Title: "Développement individuel", Active: true },
  { Title: "Impact communautaire" },
  { Title: "Affaires et Entreprenariat" },
  { Title: "Coopération internationale" },
]

const programmes = [
  { Title: "La JMA (JCI Malagasy Academy)", Content: "10 jours d'immersion internationale, de partage et d'apprentissage.", Active: true },
  { Title: "Art Oratoire & Débat" },
  { Title: "TOYP (Ten Outstanding Young Persons)" },
  { Title: "CYE (Creative Young Entrepreneur)", Content: "Le programme met en lumière les jeunes entrepreneurs innovants." },
]

const partenaires = [
  { Image: MidiMadagascar },
  { Image: OrangeMadagascar },
  { Image: GroupeKentia },
  { Image: KoonSpace },
]

const evenements = [
  { Day: "01", Month: "OCT", Type: "EVENT", Title: "Convention Nationale 2026", Content: "1-2-3 octobre 2026 · La Convention Nationale est la rencontre de tous les jaycees de la Grande Île pour faire le bilan de l'année et préparer la prochaine." },
  { Day: "11", Month: "NOV", Type: "EVENT", Title: "Congrès mondial 2026", Content: "Le plus grand rassemblement mondial de jeunes leaders — 6 000+ délégués, 120+ nations, une ville hôte et acceuilli par la JCI Philippines." },
  { Day: "05", Month: "AOUT", Type: "ACTUS", Title: "JCI Madagascar x iSeven Studio", Content: "Le futur partenaire technologique de la JCI Madagascar." },
  { Day: "15", Month: "JANV", Type: "EVENT", Title: "Rentrée Solennelle 2025", Content: "La Rentrée Solennelle 2025 de la JCI Madagascar soulignera le lancement officiel du mandat de cette année." },
]

const AcceuilPage = () => {
  return (
    <div className='flex flex-col w-full min-h-screen bg-jci-black'>

      {/* Qui sommes-nous / cadres d'action / valeurs / programmes */}
      <section className='px-6 sm:px-8 md:px-12 lg:pl-20 lg:pr-1 py-20 md:py-14 lg:py-20 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${BG})` }} name="qui-sommes-nous">
        {/* mobile: 1 col empilée · tablette: 2 col (texte empilé à gauche, carte pleine hauteur à droite via auto-placement) · desktop: 3 col côte à côte */}
        <div className='ml-0 lg:ml-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 lg:gap-1 mr-0 lg:mr-5 items-start max-w-8xl mx-auto'>

          {/* Colonne 1 : présentation + cadres d'action */}
          <div className='flex flex-col gap-8 justify-between'>
            <div className='flex flex-col gap-8'>

              <div className='group flex flex-col opacity-100 lg:opacity-40 lg:hover:opacity-100 transition-opacity duration-300'>
                <LabelTrait>QUI SOMMES-NOUS ?</LabelTrait>
                <H1 TextColor="text-jci-white">LA JCI MADAGASCAR</H1>
                <div className='flex flex-col gap-2'>
                  <p className='text-[10px] text-jci-white font-poppins leading-relaxed'>
                    est une organisation à but non lucratif dédiée aux jeunes leaders entreprenants âgés de 18 à 40 ans.
                    Nous œuvrons pour le développement professionnel, la création d'opportunités économiques et
                    l'élaboration de solutions innovantes face aux défis sociétaux.
                  </p>
                  <ButtonVoid TextColor="text-jci-white" path="/jci-madagascar/historique">Lire la suite <LogIn size={20}/></ButtonVoid>
                </div>
              </div>

              <div className='group flex flex-col gap-1 opacity-100 lg:opacity-40 lg:hover:opacity-100 transition-opacity duration-300'>
                <LabelTrait>QU'EST-CE QUE NOUS FAISONS ?</LabelTrait>
                <H1 TextColor="text-jci-white">NOS CADRES D'ACTIONS</H1>
                <p className='text-[10px] text-jci-white font-poppins leading-relaxed'>
                  À la Jeune Chambre Internationale, nous nous lançons le défi d'identifier les leviers stratégiques
                  mondiaux permettant à nos membres de maximiser l'efficacité de leurs actions pour résoudre les
                  problématiques qu'encourt notre société tout en renforçant leurs compétences et leur leadership
                  à travers divers programmes.
                </p>
                <div className='ml-3 flex flex-col gap-1 text-[10px] text-jci-white font-poppins leading-relaxed'>
                  <ul className='list-disc list-inside'>
                  {cadresAction.map((item) => (
                    <li key={item.Title}>{item.Title}</li>
                  ))}
                  </ul>
                </div>
                <ButtonVoid TextColor="text-jci-white" path="/jci-madagascar/projets">Nos projets <LogIn size={20}/></ButtonVoid>
              </div>

              <div className='relative flex flex-col lg:flex-row items-start lg:items-center gap-4'>
                <img
                  src={PSD2026}
                  alt="Manjatosoa Minah RAKOTOBE, Présidente Nationale"
                  className='peer h-10 w-10 rounded-full object-cover transition-all duration-300 ease-out hover:h-24 hover:w-24'
                />
                {/* positionné en absolu + z-50 pour toujours passer au-dessus des autres blocs de la grille (uniquement à partir de lg, affiché directement en dessous) */}
                {/* peer-hover:max-w-[32rem] = largeur max au hover, ajuste cette valeur pour changer la taille finale */}
                <div className='relative lg:absolute w-full lg:w-[500px] lg:left-25 top-0 z-50 mt-3 lg:mt-0 lg:ml-3 max-w-full max-h-fit overflow-visible lg:overflow-hidden lg:max-w-0 lg:max-h-0 rounded border border-jci-blue/40 bg-jci-black/40 backdrop-blur-xl p-5 lg:p-0 opacity-100 lg:opacity-0 shadow-lg transition-all duration-300 ease-out lg:peer-hover:max-w-[10000px] lg:peer-hover:max-h-fit lg:peer-hover:p-5 lg:peer-hover:opacity-100'>
                 <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <img src={LogoJCIMNoBg} alt="Logo JCI Madagascar" className="h-4 w-fit bg-no-repeat" />
                    <div>
                    <H1 TextColor="text-jci-white" TextSize="text-[10px]">Minah RAKOTOBE</H1>
                    <p className="text-jci-white font-light text-[8px]">Présidente Nationale 2026</p>
                    </div>
                  </div>
                  <div><img src={LogoBLTNoBgRow} alt="Logo Build Legacy Together" className="h-4 w-auto" /></div>
                 </div>
                  <p className='text-[8px] text-jci-white font-poppins italic text-justify'>
                  <span className='text-jci-yellow text-2xl align-middle leading-none'>"</span>L’année 2026 marque pour la JCI Madagascar un nouveau cycle, guidé par une conviction forte : Build Legacy Together.<br/>
                  Construire un héritage, c’est refuser l’action ponctuelle et les résultats éphémères. C’est faire le choix de la cohérence, de la rigueur et de la transmission fondé sur le leadership responsable, la rigueur et l’impact collectif.<br/>
                  Cette année, notre ambition est claire : renforcer la JCI Madagascar comme acteur de référence du développement du leadership des jeunes, ceci à travers des organisations locales solides, des projets à impact mesurable et des leaders responsables, capables de servir avec sens et intégrité.<br/>
                  À nos membres, observateurs et actifs, je lance un appel sincère : appropriez-vous cette vision. Osez prendre votre place, investissez-vous pleinement dans votre parcours, formez-vous, apprenez par l’action et contribuez activement à la construction collective.<br/>
                  A nos membres à vie, plus que jamais, notre relève a besoin de nous. Soyons généreux dans nos partages, nos conseils et notre accompagnement.<br/>
                  À nos partenaires, nos sympathisants et amis du mouvement jeune chambre, nous réaffirmons notre volonté de bâtir des collaborations durables, sincères et alignées sur des valeurs communes.<br/>
                  La jeunesse représente un levier puissant de transformation lorsqu’elle est formée, accompagnée et responsabilisée. Ensemble, nous pouvons créer des synergies porteuses d’impact réel et mesurable pour le développement de Madagascar.<br/>
                  ENSEMBLE, faisons de 2026, une année pour BATIR un HERITAGE qui dépasse les mandats et serve durablement notre pays, notre mouvement et notre organisation nationale.<br/>
                  Mes amitiés jaycees.<span className=' text-[10px] align-middle leading-none'>"</span><br/>
                  </p>
                </div>
              </div>
            </div>
            <div className=' grid grid-cols-3 gap-5'>
              <StatBlock Value="36" Label="ANS" TextColor="text-jci-blue" />
              <StatBlock Value="384" Label="MEMBRES" TextColor="text-jci-blue" />
              <StatBlock Value="14" Label="OLS" TextColor="text-jci-blue" />
            </div>
          </div>

          {/* Colonne 2 : repère visuel des zones (placeholder de la carte de Madagascar) */}
          <div className='flex justify-center md:row-span-2 md:self-center lg:row-span-1 lg:self-start'>
            <img src={Mada} alt="Carte des zones JCI Madagascar" />
          </div>

          {/* Colonne 3 : valeurs + programmes */}
          <div className='flex flex-col gap-10'>
            <div className='group flex flex-col gap-7 opacity-100 lg:opacity-40 lg:hover:opacity-100 transition-opacity duration-300'>
              <div>
                <H1 TextColor="text-jci-white">NOS VALEURS</H1>
                <LabelTrait>NOTRE MISSION</LabelTrait>
                <p className='text-[10px] text-jci-white font-poppins leading-relaxed'>
                  Offrir aux jeunes des opportunités de développement de leadership en leur donnant 
                  la capacité de créer des changements positifs.
                </p>
              </div>
              <div>
                <LabelTrait>NOTRE VISION</LabelTrait>
                <p className='text-[10px] text-jci-white font-poppins leading-relaxed'>
                  Être le principal réseau mondial de jeunes leaders.
                </p>
              </div>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                  <LabelTrait>NOTRE CREDO</LabelTrait>
                  <ul className='ml-3 list-disc list-inside text-[10px] text-jci-white font-poppins leading-relaxed'>
                    <li>Que la foi en <span className="text-jci-blue">Dieu</span> donne à la vie son véritable sens</li>
                    <li>Que la <span className="text-jci-blue">fraternité</span> humaine transcende la souveraineté des nations</li>
                    <li>Que le gouvernement doit s'appuyer sur la <span className="text-jci-blue">loi</span> et non sur l'arbitraire</li>
                    <li>Que la <span className="text-jci-blue">liberté</span> des individus et des entreprises assure au mieux la justice économique</li>
                    <li>Que la <span className="text-jci-blue">personne humaine</span> est la plus précieuse des richesses</li>
                    <li>Et que <span className="text-jci-blue">servir</span> l'humanité constitue l'œuvre la plus noble d'une vie</li>
                  </ul>
                </div>
                <ButtonVoid TextColor="text-jci-white" path="/jci-madagascar/valeurs">Lire la suite <LogIn size={20}/></ButtonVoid>
              </div>
            </div>
            <div className='group flex flex-col gap-5 opacity-100 lg:opacity-40 lg:hover:opacity-100 transition-opacity duration-300'>
              <div className='flex flex-col gap-1'>
                <H1 TextColor="text-jci-white">NOS PROGRAMMES</H1>
                <p className=' ml-1 text-[10px] font-poppins text-jci-white'>À travers des divers programmes :</p>
                <div className='flex flex-col gap-1'>
                  <ul className='ml-3 list-disc list-inside text-[10px] text-jci-white font-poppins leading-relaxed'>
                  {programmes.map((item) => (
                    <li key={item.Title}> {item.Title}</li>
                  ))}
                  </ul>
                </div>
              </div>
                <ButtonVoid TextColor="text-jci-white" path="/jci-madagascar/programmes">Lire la suite <LogIn size={20}/></ButtonVoid>
            </div>
          </div>

        </div>
        <div>

        </div>
      </section>



      {/* Partenaires */}
      <section className='bg-jci-blue px-6 md:px-16 py-16 flex flex-col items-center gap-10'>
        <div className='flex flex-col items-center gap-0.5 text-center'>
          <div className='flex flex-row items-center'>
            <div className='mr-2 h-[0.5px] w-10  bg-jci-yellow'> </div>
            <p className='text-jci-white text-[8px] font-medium font-noto'>ACTUALITÉS & ÉVÉNEMENTS</p>
            <div className='ml-2 h-[0.5px] w-10  bg-jci-yellow'> </div>
          </div>
          <H1 TextColor="text-jci-white" TextSize="text-2xl">DÉCOUVREZ NOS PARTENAIRES</H1>
          <p className='text-jci-white/80 font-semibold text-[13px] italic'>Explorez nos partenaires nationaux</p>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-10 w-full max-w-5xl'>
          <div className='flex items-center justify-center rounded-xl w-full max-w-[200px] mx-auto h-[80px] sm:h-[100px] overflow-hidden bg-jci-white py-3'>
            <img src={MidiMadagascar} alt="" className="h-15 w-auto" />
          </div>
          <div className='flex items-start justify-center rounded-xl w-full max-w-[200px] mx-auto h-[80px] sm:h-[100px] overflow-hidden bg-jci-white py-5'>
            <img src={OrangeMadagascar} alt="" className="h-20 w-auto" />
          </div>
          <div className='flex items-center justify-center rounded-xl w-full max-w-[200px] mx-auto h-[80px] sm:h-[100px] overflow-hidden bg-jci-white py-3'>
            <img src={GroupeKentia} alt=""  className="h-20 w-auto" />
          </div>
          <div className='flex items-center justify-center rounded-xl w-full max-w-[200px] mx-auto h-[80px] sm:h-[100px] overflow-hidden bg-jci-white py-3'>
            <img src={KoonSpace} alt="" className="h-15 w-auto" />
          </div>
          <div className='flex items-center justify-center rounded-xl w-full max-w-[200px] mx-auto h-[80px] sm:h-[100px] overflow-hidden bg-jci-white py-3'>
            <img src={KoonSpace} alt="" className="h-16 w-auto" />
          </div>
        </div>
      </section>

      {/* Actualités & évènements */}
      <section className='relative bg-jci-blue px-6 md:px-8 lg:px-1 py-10 lg:py-1 flex flex-col items-center gap-10 overflow-hidden lg:h-screen'>
        <div className='flex flex-col items-start justify-between py-7 px-6 lg:pl-7 lg:pr-0 gap-4 lg:gap-1 text-left lg:text-center bg-jci-white h-auto lg:h-[570px] w-full lg:w-[1600px] lg:-mr-200'>
          <div className="flex flex-col items-start">
            <div className='flex flex-row items-center -mb-1'>
              <p className='text-jci-blue text-[8px] font-bold font-noto'>ACTUALITÉS & ÉVÉNEMENTS</p>
              <div className='ml-2 h-[0.5px] w-10  bg-jci-yellow'> </div>
            </div>
            <H1 TextSize="text-2xl">RESTEZ CONNECTÉ</H1>
            <p className='text-[12px] -mt-0 font-poppins font-medium  text-jci-black/80'>Découvrez toutes les actualités autour de la JCI et les évènements à venir.</p>
          </div>
          <ButtonVoid BgColors="hover:bg-jci-blue border-jci-blue" TextColor="text-jci-black" path="/jci-madagascar/blog">Voir plus <LogIn size={20}/></ButtonVoid>
        </div>
        <div className='relative lg:absolute lg:top-27 lg:left-70 flex flex-col lg:flex-row w-full lg:w-auto px-6 lg:px-0'>
          <div name="text" className='hidden lg:block relative h-[400px] w-[60px] -ml-10 mr-5'>
            <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[90px] font-bold text-jci-black/10 font-noto select-none'>
              Actualités
            </p>
            <p className='absolute top-1/2 left-15 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[20px] font-bold text-jci-white font-noto'>
              Actualités & événements
            </p>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 lg:w-full max-w-6xl'>
            {evenements.map((event) => (
              <EventCard key={event.Title} Img={ImgTest} {...event} />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default AcceuilPage
