import React from 'react'

const H1 = ({children, TextColor, TextSize}) => {
  return (
    <h1 className={`${TextSize || 'lg:text-[20px] md:text-[12px] text-[10px]'} font-roboto font-black tracking-tight ${TextColor || 'text-jci-black'} uppercase`}>
        {children}
    </h1>
  )
}

export default H1