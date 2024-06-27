import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/loader/Loader";
import {
  getSiteData,
  getSiteName,
  getSitePhone,
} from "../../../../slices/SiteData";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

function SiteTable({ data, loading }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [siteId, setSiteId] = useState("");
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleDeleteModal = () => setOpenDeleteModal(true);

  return (
    <div className="site-table bats-poss-table slit-in-horizontal">
      {open && <EditModal open={open} setOpen={setOpen} />}
      {openDeleteModal && (
        <DeleteModal
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
          {data !== undefined &&
            data?.map((site) => (
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
      {loading && <Loader />}
    </div>
  );
}

export default SiteTable;
