import { IoLogoLinkedin, IoMail } from "react-icons/io5";
import { RiInstagramFill, RiFacebookCircleFill } from "react-icons/ri";

const SocialIconsRow = ({ TextColor }) => {
  return (
    <div className={`flex flex-row gap-2 justify-center text-xl ${TextColor ? TextColor : "text-jci-white"}`}>
      <a href="mailto:example@example.com" className="hover:text-jci-yellow hover:scale-110 hover:-translate-y-2  transition-transform duration-300">
        <IoMail />
      </a>
      <a href="https://www.facebook.com" className="hover:text-jci-yellow hover:scale-110 hover:-translate-y-2  transition-transform duration-300">
        <RiFacebookCircleFill />
      </a>
      <a href="https://www.instagram.com" className="hover:text-jci-yellow hover:scale-110  hover:-translate-y-2  transition-transform duration-300">
        <RiInstagramFill />
      </a>
      <a href="https://www.linkedin.com" className="hover:text-jci-yellow hover:scale-110 hover:-translate-y-2  transition-transform duration-300">
        <IoLogoLinkedin />
      </a>
    </div>
  )
}

export default SocialIconsRow
