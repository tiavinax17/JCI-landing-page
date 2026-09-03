import { Link } from 'react-router'

const ButtonVoid = ({children}) => {
  return (
    <Link className='bg-transparent border-jci-yellow border-2 text-jci-black px-5 py-3 rounded text-[12px] w-fit'>
        {children}
    </Link>
  )
}

export default ButtonVoid