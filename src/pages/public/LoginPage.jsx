import React from 'react'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { authAPI } from '../../services/api';
import JciLogo from "../../images/JCI/JCI Madagascar/JCI_Madagascar_background_marine_blue_name_blue_logo-removebg-preview.webp"
import BG from "../../images/HomeBG.png"
import H1 from './../../components/ui/H1';
import { toast } from "sonner";

const LoginPage = () => {

  const { setUser } = useContext(UserContext);
  const loginFormDesktop = useForm()
  const loginFormMobile = useForm()

  const handleSubmit = async (dataform) =>{
  try {
    const res = await authAPI.login(dataform);
    setUser(res.data);
    toast.success("Connexion réussie! Bienvenue sur le site de JCI Madagascar");
  } catch (e) {
    toast.error("Connexion échouée");
  }
}


return (
  <>
    {/* ================= DESKTOP ================= */}
<div
  className="hidden md:flex h-screen bg-jci-black relative overflow-hidden"
  style={{
    backgroundImage: `url(${BG})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-jci-black/55" />

  {/* Décor JCI - côté gauche */}
  <div className="absolute left-0 top-0 w-full h-full overflow-hidden">

    {/* Grand cercle bleu */}
    <div className="absolute -left-40 -top-40 w-[400px] h-[400px] rounded-full border-[70px] border-jci-blue/30" />

    {/* Cercle jaune */}
    <div className="absolute -right-52 bottom-[-120px] w-[420px] h-[420px] rounded-full border-[45px] border-jci-yellow/30" />

    {/* Ligne décorative */}
    <div className="absolute left-16 bottom-16 w-24 h-1 bg-jci-yellow" />

  </div>

  {/* Contenu gauche */}
  <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-10">

    <img
      src={JciLogo}
      alt="Logo JCI Madagascar"
      className="w-auto h-40 object-contain"
    />

    <div className="mt-8 text-center">
      <p className="text-white/80 text-[11px] font-poppins tracking-[0.25em] uppercase">
        Junior Chamber International Madagascar
      </p>
    </div>

  </div>

  {/* Zone formulaire */}
  <div className="relative z-10 flex-1 h-full flex items-center justify-center bg-jci-white">


    {/* Décoration géométrique */}
    <div className="absolute -right-34 -top-24 w-64 h-64 rounded-full border-[35px] border-jci-blue/10" />

    <div className="absolute -left-20 -bottom-20 w-56 h-56 rounded-full border-[30px] border-jci-yellow/10" />

    {/* Formulaire */}
    <form
      className="relative flex flex-col gap-6 w-[400px] px-8 py-10 text-jci-black font-poppins"
      onSubmit={loginFormDesktop.handleSubmit(handleSubmit)}
    >

      {/* En-tête */}
      <div className="flex flex-col text-left">
        <h1 className="text-jci-blue text-[15px] font-semibold">
          Espace administrateur
        </h1>

        <H1 TextSize="text-[38px]">
          CONNEXION
        </H1>

        <p className="text-[11px] text-jci-black/50 font-normal mt-1">
          Connectez-vous à votre espace d'administration JCI Madagascar.
        </p>

      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">

        <label
          htmlFor="email"
          className="text-[11px] font-semibold uppercase tracking-wide"
        >
          Adresse email
          <span className="text-jci-blue ml-1">*</span>
        </label>

        <input
          id="email"
          type="email"
          className="w-full h-11 rounded-none border border-jci-black/20 bg-white px-3 text-[12px] font-normal font-sans outline-none transition-all duration-200 focus:border-jci-blue focus:ring-1 focus:ring-jci-blue/20"
          placeholder="example@example.com"
          {...loginFormDesktop.register("email", {
            required: "L'adresse email est obligatoire",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email invalide",
            },
          })}
        />

        {loginFormDesktop.formState.errors.email && (
          <p className="text-red-500 text-[10px] font-normal">
            {loginFormDesktop.formState.errors.email.message}
          </p>
        )}

      </div>

      {/* Mot de passe */}
      <div className="flex flex-col gap-2">

        <label
          htmlFor="password"
          className="text-[11px] font-semibold uppercase tracking-wide"
        >
          Mot de passe
          <span className="text-jci-blue ml-1">*</span>
        </label>

        <input
          id="password"
          type="password"
          className="w-full h-11 rounded-none border border-jci-black/20 bg-white px-3 text-[12px] font-normal font-sans outline-none transition-all duration-200 focus:border-jci-blue focus:ring-1 focus:ring-jci-blue/20"
          placeholder="••••••••••••"
          {...loginFormDesktop.register("password", {
            required: "Le mot de passe est obligatoire",
          })}
        />

        {loginFormDesktop.formState.errors.password && (
          <p className="text-red-500 text-[10px] font-normal">
            {loginFormDesktop.formState.errors.password.message}
          </p>
        )}

      </div>

      {/* Bouton */}
      <button
        type="submit"
        className="group relative w-full h-12 overflow-hidden bg-jci-blue text-white text-[11px] font-semibold uppercase tracking-[0.12em] border border-jci-blue transition-all duration-300 hover:bg-transparent hover:text-jci-blue cursor-pointer"
      >
        <span className="relative z-10">
          Se connecter
        </span>

        <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-jci-yellow transition-all duration-300 group-hover:w-full" />
      </button>

      {/* Footer */}
      <div className="flex items-center gap-3 pt-2">

        <div className="h-[1px] flex-1 bg-jci-black/10" />

        <a href="mailto:dirnum@jcimada.org" className="text-[9px] hover:text-jci-blue hover:underline text-jci-black/40 uppercase tracking-wider">
          En cas de difficulté de connexion ou de besoin d’assistance, .
          veuillez contacter l’administrateur
        </a>

        <div className="h-[1px] flex-1 bg-jci-black/10" />

      </div>

    </form>
  </div>
</div>


    {/* ================= MOBILE ================= */}
    <div
      className="md:hidden relative min-h-screen w-full flex flex-col justify-center items-center px-5 py-8 bg-jci-black"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-jci-black/60" />

      {/* Logo */}
      <div className="relative z-10 flex justify-center mb-6">
        <img
          src={JciLogo}
          alt="Logo JCI Madagascar"
          className="w-auto h-24"
        />
      </div>

      {/* Formulaire */}
      <div className="relative z-10 w-full max-w-md bg-jci-white/95 rounded-xl p-5 shadow-xl">
        <form
          className="flex flex-col gap-5 w-full text-jci-black font-semibold font-poppins text-[12px]"
          onSubmit={loginFormMobile.handleSubmit(handleSubmit)}
        >
          <div className="flex flex-col text-start w-full">
            <h1 className="text-jci-blue text-[13px] font-poppins font-semibold">
              Espace administrateur JCI Madagascar
            </h1>

            <H1 TextSize="text-[30px]">
              CONNEXION
            </H1>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email">
              Adresse email <span className="text-jci-blue">*</span>
            </label>

            <input
              type="email"
              className="border h-11 w-full rounded border-gray-500/50 bg-white font-normal font-sans px-3 outline-none focus:border-jci-blue"
              placeholder="example@example.com"
              {...loginFormMobile.register("email", {
                required: true,
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email invalide"
                }
              })}
            />

            {loginFormMobile.formState.errors.email && (
              <p className="text-red-500 text-[11px]">
                {loginFormMobile.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Mot de passe */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password">
              Mot de passe <span className="text-jci-blue">*</span>
            </label>

            <input
              type="password"
              className="border h-11 w-full rounded border-gray-500/50 bg-white font-normal font-sans px-3 outline-none focus:border-jci-blue"
              placeholder="***********"
              {...loginFormMobile.register("password", {
                required: true
              })}
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-jci-blue px-5 py-3 text-white rounded border border-jci-blue hover:text-jci-blue hover:bg-transparent cursor-pointer transition-colors duration-300"
          >
            Se connecter
          </button>
        </form>
        <div className="flex items-center gap-3 pt-2">

        <div className="h-[1px] flex-1 bg-jci-black/10" />

        <a href="mailto:dirnum@jcimada.org" className="text-[9px] text-jci-blue underline uppercase tracking-wider">
          En cas de difficulté de connexion ou de besoin d’assistance, .
          veuillez contacter l’administrateur
        </a>

        <div className="h-[1px] flex-1 bg-jci-black/10" />

      </div>
      </div>
    </div>
  </>
)


}

export default LoginPage