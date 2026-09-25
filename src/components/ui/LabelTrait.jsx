import React from 'react'

const LabelTrait = ({children}) => {
  return (
    <div className='flex flex-row items-center'>
      <div className='mr-2 h-[0.5px] w-0 group-hover:w-10 bg-jci-yellow transition-all duration-300'> </div>
      <p className='text-jci-teal text-[8px] font-medium font-poppins'>{children}</p>
    </div>
  )
}

export default LabelTrait