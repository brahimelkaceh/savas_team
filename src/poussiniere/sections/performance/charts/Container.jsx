// material-ui
import { Card, Grid, Typography } from "@mui/material";

// project import
import { useState } from "react";
import ConsommationContainer from "../charts/chart-container/consommation/Container";
import HomogPvContainer from "../charts/chart-container/homogeneite/Container";
import IcContainer from "../charts/chart-container/ic/Container";
import LightContainer from "../charts/chart-container/light/Container";
import MortaliteContainer from "../charts/chart-container/mortalite/Container";
import TemperatureContainer from "../charts/chart-container/temperature/container";
import ChartSelectHeader from "../charts/header";

// ==============================|| SAMPLE PAGE ||============================== //

const Container = () => {
  const [chartName, setChartName] = useState([]);
  const [lotId, setLotId] = useState("");
  const [title, setTitle] = useState("");
  const checkboxItems = {
    "Poids corporel & Homogénéité": {
      id: "1",
      name: "Poids corporel & Homogénéité",
      component: <HomogPvContainer title={title} id={lotId} />,
    },
    Temperature: {
      id: "2",
      name: "Temperature",
      component: <TemperatureContainer title={title} id={lotId} />,
    },
    "Lumiére & Intensité": {
      id: "3",
      name: "Lumiére & Intensité",
      component: <LightContainer title={title} id={lotId} />,
    },
    Mortalité: {
      id: "4",
      name: "Mortalité",
      component: <MortaliteContainer title={title} id={lotId} />,
    },
    Consommation: {
      id: "5",
      name: "Consommation",
      component: <ConsommationContainer title={title} id={lotId} />,
    },
    "Indice de conversion": {
      id: "6",
      name: "Indice de conversion",
      component: <IcContainer title={title} id={lotId} />,
    },
  };

  const displaySelectedItems = () => {
    return chartName.map((itemName) => (
      <Grid xs={12} md={6} lg={4} item key={itemName}>
        {checkboxItems[itemName]?.component}
      </Grid>
    ));
  };
  return (
    <Grid container spacing={2} p={1}>
      <Grid item xs={12}>
        <Card>
          <ChartSelectHeader
            setLotId={setLotId}
            lotId={lotId}
            setTitle={setTitle}
            chartName={chartName}
            setChartName={setChartName}
            checkboxItems={checkboxItems}
          />
        </Card>
      </Grid>
      {chartName?.length > 0 ? displaySelectedItems() : <p></p>}
    </Grid>
  );
};

export default Container;
