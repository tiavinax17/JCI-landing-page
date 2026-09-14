const TimelineItem = ({ Year, Name, Role }) => {
  return (
    <div className='flex flex-col items-center text-center gap-2 min-w-[160px]'>
      <span className='text-jci-yellow font-roboto font-bold text-[13px]'>{Year}</span>
      <div className='h-2 w-2 rounded-full bg-jci-blue'></div>
      <h3 className='font-roboto font-bold text-[13px] text-jci-black'>{Name}</h3>
      <p className='text-[11px] text-jci-blue font-medium'>{Role}</p>
    </div>
  )
}

export default TimelineItem
