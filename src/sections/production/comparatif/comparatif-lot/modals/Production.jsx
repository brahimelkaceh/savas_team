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
import ProductionChart from './charts/ProductionChart';

const params = [
  { id: 0, label: 'Ponte (%)' },
  { id: 1, label: '∑ NOPPD' },
  { id: 2, label: 'PMO (g)' },
  { id: 3, label: 'Blancs' },
  { id: 4, label: 'Declassés' }
];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Production = ({ data, onClose, open }) => {
  const [param, setParam] = useState(0);

  const handleChange = (event) => {
    setParam(event.target.value);
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={'xl'}
        open={open}
        onClose={onClose}
        fullScreen
        TransitionComponent={Transition}
        transitionDuration={350}
        keepMounted={true}
      >
        <AppBar color="default" sx={{ position: 'relative', marginBottom: 2 }}>
          <Toolbar>
            <FormControl
              color="info"
              fullWidth
              xs={{
                m: 1,
                maxWidth: '50%',
                background: '#fff'
              }}
            >
              <InputLabel id="demo-simple-select-label">Sélectionnez un Paramétre</InputLabel>
              <Select
                xs={{
                  m: 1,
                  maxWidth: '50%',
                  background: '#fff'
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={param}
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
            <Box width={'100%'}></Box>
            <Button autoFocus color="inherit" onClick={onClose}>
              fermer
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <ProductionChart data={data} param={param} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Production;
