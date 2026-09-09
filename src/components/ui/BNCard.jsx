import React from 'react'
import { PiBagSimpleDuotone } from "react-icons/pi";
const BNCard = ({ image, firstName, lastName, role }) => {
  return (
    <div className="w-full p-3 pb-2 border border-gray-400/50 rounded-xl flex flex-col justify-between">
    
    <div className="flex flex-col justify-center items-center">

        <div className="w-[95%] aspect-square rounded-full border border-jci-black/30 ">
            
            <div className="w-full aspect-square rounded-full border-b-jci-yellow border-t-jci-yellow border-[8px] border-[#E0F8F7]">
                
                <div className="w-full aspect-square rounded-full border-[2px] border-jci-black overflow-hidden">
                    <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                    />
                </div>

            </div>
        </div>

        <div className="text-center text-[clamp(10px,1.2vw,15px)] flex flex-col gap-0 text-jci-black font-poppins">
            <p>{firstName}</p>
            <p className="font-bold -mt-1">{lastName}</p>
        </div>

    </div>

    <div className="flex flex-row gap-2 mt-1 w-fit self-center items-center justify-between text-center text-jci-blue font-poppins font-bold px-2 py-[2px] text-[clamp(8px,0.9vw,10px)] rounded bg-[#EAF3FC]">
        <div>
            <PiBagSimpleDuotone size={20} />
        </div>

        <div className="text-center">
            {role}
        </div>
    </div>

</div>
  )
}

export default BNCard