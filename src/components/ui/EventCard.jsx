
const EventCard = ({Img, Day, Month, Type, Title, Content}) => {
  return (
    // Fluid size on mobile/tablet, exact fixed size (278x376) restored from md (laptop/pc) upward
    <div className="w-full max-w-[240px] h-[320px] sm:max-w-[260px] sm:h-[350px] md:w-[278px] md:h-93 md:max-w-none mx-auto bg-jci-white border-black/5 border rounded shadow-[0_4px_10px_rgba(0,0,0,0.2)] px-4 py-2.5">
      <div className="border rounded-xs border-black/5 w-full h-full flex flex-col">
        {/* fixed image height per breakpoint so it no longer scales with text content */}
        <div className="h-[210px] sm:h-[235px] md:h-[222px] shrink-0 relative overflow-hidden">
          <img src={Img} alt={Title} className="w-full h-[222px] h-[210px] sm:h-[235px] object-cover" />
          <div className="bg-jci-blue text-white px-1.5 py-1 md:px-2 font-roboto font-bold flex flex-col justify-center items-center absolute top-0 right-2">
            <h1 className="text-[18px] md:text-[22px]">{Day}</h1>
            <h2 className="text-[10px] md:text-[11px] -mt-2">{Month}</h2>
          </div>
          <div className="px-3 md:px-4 py-0.5 bg-jci-yellow text-[7px] md:text-[8px] text-jci-black font-extrabold font-roboto text-center absolute bottom-0.5 left-0"> {Type}</div>
        </div>
        <div className="flex flex-col flex-1 min-h-0 bg-jci-white p-1 md:p-3 font-poppins text-[#313131]">
          <h1 className="text-[12px] md:text-[14px] font-bold truncate">{Title}</h1>
          <p className="text-[8px] md:text-[9px] font-normal text-justify">{Content}</p>
        </div>
      </div>
    </div>
  )
}

export default EventCard