import React from 'react'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { authAPI } from '../../services/api';
import JciLogo from "../../images/JCI/JCI Madagascar/JCI_Madagascar_background_marine_blue_name_blue_logo-removebg-preview.png"
import BG from "../../images/HomeBG.png"
import H1 from './../../components/ui/H1';
import { toast } from "sonner";

const LoginPage = () => {

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (dataform) =>{
  try {
    const res = await authAPI.login(dataform);
    setUser(res.data);
    toast.success("Connexion réussie! Bienvenue sur le site de JCI Madagascar");
  } catch (e) {
    toast.error("Connexion échouée");
  }
}

  const loginForm = useForm()

return (
  <>
    {/* ================= DESKTOP ================= */}
    <div
      className="hidden h-screen bg-jci-black md:flex flex-row justify-center items-center gap-3"
      style={{
        backgroundImage: `url(${BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="flex flex-col justify-center items-center flex-1 pl-20">
        <img
          src={JciLogo}
          alt="Logo"
          className="w-auto h-40 mx-auto"
        />
      </div>

      <div className="flex-1 justify-center items-center bg-jci-white/98 p-5 flex flex-col gap-1 h-screen w-full">
        <form
          className="flex flex-col gap-5 text-[12px] p-5 w-100 text-jci-black font-semibold font-poppins"
          onSubmit={loginForm.handleSubmit(handleSubmit)}
        >
          <div className="flex flex-col text-start w-full">
            <h1 className="text-jci-blue text-[15px] font-poppins font-semibold">
              Espace administrateur JCI Madagascar
            </h1>

            <H1 TextSize="text-[35px]">
              CONNEXION
            </H1>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">
              Adresse email <span className="text-jci-blue">*</span>
            </label>

            <input
              type="text"
              className="border h-10 rounded border-gray-500/50 bg-white font-normal font-sans p-1"
              placeholder="example@example.com"
              {...loginForm.register("email", {
                required: true,
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email invalide"
                }
              })}
            />

            {loginForm.formState.errors.email && (
              <p className="text-red-500 text-[12px]">
                {loginForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">
              Mot de passe <span className="text-jci-blue">*</span>
            </label>

            <input
              type="password"
              className="border h-10 rounded border-gray-500/50 bg-white font-normal font-mono p-1"
              placeholder="***********"
              {...loginForm.register("password", {
                required: true
              })}
            />
          </div>

          <input
            className="bg-jci-blue px-5 py-3 text-white rounded border border-jci-blue hover:text-jci-blue hover:bg-transparent hover:cursor-pointer"
            type="submit"
            value="Se connecter"
          />
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
          onSubmit={loginForm.handleSubmit(handleSubmit)}
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
              {...loginForm.register("email", {
                required: true,
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email invalide"
                }
              })}
            />

            {loginForm.formState.errors.email && (
              <p className="text-red-500 text-[11px]">
                {loginForm.formState.errors.email.message}
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
              className="border h-11 w-full rounded border-gray-500/50 bg-white font-normal font-mono px-3 outline-none focus:border-jci-blue"
              placeholder="***********"
              {...loginForm.register("password", {
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
      </div>
    </div>
  </>
)


}

export default LoginPage