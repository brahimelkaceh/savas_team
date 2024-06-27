import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { MdPictureAsPdf } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";

function ExportBtn() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="export-btn">
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Télecharger
      </Button>
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
        <Typography
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            fontWeight: "bold",
          }}
        >
          PDF
          <MdPictureAsPdf
            style={{
              marginLeft: "4px",
              color: "#b91c1c",
              fontSize: "30px",
            }}
          />
        </Typography>
        <Typography
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            fontWeight: "bold",
          }}
        >
          EXCEL
          <RiFileExcel2Fill
            style={{
              marginLeft: "4px",
              color: "green",
              fontSize: "30px",
            }}
          />
        </Typography>
      </Popover>
    </div>
  );
}

export default ExportBtn;
