import React from 'react'
import H1 from './H1'
const LabelTraitSimple = ({Label, H1Text}) => {
  return (
    <div className='flex flex-col gap-1'>
        <div className='flex flex-row items-center'>
          <p className='text-jci-teal text-[8px] font-bold font-noto uppercase'>{Label}</p>
          <div className='ml-2 h-[0.5px] w-20 bg-jci-yellow '> </div>
        </div>
        <H1>{H1Text}</H1>
    </div>
  )
}

export default LabelTraitSimple