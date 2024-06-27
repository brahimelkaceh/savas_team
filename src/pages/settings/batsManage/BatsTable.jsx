import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect, useMemo } from "react";
import UseFetchData from "../../../hooks/UseFetchData";
import { useSelector, useDispatch } from "react-redux";
import EditBatsModal from "./EditBatsModal";
import DeleteBatsModal from "./DeleteBatsModal";
import {
  getBatId,
  getBatSite,
  getBatType,
  getBatName,
} from "../../../slices/SiteData";
import { Box, LinearProgress } from "@mui/material";
function BatsTable({ siteName, loading, bats }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [batId, setBatId] = useState("");
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleModalOpen = () => setOpenDeleteModal(true);
  const editbatiment = bats.filter((bat) => bat.id === batId);

  return (
    <div className="bats-table slit-in-horizontal">
      {open && (
        <EditBatsModal
          open={open}
          setOpen={setOpen}
          siteName={siteName}
          batimentData={editbatiment}
        />
      )}
      {openDeleteModal && (
        <DeleteBatsModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          id={batId}
        />
      )}

      <table className="">
        <thead className="fixed-header">
          <tr>
            <th>Sites</th>
            <th>Bâtiment</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bats !== undefined &&
            bats?.map((bats) => (
              <tr key={bats.id}>
                <td>{bats.site_name}</td>
                <td>{bats.name}</td>
                <td>
                  <span
                    className={
                      bats.type === "production"
                        ? "production-color"
                        : "poussiniere-color"
                    }
                  >
                    {bats.type}
                  </span>
                </td>
                <td>
                  {bats.deletable ? (
                    <DeleteForeverIcon
                      style={{ color: "#dc2626", cursor: "pointer" }}
                      onClick={() => {
                        setBatId(bats.id);
                        handleModalOpen();
                      }}
                    />
                  ) : (
                    <DeleteForeverIcon
                      style={{ color: "#888", cursor: "not-allowed" }}
                    />
                  )}
                  <EditIcon
                    style={{ color: "#fbbf24", cursor: "pointer" }}
                    onClick={() => {
                      handleOpen();
                      dispatch(getBatId(bats.id));
                      setBatId(bats.id);
                      dispatch(getBatName(bats.name));
                      dispatch(getBatType(bats.type));
                      dispatch(getBatSite(bats.site_id));
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
    </div>
  );
}

export default BatsTable;
