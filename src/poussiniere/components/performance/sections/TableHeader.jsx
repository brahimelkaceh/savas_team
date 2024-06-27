import React from "react";
import EventIcon from "@mui/icons-material/Event";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import PeopleIcon from "@mui/icons-material/People";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { CiWheat } from "react-icons/ci";

const TableHeader = ({ tableHeaders, visibleChildren }) => {
  const getParentIcon = (parent) => {
    switch (parent) {
      case "Calendrier":
        return <EventIcon />;
      case "Ambiance":
        return <EmojiObjectsIcon />;
      case "Viabilité":
        return <SentimentSatisfiedAltIcon />;
      case "Consommation":
        return <CiWheat />;
      case "Indice de conversion":
        return <TrendingUpIcon />;
      default:
        return null;
    }
  };

  return (
    <thead className="sticky-header">
      <tr className="main-header">
        {tableHeaders.map(
          (header, index) =>
            visibleChildren[header.parent].some((child) =>
              header.children.map((c) => c.key).includes(child)
            ) && (
              <th
                key={index}
                colSpan={visibleChildren[header.parent].length}
                className={header.class}
              >
                {/* Icon for the parent */}
                <span>
                  {header.parent}
                  {getParentIcon(header.parent)}
                </span>
              </th>
            )
        )}
      </tr>
      <tr className="second-header">
        {tableHeaders.map((header) =>
          header.children.map(
            (child) =>
              visibleChildren[header.parent].includes(child.key) && (
                <td key={child.key}>
                  {/* Icon for the child */}
                  {/* You can customize the icon size or style as needed */}
                  {child.title}
                </td>
              )
          )
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
