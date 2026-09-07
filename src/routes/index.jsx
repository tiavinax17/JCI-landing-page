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

const AppRoutes = () => {
  return (
    <Routes>
        {/*when no user is connected */}
        <Route element={<PublicLayout/>}>
            <Route path="/" element={<AcceuilPage/>}/>
            <Route path="/jci-madagascar/historique" element={<HistoriquePage/>}/>
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
        {/* <Route element={<BackOfficeLayout/>}>
             <Route path="/admin/services" element={<ServicesPages/>}/>
             <Route path="/admin/services/:state" element={<EditServices/>}/>
             <Route path="/admin/services/services-details" element={<ServiceDetailsPages/>}/>
             <Route path="/admin/services/services-details/:state/:id" element={<EditServiceDetails/>}/>
             <Route path="/admin/parametres" element={<SettingsPages/>}/>
             <Route path="/admin/emplois" element={<JobPages/>}/>
             <Route path="/admin/emplois/:state" element={<EditJob/>}/>
             <Route path="*" element={<NotFound/>}/>
        </Route> */}

    </Routes>
  )
}

export default AppRoutes