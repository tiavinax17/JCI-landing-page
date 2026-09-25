import ButtonVoid from "../../components/ui/ButtonVoid"
import EventCard from "../../components/ui/EventCard"
import H1 from "../../components/ui/H1"
import LabelTrait from "../../components/ui/LabelTrait"
import StatBlock from "../../components/ui/StatBlock"
import { LogIn } from "lucide-react"
import Mada from "../../images/AccueilMada.svg"
import Mada2 from "../../images/Mada2.svg"
import BG from "../../images/HomeBG.png"
import LogoJCIMNoBg from "../../images/JCI/JCI Madagascar/JCI Madagascar background marine blue name blue logo.png"
import LogoBLTNoBgRow from "../../images/Charte Build Legacy Together/BLT Blanc/BLT-05.webp"
import LogoBLTNoBgRowWhite from "../../images/Charte Build Legacy Together/BLT Monochrome Blanc/BLT-11.webp"
import PSD2026 from "../../images/Photos corporate BN/DN2026.webp"
import MidiMadagascar from "../../images/LOGO-OTHER/logo_midi_madagasikara.webp"
import OrangeMadagascar from "../../images/LOGO-OTHER/OrangeLogo.webp"
import GroupeKentia from "../../images/LOGO-OTHER/Logo Kentia.webp"
import KoonSpace from "../../images/LOGO-OTHER/Logo Koonspace.webp" 
import ISeven from "../../images/LOGO-OTHER/I0SevenStudio.webp"
import { IoArrowDownCircle } from "react-icons/io5";
import { eventAPI } from "../../services/api"
import { useState, useEffect } from "react";


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


