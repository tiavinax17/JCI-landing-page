import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import JCILogo from "../../images/JCI/JCI Madagascar/JCI_Madagascar_background_marine_blue_name_blue_logo-removebg-preview.png"

const ContactInfoBlock = ({ Title, Address, Phone, Email, Img }) => {
  return (
    <div className=' flex flex-1 flex-col gap-2 text-[13px] px-5 pb-5 pt-15 text-jci-black/80 bg-jci-blue rounded-xl justify-between overflow-hidden'>
      {Title && <h3 className='font-poppins font-medium text-jci-white text-[20px] uppercase'>{Title}</h3>}
      <div className=' relative flex flex-col gap-1 w-full h-full bg-jci-navy/80 rounded p-2'>
        <div className="w-full flex flex-col gap-3 h-full bg-jci-dark px-5 py-10 text-jci-white font-normal text-[12px]">
          {Address && <p className="flex flex-row items-center gap-2"><span className="text-jci-yellow"><FaMapMarkerAlt size={20} /></span>{Address}</p>}
          {Phone && <a href={`tel:${Phone}`} className="flex flex-row items-center gap-2"><span className="text-jci-yellow"><BsFillTelephoneFill size={20} /></span>{Phone}</a>}
          {Email && <a href={`mailto:${Email}`} className="flex flex-row items-center gap-2"><span className="text-jci-yellow"><IoMail size={20} /></span>{Email}</a>}
        </div>
        <div className='absolute -bottom-3 right-0 overflow-hidden'>
          <img src={Img ? Img : JCILogo} alt="JCI Madagascar Logo" className="md:h-40 h-20 w-auto opacity-20" />
        </div>
      </div>
    </div>
  )
}

export default ContactInfoBlock
