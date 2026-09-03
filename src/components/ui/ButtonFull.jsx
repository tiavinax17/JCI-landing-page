import { Link } from 'react-router'

const ButtonFull = ({children}) => {
  return (
    <Link className='bg-jci-yellow text-jci-black px-5 py-3 rounded text-[12px] w-fit'>
        {children}
    </Link>
  )
}

export default ButtonFull