const AcceuilPage = () => {
  const [actuEvents, setActuEvents] = useState([]);
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [showPSD, setShowPSD] = useState(false);

  useEffect(() => {
    const fetchActuEvents = async () => {
      try {
        const response = await eventAPI.getAllActu();
        const data = response.data;
        setActuEvents(data);
      } catch (error) {
        console.error("Failed to fetch actu events:", error);
      }
    };
    fetchActuEvents();
  }, []);
  return (
    <div className='flex flex-col w-full min-h-screen bg-jci-black'>

      {/* Qui sommes-nous / cadres d'action / valeurs / programmes */}
      <section className=' hidden md:flex px-6 sm:px-8 md:px-12 lg:pl-20 lg:pr-1 py-20 md:py-14 lg:py-20 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${BG})` }} name="qui-sommes-nous">
        {/* mobile: 1 col empilée · tablette: 2 col (texte empilé à gauche, carte pleine hauteur à droite via auto-placement) · desktop: 3 col côte à côte */}
        <div className='ml-0 lg:ml-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 lg:gap-1 mr-0 lg:mr-5 items-start max-w-8xl mx-auto'>

          {/* Colonne 1 : présentation + cadres d'action */}
          <div className='flex flex-col h-full gap-12'>
            <div className='flex flex-col gap-8'>

              <div className='group flex flex-col opacity-100 lg:opacity-40 lg:hover:opacity-100 transition-opacity duration-300'>
                <LabelTrait>QUI SOMMES-NOUS ?</LabelTrait>
                <H1 TextColor="text-jci-white">LA JCI MADAGASCAR</H1>
                <div className='flex flex-col gap-2'>
                  <p className='text-[10px] text-jci-white font-poppins leading-relaxed text-justify'>
                    est une organisation à but non lucratif dédiée aux jeunes leaders entreprenants âgés de 18 à 40 ans.
                    Nous œuvrons pour le développement professionnel, la création d'opportunités économiques et
                    l'élaboration de solutions innovantes face aux défis sociétaux.
                  </p>
                  <ButtonVoid TextColor="text-jci-white" path="/jci-madagascar">Lire la suite <LogIn size={20}/></ButtonVoid>
                </div>
              </div>

              <div className='group flex flex-col gap-1 opacity-100 lg:opacity-40 lg:hover:opacity-100 transition-opacity duration-300'>
                <LabelTrait>QU'EST-CE QUE NOUS FAISONS ?</LabelTrait>
                <H1 TextColor="text-jci-white">NOS CADRES D'ACTIONS</H1>
                <p className='text-[10px] text-jci-white font-poppins leading-relaxed text-justify'>
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
                <ButtonVoid TextColor="text-jci-white" path="/jci-madagascar/programmes">Nos projets <LogIn size={20}/></ButtonVoid>
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
                    <img src={LogoJCIMNoBg} alt="Logo JCI Madagascar" className="h-5 w-fit bg-no-repeat" />
                    <div>
                    <H1 TextColor="text-jci-white" TextSize="text-[11px]">Minah RAKOTOBE</H1>
                    <p className="text-jci-white font-light text-[9px]">Présidente Nationale 2026</p>
                    </div>
                  </div>
                  <div><img src={LogoBLTNoBgRow} alt="Logo Build Legacy Together" className="h-5 w-auto" /></div>
                 </div>
                  <p className='text-[10px] text-jci-white font-poppins italic text-justify'>
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
          <div className='flex justify-center md:row-span-2 md:self-center -mt-25 lg:row-span-1 lg:self-start p-10 hover:scale-101  transition-all duration-300'>
            <img src={Mada} alt="Carte des zones JCI Madagascar"
            fetchPriority="high"
            />
          </div>

          {/* Colonne 3 : valeurs + programmes */}
          <div className="flex flex-col justify-between h-full">
            <div className='flex flex-col gap-5'>
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
            {/* group : hover fait apparaître le logo BLT couleur en plus grand à la place du logo blanc */}
            <div className="w-full h-full mt-5 relative">
              <div  className="group relative  flex justify-start ">
                <img
                  src={LogoBLTNoBgRowWhite}
                  alt="Logo Build Legacy Together"
                  className="absolute left-0 top-0 h-11 w-auto translate-y-0 opacity-50 transition-all duration-500 ease-out group-hover:opacity-0"
                />
                <img
                  src={LogoBLTNoBgRow}
                  alt="Logo Build Legacy Together"
                  className="absolute left-0 top-0 h-11 w-auto translate-y-0 opacity-0 transition-all duration-500 ease-out group-hover:h-13 group-hover:w-auto group-hover:opacity-100"
                />
              </div>
              <div className="absolute bottom-0 right-2">
                    <IoArrowDownCircle className="text-jci-white" size={20} />
              </div>

            </div>
          </div>

        </div>
        <div>

        </div>
      </section>
      {/*MOBILE AFFICHAGE */}
      <section className='relative  md:hidden flex px-6 sm:px-8 pt-10 pb-0  md:py-14  bg-cover bg-center bg-no-repeat flex-col gap-1' style={{ backgroundImage: `url(${BG})` }} name="qui-sommes-nous">
        {/* mobile: 1 col empilée · tablette: 2 col (texte empilé à gauche, carte pleine hauteur à droite via auto-placement) · desktop: 3 col côte à côte */}
        <div className='ml-0 lg:ml-32 grid grid-cols-1 gap-0  mr-0 items-start  mx-auto'>
            <div
              className="flex group justify-center md:row-span-2 md:self-center  lg:row-span-1 lg:self-start  hover:scale-101 transition-all duration-300 cursor-pointer relative"
              onClick={() => setShowSecondImage((prev) => !prev)}
            >
              <div className="relative  flex items-center justify-center">
                {/* Première image */}
                <img
                  src={Mada}
                  alt="Carte des zones JCI Madagascar"
                  fetchPriority="high"
                  className={`transition-all duration-500 ease-in-out h-[85%] ${
                    showSecondImage
                      ? "opacity-0 scale-95"
                      : "opacity-100 scale-100"
                  }`}
                />

                {/* Deuxième image */}
                {showSecondImage && (
                  <img
                    src={Mada2}
                    alt="Carte des zones JCI Madagascar"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                )}
              </div>
               <div className="absolute top-10 left-0 w-32 h-14">
                <img
                  src={LogoBLTNoBgRowWhite}
                  alt="Logo Build Legacy Together"
                  className={`absolute left-0 top-0 h-11 w-auto transition-all duration-500 ease-out 
                   ${
                    showSecondImage
                      ? "opacity-0 "
                      : "opacity-100 "
                  }`}
                />

                <img
                  src={LogoBLTNoBgRow}
                  alt="Logo Build Legacy Together"
                  className={`absolute left-0 top-0 h-11 w-auto transition-all duration-500 ease-out 
                    ${
                    showSecondImage
                      ? "opacity-100 "
                      : "opacity-0 "
                  }`}
                />
              </div>
            </div>
          {/* Colonne 1 : présentation + cadres d'action */}
          <div className='flex flex-col h-full gap-12'>
            <div className='relative flex flex-col gap-8'>

              <div className='group flex flex-col opacity-100 lg:opacity-40 lg:hover:opacity-100 transition-opacity duration-300'>
                <LabelTrait>QUI SOMMES-NOUS ?</LabelTrait>
                <H1 TextColor="text-jci-white">LA JCI MADAGASCAR</H1>
                <div className='flex flex-col gap-2'>
                  <p className='text-[10px] text-jci-white font-poppins leading-relaxed text-justify'>
                    est une organisation à but non lucratif dédiée aux jeunes leaders entreprenants âgés de 18 à 40 ans.
                    Nous œuvrons pour le développement professionnel, la création d'opportunités économiques et
                    l'élaboration de solutions innovantes face aux défis sociétaux.
                  </p>
                  <ButtonVoid TextColor="text-jci-white" path="/jci-madagascar">Lire la suite <LogIn size={20}/></ButtonVoid>
                </div>
              </div>

              <div className='group flex flex-col gap-1 opacity-100 lg:opacity-40 lg:hover:opacity-100 transition-opacity duration-300'>
                <LabelTrait>QU'EST-CE QUE NOUS FAISONS ?</LabelTrait>
                <H1 TextColor="text-jci-white">NOS CADRES D'ACTIONS</H1>
                <p className='text-[10px] text-jci-white font-poppins leading-relaxed text-justify'>
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
                <ButtonVoid TextColor="text-jci-white" path="/jci-madagascar/programmes">Nos projets <LogIn size={20}/></ButtonVoid>
              </div>

              <div className="fixed bottom-5 right-5 z-50">
                 {/* Message au-dessus */}
              <div
                className={`absolute bottom-full right-0 mb-4 w-[500px] max-w-[calc(100vw-2rem)]
                  rounded border border-jci-blue/40 bg-jci-black/80 backdrop-blur-xl
                  shadow-lg overflow-hidden
                  transition-all duration-500 ease-out
                  ${
                    showPSD
                      ? "max-h-[1000px] p-5 opacity-100 translate-y-0"
                      : "max-h-0 p-0 opacity-0 translate-y-5 pointer-events-none"
                  }`}
              >
                <div className="relative">

                  <div className="flex flex-row justify-between gap-4 pr-5">
                    <div className="flex flex-col">
                      <img
                        src={LogoJCIMNoBg}
                        alt="Logo JCI Madagascar"
                        className="h-5 w-fit"
                      />

                      <H1 TextColor="text-jci-white" TextSize="text-[11px]">
                        Minah RAKOTOBE
                      </H1>

                      <p className="text-jci-white font-light text-[9px]">
                        Présidente Nationale 2026
                      </p>
                    </div>

                    <img
                      src={LogoBLTNoBgRow}
                      alt="Logo Build Legacy Together"
                      className="h-5 w-auto"
                    />
                  </div>

                  <p className="mt-4 text-[10px] text-jci-white font-poppins italic text-justify">
                    <span className="text-jci-yellow text-2xl align-middle leading-none">
                      "
                    </span>
                    L’année 2026 marque pour la JCI Madagascar un nouveau cycle, 
                    guidé par une conviction forte : Build Legacy Together.
                    <br />
                    Construire un héritage, c’est refuser l’action ponctuelle et 
                    les résultats éphémères. C’est faire le choix de la cohérence, 
                    de la rigueur et de la transmission fondé sur le leadership 
                    responsable, la rigueur et l’impact collectif.
                    <br />
                    Cette année, notre ambition est claire : renforcer la JCI Madagascar 
                    comme acteur de référence du développement du leadership des jeunes, 
                    ceci à travers des organisations locales solides, 
                    des projets à impact mesurable et des leaders responsables, 
                    capables de servir avec sens et intégrité.
                    <br />
                    À nos membres, observateurs et actifs, je lance un appel sincère :
                     appropriez-vous cette vision. Osez prendre votre place, 
                     investissez-vous pleinement dans votre parcours, formez-vous, 
                     apprenez par l’action et contribuez activement à la construction collective.
                    <br />
                    A nos membres à vie, plus que jamais, notre relève a besoin de nous. 
                    Soyons généreux dans nos partages, nos conseils et notre accompagnement.
                    <br />
                    À nos partenaires, nos sympathisants et amis du mouvement jeune chambre, 
                    nous réaffirmons notre volonté de bâtir des collaborations durables, 
                    sincères et alignées sur des valeurs communes.
                    <br />
                    La jeunesse représente un levier puissant de transformation lorsqu’elle est formée, 
                    accompagnée et responsabilisée. Ensemble, nous pouvons créer des synergies porteuses 
                    d’impact réel et mesurable pour le développement de Madagascar.
                    <br />
                    ENSEMBLE, faisons de 2026, une année pour BATIR un HERITAGE qui dépasse les 
                    mandats et serve durablement notre pays, notre mouvement et 
                    notre organisation nationale.
                    <br />
                    Mes amitiés jaycees.
                    <span className="text-[10px] align-middle leading-none">
                      "
                    </span>
                  </p>
                </div>
              </div>

              {/* Image : ne bouge jamais */}
              <button
                type="button"
                onClick={() => setShowPSD((prev) => !prev)}
                className="relative block rounded-full focus:outline-none"
                aria-label="Afficher le message"
              >
                <img
                  src={PSD2026}
                  alt="Manjatosoa Minah RAKOTOBE, Présidente Nationale"
                  className="h-20 w-20 rounded-full object-cover"
                  loading="lazy"
                />

                {/* Bordure fixe + clignotement */}
                <span className="absolute inset-0 rounded-full border-2 border-jci-blue animate-ping" />

                <span className="absolute inset-0 rounded-full border-2 border-jci-blue" />
              </button>
            </div>
            </div>
            <div className=' grid grid-cols-2 gap-5 self-center w-[80%] mb-5'>
              <StatBlock Value="36" Label="ANS" TextColor="text-jci-blue" />
              <StatBlock Value="384" Label="MEMBRES" TextColor="text-jci-blue" />
              <StatBlock Value="14" Label="OLS" TextColor="text-jci-blue" />
            </div>
          </div>

          {/* Colonne 2 : repère visuel des zones (placeholder de la carte de Madagascar) */}
          

          {/* Colonne 3 : valeurs + programmes */}
          <div className="flex flex-col h-full relative ">
            <div className='flex flex-col gap-5'>
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
            {/* group : hover fait apparaître le logo BLT couleur en plus grand à la place du logo blanc */}
            <div className="w-full h-full mt-5  relative  bg-red-500">
             
              <div className="absolute bottom-0 right-2">
                    <IoArrowDownCircle className="text-jci-white" size={20} />
              </div>

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
            <p className='text-jci-white text-[8px] font-medium font-poppins'>ACTUALITÉS & ÉVÉNEMENTS</p>
            <div className='ml-2 h-[0.5px] w-10  bg-jci-yellow'> </div>
          </div>
          <H1 TextColor="text-jci-white" TextSize="text-2xl">DÉCOUVREZ NOS PARTENAIRES</H1>
          <p className='text-jci-white/80 font-semibold text-[13px] italic'>Explorez nos partenaires nationaux</p>
        </div>
       <div className="w-full  overflow-hidden">
        <div className="flex w-max animate-scroll-horizontal">

          {/* Premier groupe */}
          <div className="flex items-center gap-6 lg:gap-10 pr-6 lg:pr-10">

            <div className="flex items-center justify-center rounded-xl w-[180px] sm:w-[200px] h-[80px] sm:h-[100px] overflow-hidden bg-jci-white py-3 shrink-0">
              <img src={MidiMadagascar} alt="Logo Midi Madagascar" loading="lazy" decoding="async"className="h-15 w-auto" />
            </div>

            <div className="flex items-start justify-center rounded-xl w-[180px] sm:w-[200px] h-[80px] sm:h-[100px] overflow-hidden bg-jci-white pt-1 md:pt-5 shrink-0">
              <img src={OrangeMadagascar} alt="Logo Orange Madagascar" loading="lazy" decoding="async" className="h-17 w-auto" />
            </div>

            <div className="flex items-center justify-center rounded-xl w-[180px] sm:w-[200px] h-[80px] sm:h-[100px] overflow-hidden bg-jci-white py-3 shrink-0">
              <img src={GroupeKentia} alt="Logo Groupe Kentia" loading="lazy" decoding="async" className="h-20 w-auto" />
            </div>

            <div className="flex items-center justify-center rounded-xl w-[180px] sm:w-[200px] h-[80px] sm:h-[100px] overflow-hidden bg-jci-white py-3 shrink-0">
              <img src={ISeven} alt="Logo ISeven" loading="lazy" decoding="async" className="h-15 w-auto" />
            </div>

            <div className="flex items-center justify-center rounded-xl w-[180px] sm:w-[200px] h-[80px] sm:h-[100px] overflow-hidden bg-jci-white py-3 shrink-0">
              <img src={KoonSpace} alt="Logo Koon Space" loading="lazy" decoding="async" className="h-16 w-auto" />
            </div>

          </div>

          {/* Deuxième groupe identique pour la boucle */}
          <div className="flex items-center gap-6 lg:gap-10 pr-6 lg:pr-10">

            <div className="flex items-center justify-center rounded-xl w-[180px] sm:w-[200px] h-[80px] sm:h-[100px] overflow-hidden bg-jci-white py-3 shrink-0">
              <img src={MidiMadagascar} alt="Logo Midi Madagascar" loading="lazy" decoding="async" className="h-15 w-auto" />
            </div>

            <div className="flex items-start justify-center rounded-xl w-[180px] sm:w-[200px] h-[80px] sm:h-[100px] overflow-hidden bg-jci-white pt-5 shrink-0">
              <img src={OrangeMadagascar} alt="Logo Orange Madagascar" loading="lazy" decoding="async" className="h-17 w-auto" />
            </div>

            <div className="flex items-center justify-center rounded-xl w-[180px] sm:w-[200px] h-[80px] sm:h-[100px] overflow-hidden bg-jci-white py-3 shrink-0">
              <img src={GroupeKentia} alt="Logo Groupe Kentia" loading="lazy" decoding="async" className="h-20 w-auto" />
            </div>

            <div className="flex items-center justify-center rounded-xl w-[180px] sm:w-[200px] h-[80px] sm:h-[100px] overflow-hidden bg-jci-white py-3 shrink-0">
              <img src={ISeven} alt="Logo ISeven" loading="lazy" decoding="async" className="h-15 w-auto" />
            </div>

            <div className="flex items-center justify-center rounded-xl w-[180px] sm:w-[200px] h-[80px] sm:h-[100px] overflow-hidden bg-jci-white py-3 shrink-0">
              <img src={KoonSpace} alt="Logo Koon Space" loading="lazy" decoding="async" className="h-16 w-auto" />
            </div>

          </div>

        </div>
      </div>
      </section>

      {/* Actualités & évènements */}
      <section className='relative bg-jci-blue px-6 md:px-8 lg:px-1 py-10 lg:py-1 flex flex-col items-center md:gap-10 overflow-hidden lg:h-screen md:mt-0 -mt-5'>
        <div className='flex flex-col items-start justify-between py-7 px-6 lg:pl-7 lg:pr-0 gap-4 lg:gap-1 text-left lg:text-center bg-jci-white h-auto lg:h-[570px] w-full lg:w-[1600px] lg:-mr-200'>
          <div className="flex flex-col items-start">
            <div className='flex flex-row items-center -mb-1'>
              <p className='text-jci-blue text-[8px] font-bold font-poppins'>ACTUALITÉS & ÉVÉNEMENTS</p>
              <div className='ml-2 h-[0.5px] w-10  bg-jci-yellow'> </div>
            </div>
            <H1 TextSize="text-2xl">RESTEZ CONNECTÉ</H1>
            <p className='text-[12px] -mt-0 font-poppins font-medium  text-jci-black/80'>Découvrez toutes les actualités autour de la JCI et les évènements à venir.</p>
          </div>
          <div className='flex justify-end lg:w-[68%] w-full'>
            <ButtonVoid  nVoid BgColors=" hover:bg-jci-blue border-jci-blue" TextColor="text-jci-black" path="/blog">Voir plus <LogIn size={20}/></ButtonVoid>
          </div>
        </div>
        <div className='relative lg:absolute lg:top-27 lg:left-70 flex flex-col lg:flex-row w-full lg:w-auto px-6 lg:px-0 md:bg-transparent bg-jci-white -mt-2 md:mt-0 pb-10 md:pb-0'>
          <div name="text" className='hidden lg:block relative h-[400px] w-[60px] -ml-10 mr-5'>
            <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[90px] font-bold text-jci-black/10 font-poppins select-none'>
              Actualités
            </p>
            <p className='absolute top-1/2 left-15 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[20px] font-bold text-jci-white font-poppins'>
              Actualités & événements
            </p>
          </div>
          <div className='hidden md:grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 lg:w-full max-w-6xl'>
            {actuEvents?.map((event) => {
                const date = new Date(event?.date);
                const day = date.getDate();
                const month = date.toLocaleString('default', { month: 'short' });
                const year = date.getFullYear();
                return (
                  <EventCard key={event?.id} Img={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${event?.imgUrl}`} Title={event?.title} Content={event?.content} Day={day} Month={month} Type={event?.type} Year={year} Id={event?.id} />
                )
              })}
          </div>
           <div className='sm:hidden flex flex-row overflow-x-scroll snap-x snap-mandatory self-center lg:w-full max-w-6xl w-[90%] '>
              {actuEvents.map((event) => {
                const date = new Date(event.date)
  
                const day = date.getDate()
                const month = date.toLocaleString('default', {
                  month: 'short'
                })
                const year = date.getFullYear()
  
                return (
                  <div
                    key={event.id}
                    className='snap-center shrink-0 w-full flex justify-center'
                  >
                    <EventCard
                      Img={`${import.meta.env.VITE_BACKEND_APP_API_URL_IMAGE}${event.imgUrl}`}
                      Title={event.title}
                      Content={event.content}
                      Day={day}
                      Month={month}
                      Type={event.type}
                      Year={year}
                      Id={event.id}
                    />
                  </div>
                )
              })}
  
            </div>
        </div>
      </section>

    </div>
  )
}

export default AcceuilPage
