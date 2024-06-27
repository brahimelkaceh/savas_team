import { BsArrowDownSquare, BsArrowUpSquare } from "react-icons/bs";
import { CiWheat } from "react-icons/ci";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { ExpandMore, ShoppingCartCheckout } from "@mui/icons-material";
function Reforme({ formik, open }) {
  console.log(formik.values.isKg);
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
        expandIcon={
          <ExpandMore
            sx={{
              color: "#fff",
            }}
          />
        }
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          background: "#546e7a",
          color: "#fff",
          p: 1,
          mb: 1,
          fontWeight: "bold",
          borderRadius: 1,
        }}
      >
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <ShoppingCartCheckout /> Réforme
        </Stack>
      </AccordionSummary>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Sujets normaux "
            name="hensReformed"
            size="small"
            autoComplete="off"
            value={formik.values.hensReformed}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.hensReformed && Boolean(formik.errors.hensReformed)
            }
            helperText={
              formik.touched.hensReformed && formik.errors.hensReformed
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Prix unitaire"
            name="price"
            size="small"
            autoComplete="off"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Sujets gratuits"
            name="hensReformedFree"
            size="small"
            autoComplete="off"
            value={formik.values.hensReformedFree}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.hensReformedFree &&
              Boolean(formik.errors.hensReformedFree)
            }
            helperText={
              formik.touched.hensReformedFree && formik.errors.hensReformedFree
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Sujets triage"
            name="hensReformedTriage"
            size="small"
            autoComplete="off"
            value={formik.values.hensReformedTriage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.hensReformedTriage &&
              Boolean(formik.errors.hensReformedTriage)
            }
            helperText={
              formik.touched.hensReformedTriage &&
              formik.errors.hensReformedTriage
            }
          />
        </Grid>

        <Grid xs={12}>
          <FormControlLabel
            control={
              <Switch
                name="isKg"
                checked={formik?.values?.isKg ? true : false}
                onChange={(e) => formik?.handleChange(e)}
              />
            }
            label={formik?.values?.isKg ? "Kg" : "Sujet"}
          />
        </Grid>
      </Grid>
    </Accordion>
  );
}

export default Reforme;
