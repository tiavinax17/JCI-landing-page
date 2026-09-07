import ButtonFull from "../../components/ui/ButtonFull"
import H1 from "../../components/ui/H1"

const NotFoundPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4 font-poppins text-center px-6'>
      <span className='text-jci-yellow font-roboto font-black text-[80px] leading-none'>404</span>
      <H1>Page introuvable</H1>
      <p className='text-[13px] text-jci-black/70 max-w-md'>
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <ButtonFull path="/">Retour à l'accueil</ButtonFull>
    </div>
  )
}

export default NotFoundPage
