const ProgramCard = ({ Title, Content, Active }) => {
  return (
    <div className={`flex flex-col gap-1 border-l-4 pl-4 py-2 ${Active ? "border-jci-yellow" : "border-jci-blue/20"}`}>
      <h3 className='font-roboto font-bold text-[14px] text-jci-black'>{Title}</h3>
      {Content && <p className='text-[12px] text-jci-black/70'>{Content}</p>}
    </div>
  )
}

export default ProgramCard
