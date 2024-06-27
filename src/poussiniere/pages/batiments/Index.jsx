import { useMemo } from "react";
import { useSelector } from "react-redux";
import UseFetchData from "../../../hooks/UseFetchData";
import BatimentsContainer from "./sections/BatimentsContainer";
import Navbar from "../../components/navbar/Navbar";

let base_url = "https://farmdriver.savas.ma/api/";

const Batiments = () => {
  const status = useSelector((state) => state.toggleLeftBar.status);

  const apiUrl = useMemo(() => `${base_url}get-pouss-sites/`, [base_url]);

  const { data } = UseFetchData(apiUrl);

  return (
    <>
      <main className={status === true ? "page page-with-sidebar " : "page"}>
        {/* <Topbar /> */}
        <Navbar />

        <div className="settings-container">
          {/* <Bats siteName={data} /> */}
          <BatimentsContainer siteName={data} />
        </div>
      </main>
    </>
  );
};

export default Batiments;
