import SubNav from "../../components/layout/SubNav"
import H1 from "../../components/ui/H1"
import H2 from "../../components/ui/H2"
import LabelTrait from "../../components/ui/LabelTrait"
import LabelTraitSimple from "../../components/ui/LabelTraitSimple"
import ValueCredoBlock from "../../components/ui/ValueCredoBlock"
import CWilliam from "../../images/JCI/JCI Madagascar/C.-William-Brownfield.jpg"

const credo = [
  {
    Title: "Que la foi en Dieu donne à la vie son véritable sens",
    Content: "Dans cette phrase, « Dieu » ne fait référence à aucun Dieu spécifique, mais se rapporte à une puissance suprême omnipotente. Cette phrase signifie que vous devez croire à quelque chose.",
  },
  {
    Title: "Que le gouvernement doit s'appuyer sur la loi et non sur l'arbitraire",
    Content: "Ce principe du Credo signifie simplement que personne n'est au-dessus de la loi et que la loi doit être la même pour tous les individus, indépendamment du statut particulier d'une personne au sein de la société.",
  },
  {
    Title: "Que la fraternité humaine transcende la souveraineté des nations",
    Content: "Cela signifie que nous sommes avant tout des êtres humains, au-delà de nos frontières, de nos pays et de nos différences. La JCI défend ainsi l'idée que l'entraide, le respect et la solidarité doivent unir les peuples.",
  },
  {
    Title: "Que la liberté des individus et des entreprises assurent au mieux la justice économique",
    Content: "Les membres de la Jeune Chambre croient que l'Homme doit être libre d'utiliser ses compétences et capacités à leur maximum pour améliorer sa situation économique.",
  },
  {
    Title: "Que la personne humaine est la plus précieuse des richesses",
    Content: "Chaque individu possède une personnalité unique qui lui est propre. Cette particularité reconnaît que l'être humain est le trésor le plus précieux sur la terre.",
  },
  {
    Title: "Et que servir l'humanité constitue l'œuvre la plus noble d'une vie",
    Content: "Une vie vécue au service des autres est plus enrichissante, plus profonde et plus complète. Le bonheur est plus durable et la tranquillité d'âme plus certaine.",
  },
]

