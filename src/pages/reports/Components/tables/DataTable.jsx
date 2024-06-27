import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./style.css";
import { useSelector } from "react-redux";

function createData(name, value) {
  return { name, value };
}

export default function DataTable(data) {
  let batimentName = useSelector((state) => state.getSiteData.batimentName);
  const rows = [
    createData("Bâtiment", batimentName || "--"),
    createData("Mortalité (sujet)", data?.data?.mort || "--"),
    createData("Triage (sujet)", data?.data?.hensEliminated || "--"),
    createData("Homogénéité (%)", data?.data?.homog || "--"),
    createData("Aliment consommé (Kg)", data?.data?.alimentDist || "--"),
    createData("Référence d'aliment", data?.data?.formule || "--"),
    createData("Eau consommée (Litre)", data?.data?.eauDist || "--"),
    createData("Œufs normaux", data?.data?.prod_normal || "--"),
    createData("Œufs double jaune", data?.data?.prod_dj || "--"),
    createData("Œufs blanc", data?.data?.prod_blanc || "--"),
    createData("Cassé", data?.data?.prod_casse || "--"),
    createData("Sale", data?.data?.prod_feles || "--"),
    createData("Liquide (Kg)", data?.data?.prod_liquide || "--"),
    createData("Triage", data?.data?.prod_elimne || "--"),
    createData("PMO (g)", data?.data?.pmo || "--"),
    createData(
      "Température intérieure minimale",
      data?.data?.temperatureMin || "--"
    ),
    createData(
      "Température intérieure maximale",
      data?.data?.temperatureMax || "--"
    ),
    createData(
      "Température extérieure minimale",
      data?.data?.temperatureMinExt || "--"
    ),
    createData(
      "Température extérieure maximale",
      data?.data?.temperatureMaxExt || "--"
    ),
    createData("Allumage de lumiére", data?.data?.lightOn || "--:--"),
    createData("Extinction de lumière", data?.data?.lightOff || "--:--"),
    createData("Durée de lumiére", data?.data?.lightDuration || "--:--"),
    createData("Allumage de flash", data?.data?.flashOn || "--:--"),
    createData("Extinction de flash", data?.data?.flashOff || "--:--"),
    createData("Durée de flash", data?.data?.flashDuration || "--:--"),
    createData(
      "Intensité",
      `${data?.data?.intensite} ${data?.data?.intensIsLux ? "lux" : "%"}` ||
        "--"
    ),
    createData("Qualité de Coquille", data?.data?.qty_shell || "--"),
    createData("Coloration d'oeuf", data?.data?.coloration || "--"),
  ];
  return (
    <TableContainer component={Paper} style={{ height: "90%" }}>
      <Table sx={{ minWidth: 50 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Paramétre</TableCell>
            <TableCell>Valeur</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
