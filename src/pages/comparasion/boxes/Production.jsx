import React, { useState } from "react";
import { useMemo } from "react";
import UseFetchData from "../../../hooks/UseFetchData";
import ProductionChart from "../charts/ProductionChart";
import Loader from "../../../components/loader/Loader";
import {
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ProductionModal from "../modals/ProductionModal";
import { Fullscreen } from "@mui/icons-material";

const Production = ({ data }) => {
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
            <ProductionModal
              code={code}
              i={index}
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
                  Production œufs
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
                <ProductionChart show={false} code={code} i={index} />
              </div>
            </Card>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default Production;
