const MemberCard = ({ Img, Name, Role }) => {
  const initials = Name?.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("")

  return (
    <div className='flex flex-col items-center text-center gap-2 w-[150px]'>
      <div className='h-24 w-24 rounded-full bg-jci-blue/10 border border-jci-blue/20 flex items-center justify-center overflow-hidden'>
        {Img ? (
          <img src={Img} alt={Name} className='h-full w-full object-cover' />
        ) : (
          <span className='text-jci-blue font-roboto font-bold text-[20px]'>{initials}</span>
        )}
      </div>
      <h3 className='font-roboto font-bold text-[13px] text-jci-black'>{Name}</h3>
      <p className='text-[11px] text-jci-blue font-medium uppercase'>{Role}</p>
    </div>
  )
}

export default MemberCard
