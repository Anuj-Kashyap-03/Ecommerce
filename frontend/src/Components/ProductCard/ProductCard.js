import Rating from "@mui/material/Rating";
import React from "react";
import { Link } from "react-router-dom";
import "./Product.scss";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <div className="image">
        <img src={product.images[0].url} alt={product.name} />
      </div>
      <div className="description">
        <div className="name">
          <p>{product.name}</p>
        </div>
        <div>
          <div className="review">
            <Rating {...options} />
            <span className="productCardSpan">
              ({product.numOfReviews} Reviews)
            </span>
          </div>
        </div>
        <div className="price">
          <span>{`₹${product.price}`}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
