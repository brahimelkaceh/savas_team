import React, { useState } from "react";
import ChartOptions from "./ChartOptions";
import AltChartContainer from "./charts/AltChartContainer";
import ProductionContainer from "./charts/ProductionContainer";
import ConsomationChart from "./charts/ConsomationChart";
import HomogPvContainer from "./charts/HomogPvContainer";
import MortaliteContainer from "./charts/MortaliteContainer";
import MasseContainer from "./charts/MasseContainer";
import Header from "./Header";
import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";

const Container = () => {
  const [personName, setPersonName] = useState([]);
  const [lotId, setLotId] = useState("");
  const [title, setTitle] = useState("");

  const checkboxItems = {
    Production: {
      id: "1",
      name: "Production",
      component: <ProductionContainer title={title} id={lotId} />,
    },
    " Aliment/Oeuf": {
      id: "2",
      name: "Aliment/Oeuf",
      component: <AltChartContainer title={title} id={lotId} />,
    },
    Consommation: {
      id: "3",
      name: "Consommations",
      component: <ConsomationChart title={title} id={lotId} />,
    },
    "Poids corporel & Homogénéité": {
      id: "4",
      name: "Poids corporel & Homogénéité",
      component: <HomogPvContainer title={title} id={lotId} />,
    },
    "Mortalité": {
      id: "5",
      name: "Mortalité",
      component: <MortaliteContainer title={title} id={lotId} />,
    },
    "Masse d'oeufs": {
      id: "6",
      name: "Masse d'oeufs",
      component: <MasseContainer title={title} id={lotId} />,
    },
  };

  const displaySelectedItems = () => {
    return personName.map((itemName) => (
      <Grid xs={12} md={6} lg={4} item key={itemName}>
        {checkboxItems[itemName]?.component}
      </Grid>
    ));
  };

  return (
    <Card
      sx={{
        m: 1,
        p: 1,
      }}
    >
      <Header
        setLotId={setLotId}
        lotId={lotId}
        setTitle={setTitle}
        personName={personName}
        setPersonName={setPersonName}
        checkboxItems={checkboxItems}
      />
      <Divider
        variant="middle"
        sx={{
          mb: 1,
        }}
      />
      <Grid container spacing={2}>
        {personName?.length > 0 ? displaySelectedItems() : <p></p>}
      </Grid>
    </Card>
  );
};

export default Container;
