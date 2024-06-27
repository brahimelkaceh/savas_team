import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditSitesModal from "./EditSitesModal";
import DeleteSiteModal from "./DeletesitesModal";
import {
  getSiteData,
  getSiteName,
  getSitePhone,
} from "../../../slices/SiteData";
import Loader from "../../../components/loader/Loader";
import { Box, LinearProgress } from "@mui/material";

function SitesTable({ sites, loading }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [siteId, setSiteId] = useState("");
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleDeleteModal = () => setOpenDeleteModal(true);

  return (
    <div className="site-table slit-in-horizontal">
      {open && <EditSitesModal open={open} setOpen={setOpen} />}
      {openDeleteModal && (
        <DeleteSiteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          id={siteId}
        />
      )}

      <table className="">
        <thead className="fixed-header">
          <tr>
            <th>Sites</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sites !== undefined &&
            sites?.map((site) => (
              <tr key={site.id}>
                <td>{site.name}</td>
                <td>{site.phone}</td>
                <td style={{ display: "flex" }}>
                  {site.deletable ? (
                    <DeleteForeverIcon
                      style={{ color: "#dc2626", cursor: "pointer" }}
                      onClick={() => {
                        setSiteId(site.id);
                        handleDeleteModal();
                      }}
                    />
                  ) : (
                    <DeleteForeverIcon
                      disabled
                      style={{ color: "#999", cursor: "not-allowed" }}
                      onClick={() => {
                        setSiteId(site.id);
                        handleDeleteModal();
                      }}
                    />
                  )}
                  <EditIcon
                    style={{
                      color: "#fbbf24",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleOpen();
                      dispatch(getSiteData(site.id));
                      dispatch(getSiteName(site.name));
                      dispatch(getSitePhone(site.phone));
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

export default SitesTable;
