import { Link } from 'react-router'

const ButtonFull = ({children, path, TextColorHover}) => {
  return (
    <Link to={path} 
      className={`bg-jci-yellow text-jci-black px-3 py-1 rounded font-bold text-[10px] w-fit flex flex-row gap-2 items-center
        hover:bg-transparent border-jci-yellow border-[0.15px] hover:px-3 hover:py-1 ${TextColorHover ? TextColorHover : "hover:text-jci-black"}`}>
      {children}
    </Link>
  )
}

export default ButtonFull