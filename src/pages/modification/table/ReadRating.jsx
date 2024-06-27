import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function ReadRating({ value }) {
  // console.log(value);
  const [newValue, setValue] = React.useState(value);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Rating name="read-only" value={newValue} readOnly />
    </Box>
  );
}
