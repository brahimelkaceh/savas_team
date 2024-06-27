import PlaceIcon from "@mui/icons-material/Place";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { MdErrorOutline } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { TbTemperatureCelsius } from "react-icons/tb";
import { Chip } from "@mui/material";
const ThirdCard = ({ data }) => {
  return (
    <div className="slider-card">
      <div className="card-1__header">
        <div className="site-last-update">
          <p className="site-local">
            <PlaceIcon fontSize="10px"></PlaceIcon>{" "}
            <span>{data.placeName}</span>
          </p>
          <span>
            MAJ:{" "}
            {data?.lastUpdate && (
              <Chip
                label={data?.lastUpdate}
                sx={{
                  height: "15px",
                  fontWeight: "regular",
                  backgroundColor: "#DEECFF",
                  color: "var(--dark-blue)",
                }}
              ></Chip>
            )}
          </span>
        </div>{" "}
      </div>
      <div className="card-item-footer">
        <div className="card-item-footer-details">
          Effictif present:
          <span> {data?.effectifPresent ? data?.effectifPresent : "--"}</span>
        </div>

        <div className="card-item-footer-details">
          Age moyen: <span>{data?.ageMoy ? data?.ageMoy : "--"}</span>
        </div>
        <div className="card-item-footer-details">
          Production: <span>{data?.prodJour ? data?.prodJour : "--"}</span>
        </div>
      </div>
      <div className="card-item-msg">
        {data?.siteIsGood ? (
          <MdCheckCircle style={{ color: "green" }} />
        ) : (
          <MdErrorOutline style={{ color: "red" }} />
        )}
        <span
          style={{
            color: data?.siteIsGood ? "green" : "red",
            fontSize: "9px",
          }}
        >
          {data?.statusMsg ? data?.statusMsg : "--"}
        </span>
      </div>
    </div>
  );
};

export default ThirdCard;
