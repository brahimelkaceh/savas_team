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
  Typography
} from '@mui/material';
import React, { forwardRef, useState } from 'react';
import ConsommationChart from './charts/ConsommationChart';
const params = [
  { id: 0, label: 'Eau consommée (ml/j)' },
  { id: 1, label: 'Aliment consommé (g/j)' },
  { id: 2, label: '∑ Aliment consommé (kg)' },
  { id: 3, label: 'Ratio (Eau/Alt)' }
];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Consommation = ({ data, onClose, open }) => {
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

        <Divider variant="middle" />
        <DialogContent>
          <ConsommationChart data={data} param={param} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Consommation;
