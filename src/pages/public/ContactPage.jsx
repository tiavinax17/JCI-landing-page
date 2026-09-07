import H1 from "../../components/ui/H1"
import ContactInfoBlock from "../../components/ui/ContactInfoBlock"
import ContactForm from "../../components/ui/ContactForm"

const ContactPage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-center pt-28 pb-10 px-6 lg:px-32'>
      <div className='flex flex-col gap-4 items-center text-center max-w-2xl mt-8'>
        <H1>entrer en contact ou des questions ?</H1>
        <p className='text-[14px] font-normal text-jci-black/80'>
          N'hésitez surtout pas à nous écrire pour avoir plus d'informations ou pour devenir membre de la Jeune Chambre Internationale.
        </p>
      </div>

      <div className='flex flex-col md:flex-row gap-16 mt-14 w-full max-w-4xl'>
        <ContactInfoBlock
          Title="Coordonnées"
          Address="Kentia Ambatonakanga"
          Phone="+261 34 00 000 00"
          Email="contact@jcimada.org"
        />
        <ContactForm />
      </div>
    </div>
  )
}

export default ContactPage
