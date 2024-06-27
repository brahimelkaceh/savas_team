import * as React from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { Avatar, Chip, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ParamsList({ paramName, onDeleteItem }) {
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
      {paramName?.map((name) => (
        <li key={`section-${name}`}>
          <ul>
            <ListSubheader>
              <Stack direction="row" spacing={1}>
                <Chip
                  variant="outlined"
                  color="error"
                  size="small"
                  label={name}
                  onDelete={() => handleDelete(name)}
                />
              </Stack>
            </ListSubheader>
          </ul>
        </li>
      ))}
    </List>
  );
}
