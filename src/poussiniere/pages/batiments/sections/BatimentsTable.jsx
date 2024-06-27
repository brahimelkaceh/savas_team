import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../components/loader/Loader";
import {
  getBatId,
  getBatName,
  getBatSite,
  getBatType,
} from "../../../../slices/SiteData";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

function BatimentsTable({ siteName, loading, data }) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [batId, setBatId] = useState("");
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);

  const handleModalOpen = () => setOpenDeleteModal(true);

  return (
    <div className="bats-table bats-poss-table slit-in-horizontal">
      {open && <EditModal open={open} setOpen={setOpen} siteName={siteName} />}
      {openDeleteModal && (
        <DeleteModal
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
          {data !== undefined &&
            data?.map((bats) => (
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
      {loading && <Loader />}
    </div>
  );
}

export default BatimentsTable;
