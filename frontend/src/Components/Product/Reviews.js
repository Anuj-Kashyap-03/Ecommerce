import React from "react";
import StarIcon from "@mui/icons-material/Star";
import "./Reviews.scss";

const ReviewCard = ({ review }) => {
  return (
    <div className="reviewCard">
      <div className="reviewby">
        <div className="reviewrating">
          <p>{review.rating}</p>
          <StarIcon />
        </div>
        <p>By</p>
        <p> {review.name}</p>
      </div>
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
