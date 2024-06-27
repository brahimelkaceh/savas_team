import { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import LotForm from "./sections/LotForm";
import LotTable from "./sections/LotTable";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Workspaces from "@mui/icons-material/Workspaces";
import NewLot from "./modals/NewLot";
import UseFetchData from "../../../hooks/UseFetchData";
import SiteSelected from "./sections/SiteSelected";
import NewArrLot from "./modals/NewArrLot";
import EditLot from "./modals/EditLot";
import EditArrLot from "./modals/EditArrLot";
import DeleteLot from "./modals/DeleteLot";
import api from "./api";
let base_url = "https://farmdriver.savas.ma/api/";

const LotsPouss = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lotData, setLotData] = useState([]);
  const [siteId, setSiteId] = useState("");
  const [onRefetch, setRefetchData] = useState(new Date().getMilliseconds());

  const fetchPoussLot = async (id) => {
    try {
      if (!id) {
        return;
      }
      setLoading(true);
      const result = await api.getPoussLot(id);
      if (result.status === 200) {
        setLotData(result?.data);
      } else {
        setError("failed to get lot");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("failed to get lot");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoussLot(siteId);
  }, [siteId, onRefetch]);

  return (
    <>
      <main className="page">
        <Navbar />
        <div className="lots-container">
          <Container
            sx={{
              p: 3,
            }}
          >
            <Card>
              <CardHeader
                title="Gestion lots"
                className="title"
                sx={{
                  color: "#ff6c22",
                  fontWeight: "bold",
                  paddingBottom: 0,
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SiteSelected setSiteId={setSiteId} />
                {loading && (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress size={20} color="info" />
                  </Box>
                )}
              </div>
              <Divider />
              {error}
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#ffe0b2",
                    }}
                  >
                    <TableCell>Lot</TableCell>
                    <TableCell width={"40%"} align="left">
                      Arivage 1
                    </TableCell>
                    <TableCell align="left">Arivage 2</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lotData &&
                    lotData?.map((lot, i) => {
                      return (
                        <TableRow hover key={i}>
                          <TableCell>
                            <Typography variant="subtitle1">
                              {lot.code}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">
                            <Stack
                              flexDirection={"row"}
                              alignItems={"center"}
                              justifyContent={"start"}
                            >
                              <Typography variant="subtitle2">
                                {lot.arr_code}{" "}
                              </Typography>
                              <EditLot
                                lot={lot}
                                setRefetchData={setRefetchData}
                              />
                              <DeleteLot
                                id={lot.id}
                                setRefetchData={setRefetchData}
                                deletable={lot.deletable}
                              />
                            </Stack>
                          </TableCell>
                          <TableCell align="left">
                            {lot.linked_to ? (
                              <Stack
                                flexDirection={"row"}
                                alignItems={"center"}
                                justifyContent={"start"}
                              >
                                <Typography variant="subtitle2">
                                  {lot?.linked_to?.arr_code}
                                </Typography>
                                <EditArrLot
                                  setRefetchData={setRefetchData}
                                  lot={lot}
                                />
                                <DeleteLot />
                              </Stack>
                            ) : (
                              <NewArrLot
                                setRefetchData={setRefetchData}
                                lotId={lot.id}
                                guide={lot?.guide}
                                batiment={lot.batiment_id}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  <TableRow>
                    <TableCell>
                      <NewLot setRefetchData={setRefetchData} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Container>
        </div>
      </main>
    </>
  );
};

export default LotsPouss;
