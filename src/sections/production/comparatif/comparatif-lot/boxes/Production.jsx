import React, { useState } from 'react';
import { Card, Divider, Grid, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import { Fullscreen } from '@mui/icons-material';
import MortChart from '../charts/mortChart';
import ProductionChart from '../charts/ProductionChart';
import ProductionModal from './modals/Production';
const Production = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [chartData, setData] = useState([]);
  if (open) {
    return <ProductionModal id={id} data={chartData} open={open} setOpen={setOpen} />;
  }
  return (
    <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 3, sm: 8, md: 12 }}>
      {data?.map((code, i) => (
        <Grid item sm={12} md={4} key={i}>
          <Card>
            <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} pl={1}>
              <Typography color="error" variant="caption">
                {code.lot}
              </Typography>
              <Typography color="primary" variant="body2">
                Production{' '}
              </Typography>
              <IconButton
                color="primary"
                size="small"
                onClick={() => {
                  setOpen(true);
                  setId(i);
                  setData(code);
                }}
              >
                <SvgIcon>
                  <Fullscreen />
                </SvgIcon>
              </IconButton>
            </Stack>
            <Divider />
            <div
              style={{
                height: '40vh',
                color: 'white',
                margin: ' 5px'
              }}
            >
              <ProductionChart show={false} code={code} i={i} />
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Production;
