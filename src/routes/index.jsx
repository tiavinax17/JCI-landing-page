import { Route,Routes } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import AcceuilPage from "../pages/public/AcceuilPage";
import HistoriquePage from "../pages/public/HistoriquePage";
import ValeursPage from "../pages/public/ValeursPage";
import BureauNationalPage from "../pages/public/BureauNationalPage";
import ProgrammesPage from "../pages/public/ProgrammesPage";
import SenatPage from "../pages/public/SenatPage";
import OrganisationsLocalesPage from "../pages/public/OrganisationsLocalesPage";
import ZonePage from "../pages/public/ZonePage";
import BlogPage from "../pages/public/BlogPage";
import PartenairesPage from "../pages/public/PartenairesPage";
import ContactPage from "../pages/public/ContactPage";
import NotFoundPage from "../pages/public/NotFoundPage";
import LoginPage from "../pages/public/LoginPage";
import RoleRoute from "./RoleRoute";
import AdminLayout from "../layouts/AdminLayout";
import UserManager from "../pages/admin/UserManager";
import EventsManager from "../pages/admin/EventsManager";
import PastPresidentManager from "../pages/admin/PastPresidentManager";
import BnManager from "../pages/admin/BnManager";
import ZonesManager from "../pages/admin/ZonesManager";
import ZonesDetailsManager from "../pages/admin/ZonesDetailsManager";
import OLDetainsManager from './../pages/admin/OLDetainsManager';



const AppRoutes = () => {
  return (
    <Routes>
        {/*when no user is connected */}
        <Route element={<PublicLayout/>}>
            <Route path="/" element={<AcceuilPage/>}/>
            <Route path="/connexion" element={<LoginPage/>}/>
            <Route path="/jci-madagascar" element={<HistoriquePage/>}/>
            <Route path="/jci-madagascar/valeurs" element={<ValeursPage/>}/>
            <Route path="/jci-madagascar/bureau-national" element={<BureauNationalPage/>}/>
            <Route path="/jci-madagascar/programmes" element={<ProgrammesPage/>}/>
            <Route path="/jci-madagascar/senat" element={<SenatPage/>}/>
            <Route path="/organisations-locales" element={<OrganisationsLocalesPage/>}/>
            <Route path="/organisations-locales/:zone" element={<ZonePage/>}/>
            <Route path="/blog" element={<BlogPage/>}/>
            <Route path="/partenaires" element={<PartenairesPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Route>

        {/*when user is connected*/}
        <Route element={<AdminLayout/>}>
          {/* Routes ADMIN_NATIONAL */}
          <Route element={<RoleRoute allowedRoles={["ADMIN_NATIONAL","SUPER_ADMIN"]} />}>
            <Route path="/admin" element={<UserManager />} />
            <Route path="/admin/evenements" element={<EventsManager />} />
            <Route path="/admin/past-president" element={<PastPresidentManager />} />
            <Route path="/admin/bureau-national" element={<BnManager />} />
            <Route path="/admin/zones" element={<ZonesManager />} />
            <Route path="/admin/zones/:zone" element={<ZonesDetailsManager />} />
            <Route path="/admin/zones/organisations-locale/:zone/:olId" element={<OLDetainsManager />} />
          </Route>

          {/* Routes ADMIN_LOCAL */}
          <Route element={<RoleRoute allowedRoles={["ADMIN_LOCAL"]} />}>
            {/* <Route path="local" element={<LocalDashboard />} />
            <Route path="membres" element={<MembersPage />} /> */}
          </Route>
        </Route>

    </Routes>
  )
}

export default AppRoutes