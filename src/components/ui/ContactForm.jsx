import { useState } from 'react'
import { RiSendInsLine } from "react-icons/ri";
import { useForm } from 'react-hook-form';
import { emailAPI } from '../../services/api';
import {toast} from "sonner";

const ContactForm = () => {
  const contactFormulaire = useForm();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (data) => {
    setIsPending(true);
    try {
      await emailAPI.send(data);
      toast.success("Email envoyé avec succès !");
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error("Erreur lors de l'envoi de l'email");
    } finally {
      contactFormulaire.reset();  
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={contactFormulaire.handleSubmit(handleSubmit)} className=' flex flex-1 flex-col gap-4 w-full max-w-xl mt-10'>
      <input
      type="text"
      {...contactFormulaire.register("website")}
      tabIndex="-1"
      autoComplete="off"
      className="hidden"
    />
       <div className='flex flex-col gap-1.5'>
        <label className='flex flex-col gap-1 text-[11px] font-poppins text-jci-black/70'>
          Nom complet</label>
          <input
            id="name"
            type="text"
            placeholder="Nom et prénom(s)"
            {...contactFormulaire.register('name', { required: "Le nom est obligatoire",
              minLength: {
                value: 2,
                message: "Le nom doit contenir au moins 2 caractères",
              },
              maxLength: {
                value: 100,
                message: "Le nom ne doit pas dépasser 100 caractères",
              },
              pattern: {
                value: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
                message: "Le nom contient des caractères invalides",
              } })}
        className='border bg-jci-white border-black/10 rounded-[10px] px-2 py-3 text-[10px] text-jci-black outline-none focus:border-jci-blue'
          />
          {contactFormulaire.formState.errors.name && (
            <span className="text-red-500 text-[9px]">
              {contactFormulaire.formState.errors.name.message}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-1.5'>
          <label className='flex flex-col gap-1 text-[11px] font-poppins text-jci-black/70' htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...contactFormulaire.register("email", {
              required: "L'email est obligatoire",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Adresse email invalide",
              },
              maxLength: {
                value: 254,
                message: "Email trop long",
              },
            })}

        className='border bg-jci-white border-black/10 rounded-[10px] px-2 py-3 text-[10px] text-jci-black outline-none focus:border-jci-blue'
          />
          {contactFormulaire.formState.errors.email && (
              <span className="text-red-500 text-[9px]">
                {contactFormulaire.formState.errors.email.message}
              </span>
            )}
        </div>
      <div className="flex flex-col gap-1.5">
        <label
            htmlFor="phone"
            className="flex flex-col gap-1 text-[11px] font-poppins text-jci-black/70"
        >
            Numéro téléphone
        </label>

        <input
            id="phone"
            type="text"
            placeholder="+261340000000"
            {...contactFormulaire.register("phone",{
                required: "Le numéro de téléphone est obligatoire",
                pattern: {
                    value: /^\+?[0-9\s()-]{8,20}$/,
                    message: "Veuillez fournir un numéro de téléphone valide e.g: 0340000000 ou +261340000000",
                },
                minLength: {
                    value: 10,
                    message: "Le numéro de téléphone doit contenir au moins 10 caractères",
                },
                maxLength: {
                    value: 13,
                    message: "Le numéro de téléphone ne doit pas dépasser 13 caractères",
                },
            })}
            className='border bg-jci-white border-black/10 rounded-[10px] px-2 py-3 text-[10px] text-jci-black outline-none focus:border-jci-blue'
        />
        {contactFormulaire.formState.errors.phone && (
            <span className="text-red-500 text-[9px]">
                {contactFormulaire.formState.errors.phone.message}
            </span>
        )}

    </div>
    <div className="flex flex-col gap-1.5">

      <label
          htmlFor="message"
          className="flex flex-col gap-1 text-[11px] font-poppins text-jci-black/70"
      >
          Message
      </label>

      <textarea
          id="message"
          placeholder="Message ..."
          {...contactFormulaire.register("message",{required: "Le message est obligatoire",
              minLength: {
                  value: 5,
                  message: "Le message doit contenir au moins 5 caractères",
              },
              maxLength: {
                  value: 500,
                  message: "Le message ne doit pas dépasser 500 caractères",
          }})}
          className='border bg-jci-white border-black/10 rounded-[10px] px-2 py-3 text-[10px] text-jci-black outline-none focus:border-jci-blue resize-none'
      />
      {contactFormulaire.formState.errors.message && (
          <span className="text-red-500 text-[9px]">
              {contactFormulaire.formState.errors.message.message}
          </span>
      )}

      </div>
      <div className='flex justify-end '>
        <button
          type="submit"
          className={`${isPending ? "opacity-50 cursor-not-allowed" : ""} bg-jci-yellow text-jci-white hover:text-jci-yellow justify-center px-5 py-2 rounded-[10px] font-semi-bold text-[13px] w-fit hover:bg-transparent border-jci-yellow border-[0.15px] transition flex flex-row imets-center gap-2`}
        >
          <RiSendInsLine size={20} />
          {isPending ? "Envoi..." : "Envoyer"}
        </button>
      </div>
    </form>
  )
}

export default ContactForm
