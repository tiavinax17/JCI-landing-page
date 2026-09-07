import { Link } from 'react-router'

const ButtonVoid = ({children, TextColor}) => {
  return (
    <Link 
      className={`hover:bg-jci-yellow ${TextColor ? TextColor : "text-jci-black"} hover:text-jci-black px-3 py-1 rounded font-bold text-[12px] w-fit flex flex-row gap-2 items-center 
        bg-transparent border-jci-yellow border-[0.15px] hover:px-3 hover:py-1`}>
        {children}
    </Link>
  )
}

export default ButtonVoid