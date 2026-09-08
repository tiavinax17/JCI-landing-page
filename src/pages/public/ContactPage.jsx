import H1 from "../../components/ui/H1"
import ContactInfoBlock from "../../components/ui/ContactInfoBlock"
import ContactForm from "../../components/ui/ContactForm"

const ContactPage = () => {
  return (
    <div className='min-h-screen font-poppins flex flex-col items-start pt-20 sm:pt-15 pb-10 px-4 sm:px-6 lg:pl-55 lg:pr-10'>

      {/* Header */}
      <div className='flex flex-col gap-2 items-start text-start mt-4 sm:mt-8 w-full'>
        <h1 className='text-jci-black font-bold font-noto text-[22px] sm:text-[26px] lg:text-[30px] leading-tight'>
          ENTRER EN <span className='text-jci-yellow'>CONTACT</span> OU DES QUESTIONS?
        </h1>

        <p className='text-[11px] sm:text-[12px] font-semibold text-jci-black leading-relaxed max-w-3xl'>
          N'hésitez surtout pas à nous écrire pour avoir plus d'informations ou pour devenir membre de la Jeune Chambre Internationale.
        </p>
      </div>

      {/* Contact section */}
      <div className='flex flex-col md:flex-row gap-6 lg:gap-10 mt-6 w-full bg-blue-50/80 border border-gray-300 rounded-2xl sm:rounded-3xl p-3 sm:p-5'>

        {/* Contact information */}
        <ContactInfoBlock
          Title="Coordonnées"
          Address="Kentia Ambatonakanga"
          Phone="+261 34 00 000 00"
          Email="contact@jcimada.org"
        />

        {/* Form */}
        <ContactForm />

      </div>
    </div>
  )
}

export default ContactPage