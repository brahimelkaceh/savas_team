import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, LinearProgress } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import UseFetchData from "../../../hooks/UseFetchData";
import { useSelector, useDispatch } from "react-redux";
import {
  userId,
  userData,
  userEmail,
  userFirstName,
  userLastName,
  userPhone,
  userRole,
  userSite,
  userSiteId,
  handleCloseEditModal,
} from "../../../slices/LeftBar";
import EditUsersModal from "./EditUsersModal";
import DeleteUsersModal from "./DeleteUsersModal";
import Loader from "../../../components/loader/Loader";

// get-users
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function UsersTable({ siteName, data, loading }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [useRId, setUserId] = useState("");
  const handleEditOpen = () => setOpenEditModal(true);
  const handleDeleteModal = () => setOpenDeleteModal(true);

  const dispatch = useDispatch();

  return (
    <div className="user-table slit-in-horizontal">
      {openDeleteModal && (
        <DeleteUsersModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          id={useRId}
        />
      )}
      {openEditModal && (
        <EditUsersModal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          siteName={siteName}
          userid={useRId}
        />
      )}
      <table className="">
        <thead className="fixed-header">
          <tr>
            <th></th>
            <th>Identifiant</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Role</th>
            <th>E-mail</th>
            <th>Télephone</th>
            <th>Site</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data !== undefined &&
            data?.map((user) => {
              return (
                <tr key={user.user_id} className="slit-in-horizontal">
                  <td>
                    <Avatar
                      {...stringAvatar(`${user.last_name} ${user.first_name} `)}
                    />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.last_name}</td>
                  <td>{user.first_name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                  <td>{user.phone ? user.phone : "loading..."}</td>
                  <td>{user.site_name}</td>
                  <td>
                    <DeleteForeverIcon
                      onClick={() => {
                        setUserId(user.user_id);
                        console.log(user.user_id);
                        handleDeleteModal();
                      }}
                      style={{ color: "#dc2626", cursor: "pointer" }}
                    />
                    <EditIcon
                      // onClick={handleEditOpen}
                      onClick={() => {
                        handleEditOpen();
                        setUserId(user.user_id);
                        dispatch(userId(user.user_id));
                        dispatch(userData(user.username));
                        dispatch(userEmail(user.email));
                        dispatch(userFirstName(user.first_name));
                        dispatch(userLastName(user.last_name));
                        dispatch(userRole(user.is_admin));
                        dispatch(userSite(user.site_name));
                        dispatch(userPhone(user.phone));
                        dispatch(userSiteId(user.site_id));
                        dispatch(handleCloseEditModal(openEditModal));
                      }}
                      style={{ color: "#fbbf24", cursor: "pointer" }}
                    />
                  </td>
                </tr>
              );
            })}
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

export default UsersTable;
