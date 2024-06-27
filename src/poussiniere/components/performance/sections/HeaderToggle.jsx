// HeaderToggle.js
import React from "react";

const HeaderToggle = ({ header, visibleChildren, handleToggleVisibility }) => (
  <span>
    {header.children.map((child) => (
      <label key={child.key}>
        <input
          type="checkbox"
          checked={visibleChildren[header.parent].includes(child.key)}
          onChange={() => handleToggleVisibility(header.parent, child.key)}
        />
        {child.title}
      </label>
    ))}
  </span>
);

export default HeaderToggle;
