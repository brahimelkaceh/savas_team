import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import egg70 from "../../assets/70.png";
import egg80 from "../../assets/80.png";
import egg90 from "../../assets/90.png";
import egg100 from "../../assets/100.png";
import egg110 from "../../assets/110.png";
import noImg from "../../assets/no-img.png";

const ImgHoverPropper = ({ data }) => {
  // console.log(data);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  let egg = noImg;

  switch (parseInt(data)) {
    case 70:
      egg = egg70;
      break;
    case 80:
      egg = egg80;
      break;
    case 90:
      egg = egg90;
      break;
    case 100:
      egg = egg100;
      break;
    case 110:
      egg = egg110;
      break;

    default:
      break;
  }

  return (
    <div>
      <div
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        style={{
          color: " blue",
          textDecoration: " underline ",
        }}
      >
        {data ? data : "-"}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <img sx={{ p: 1 }} src={egg} alt={data} />
      </Popover>
    </div>
  );
};

export default ImgHoverPropper;
