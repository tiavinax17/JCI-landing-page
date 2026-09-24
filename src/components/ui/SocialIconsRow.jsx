import { IoLogoLinkedin, IoMail } from "react-icons/io5";
import { RiInstagramFill, RiFacebookCircleFill } from "react-icons/ri";
import { SiLinktree } from "react-icons/si";

const SocialIconsRow = ({ TextColor }) => {
  return (
    <div className={`flex flex-row gap-2 justify-center text-xl ${TextColor ? TextColor : "text-jci-white"}`}>
      <a href="mailto:contact@jcimada.org" className="hover:text-jci-yellow hover:scale-110 hover:-translate-y-2  transition-transform duration-300">
        <IoMail />
      </a>
      <a href="https://www.facebook.com/jcimadagascar" className="hover:text-jci-yellow hover:scale-110 hover:-translate-y-2  transition-transform duration-300">
        <RiFacebookCircleFill />
      </a>
      <a href="https://www.instagram.com/jcimadagascar?stkn=ejBqNHU1YWZseWU3" className="hover:text-jci-yellow hover:scale-110  hover:-translate-y-2  transition-transform duration-300">
        <RiInstagramFill />
      </a>
      <a href="https://www.linkedin.com/company/jcimadagascar" className="hover:text-jci-yellow hover:scale-110 hover:-translate-y-2  transition-transform duration-300">
        <IoLogoLinkedin />
      </a>
      <a href="https://linktr.ee/JCI_Madagascar" className="hover:text-jci-yellow hover:scale-110 hover:-translate-y-2  transition-transform duration-300">
        <SiLinktree />

      </a>
    </div>
  )
}

export default SocialIconsRow
