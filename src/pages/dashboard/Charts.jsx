import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import BarCharts2 from "../../components/charts/BarCharts2";
import LineCharts2 from "../../components/charts/LineCharts2";
import ComposedCharts from "../../components/charts/ComposedCharts";
import LinearChart from "../../components/charts/LinearChart";
import BarCharts from "../../components/charts/BarCharts";

import { useState } from "react";

function Charts() {
  const [box1, setBox1] = useState(false);
  const [box2, setBox2] = useState(false);
  const [box3, setBox3] = useState(false);
  const [box4, setBox4] = useState(false);
  const [box5, setBox5] = useState(false);

  return (
    <div className="box-container">
      <div className="first-row">
        <div className={box1 ? "box-1 zoom-box " : "box-1 "}>
          <button className="btn-icon" onClick={() => setBox1(!box1)}>
            {box1 ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
          </button>
          <LinearChart />
        </div>
        <div className={box2 ? "box-2 zoom-box " : "box-2 "}>
          <button className="btn-icon" onClick={() => setBox2(!box2)}>
            {box2 ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
          </button>
          <BarCharts />
        </div>
        <div className={box3 ? "box-3 zoom-box " : "box-3 "}>
          <button className="btn-icon" onClick={() => setBox3(!box3)}>
            {box3 ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
          </button>
          <BarCharts2 />
        </div>
      </div>
      <div className="second-row">
        <div className={box4 ? "box-4 zoom-box" : "box-4 "}>
          <button className="btn-icon" onClick={() => setBox4(!box4)}>
            {box4 ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
          </button>
          <LineCharts2 />
        </div>
        <div className={box5 ? "box-5 zoom-box" : "box-5 "}>
          <button className="btn-icon" onClick={() => setBox5(!box5)}>
            {box5 ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
          </button>
          <ComposedCharts />
        </div>
      </div>
    </div>
  );
}

export default Charts;
