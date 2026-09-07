import React from 'react'

const LabelTrait = ({children}) => {
  return (
    <div className='flex flex-row gap-2 items-center'>
        <p className='text-jci-teal text-[8px] font-medium font-noto'>{children}</p>
        <div className='h-[0.5px] w-20 bg-jci-yellow'> </div>
    </div>
  )
}

export default LabelTrait