import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Typography
} from '@mui/material';
import React, { forwardRef, useState } from 'react';
import Slide from '@mui/material/Slide';
import HomogPcChart from '../../charts/HomogPcChart';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HomogPcModal = ({ id, data, setOpen, open }) => {
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={open}
        onClose={() => setOpen(false)}
        fullScreen
        TransitionComponent={Transition}
        transitionDuration={350}
        keepMounted={true}
      >
        <AppBar color="primary" sx={{ position: 'relative', marginBottom: 2 }}>
          <Toolbar>
            <Typography variant="caption">{data.lot}</Typography>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Poids corporel & Homogénéité
            </Typography>
            <Button autoFocus color="inherit" onClick={() => setOpen(false)}>
              fermer
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <HomogPcChart code={data} i={id} show={open} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HomogPcModal;
