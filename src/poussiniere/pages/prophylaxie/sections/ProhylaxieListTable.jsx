import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Avatar, Chip, Link } from "@mui/material";
import { AiFillEye } from "react-icons/ai";
import EditProphylaxi from "./EditProphylaxi";
import DeleteProphylaxie from "./DeleteProphylaxie";
import ProphylaxieDetails from "./ProphylaxieDetails";
import api from "../../../../api/api";

const getStatusPill = (orderStatus, id, lotId, reftching) => {
  const [loading, setLoading] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const ChangeProphylaxiStatus = async (data) => {
    setLoading(true);
    try {
      const response = await api.changeProphylaxiStatus(data);
      // Check if the request was successful (status code 2xx)
      if (response) {
        console.log("Prophylaxi Status changed successfully");
        setLoading(false);
        if (newStatus !== response.status.status) {
          setNewStatus(response.status?.status);
          console.log(response.status?.status);
          reftching(lotId);
        }
        // dispatch(getRenderData(new Date().toString()));
      } else {
        // Handle non-successful responses (status code other than 2xx)
        console.error(
          `Failed to change prophylaxi status. Status: ${response.status}`
        );
        setLoading(false);
      }
    } catch (error) {
      // Handle any other errors that may occur during the request
      console.error("An error occurred:", error);
      setLoading(false);
    }
  };

  const map = {
    0: {
      status: 0,
      color: "info",
      text: "En programme",
    },
    1: {
      status: 1,
      color: "success",
      text: "Exécuté",
    },
    2: {
      status: 2,
      color: "warning",
      text: "En cours",
    },
  };

  const { text, color, status } = map[orderStatus];

  return (
    <Chip
      onClick={() => {
        const data = { status, id };
        ChangeProphylaxiStatus(data);
      }}
      size="small"
      color={color}
      label={loading ? "Chargement..." : text}
    />
  );
};

export default getStatusPill;

function ExpandableCell({ value }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      {expanded ? value : value?.slice(0, 50)}&nbsp;
      {value?.length > 50 && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link
          type="button"
          component="button"
          sx={{ fontSize: "inherit" }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "voir moins" : "voir plus"}
        </Link>
      )}
    </div>
  );
}

export const ProhylaxieListTable = ({
  data,
  reftching,
  lotId,
  setRefresh,
  setData,
  setSuccessDeleteMessage,
}) => (
  <Box
    sx={{
      p: 1,
    }}
  >
    <Divider />
    <Table sx={{ minWidth: 1150 }}>
      <TableHead>
        <TableRow
          sx={{
            backgroundColor: "#ffcc80",
          }}
        >
          <TableCell>Date</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Interventions</TableCell>
          <TableCell>Mode d'administration</TableCell>
          {/* <TableCell width={"10%"}>Controles</TableCell> */}
          <TableCell width={"30%"}>Notes</TableCell>
          <TableCell>Statut</TableCell>
          <TableCell width="10%">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((prophy) => {
          const statusPill = getStatusPill(
            prophy.status,
            prophy.id,
            lotId,
            reftching
          );

          return (
            <TableRow hover key={prophy.id}>
              <TableCell>
                <Typography variant="subtitle2">{prophy.date}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2">{prophy.age}-Sem</Typography>
                <Typography color="text.secondary" variant="body2">
                  {prophy.age_jr}-Jours
                </Typography>
              </TableCell>
              <TableCell>{prophy.intervention}</TableCell>
              <TableCell>{prophy.mode_administration}</TableCell>
              {/* <TableCell>{prophy.controles}</TableCell> */}
              <TableCell>
                <ExpandableCell value={prophy.note} />
              </TableCell>
              <TableCell>{statusPill}</TableCell>
              <TableCell width="10%">
                <EditProphylaxi
                  id={prophy?.id}
                  reftching={reftching}
                  lotId={lotId}
                />
                <DeleteProphylaxie
                  id={prophy?.id}
                  reftching={reftching}
                  lotId={lotId}
                  setRefresh={setRefresh}
                  setData={setData}
                  setSuccessDeleteMessage={setSuccessDeleteMessage}
                />
                <ProphylaxieDetails id={prophy?.id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </Box>
);
