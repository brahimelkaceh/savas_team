import Navbar from "../../components/navbar/Navbar";
import SitesContainer from "./sections/SitesContainer";

const PoussSites = () => {
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

export default PoussSites;
