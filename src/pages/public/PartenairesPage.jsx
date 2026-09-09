import H1 from "../../components/ui/H1"
import LabelTrait from "../../components/ui/LabelTrait"
import PartnerBlock from "../../components/ui/PartnerBlock"
import MidiMadagascarLogo from "../../images/LOGO-OTHER/logo_midi_madagasikara.png"
import GroupeKentiaLogo from "../../images/LOGO-OTHER/Logo Koonspace.png"
import OrangeLogo from "../../images/LOGO-OTHER/SIGNATURE_ORANGE_EST_LA_Plan de travail pour fond noir.png"
import ISevenLogo from "../../images/LOGO-OTHER/logo_midi_madagasikara.png"
import TestImg from "../../images/testImg.jpg"

// Données de démonstration en attendant le contenu officiel des partenaires
const partners = [
  {
     Name: "Midi Madagascar", 
     Content: `Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum nefanda Clematii cuiusdam 
      Alexandrini nobilis mors repentina; cuius socrus cum misceri sibi generum, flagrans eius amore, non impetraret, ut 
      ferebatur, per palatii pseudothyrum introducta, oblato pretioso reginae monili id adsecuta est, ut ad Honoratum tum 
      comitem orientis formula missa letali omnino scelere nullo contactus idem Clematius nec hiscere nec loqui 
      permissus occideretur.
      Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum nefanda Clematii cuiusdam 
      Alexandrini nobilis mors repentina; tum comitem orientis formula missa letali omnino scelere nullo contactus idem 
      Clematius nec hiscere nec loqui permissus occideretur.` ,
    Logo: MidiMadagascarLogo, 
    ImageFond: TestImg ,
    BGColor:"bg-[#DF0023]", 
    LabelColor:"text-jci-white",
    H1Color:"text-jci-yellow",
    ContentColor:"text-jci-white"
  },
  { Name: "Groupe Kentia | Koon Space", 
     Content: `Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum nefanda Clematii cuiusdam 
      Alexandrini nobilis mors repentina; cuius socrus cum misceri sibi generum, flagrans eius amore, non impetraret, ut 
      ferebatur, per palatii pseudothyrum introducta, oblato pretioso reginae monili id adsecuta est, ut ad Honoratum tum 
      comitem orientis formula missa letali omnino scelere nullo contactus idem Clematius nec hiscere nec loqui 
      permissus occideretur.
      Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum nefanda Clematii cuiusdam 
      Alexandrini nobilis mors repentina; tum comitem orientis formula missa letali omnino scelere nullo contactus idem 
      Clematius nec hiscere nec loqui permissus occideretur.` ,
    Logo: GroupeKentiaLogo, 
    ImageFond: TestImg ,
    BGColor:"bg-[#FFFFFF]", 
    LabelColor:"text-jci-teal",
    H1Color:"text-jci-teal",
    ContentColor:"text-jci-black"
  },
  { Name: "Orange Madagascar", 
    Content: `Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum nefanda Clematii cuiusdam 
      Alexandrini nobilis mors repentina; cuius socrus cum misceri sibi generum, flagrans eius amore, non impetraret, ut 
      ferebatur, per palatii pseudothyrum introducta, oblato pretioso reginae monili id adsecuta est, ut ad Honoratum tum 
      comitem orientis formula missa letali omnino scelere nullo contactus idem Clematius nec hiscere nec loqui 
      permissus occideretur.
      Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum nefanda Clematii cuiusdam 
      Alexandrini nobilis mors repentina; tum comitem orientis formula missa letali omnino scelere nullo contactus idem 
      Clematius nec hiscere nec loqui permissus occideretur.` ,
    Logo: OrangeLogo, 
    ImageFond: TestImg ,
    BGColor:"bg-[#FF6500]", 
    LabelColor:"text-jci-white",
    H1Color:"text-[#215E61]",
    ContentColor:"text-jci-white"
  },
  { Name: "iSeven Studio", 
    Content: `Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum nefanda Clematii cuiusdam 
      Alexandrini nobilis mors repentina; cuius socrus cum misceri sibi generum, flagrans eius amore, non impetraret, ut 
      ferebatur, per palatii pseudothyrum introducta, oblato pretioso reginae monili id adsecuta est, ut ad Honoratum tum 
      comitem orientis formula missa letali omnino scelere nullo contactus idem Clematius nec hiscere nec loqui 
      permissus occideretur.
      Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum nefanda Clematii cuiusdam 
      Alexandrini nobilis mors repentina; tum comitem orientis formula missa letali omnino scelere nullo contactus idem 
      Clematius nec hiscere nec loqui permissus occideretur.` ,
    Logo: ISevenLogo, 
    ImageFond: TestImg ,
    BGColor:"bg-[#FFFFFF]", 
    LabelColor:"text-[#045F66]",
    H1Color:"text-[#C1CA1D]",
    ContentColor:"text-jci-black"
  },
]

const PartenairesPage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-center pt-20  bg-jci-white'>

      <div className='flex flex-col w-full'>
        {partners.map((partner, index) => (
          <PartnerBlock key={partner.Name} 
          Name={partner.Name} Content={partner.Content} 
          Reverse={index % 2 === 1} Logo={partner.Logo} 
          ImageFond={partner.ImageFond} BGColor={partner.BGColor} 
          LabelColor={partner.LabelColor} H1Color={partner.H1Color} 
          ContentColor={partner.ContentColor} />
        ))}
      </div>
    </div>
  )
}

export default PartenairesPage
