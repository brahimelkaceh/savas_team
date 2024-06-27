import { useEffect, useMemo, useState } from "react";

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
import NewLot from "./modals/NewLot";
import SiteSelected from "./sections/SiteSelected";
import { Edit } from "@mui/icons-material";
import EditLot from "./modals/EditLot";
import DeleteLot from "./modals/DeleteLot";
import UseFetchData from "../../hooks/UseFetchData";
import Navbar from "../../components/navbar/Navbar";
let base_url = "https://farmdriver.savas.ma/api/";

const Lots = () => {
  const [siteId, setSiteId] = useState("");
  const [onRefetch, setRefetchData] = useState(new Date().getMilliseconds());
  const lotTitlesApiUrl = useMemo(
    () => `${base_url}get-lots-titles/?site=${siteId}`,
    [base_url, siteId]
  );
  const {
    data,
    loading: lotLoading,
    refetchData,
  } = UseFetchData(lotTitlesApiUrl);
  const prodData = data?.filter((d) => d.type == "production" && d.isActive);
  useEffect(() => {
    refetchData();
  }, [onRefetch]);
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
                  color: "#2962ff",
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
                {lotLoading && (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress size={20} color="info" />
                  </Box>
                )}
              </div>
              <Divider />

              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#bbdefb",
                    }}
                  >
                    <TableCell align="left">Bâtiment</TableCell>
                    <TableCell align="center"> Code lot</TableCell>

                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prodData &&
                    prodData?.map((lot) => {
                      return (
                        <TableRow hover>
                          <TableCell align="center">
                            <Avatar
                              sx={{
                                backgroundColor: "#2196f3",
                                color: "#fff",
                              }}
                              variant="rounded"
                            >
                              {lot.batiment}
                            </Avatar>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="subtitle1">
                              {lot.code}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Stack
                              flexDirection={"row"}
                              alignItems={"center"}
                              justifyContent={"end"}
                            >
                              <EditLot
                                lot={lot}
                                setRefetchData={setRefetchData}
                                site={siteId}
                              />
                              <DeleteLot
                                id={lot.id}
                                setRefetchData={setRefetchData}
                                deletable={lot.deletable}
                              />
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  <TableRow align="center">
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

export default Lots;
