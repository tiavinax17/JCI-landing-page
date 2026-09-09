const LocalOrgCard = ({ Logo, Name }) => {
  return (
    <div className='flex flex-col items-center text-center gap-2 w-[130px]'>
      <div className='h-20 w-20 rounded-full bg-jci-yellow/10 border border-jci-yellow/30 flex items-center justify-center overflow-hidden'>
        {Logo ? (
          <img src={Logo} alt={Name} className='h-full w-full object-cover' />
        ) : (
          <span className='text-jci-yellow font-roboto font-black text-[16px]'>JCI</span>
        )}
      </div>
      <p className='font-roboto font-bold text-[12px] text-jci-black'>{Name}</p>
    </div>
  )
}

export default LocalOrgCard
