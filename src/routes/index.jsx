import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import PublicLayout from "../layouts/PublicLayout";
import RoleRoute from "./RoleRoute";
import AdminLayout from "../layouts/AdminLayout";
import AnimationLoading from '../images/LoadingLogoJCIM.gif';

const PageLoader = () => (
  <div className='bg-jci-blue flex flex-col justify-center items-center h-screen text-[20px] text-jci-white gap-3 font-poppins'>
    <img src={AnimationLoading} alt="Loading..." className='h-50 w-auto' />
  </div>
);

const AcceuilPage                  = lazy(() => import("../pages/public/AcceuilPage"));
const HistoriquePage               = lazy(() => import("../pages/public/HistoriquePage"));
const ValeursPage                  = lazy(() => import("../pages/public/ValeursPage"));
const BureauNationalPage           = lazy(() => import("../pages/public/BureauNationalPage"));
const ProgrammesPage               = lazy(() => import("../pages/public/ProgrammesPage"));
const SenatPage                    = lazy(() => import("../pages/public/SenatPage"));
const OrganisationsLocalesPage     = lazy(() => import("../pages/public/OrganisationsLocalesPage"));
const ZonePage                     = lazy(() => import("../pages/public/ZonePage"));
const BlogPage                     = lazy(() => import("../pages/public/BlogPage"));
const EventsDetails                = lazy(() => import("../pages/public/EventsDetails"));
const PartenairesPage              = lazy(() => import("../pages/public/PartenairesPage"));
const ContactPage                  = lazy(() => import("../pages/public/ContactPage"));
const NotFoundPage                 = lazy(() => import("../pages/public/NotFoundPage"));
const LoginPage                    = lazy(() => import("../pages/public/LoginPage"));
const CGUPage                      = lazy(() => import("../pages/public/CGUPage"));
const PolitiqueConfidentialitePage = lazy(() => import("../pages/public/PolitiqueConfidentialitePage"));
const ConditionsGeneralesVentePage = lazy(() => import("../pages/public/ConditionsGeneralesVentePage"));

// ─── Pages admin — JAMAIS téléchargées par un visiteur public ─────────────────
const UserManager          = lazy(() => import("../pages/admin/UserManager"));
const EventsManager        = lazy(() => import("../pages/admin/EventsManager"));
const PastPresidentManager = lazy(() => import("../pages/admin/PastPresidentManager"));
const BnManager            = lazy(() => import("../pages/admin/BnManager"));
const ZonesManager         = lazy(() => import("../pages/admin/ZonesManager"));
const ZonesDetailsManager  = lazy(() => import("../pages/admin/ZonesDetailsManager"));
const OLDetainsManager     = lazy(() => import("../pages/admin/OLDetainsManager"));
const EventsDetailsManager = lazy(() => import("../pages/admin/EventsDetailsManager"));
const Ecommerce            = lazy(() => import("../pages/admin/Ecommerce"));

// ─── Page Unauthorized — corrige la redirection cassée de RoleRoute ───────────
const UnauthorizedPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4">
    <h1 className="text-3xl font-bold">Accès refusé</h1>
    <p className="text-sm text-gray-500">Vous n'avez pas les droits pour accéder à cette page.</p>
    <a href="/" className="mt-2 px-6 py-2 bg-gray-900 text-white text-sm hover:bg-gray-700 transition">
      Retour à l'accueil
    </a>
  </div>
);


const AppRoutes = () => {
  
  return (
  <Suspense fallback={<PageLoader />}>
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
            <Route path="/blog/evenements/:eventId" element={<EventsDetails />} />
            <Route path="/partenaires" element={<PartenairesPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/conditions-generales-utilisation" element={<CGUPage />} />
            <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialitePage />} />
            <Route path="/conditions-generales-de-vente" element={<ConditionsGeneralesVentePage />}/>
        </Route>

        {/*when user is connected*/}
        <Route element={<AdminLayout/>}>
          {/* Routes ADMIN_NATIONAL */}
          <Route path="/admin/unauthorized" element={<UnauthorizedPage />} />
          <Route element={<RoleRoute allowedRoles={["ADMIN_NATIONAL","SUPER_ADMIN"]} />}>
            <Route path="/admin" element={<UserManager />} />
            <Route path="/admin/evenements/national" element={<EventsManager />} />
            <Route path="/admin/past-president" element={<PastPresidentManager />} />
            <Route path="/admin/bureau-national" element={<BnManager />} />
            <Route path="/admin/zones" element={<ZonesManager />} />
            <Route path="/admin/zones/:zone" element={<ZonesDetailsManager />} />
            <Route path="/admin/zones/:zone/organisations-locale/:olId" element={<OLDetainsManager />} />
            <Route path="/admin/zones/:zone/organisations-locale/:olId/evenements/:eventId" element={<EventsDetailsManager />} />
            <Route path="/admin/evenements/national/:eventId" element={<EventsDetailsManager />} />
            <Route path="/admin/e-commerce" element={<Ecommerce />} /> 
          </Route>

          {/* Routes ADMIN_LOCAL */}
          <Route element={<RoleRoute allowedRoles={["ADMIN_LOCAL"]} />}>
            <Route path="/admin/local/mon-organisation-locale" element={<OLDetainsManager />} /> 
            <Route path="/admin/local/mon-organisation-locale/:olId/evenements/:eventId" element={<EventsDetailsManager />} />
          </Route>
          {/* Routes ADMIN_Ecommerce*/}
          <Route element={<RoleRoute allowedRoles={["ADMIN_E_COMMERCE"]} />}>
            <Route path="/admin/e-commerce/boutique" element={<Ecommerce />} /> 
          </Route>
        </Route>
    </Routes>
  </Suspense>
  )
}

export default AppRoutes