import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Avatar, Chip, Stack } from "@mui/material";

export default function LotList({ lot, onDeleteItem, lotId }) {
  console.log("lot list", lotId, lot);
  const handleDelete = (name) => {
    onDeleteItem(name);
  };
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        position: "relative",
        overflowX: "auto",
        display: "flex",
        alignItems: "center",
        maxHeight: "auto",
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      {lotId?.map((lot) => (
        <li key={`section-${lot}`}>
          <ul>
            <ListSubheader>
              <Stack direction="row" spacing={1} className="lot-chip">
                <Chip
                  variant="filled"
                  color="warning"
                  size="small"
                  label={lot?.code}
                  onDelete={() => handleDelete(lot?.id)}
                  avatar={
                    <Avatar
                      sx={{
                        backgroundColor: " #fff",
                      }}
                    >
                      F
                    </Avatar>
                  }
                />
              </Stack>
            </ListSubheader>
          </ul>
        </li>
      ))}
    </List>
  );
}
