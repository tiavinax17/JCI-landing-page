import React from 'react'
import { useForm } from 'react-hook-form'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { authAPI } from '../../services/api';
import JciLogo from "../../images/JCI/JCI Madagascar/JCI_Madagascar_background_marine_blue_name_blue_logo-removebg-preview.png"
import BG from "../../images/HomeBG.png"
import H1 from './../../components/ui/H1';


const LoginPage = () => {

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (dataform) =>{
  try {
    const res = await authAPI.login(dataform);
    setUser(res.data);
    // navigate("/contact");
  } catch (e) {
    console.log("Login failed!")
  }
}

  const loginForm = useForm()
  return (
    <>
    <div className='hidden h-screen bg-jci-black md:flex flex-row justify-center items-center gap-3' style={{ backgroundImage: `url(${BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
      <div className='flex flex-col justify-center items-center flex-1 pl-20'>
        <img src={JciLogo} alt="Logo" className='w-auto h-40 mx-auto' />
      </div>
      <div className='flex-1 justify-center items-center bg-jci-white/98 p-5  flex flex-col gap-1 h-screen w-full'>
          <form action="" className='flex flex-col gap-5 text-[12px]  p-5 w-100 text-jci-black font-semibold font-poppins' onSubmit={loginForm.handleSubmit(handleSubmit)}>
            <div className='flex flex-col text-start w-full'>
              <h1 className='text-jci-blue text-[15px] font-poppins font-semibold'>Espace administrateur JCI Madagascar</h1>
              <H1 TextSize="text-[35px]">CONNEXION</H1>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="email">Adresse email <span className='text-jci-blue'>*</span></label>
                <input type="text" name="email" className='border h-10 rounded border-gray-500/50 bg-white font-normal font-sans p-1'
                  placeholder="example@example.com"
                {...loginForm.register("email",{required:true,
                  pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, 
                  message: "Email invalide"}})} />
                  {loginForm.formState.errors.email && <p className='text-red-500 text-[12px]'>{loginForm.formState.errors.email.message}</p>}
              </div>
              <div className='flex flex-col'>
                <label htmlFor="password">Mot de passe <span className='text-jci-blue'>*</span></label>
                <input type="password" name="password" className='border h-10 rounded border-gray-500/50 bg-white font-normal font-mono p-1' 
                placeholder="***********"
                {...loginForm.register("password",
                  {required:true})} />
              </div>
              <input 
              className='bg-jci-blue px-5 py-3 text-white  rounded border  hover:text-jci-blue hover:bg-transparent hover:border  border-jci-blue hover:cursor-pointer'
              type="submit" value="Se connecter"/>
          </form>
      </div>
    </div>

    <div className='relative md:hidden text-jci-white flex flex-col justify-center items-center h-screen w-full text-center p-5' style={{ backgroundImage: `url(${BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <img src={JciLogo} alt="Logo" className='w-auto h-60 mx-auto opacity-10 top-60 absolute ' />
    <div className="bg-jci-black/20 p-5 rounded backdrop-blur ">
      <h1 className='text-[20px] font-semibold p-5 rounded ' >Veuillez vous connecter sur le site de JCI Madagascar avec un ordinateur ou un écran plus grand .</h1>
    </div>
    </div>
    </>
  )
}

export default LoginPage