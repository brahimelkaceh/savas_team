import Topbar from "../../components/Topbar";
import Header from "./Header";
import DataTable from "./table/DataTable";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
function Modification() {
  const [loading, setLoading] = useState(false);
  const [isReform, setIsReform] = useState(false);
  return (
    <>
      <main className="page">
        {/* <Topbar /> */}
        <Navbar />

        <div className="modification-container">
          <Header dataLoading={loading} setIsReform={setIsReform} />
          <DataTable
            loading={loading}
            setLoading={setLoading}
            isReform={isReform}
          />
        </div>
      </main>
    </>
  );
}
// the price of the progress is pain

export default Modification;
