import H2 from "./H2"

const ValueCredoBlock = ({ Title, Content }) => {
  return (
    <div className='flex flex-col gap-2'>
      <H2>{Title}</H2>
      <p className='lg:text-[12px] md:text-[12px] text-[10px] font-normal font-poppins text-jci-black leading-relaxed text-justify'>{Content}</p>
    </div>
  )
}

export default ValueCredoBlock
