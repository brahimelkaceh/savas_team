import React, { useState } from "react";
import MortaliteChart from "../charts/MortaliteChart";
import {
  Card,
  Grid,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Fullscreen } from "@mui/icons-material";
import MortaliteModal from "../modals/MortaliteModal";
const Mortalite = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 2 }}
      columns={{ xs: 3, sm: 8, md: 12 }}
    >
      {data?.map((code, i) => (
        <Grid item xs={12} sm={4} md={4} key={i}>
          {open ? (
            <MortaliteModal code={code} i={i} open={open} setOpen={setOpen} />
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
                  Mortalité{" "}
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
                <MortaliteChart show={false} code={code} i={i} />
              </div>
            </Card>
          )}
        </Grid>
        // <div
        //   key={i}
        //   style={{
        //     background: "#fff",
        //     width: `${100 / 3 - 1}%`,
        //     height: "300px",
        //     color: "white",
        //     margin: " 5px",
        //     borderRadius: "var(--border-radius)",
        //     boxShadow: "var(--box-shadow)",
        //   }}
        // >
        // </div>
      ))}
    </Grid>
  );
};

export default Mortalite;
