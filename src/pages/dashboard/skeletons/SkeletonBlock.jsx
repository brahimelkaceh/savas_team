import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { CardHeader } from "@mui/material";

export default function SkeletonBlock() {
  return (
    <Stack spacing={0} sx={{ padding: 2 }}>
      {/* For variant="text", adjust the height via font-size */}
      {/* For other variants, adjust the size with `width` and `height` */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          //   flexDirection: "column",
        }}
      >
        <Skeleton
          variant="text"
          animation="wave"
          width={90}
          height={20}
          sx={{ fontSize: "1rem", bgcolor: "grey.500", borderRadius: "4px" }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          width={90}
          height={20}
          sx={{ fontSize: "1rem", bgcolor: "grey.500", borderRadius: "4px" }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          width={90}
          height={20}
          sx={{ fontSize: "1rem", bgcolor: "grey.500", borderRadius: "4px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          //   flexDirection: "column",
        }}
      >
        <Skeleton
          variant="text"
          animation="wave"
          width={90}
          height={20}
          sx={{ fontSize: "1rem", bgcolor: "grey.500", borderRadius: "4px" }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          width={90}
          height={20}
          sx={{ fontSize: "1rem", bgcolor: "grey.500", borderRadius: "4px" }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          width={90}
          height={20}
          sx={{ fontSize: "1rem", bgcolor: "grey.500", borderRadius: "4px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          //   flexDirection: "column",
        }}
      >
        <Skeleton
          variant="text"
          animation="wave"
          width={90}
          height={20}
          sx={{ fontSize: "1rem", bgcolor: "grey.500", borderRadius: "4px" }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          width={90}
          height={20}
          sx={{ fontSize: "1rem", bgcolor: "grey.500", borderRadius: "4px" }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          width={90}
          height={20}
          sx={{ fontSize: "1rem", bgcolor: "grey.500", borderRadius: "4px" }}
        />
      </div>
    </Stack>
  );
}
