import React, { useState } from "react";
import MasseChart from "../charts/MasseChart";
import {
  Card,
  Grid,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Fullscreen } from "@mui/icons-material";
import MasseModal from "../modals/MasseModal";
const Masse = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 2 }}
      columns={{ xs: 3, sm: 8, md: 12 }}
    >
      {data.map((code, index) => (
        <Grid item xs={12} sm={4} md={4} key={index}>
          {open ? (
            <MasseModal code={code} i={index} open={open} setOpen={setOpen} />
          ) : (
            <Card>
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                pl={1}
              >
                <Typography color="error" variant="caption">
                  {code.lot}
                </Typography>
                <Typography color="primary" variant="body2">
                  Masse d'Oeuf
                </Typography>
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => setOpen(true)}
                >
                  <SvgIcon>
                    <Fullscreen />
                  </SvgIcon>
                </IconButton>
              </Stack>
              <div
                style={{
                  background: "#fff",
                  height: "40vh",
                  color: "white",
                  margin: " 5px",
                }}
              >
                <MasseChart show={false} code={code} i={index} />
              </div>
            </Card>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default Masse;
