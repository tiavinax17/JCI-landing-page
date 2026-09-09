import LabelTraitSimple from './LabelTraitSimple';


const PartnerBlock = ({ Name, Content, Reverse, Logo, ImageFond, BGColor, LabelColor, H1Color, ContentColor }) => {
  console.log(Reverse)
  return (
    <div className={`flex flex-col items-start justify-start  py-15 overflow-hidden w-full max-w-full pb-10 px-6 lg:pl-32  lg:px-35 ${BGColor ? BGColor : ""}`}>
      <div className='lg:ml-30 lg:mr-1  '>
        <div className=" flex flex-col lg:flex-row justify-between items-start w-full  md:gap-10 gap-2 lg:gap-15">
          {!Reverse ?
            <>
              <div className='flex flex-col flex-2 min-w-0'>
                <LabelTraitSimple Label="Partenaire Type" H1Text={Name} LabelColor={LabelColor} H1Color={H1Color}/>
                <p className={`lg:text-[12px] md:text-[11px] text-[11px] text-justify ${ContentColor ? ContentColor : 'text-jci-black'}`}>
                  {Content}
                </p>
              </div>
              <div className='relative min-w-0 flex flex-col flex-1 w-full bg-blue-500 items-end lg:mt-12 mt-0'>
                <img
                  src={ImageFond}
                  alt="Image de Fond Partenaire"
                  className="max-w-full max-h-full w-full h-[250px] object-cover object-center"
                />
                <div className='absolute bottom-0 right-0 rounded p-2 w-fit bg-jci-white border border-gray-400'>
                  <img src={Logo} alt="Logo" className='h-16 w-auto object-cover' />
                </div>
              </div>
            </>
            :
            <>
              <div className='relative min-w-0 flex flex-col flex-1 w-full bg-blue-500 items-end lg:mt-12 mt-0'>
                <img
                  src={ImageFond}
                  alt="Image de Fond Partenaire"
                  className="max-w-full max-h-full w-full h-[250px] object-cover object-center"
                />
                <div className='absolute bottom-0 right-0 rounded p-2 w-fit bg-jci-white border border-gray-400'>
                  <img src={Logo} alt="Logo" className='h-16 w-auto object-cover' />
                </div>
              </div>
              <div className='flex flex-col flex-2 min-w-0'>
                <LabelTraitSimple Label="Partenaire Type" H1Text={Name} LabelColor={LabelColor} H1Color={H1Color}/>
                <p className={`lg:text-[12px] md:text-[11px] text-[11px] text-justify ${ContentColor ? ContentColor : 'text-jci-black'}`}>
                  {Content}
                </p>
              </div>
            </>
          }
          
        </div>
      </div>
    </div>
  )
}

export default PartnerBlock
