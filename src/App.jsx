import Login from "./components/login/Login";
import Register from "./pages/registration/Register";
// import Report from "./pages/Report";
import Report from "./pages/reports/Report";
import Visualize from "./pages/senthyse/Visualize";
import Settings from "./pages/settings/Settings";
import Error from "./pages/Error";
import Modification from "./pages/modification/Modification";
import Dashboard from "./pages/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import "./styles/animations.css";
import PrivateRoutes from "./components/utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import { LotProvider } from "./pages/senthyse/context/LotContext";
import Charts from "./pages/charts/Charts";
import Souches from "./pages/souches/Souches";
import Help from "./pages/help/Help";
import AddGuide from "./pages/souches/AddGuide";
import Users from "./pages/settings/Users";
import Sites from "./pages/settings/Sites";
import Container from "./pages/dashboard/Container";
import Comparatif from "./pages/comparasion/Container";
import Parametre from "./pages/comparasion/Features/Container";
import Poussinere from "./poussiniere/Poussinere";
import CreateRepport from "./poussiniere/pages/CreateRepport";
import Performance from "./poussiniere/pages/Performance";
import Prophylaxie from "./poussiniere/pages/prophylaxie/Prophylaxie";
import PerformanceCharts from "./poussiniere/pages/performance-charts/index";
import LotsPouss from "./poussiniere/pages/lots/Index";
import Guides from "./poussiniere/pages/guides/Index";
import PoussSites from "./poussiniere/pages/sites/Index";
import Batiments from "./poussiniere/pages/batiments/Index";
import Lots from "./pages/lots/Index";
let base_url = "https://farmdriver.savas.ma/api/";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes />}>
          <Route exact path="/" element={<Container />} />
          <Route path="/report" element={<Report />} />
          <Route
            path="/visualize"
            element={
              <LotProvider>
                <Visualize />
              </LotProvider>
            }
          />

          <Route path="/bâtiments" element={<Settings />} />
          <Route path="/souches" element={<Souches />} />
          <Route path="/souches/ajouter-guide" element={<AddGuide />} />
          <Route path="/help" element={<Help />} />
          <Route path="/lots" element={<Lots />} />
          <Route path="/utilisateurs" element={<Users />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/comparatif" element={<Comparatif />} />
          <Route path="/comparatif/paramétre" element={<Parametre />} />
          <Route
            path="/modification"
            element={<Modification base_url={base_url} />}
          />
          <Route path="/charts" element={<Charts />} />
          <Route path="/poussiniere" element={<Poussinere />} exact />
          <Route
            path="/poussinier/saisie-donnees"
            element={<CreateRepport />}
            exact
          />
          <Route
            path="/poussinier/performances-chiffres"
            element={<Performance />}
            exact
          />
          <Route
            path="/poussinier/performances-courbes"
            element={<PerformanceCharts />}
            exact
          />
          <Route
            path="/poussinier/prophylaxie"
            element={<Prophylaxie />}
            exact
          />
          <Route path="/poussinier/lots" element={<LotsPouss />} exact />
          <Route path="/poussinier/souches" element={<Guides />} exact />
          <Route path="/poussinier/sites" element={<PoussSites />} exact />
          <Route path="/poussinier/bâtiments" element={<Batiments />} exact />

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
