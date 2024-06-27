import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  SvgIcon,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import GlobalChart from "./charts/GlobalChart";
import { Close } from "@mui/icons-material";
import Slide from "@mui/material/Slide";

const params = [
  { id: 0, label: "Ponte (%)" },
  { id: 1, label: "∑ NOPPD" },
  { id: 2, label: "PMO (g)" },
  { id: 3, label: "Blancs" },
  { id: 4, label: "Declassés" },
];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProdContainer = ({ data, onClose, open }) => {
  const [param, setParam] = useState(0);

  const handleChange = (event) => {
    setParam(event.target.value);
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"xl"}
        open={open}
        onClose={onClose}
        fullScreen
        TransitionComponent={Transition}
        transitionDuration={350}
        keepMounted={true}
      >
        <AppBar
          color="transparent"
          sx={{ position: "relative", boxShadow: "none" }}
        >
          <Toolbar>
            <FormControl
              color="primary"
              fullWidth
              xs={{
                m: 1,
                maxWidth: "50%",
                color: "#fff",
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Sélectionnez un Paramétre
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={param}
                label="Sélectionnez une courbe"
                onChange={handleChange}
                fullWidth
              >
                {params?.map((param) => (
                  <MenuItem key={param.id} value={param.id}>
                    {param.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box width={"100%"}></Box>

            {/* <Typography variant="caption"> {code.lot}</Typography> */}

            <Button
              autoFocus
              color="error"
              variant="outlined"
              onClick={onClose}
            >
              fermer
            </Button>
          </Toolbar>
        </AppBar>
        <Divider variant="middle" />

        <DialogContent>
          <GlobalChart data={data} param={param} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProdContainer;
