import "../styles/report.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/Context";
const Download = () => {
  const { openSideBar } = useGlobalContext();
  return (
    <main className={openSideBar === true ? "page page-with-sidebar " : "page"}>
      <h2>Download</h2>
      <Link to="/">Report Page</Link>
    </main>
  );
};

export default Download;
