import { BsArrowDownSquare, BsArrowUpSquare } from "react-icons/bs";
import { CiWheat } from "react-icons/ci";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
function Consommation({ formik, open }) {
  const [isOpen, setIsOpen] = useState(open ? open : false);
  // ! open close the boxes
  const toggleBox = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <Accordion
      sx={{
        p: 1,
      }}
      defaultExpanded
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          background: "#61bc84",
          color: "#1e1e1e",
          p: 1,
          mb: 1,
          fontWeight: "bold",
          borderRadius: 1,
        }}
      >
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <CiWheat fontSize={25} /> Consommation
        </Stack>
      </AccordionSummary>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {/* Aliment distribué */}
          <TextField
            fullWidth
            label="Aliment consommé (Kg)"
            name="alimentDist"
            size="small"
            autoComplete="off"
            value={formik.values.alimentDist}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.alimentDist && Boolean(formik.errors.alimentDist)
            }
            helperText={formik.touched.alimentDist && formik.errors.alimentDist}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Eau Distribué */}
          <TextField
            fullWidth
            label="Eau consommée (Litre)"
            name="eauDist"
            size="small"
            autoComplete="off"
            value={formik.values.eauDist}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.eauDist && Boolean(formik.errors.eauDist)}
            helperText={formik.touched.eauDist && formik.errors.eauDist}
          />
        </Grid>
        <Grid item xs={12}>
          {/* Formule en place */}
          <TextField
            fullWidth
            label="Référence d'aliment"
            name="formule"
            size="small"
            autoComplete="off"
            value={formik.values.formule}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.formule && Boolean(formik.errors.formule)}
            helperText={formik.touched.formule && formik.errors.formule}
          />
        </Grid>
      </Grid>
    </Accordion>
  );
}

export default Consommation;
