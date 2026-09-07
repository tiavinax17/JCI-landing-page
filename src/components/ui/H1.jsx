import React from 'react'

const H1 = ({children, TextColor, TextSize}) => {
  return (
    <h1 className={`${TextSize || 'text-[20px]'} font-roboto font-bold ${TextColor || 'text-jci-black'}`}>
        {children}
    </h1>
  )
}

export default H1