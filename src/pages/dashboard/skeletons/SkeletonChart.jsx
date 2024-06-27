import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { CardHeader } from "@mui/material";

export default function SkeletonChart() {
  return (
    <Stack spacing={1} sx={{ padding: 1 }}>
      {/* For variant="text", adjust the height via font-size */}
      {/* For other variants, adjust the size with `width` and `height` */}
      <div
        className="header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height={35}
          sx={{ fontSize: "1rem", bgcolor: "grey.400", borderRadius: "4px" }}
        />
      </div>

      <Skeleton
        variant="rectangular"
        animation="wave"
        width=" 100%"
        height={190}
        sx={{ fontSize: "1rem", bgcolor: "grey.400", borderRadius: "4px" }}
      />
      <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width=" 8%"
          height={25}
          sx={{ fontSize: "1rem", bgcolor: "grey.400", borderRadius: "15px" }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width=" 8%"
          height={25}
          sx={{ fontSize: "1rem", bgcolor: "grey.400", borderRadius: "15px" }}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          width=" 8%"
          height={25}
          sx={{ fontSize: "1rem", bgcolor: "grey.400", borderRadius: "15px" }}
        />
      </div>
    </Stack>
  );
}
