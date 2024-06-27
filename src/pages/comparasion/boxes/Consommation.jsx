import React, { useState } from "react";
import ConsommationChart from "../charts/ConsommationChart";
import {
  Card,
  Grid,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Fullscreen } from "@mui/icons-material";
import ConsmmationModal from "../modals/ConsmmationModal";

const Consommation = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 2 }}
      columns={{ xs: 3, sm: 8, md: 12 }}
    >
      {data?.map((code, i) => {
        return (
          <Grid item xs={12} sm={4} md={4} key={i}>
            {open ? (
              <ConsmmationModal
                code={code}
                i={i}
                open={open}
                setOpen={setOpen}
              />
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
                    Consammation{" "}
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
                  <ConsommationChart show={false} code={code} i={i} />
                </div>
              </Card>
            )}
          </Grid>
        );
      })}
    </Grid>
  );
  return data?.map((code, i) => (
    <div
      key={i}
      style={{
        background: "#fff",
        width: `${100 / 3 - 1}%`,
        height: "300px",
        color: "white",
        margin: " 5px",
        borderRadius: "var(--border-radius)",
        boxShadow: "var(--box-shadow)",
      }}
    >
      <ConsommationChart code={code} i={i} />
    </div>
  ));
};

export default Consommation;
