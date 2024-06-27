import React, { useState } from "react";
import HomogPcChart from "../charts/HomogPcChart";
import {
  Card,
  Grid,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Fullscreen } from "@mui/icons-material";
import HomogPCModal from "../modals/HomogPcModal";
const HomogPc = ({ data }) => {
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
            <HomogPCModal code={code} i={index} open={open} setOpen={setOpen} />
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
                  Poids corporel & Homogénéité
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
                <HomogPcChart show={false} code={code} i={index} />
              </div>
            </Card>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default HomogPc;
