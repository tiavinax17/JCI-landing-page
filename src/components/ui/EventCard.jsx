import React from 'react'

const EventCard = ({Img, Day, Month, Type, Title, Content}) => {
  return (
    <div className="h-112.5 w-[337.5px] bg-jci-white border-black/5 border ml-7 mb-7  rounded shadow-[0_4px_10px_rgba(0,0,0,0.2)] p-4">
              <div className="border rounded-xs border-black/5 w-full h-full flex flex-col">
                <div className="flex flex-3 relative bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${Img})` }}>
                    <div className="bg-jci-blue text-white h-13.25 w-12 font-roboto flex flex-col justify-center items-center absolute top-0 right-2">
                      <h1 className="text-[27px]">{Day}</h1>
                      <h2 className="text-[13px] -mt-2">{Month}</h2>
                    </div>
                    <div className="h-5 w-18.75 bg-jci-yellow text-[11px] text-jci-black font-extrabold font-roboto text-center absolute bottom-0 left-0"> {Type}</div>
                </div>
                <div className="flex flex-col flex-1 bg-jci-white p-3 font-poppins text-[#313131]">
                  <h1 className="text-[16px]  font-semibold">{Title}</h1>
                  <p className="text-[11px] font-normal">{Content}</p>
                </div>
              </div>
            </div>
  )
}

export default EventCard