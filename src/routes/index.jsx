import { Route,Routes } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import AcceuilPage from "../pages/public/AcceuilPage";

const AppRoutes = () => {
  return (
    <Routes>
        {/*when no user is connected */}
        <Route element={<PublicLayout/>}>
            <Route path="/" element={<AcceuilPage/>}/>

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