const ValeursPage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-start pt-25 pb-10 px-6 lg:pl-33 lg:pr-10 bg-jci-black gap-2'>
      <SubNav />
      <div className="flex flex-col gap-0 lg:ml-20 lg:mr-1">
        <div className="flex lg:flex-row flex-col  bg-jci-white gap-10 rounded-t-xl px-10 pt-5 lg:pr-20">
          <div className='flex flex-1 md:flex-2 flex-col gap-1 items-start text-start max-w-full '>
            <LabelTraitSimple Label="Le début d'une grande histoire" H1Text="LE CREDO" />
            <p className='text-[12px] font-normal font-poppins text-jci-black text-justify'>
              C'est en 1946 à Milwaukee, lors de la Convention Nationale des Jaycees des États-Unis qu'est née l'idée du Credo de la JCI.
            </p>
            <p className='text-[12px] font-normal font-poppins text-jci-black text-justify'>
              C.William Brownfield, ancien Président des Jaycees de l’Ohio et vice-président national des Jaycees des États-Unis réalisa lors de cette 
              convention que l’organisation n’avait pas de Credo. Il fut inspiré par le dévouement des membres de la Jeune Chambre «engagés à 
              servir l’humanité de mille façons différentes, au niveau même de la base où la liberté vit ou s’éteint» 
            </p>
            <div className="flex flex-col mt-5"> 
              <H2>Nous croyons que</H2>
              <p className='text-[12px] font-normal font-poppins text-jci-black text-justify'>
                Chacun doit croire à un idéal, à un principe ou à une philosophie particulière. Croire, signifie mettre en application ce que l’on croit être 
                vrai         
              </p>
            </div>
            <div className='flex md:flex-row flex-col md:gap-10 gap-5'>
              <div className="flex flex-col flex-1 gap-5 md:gap-10">
                <ValueCredoBlock 
                  Title="Que la foi en Dieu donne à la vie son véritable sens" 
                  Content="Dans cette phrase, « Dieu » ne fait référence à aucun Dieu 
                    spécifique, mais se rapporte à une puissance suprême 
                    omnipotente. Peu importe qui est – ou ce que représente – votre 
                    Dieu. Cette phrase signifie que vous devez croire à quelque 
                    chose. Brownfield l’interpréta de la manière suivante : « Les 
                    adhérents de la Jeune Chambre, issus de différents milieux 
                    religieux, sont unis par une volonté de foi commune et que 
                    l’Homme vit selon la volonté de son Dieu, que la volonté de Dieu 
                    à l’égard de l’Homme est bonne et qu’une vie utile est vécue en 
                    harmonie avec son dessein éternel »" />
                <ValueCredoBlock  
                  Title="Que le gouvernement doit s'appuyer sur la loi et non sur l'arbitraire" 
                  Content="Ce principe du Credo signifie simplement que personne n’est 
                    au-dessus de la loi et que la loi doit être la même pour tous les 
                    individus, indépendamment du statut particulier d’une 
                    personne au sein de la société. Le gouvernement doit être basé 
                    sur des lois constitutionnelles, adoptées et ratifiées par la 
                    majorité des citoyens. Le pouvoir de changer les lois et d’élire 
                    des gouvernements doit rester entre les mains de la majorité 
                    des citoyens. Abraham Lincoln, 16ème Président des États-Unis 
                    faisait référence à un gouvernement « du peuple, pour le 
                    peuple, par le peuple ». Cette phrase du Credo cristallise ce que 
                    proclamait le Président Lincoln il y a si longtemps. Brownfield 
                    exprima cette idée de la manière suivante:  » Dans une société 
                    libre, le Droit fondamental doit provenir du peuple. C’est le 
                    peuple qui représente le pouvoir suprême »" />
              </div>
              <div  className="flex flex-1 flex-col gap-5 md:gap-10">
                <ValueCredoBlock 
                  Title="Que la fraternité humaine transcende la souveraineté 
                    des nations" 
                  Content="Cela signifie que nous sommes avant tout des êtres humains, 
                    au-delà de nos frontières, de nos pays et de nos différences. La 
                    JCI défend ainsi l’idée que l’entraide, le respect et la solidarité 
                    doivent unir les peuples, même lorsque les nations sont 
                    différentes." />
                <ValueCredoBlock  
                  Title="Que la liberté des individus et des entrprises assurent 
                  aux mieux la justice économique" 
                  Content="Les mots clés sont ici « …assure mieux… » Les membres de la 
                    Jeune Chambre croient que l’Homme doit être libre d’utiliser ses 
                    compétences et capacités à leur maximum pour améliorer sa 
                    situation économique. Brownfield exprima cette idée ainsi : « 
                    Partout où l’avancement économique a été le plus grand, 
                    l’homme a été libre de poursuivre son rêve de faire fortune, en 
                    faisant quelque chose de nouveau, ou en perfectionnant des 
                    idées anciennes ». Il ajouta aussi « …le système d’auto
                    développement grâce à l’entreprise privée doit pouvoir être 
                    modifiée afin de s’adapter aux conditions locales rencontrées 
                    dans diverses parties du monde »." />
                <ValueCredoBlock  
                Title="Que la personne humaine est la plus précieuse des 
                  richesses" 
                Content="Chaque individu possède une personnalité unique qui lui est 
                  propre. C’est cela qui différencie l’Homme des autres créatures 
                  du monde. Cette particularité reconnaît que l’être humain est le 
                  trésor le plus précieux sur la terre. Il ne peut être ni reproduit ni 
                  fabriqué. Les vues de Brownfield sur l’interprétation de cette 
                  phrase sont : « Le véritable trésor est dans le cœur des Hommes. 
                  Il y a en nous un domaine de possibilités étendues pour 
                  développer la personne humaine. Ce n’est ni la quantité ni la 
                  longueur de la vie qui lui donne sa saveur, mais c’est la qualité 
                  de la vie et les tâches que nous accomplissons mesurées en 
                  fonction du progrès humain »" />
              </div>

            </div>
          </div>
          <div className='flex flex-1 md:flex-col flex-col gap-10'>
            <div className="rounded-2xl border-5 border-jci-teal/50 ">
              <img src={CWilliam} alt="C. William Brownfield" className="h-auto w-full object-cover rounded-xl" />
            </div>
            <div  className="flex flex-1 flex-col gap-5 md:gap-10">
              <ValueCredoBlock 
                Title="Et que servir l’humanité constitue l’œuvre la plus noble 
                  d’une vie" 
                Content="Ce dernier principe du Credo est l’aboutissement logique des 
                  lignes précédentes. Une personne qui croit au Credo trouvera 
                  très certainement que servir l’humanité constitue l’œuvre la 
                  plus noble d’une vie. Arrêtez-vous sur le mot humanité. 
                  L’interprétation de cette ligne du Credo par Brownfield est la 
                  suivante « Une vie vécue au service des autres est plus 
                  enrichissante, plus profonde et plus complète. Le bonheur est 
                  plus durable et la tranquillité d’âme plus certaine. Le monde est 
                  conscient de la contribution apportée par une telle vie et 
                  reconnaît celui qui l’a vécue comme un bienfaiteur de la race 
                  humaine ; cependant ce dernier sait qu’en vérité il est le plus 
                  grand bénéficiaire ».
                  Peu importe la façon dont un membre interprète le Credo, il doit 
                  toujours mettre en pratique ce qu’il croit. Plusieurs modifications 
                  du Credo ont été tentées sans succès, mais le Credo a prévalu 
                  au cours des années et il continue à être le texte de référence 
                  qui maintient la cohésion et l’unité de l’organisation. De 
                  nombreux membres ont fondé leur ligne de conduite dans la vie 
                  sur le Credo.
                  Brownfield résuma très justement son interprétation du Credo 
                  de la manière suivante: « seulement dans l’action, les mots 
                  peuvent devenir réalité »" />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-5 items-start text-start max-w-full  bg-jci-white  rounded-b-xl px-10 lg:pr-20 pb-20'>
          <div className='flex flex-col gap-2 items-start text-start '>
            
            <LabelTraitSimple Label="NOTRE" H1Text="MISSION" />
            <p className='text-[12px] font-normal font-poppins text-jci-black '>
                Offrir aux jeunes des opportunités de développement de leadership en leur donnant la capacité de créer des changements positifs.
            </p>
          </div>
          <div className='flex flex-col gap-2 items-start text-start '>
            <LabelTraitSimple Label="NOTRE" H1Text="VISION" />
            <p className='text-[12px] font-normal font-poppins text-jci-black text-justify'>
              Être le principal réseau mondial de jeunes leaders.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ValeursPage
