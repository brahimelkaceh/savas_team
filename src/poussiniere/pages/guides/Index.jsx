import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import GuideTable from "./sections/GuideTable";
import SoucheTable from "./sections/SoucheTable";
import Navbar from "../../components/navbar/Navbar";
let base_url = "https://farmdriver.savas.ma/api/";

const Guides = () => {
  const [guideData, setGuideData] = useState();
  const [loading, setLoading] = useState(false);

  const status = useSelector((state) => state.toggleLeftBar.status);
  const isVisualize = useSelector((state) => state.openSearchBar.isVisualize);
  const dropState = useSelector((state) => state.userDrop.dropState);

  const dispatch = useDispatch();

  const GetGuideData = async (id) => {
    setLoading(true);
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    try {
      const response = await fetch(`${base_url}get-guide-data/`, {
        method: "POST",
        body: JSON.stringify({
          "guide_id": id ? id : 1,
        }),

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setGuideData(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <main className={status === true ? "page page-with-sidebar " : "page"}>
        <Navbar />
        <div className="souche-container data-pouss-lot-container">
          <div className="souche-header">
            <p className="title">Guides de normes</p>
            <Link className="add-btn" to="#">
              <MdAdd className="bell" />
            </Link>
          </div>
          <GuideTable GetGuideData={GetGuideData} />
          <SoucheTable guideData={guideData} loading={loading} />
        </div>
      </main>
    </>
  );
};

export default Guides;
