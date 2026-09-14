import { NavLink } from 'react-router'

const zones = [
  { label: "TOUT", path: "/organisations-locales" },
  { label: "ZONE NORD", path: "/organisations-locales/nord" },
  { label: "ZONE CENTRE", path: "/organisations-locales/centre" },
  { label: "ZONE SUD", path: "/organisations-locales/sud" },
]

const ZoneFilterTabs = () => {
  return (
    <>
    <div className=' hidden w-fit lg:flex flex-row flex-wrap gap-x-0  gap-0 sm:gap-y-3 justify-center rounded-xl items-center  md:mx-12 lg:ml-20 lg:mr-1   font-roboto font-normal text-[10px]  md:text-[12px] lg:text-[14px] border  border-white/10'>
      {zones.map((zone) => (
        <NavLink
          key={zone.path}
          to={zone.path}
          end={zone.path === "/organisations-locales"}
          className={({ isActive }) => isActive ? "text-jci-black rounded-xl bg-jci-white py-5  lg:py-3 px-3 sm:px-5 font-semibold scale-105" : "text-jci-white/50 py-5  lg:py-3 px-3 sm:px-5 hover:scale-105 transition-transform duration-300 hover:text-jci-white/70"}
        >
          {zone.label}
        </NavLink>
      ))}
    </div>
     <div className=' lg:hidden w-fit  grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-0 sm:gap-y-3 justify-center rounded-xl items-center  md:mx-12 lg:ml-20 lg:mr-1   font-roboto font-normal text-[10px]  md:text-[14px] lg:text-[14px] lg:border  lg:border-white/10'>
      {zones.map((zone) => (
        <NavLink
          key={zone.path}
          to={zone.path}
          end={zone.path === "/organisations-locales"}
          className={({ isActive }) => isActive ? "text-jci-black rounded-xl w-fit bg-jci-white py-1  lg:py-3 px-3 sm:px-5 font-semibold" : "text-jci-white/50  py-1  lg:py-3 px-3 sm:px-5"}
        >
          {zone.label}
        </NavLink>
      ))}
    </div>
    </>
  )
}

export default ZoneFilterTabs
