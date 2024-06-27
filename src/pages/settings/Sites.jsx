import Topbar from "../../components/Topbar";
import "./settings.css";
import Navbar from "../../components/navbar/Navbar";
import SitesContainer from "./sitesManage/Sites";

const Sites = () => {
  return (
    <>
      <main className="page">
        {/* <Topbar /> */}
        <Navbar />
        <div className="settings-container">
          <SitesContainer />
        </div>
      </main>
    </>
  );
};

export default Sites;
