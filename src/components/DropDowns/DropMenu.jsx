import Button from "@mui/material/Button";
import { FiLogOut } from "react-icons/fi";
import "./userDrop.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const DropMenu = () => {
  const { logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={handleLogout}
      >
        <FiLogOut className="search-toggle" />
      </Button>
    </div>
  );
};

export default DropMenu;
