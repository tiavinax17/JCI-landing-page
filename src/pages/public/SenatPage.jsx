import SubNav from "../../components/layout/SubNav"
import H1 from "../../components/ui/H1"
import H2 from "../../components/ui/H2"
import LabelTrait from "../../components/ui/LabelTrait"
import LabelTraitSimple from "../../components/ui/LabelTraitSimple"
import ValueCredoBlock from "../../components/ui/ValueCredoBlock"
import SenatImage from "../../images/JCI/JCI Madagascar/senat.png"

const SenatPage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-start pt-25 pb-10 px-6 lg:pl-33 lg:pr-10 bg-jci-black gap-2'>
      <SubNav />

      <div className="flex flex-col gap-0 lg:ml-20 lg:mr-1">
        <div className="flex lg:flex-row flex-col  bg-jci-white gap-10 rounded-xl lg:px-10 px-5 lg:p-5 p-2 ">
          <div className='flex flex-1 md:flex-2 flex-col gap-1 items-start text-start max-w-full '>
            <LabelTraitSimple Label="Présentation" H1Text="Le sénat - Madagascar" />
            <p className='lg:text-[12px] md:text-[12px] text-[10px] font-normal font-poppins text-jci-black text-justify'>
              Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum nefanda Clematii cuiusdam Alexandrini nobilis 
              mors repentina; cuius socrus cum misceri sibi generum, flagrans eius amore, non impetraret, ut ferebatur, per palatii pseudothyrum 
              introducta, oblato pretioso reginae monili id adsecuta est, ut ad Honoratum tum comitem orientis formula missa letali omnino scelere 
              nullo contactus idem Clematius nec hiscere nec loqui permissus occideretur.
            </p>
            
            <div className='flex md:flex-row flex-col md:gap-10 gap-5'>
              <div className="flex flex-col flex-1 gap-5 md:gap-10">
                 <div className="flex flex-col mt-5"> 
              <H2>Le titre de Sénateur JCI</H2>
              <p className='lg:text-[12px] md:text-[12px] text-[10px] font-normal font-poppins text-jci-black text-justify'>
                Un sénateur JCI est un membre de la Jeune Chambre 
                Internationale reconnu pour son mérite et son exemplarité dans 
                son parcours dans l’association. Il s’agit d’une distinction interne 
                remise sur proposition d’une organisation Locale, après 
                validation de l’organisation nationale et toujours sur décision du 
                président mondial de la JCI.       
              </p>
              <p className='lg:text-[12px] md:text-[12px] text-[10px] mt-3 font-normal font-poppins text-jci-black text-justify'>
                Un membre recevant le sénat JCI, devient « membre à vie » de 
                l’organisation. Il peut de ce fait continuer à soutenir le 
                mouvement et aider à répandre les valeurs de la JCI. A partir de 
                40 ans, un sénateur JCI n’est plus adhérent mais une sorte de 
                membre « honoraire ».       
              </p>
            </div>
              </div>
              <div  className="flex flex-1 flex-col gap-5 md:gap-10">
                <ValueCredoBlock 
                  Title="Objectifs d'un sénateur" 
                  Content="Le rôle d’un sénateur est de promouvoir la solidarité et l’amitié 
                    des sénateurs à travers le monde, de constituer une ressource 
                    pour le sponsoring des projets de son Organisation Locale ainsi 
                    que pour le mentoring des membres et le développement de 
                    JCI." />
                
              </div>

            </div>
          </div>
          <div className='flex flex-1 md:flex-col flex-col gap-10'>
            <div className=" ">
              <img src={SenatImage} alt="C. William Brownfield" className="h-auto w-full object-cover rounded-xl" />
            </div>
           
          </div>
        </div>

      </div>
    </div>
  )
}

export default SenatPage
