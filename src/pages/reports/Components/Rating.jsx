import React, { useState } from "react";
import PropTypes from "prop-types";

const Rating = ({ maxValue }) => {
  const [rating, setRating] = useState(0);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <div className="rating">
      {[...Array(maxValue)].map((_, index) => (
        <span
          key={index}
          className={`star ${index < rating ? "filled" : ""}`}
          onClick={() => handleRatingClick(index + 1)}
        />
      ))}
      <div className="rating-label">
        {rating !== 0 ? `Rating: ${rating}` : "No Rating"}
      </div>
    </div>
  );
};

Rating.propTypes = {
  maxValue: PropTypes.number.isRequired,
};

export default Rating;
