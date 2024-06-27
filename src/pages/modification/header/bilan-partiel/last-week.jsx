import {
  CaretDownOutlined,
  CaretUpOutlined,
  FallOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import {
  Card,
  Chip,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import SimpleBar from "simplebar-react";

const LastWeek = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xl"));

  const successSX = { color: theme.palette.success.main };
  const errorSX = { color: theme.palette.error.main };
  const infoSX = { color: theme.palette.info.main };
  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12}>
        <Typography color={"Highlight"} variant="h6">
          Derniére semaine achevèe : {data?.week_data?.age}
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Card content={false}>
          <List
            aria-label="main mailbox folders"
            sx={{
              "& svg": {
                width: 32,
                my: -0.75,
                ml: -0.75,
                mr: 0.75,
              },
            }}
          >
            <ListItemButton
              sx={{
                cursor: "default",
              }}
              dense
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText
                primary={
                  <Grid container justifyContent={"space-between"}>
                    <Grid item justifyContent={"end"} xs={4}>
                      <Typography component="span" fontWeight={"bold"}>
                        Paramétre
                      </Typography>
                    </Grid>
                    <Grid container item justifyContent={"start"} xs={2}>
                      <Typography component="span" fontWeight={"bold"}>
                        Réel
                      </Typography>{" "}
                    </Grid>
                    <Grid container item justifyContent={"start"} xs={2}>
                      <Typography component="span" fontWeight={"bold"}>
                        Ecart/std
                      </Typography>{" "}
                    </Grid>
                    <Grid container justifyContent={"end"} item xs={4}>
                      <Typography component="span" fontWeight={"bold"}>
                        % Evolution
                      </Typography>{" "}
                    </Grid>
                  </Grid>
                }
              />
            </ListItemButton>
            <Divider />

            <ListItemButton
              sx={{
                cursor: "default",
              }}
              dense
            >
              <ListItemIcon>
                {data?.week_data?.ponte?.isUp ? (
                  <CaretUpOutlined
                    style={
                      data?.week_data?.ponte?.color == "green"
                        ? successSX
                        : errorSX
                    }
                  />
                ) : (
                  <CaretDownOutlined
                    style={
                      data?.week_data?.ponte?.color == "green"
                        ? successSX
                        : errorSX
                    }
                  />
                )}{" "}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Grid container justifyContent={"space-between"}>
                    <Grid item justifyContent={"end"} xs={4}>
                      <Typography variant="caption" color={"GrayText"}>
                        Ponte
                      </Typography>
                    </Grid>
                    <Grid container item justifyContent={"start"} xs={2}>
                      <Typography sx={infoSX}>
                        {data?.week_data?.ponte?.reel}{" "}
                        <Typography color={"GrayText"} variant="caption">
                          %
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid container item justifyContent={"start"} xs={2}>
                      <Typography
                        sx={data?.week_data?.ponte?.isUp ? successSX : errorSX}
                      >
                        {data?.week_data?.ponte?.ecart}
                      </Typography>
                    </Grid>
                    <Grid container justifyContent={"end"} item xs={4}>
                      <Chip
                        variant="outlined"
                        color={
                          data?.week_data?.ponte?.isUp ? "success" : "error"
                        }
                        icon={
                          data?.week_data?.ponte?.isUp ? (
                            <RiseOutlined
                              style={{ fontSize: "1rem", color: "inherit" }}
                            />
                          ) : (
                            <FallOutlined
                              style={{ fontSize: "1rem", color: "inherit" }}
                            />
                          )
                        }
                        label={`${data?.week_data?.ponte?.ecart_prsnt}%`}
                        sx={{ ml: 0, pl: 1 }}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                }
              />
            </ListItemButton>
            <Divider />
            <ListItemButton
              sx={{
                cursor: "default",
              }}
              dense
            >
              <ListItemIcon>
                {data?.week_data?.mort?.isUp ? (
                  <CaretUpOutlined
                    style={
                      data?.week_data?.mort?.color == "green"
                        ? successSX
                        : errorSX
                    }
                  />
                ) : (
                  <CaretDownOutlined
                    style={
                      data?.week_data?.mort?.color == "green"
                        ? successSX
                        : errorSX
                    }
                  />
                )}{" "}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Grid container justifyContent={"space-between"}>
                    <Grid item justifyContent={"end"} xs={4}>
                      <Typography variant="caption" color={"GrayText"}>
                        Mortalité
                      </Typography>
                    </Grid>
                    <Grid container item justifyContent={"start"} xs={2}>
                      <Typography sx={infoSX}>
                        {data?.week_data?.mort?.reel}{" "}
                        <Typography color={"GrayText"} variant="caption">
                          %
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid container item justifyContent={"start"} xs={2}>
                      <Typography
                        sx={
                          data?.week_data?.mort?.color == "green"
                            ? successSX
                            : errorSX
                        }
                      >
                        {data?.week_data?.mort?.ecart}
                      </Typography>
                    </Grid>
                    <Grid container justifyContent={"end"} item xs={4}>
                      <Chip
                        variant="outlined"
                        color={
                          data?.week_data?.pmo?.color == "green"
                            ? "success"
                            : "error"
                        }
                        icon={
                          data?.week_data?.mort?.isUp ? (
                            <RiseOutlined
                              style={{ fontSize: "1rem", color: "inherit" }}
                            />
                          ) : (
                            <FallOutlined
                              style={{ fontSize: "1rem", color: "inherit" }}
                            />
                          )
                        }
                        label={`${data?.week_data?.mort?.ecart_prsnt}%`}
                        sx={{ ml: 0, pl: 1 }}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                }
              />
            </ListItemButton>
            <Divider />
            <ListItemButton
              sx={{
                cursor: "default",
              }}
              dense
            >
              <ListItemIcon>
                {data?.week_data?.pmo?.isUp ? (
                  <CaretUpOutlined
                    style={
                      data?.week_data?.pmo?.color == "green"
                        ? successSX
                        : errorSX
                    }
                  />
                ) : (
                  <CaretDownOutlined
                    style={
                      data?.week_data?.pmo?.color == "green"
                        ? successSX
                        : errorSX
                    }
                  />
                )}{" "}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Grid container justifyContent={"space-between"}>
                    <Grid item justifyContent={"end"} xs={4}>
                      <Typography variant="caption" color={"GrayText"}>
                        PMO
                      </Typography>
                    </Grid>
                    <Grid container item justifyContent={"start"} xs={2}>
                      <Typography sx={infoSX}>
                        {data?.week_data?.pmo?.reel}{" "}
                        <Typography color={"GrayText"} variant="caption">
                          g
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid container item justifyContent={"start"} xs={2}>
                      <Typography
                        sx={
                          data?.week_data?.pmo?.color == "green"
                            ? successSX
                            : errorSX
                        }
                      >
                        {data?.week_data?.pmo?.ecart}
                      </Typography>
                    </Grid>
                    <Grid container justifyContent={"end"} item xs={4}>
                      <Chip
                        variant="outlined"
                        color={
                          data?.week_data?.pmo?.color == "green"
                            ? "success"
                            : "error"
                        }
                        icon={
                          data?.week_data?.pmo?.isUp ? (
                            <RiseOutlined
                              style={{ fontSize: "1rem", color: "inherit" }}
                            />
                          ) : (
                            <FallOutlined
                              style={{ fontSize: "1rem", color: "inherit" }}
                            />
                          )
                        }
                        label={`${data?.week_data?.pmo?.ecart_prsnt}%`}
                        sx={{ ml: 0, pl: 1 }}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                }
              />
            </ListItemButton>
            <Divider />
            <ListItemButton
              dense
              sx={{
                cursor: "default",
              }}
            >
              <ListItemIcon>
                {data?.pv?.isUp ? (
                  <CaretUpOutlined
                    style={data?.pv?.color == "green" ? successSX : errorSX}
                  />
                ) : (
                  <CaretDownOutlined
                    style={data?.pv?.color == "green" ? successSX : errorSX}
                  />
                )}{" "}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Grid container justifyContent={"space-between"}>
                    <Grid item justifyContent={"end"} xs={4}>
                      <Grid item justifyContent={"end"} xs={4}></Grid>
                      <Typography variant="caption" color={"GrayText"}>
                        {isMobile ? "P.corporel" : "Poids corporel"}
                      </Typography>
                    </Grid>
                    <Grid container item justifyContent={"start"} xs={2}>
                      <Typography sx={infoSX}>
                        {data?.pv?.reel}{" "}
                        <Typography color={"GrayText"} variant="caption">
                          g
                        </Typography>{" "}
                      </Typography>
                    </Grid>
                    <Grid container item justifyContent={"start"} xs={2}>
                      <Typography
                        sx={data?.pv?.color == "green" ? successSX : errorSX}
                      >
                        {data?.pv?.ecart}
                      </Typography>
                    </Grid>
                    <Grid container justifyContent={"end"} item xs={4}>
                      <Chip
                        variant="outlined"
                        color={data?.pv?.color == "green" ? "success" : "error"}
                        icon={
                          data?.pv?.isUp ? (
                            <RiseOutlined
                              style={{ fontSize: "1rem", color: "inherit" }}
                            />
                          ) : (
                            <FallOutlined
                              style={{ fontSize: "1rem", color: "inherit" }}
                            />
                          )
                        }
                        label={`${data?.pv?.ecart_prsnt}%`}
                        sx={{ ml: 0, pl: 1 }}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                }
              />
            </ListItemButton>
            <Divider />
            <ListItemButton
              dense
              sx={{
                cursor: "default",
              }}
            >
              <ListItemIcon>
                {data?.homog?.isUp ? (
                  <CaretUpOutlined
                    style={data?.homog?.color == "green" ? successSX : errorSX}
                  />
                ) : (
                  <CaretDownOutlined
                    style={data?.homog?.color == "green" ? successSX : errorSX}
                  />
                )}{" "}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Grid container justifyContent={"space-between"}>
                    <Grid item justifyContent={"end"} xs={4}>
                      <Typography variant="caption" color={"GrayText"}>
                        {"Homogénéité"}
                      </Typography>
                    </Grid>
                    <Grid container item justifyContent={"start"} xs={2}>
                      <Typography sx={infoSX}>
                        {data?.homog?.reel}{" "}
                        <Typography color={"GrayText"} variant="caption">
                          %
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid container item justifyContent={"start"} xs={2}>
                      <Typography sx={data?.homog?.isUp ? successSX : errorSX}>
                        {data?.homog?.ecart}
                      </Typography>
                    </Grid>
                    <Grid container justifyContent={"end"} item xs={4}>
                      <Chip
                        variant="outlined"
                        color={data?.homog?.isUp ? "success" : "error"}
                        icon={
                          data?.homog?.isUp ? (
                            <RiseOutlined
                              style={{ fontSize: "1rem", color: "inherit" }}
                            />
                          ) : (
                            <FallOutlined
                              style={{ fontSize: "1rem", color: "inherit" }}
                            />
                          )
                        }
                        label={`${data?.homog?.ecart_prsnt}%`}
                        sx={{ ml: 0, pl: 1 }}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                }
              />
            </ListItemButton>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LastWeek;
