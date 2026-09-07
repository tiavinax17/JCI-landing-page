import { NavLink } from 'react-router'

const tabs = [
  { label: "HISTORIQUE", path: "/jci-madagascar/historique" },
  { label: "NOS VALEURS", path: "/jci-madagascar/valeurs" },
  { label: "BUREAU NATIONAL 2026", path: "/jci-madagascar/bureau-national" },
  { label: "NOS PROGRAMMES", path: "/jci-madagascar/programmes" },
  { label: "JCI IN BUSINESS", path: "/jci-madagascar/business" },
  { label: "JCI RISE", path: "/jci-madagascar/rise" },
  { label: "SÉNAT", path: "/jci-madagascar/senat" },
]

const SubNav = () => {
  return (
    <div className='w-full flex flex-row flex-wrap gap-x-8 gap-y-3 justify-center items-center py-6 px-4 font-roboto font-bold text-[12px] border-b border-black/10'>
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) => isActive ? "text-jci-yellow" : "text-jci-black"}
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  )
}

export default SubNav
