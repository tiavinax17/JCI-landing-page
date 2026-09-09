import SubNav from "../../components/layout/SubNav"
import H1 from "../../components/ui/H1"
import H2 from "../../components/ui/H2"
import LabelTrait from "../../components/ui/LabelTrait"
import ProgramCard from "../../components/ui/ProgramCard"
import image1 from "../../images/testImg.jpg"
import image2 from "../../images/HomeBG.png"


const programmes = [
  { Title: "La JMA (JCI Malagasy Academy)", Content: "10 jours d'immersion internationale, de partage, d'apprentissage aux côtés des plus grands leaders JCI du monde entier." },
  { Title: "Art Oratoire & Débat", Content: "Un programme qui renforce la prise de parole en public et l'art du débat argumenté." },
  { Title: "TOYP (Ten Outstanding Young Persons)", Content: "Le programme met en lumière de jeunes leaders âgés de 18 à 40 ans dont les réalisations exceptionnelles inspirent leur communauté." },
  { Title: "CYE (Creative Young Entrepreneur)", Content: "Le programme CYE de la JCI met en lumière les jeunes entrepreneurs innovants, ambitieux et à fort impact." },
]

const ProgrammesPage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-start pt-25 pb-10 px-6 lg:pl-33 lg:pr-10 bg-jci-black gap-2'>
      <SubNav />

      <div className="flex flex-col gap-0 lg:ml-20 lg:mr-1">
        <div className="flex flex-col  bg-jci-white gap-2 rounded-xl lg:p-3 md:p-3 p-2">
          <div className="bg-red-500 w-full overflow-hidden">
            <div className="grid grid-cols-2">
              {/* Grande section du haut */}
              <div className="col-span-2 relative gap-0">
                <img
                  src={image2}
                  alt=""
                  className="w-full h-[550px] object-cover"
                />
                <div className="absolute top-10 left-10 text-jci-white font-bold text-4xl border-l-6 py-0  border-jci-blue  pl-2">
                  NOS <br/>
                  PROGRAMMES <br/>
                  NATIONAUX
                </div>
                <div className=" absolute flex flex-col gap-5 bottom-10 right-14 w-[30%]">
                  <div className="flex flex-col gap-2"> 
                    <H1 TextColor="text-jci-teal">QUE FAISONS NOUS ?</H1>
                    <p className='text-[11px] font-normal font-poppins text-jci-white leading-relaxed text-justify'>
                      A la Jeune Chambre Internationale de Madagascar, nous 
                      plaçons le développement humain et l’impact au coeur de 
                      notre engagement.
                    </p>
                    <p className='text-[11px] font-normal font-poppins text-jci-white leading-relaxed text-justify'>
                      Nous nous lançons le défi d’identifier les leviers stratégiques 
                      mondiaux permettant à nos membres de maximiser 
                      l’efficacité 
                      de leurs actions pour résoudre les 
                      problématiques qu’encourt notre société tout en renforçant 
                      leurs compétences et leur leadership.
                    </p>


                  </div>
                  <div className="flex flex-col gap-3"> 
                    <H1 TextColor="text-jci-teal">COMMENT ?</H1>
                    <p className='text-[11px] font-normal font-poppins text-jci-white leading-relaxed text-justify'>
                      A travers des divers programmes :
                    </p>
                    <ul className='ml-3 -mt-3 list-disc list-inside text-[11px] text-jci-white font-poppins leading-relaxed'>
                      <li>La JMA (JCI Malagasy Academy)</li>
                      <li>Art Oratoire & Débat</li>
                      <li>TOYP (Ten Outstanding Young Persons)</li>
                      <li>CYE (CReative Young Entrepreneur)</li>
                    </ul>                   
                  </div>

                </div>
              </div>

              {/* Image gauche */}
              <div>
                <img
                  src={image2}
                  alt=""
                  className="w-full h-[350px] object-cover"
                />
              </div>

              {/* Image droite */}
              <div>
                <img
                  src={image1}
                  alt=""
                  className="w-full h-[350px] object-cover"
                />
              </div>

              {/* Image gauche */}
              <div>
                <img
                  src={image2}
                  alt=""
                  className="w-full h-[350px] object-cover"
                />
              </div>

              {/* Image droite */}
              <div>
                <img
                  src={image1}
                  alt=""
                  className="w-full h-[350px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgrammesPage
