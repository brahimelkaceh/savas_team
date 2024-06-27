import React, { Fragment, useState } from "react";
import TableCell from "./TableCell";
import { IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";
import DownloadIcon from "@mui/icons-material/Download";
import EditModal from "../modals/EditModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../modals/DeleteModal";

const WeekRow = ({ row, tableHeaders, visibleChildren }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const handleOpen = (id) => {
    setOpen(true);
    setSelectedId(id);
  };

  const showDetails = (rowId) => {
    setSelectedRow(selectedRow === rowId ? null : rowId);
  };
  return (
    <Fragment>
      {selectedId && (
        <EditModal setOpen={setOpen} open={open} id={selectedId} />
      )}
      {selectedId && (
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          id={selectedId}
        />
      )}
      {selectedRow === row.id &&
        row.data.map((dayRow, i) => (
          <tr key={i} className="isdayBackground  detailsRow scale-in-ver-top">
            {tableHeaders.map((header) => {
              return header.children.map((child, childIndex) => {
                if (visibleChildren[header.parent].includes(child.key)) {
                  const value = dayRow[child.key];

                  if (child.key === "isWeek") {
                    return (
                      <td key={childIndex}>
                        {/* Button for the first column in the details row */}
                        {dayRow?.deletable && (
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => {
                              setOpenDeleteModal(true);
                              setSelectedId(dayRow.id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                        <IconButton
                          size="small"
                          color="warning"
                          onClick={() => handleOpen(dayRow.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </td>
                    );
                  } else {
                    return <TableCell value={value} key={childIndex} />;
                  }
                }
                return null;
              });
            })}
          </tr>
        ))}
      <tr
        className={`isWeekBackground ${
          selectedRow === row.id ? "selected" : ""
        }`}
      >
        <td>
          {/* Button for the first column in the main row */}
          {/* <IconButton
            size="small"
            color="success"
            onClick={() => handleDetailButtonClick(dayRow.id)}
          >
            <DownloadIcon />
          </IconButton> */}
          {/* <IconButton
            size="small"
            color="error"
            onClick={() => handleDetailButtonClick(dayRow.id)}
          >
            <MenuIcon />
          </IconButton> */}
          <IconButton
            color="primary"
            size="small"
            onClick={() => showDetails(row.id)}
          >
            {selectedRow === row.id ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </td>
        {tableHeaders.slice(1).map((header) => {
          return header.children.map((child, childIndex) => {
            if (visibleChildren[header.parent].includes(child.key)) {
              const value = row[child.key];
              return <TableCell value={value} key={childIndex} />;
            }
            return null;
          });
        })}
      </tr>
    </Fragment>
  );
};

export default WeekRow;
