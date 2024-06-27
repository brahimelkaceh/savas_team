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
  Slide,
  Stack,
  SvgIcon,
  Toolbar,
} from "@mui/material";
import React, { forwardRef, useState } from "react";

import MassChart from "./charts/MassChart";
import { Close } from "@mui/icons-material";
const params = [
  { id: 0, label: "Masse d'oeuf hebdomadaire (g)" },
  { id: 1, label: "∑ Masse Oeuf (kg)" },
];
const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  height: "80%",
  boxShadow: 24,
  pb: 4,
  p: 1,
  zIndex: 10000,
};
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const MasseContainer = ({ data, onClose, open }) => {
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
                label="Sélectionnez un Paramétre"
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
        <Divider variant="middle"></Divider>
        <DialogContent>
          <MassChart data={data} param={param} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MasseContainer;
