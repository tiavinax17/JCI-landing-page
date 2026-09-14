import React from 'react'
import H1 from './H1'
const LabelTraitSimple = ({Label, H1Text, LabelColor, H1Color}) => {
  return (
    <div className='flex flex-col gap-1'>
        <div className='flex flex-row items-center'>
          <div className='mr-2 h-[0.5px] w-0 group-hover:w-10 bg-jci-yellow transition-all duration-300'> </div>
          <p className={`text-[8px] font-bold font-noto uppercase ${LabelColor ? LabelColor : 'text-jci-teal'}`}>{Label}</p>
          <div className='ml-2 h-[0.5px] w-20 bg-jci-yellow '> </div>
        </div>
        <H1 TextColor={H1Color}>{H1Text}</H1>
    </div>
  )
}

export default LabelTraitSimple