import { useState } from 'react'
import InputField from './InputField'
import TextAreaField from './TextAreaField'
import { RiSendInsLine } from "react-icons/ri";


const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: brancher l'envoi vers l'API contact (src/services/api.js)
    console.log(form)
  }

  return (
    <form onSubmit={handleSubmit} className=' flex flex-1 flex-col gap-4 w-full max-w-xl mt-10'>
      <InputField Label="Nom complet" name="name" placeholder="Nom et prénom" value={form.name} onChange={handleChange} required />
      <InputField Label="Email" Type="email" name="email" placeholder="email@gmail.com" value={form.email} onChange={handleChange} required />
      <InputField Label="Numéro téléphone" Type="tel" name="phone" placeholder="+261340000000" value={form.phone} onChange={handleChange} />
      <TextAreaField Label="Message" name="message" placeholder="Votre message..." value={form.message} onChange={handleChange} required />
      <div className='flex justify-end '>
        <button
          type="submit"
          className=" bg-jci-yellow text-jci-white hover:text-jci-yellow justify-center px-5 py-2 rounded-[10px] font-semi-bold text-[13px] w-fit hover:bg-transparent border-jci-yellow border-[0.15px] transition flex flex-row imets-center gap-2"
        >
          <RiSendInsLine size={20} />
          Envoyer 
        </button>
      </div>
    </form>
  )
}

export default ContactForm
