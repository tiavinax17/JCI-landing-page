import React from 'react'

const H2 = ({children, TextColor, TextSize}) => {
  return (
    <h2 className={`${TextSize || 'text-[18px]'} font-roboto font-bold ${TextColor || 'text-jci-blue'}`}>
        {children}
    </h2>
  )
}

export default H2