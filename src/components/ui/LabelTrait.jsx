import React from 'react'

const LabelTrait = ({children}) => {
  return (
    <div className='flex flex-row gap-2 items-center'>
        <p className='text-jci-blue text-[10px] font-medium'>{children}</p>
        <div className='h-0.5 w-20 bg-jci-yellow'> </div>
    </div>
  )
}

export default LabelTrait