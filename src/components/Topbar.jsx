import logo from "../assets/004.png";
import "../styles/topbar.css";

import DropMenu from "./DropDowns/DropMenu";

const Topbar = () => {
  return (
    <div className="top-bar">
      <div
        style={{
          "borderRadius": "50%",
          "width": "40px",
          "height": "40px",
          "background": "#fff",
          "display": "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="Savas-logo" className="logo" />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <DropMenu />
      </div>
    </div>
  );
};
export default Topbar;
