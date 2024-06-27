import React, { useState } from "react";
import ChooseColumn from "./sections/ChooseColumn";
import WeekRow from "./sections/WeekRow";
import TableHeader from "./sections/TableHeader";
import { tableHeaders } from "./table-headers";
import Loader from "../../../components/loader/Loader";

const PerformanceTable = ({ data, loading, error }) => {
  const [visibleChildren, setVisibleChildren] = useState(
    tableHeaders.reduce((acc, curr) => {
      acc[curr.parent] = curr.children.map((child) => child.key);
      return acc;
    }, {})
  );

  const handleToggleVisibility = (parent, child) => {
    const newVisibleChildren = { ...visibleChildren };
    const index = newVisibleChildren[parent].indexOf(child);

    if (index !== -1) {
      newVisibleChildren[parent] = [
        ...newVisibleChildren[parent].slice(0, index),
        ...newVisibleChildren[parent].slice(index + 1),
      ];
    } else {
      newVisibleChildren[parent] = [...newVisibleChildren[parent], child];
    }

    setVisibleChildren(newVisibleChildren);
  };

  const handleShowAll = () => {
    const allVisible = tableHeaders.reduce((acc, curr) => {
      acc[curr.parent] = curr.children.map((child) => child.key);
      return acc;
    }, {});
    setVisibleChildren(allVisible);
  };
  return (
    <div className="modification-table-container">
      <ChooseColumn
        tableHeaders={tableHeaders}
        handleToggleVisibility={handleToggleVisibility}
        visibleChildren={visibleChildren}
        showAll={handleShowAll}
      />

      <table>
        <TableHeader
          tableHeaders={tableHeaders}
          visibleChildren={visibleChildren}
        />
        <tbody>
          {loading && <Loader />}
          {data &&
            data?.map((row, rowIndex) => {
              console.log("row", row);
              return (
                <WeekRow
                  key={rowIndex}
                  row={row}
                  tableHeaders={tableHeaders}
                  visibleChildren={visibleChildren}
                />
              );
            })}
        </tbody>
      </table>
      <p>{error}</p>
    </div>
  );
};

export default PerformanceTable;
