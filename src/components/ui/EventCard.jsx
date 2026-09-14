const EventCard = ({ Img, Day, Month, Type, Title, Content }) => {
  return (
    <div className="w-full max-w-[278px] aspect-[278/376] mx-auto bg-jci-white border-black/5 border rounded shadow-[0_4px_10px_rgba(0,0,0,0.2)] p-2.5 lg:p-3 hover:scale-105 transition-all duration-300">
      
      <div className="border rounded-xs border-black/5 w-full h-full flex flex-col overflow-hidden">

        {/* Image */}
        <div className="relative w-full aspect-[278/222] shrink-0 overflow-hidden">
          <img
            src={Img}
            alt={Title}
            className="w-full h-full object-cover"
          />

          {/* Date */}
          <div className="bg-jci-blue text-white px-1.5 py-1 md:px-2 font-roboto font-bold flex flex-col justify-center items-center absolute top-0 right-2">
            <h1 className="text-[18px] md:text-[22px]">{Day}</h1>
            <h2 className="text-[10px] md:text-[11px] -mt-2">{Month}</h2>
          </div>

          {/* Type */}
          <div className="px-3 md:px-4 py-0.5 bg-jci-yellow text-[7px] md:text-[8px] text-jci-black font-extrabold font-roboto text-center absolute bottom-0.5 left-0">
            {Type}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 min-h-0 bg-jci-white p-1 md:p-3 font-poppins text-[#313131]">
          <h1 className="text-[12px] md:text-[14px] font-bold ">
            {Title}
          </h1>

          <p className="text-[8px] md:text-[9px] font-normal text-justify">
            {Content}
          </p>
        </div>

      </div>
    </div>
  )
}

export default EventCard