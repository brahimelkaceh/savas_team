import React, { useMemo } from 'react';
import Chart from './Chart';
import '../../style.css';
import { Box } from '@mui/system';

const Body = ({ data, paramId }) => {
  const memoizedChart = useMemo(() => {
    if (paramId.length > 0) {
      return <Chart data={data} paramId={paramId} />;
    }
    // Return null if paramId is empty
    return null;
  }, [paramId, data]);
  return (
    <Box
      sx={{
        height: '80vh'
      }}
    >
      {memoizedChart}
    </Box>
  );
};

export default Body;
