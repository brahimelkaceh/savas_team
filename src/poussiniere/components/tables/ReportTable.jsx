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

export default function ReportTable(data) {
  let batimentName = useSelector((state) => state.getSiteData.batimentName);
  const rows = [
    // createData("Bâtiment", data?.data?.batiment || "--"),
    createData("Mortalité (sujet)", data?.data?.mort || "--"),
    createData("Triage (sujet)", data?.data?.hensEliminated || "--"),
    createData("Homogénéité (%)", data?.data?.homog || "--"),
    createData("Aliment consommé (Kg)", data?.data?.alimentDist || "--"),
    createData("Référence d'aliment", data?.data?.formule || "--"),
    createData("Eau consommée (Litre)", data?.data?.eauDist || "--"),
    createData(
      "Température intérieure minimale",
      data?.data?.temperatureMin || "--"
    ),
    createData(
      "Température intérieure maximale",
      data?.data?.temperatureMax || "--"
    ),
    createData("Allumage de lumiére", data?.data?.lightOn || "--:--"),
    createData("Extinction de lumière", data?.data?.lightOff || "--:--"),
    createData("Durée de lumiére", data?.data?.lightDuration || "--:--"),
    createData("Allumage de flash", data?.data?.flashOn || "--:--"),
    createData("Extinction de flash", data?.data?.flashOff || "--:--"),
    createData("Durée de flash", data?.data?.flashDuration || "--:--"),
    createData(
      `Intensité ${data?.data?.intensIsLux ? "(lux)" : "(%)"}`,
      data?.data?.intensite || "--"
    ),
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
