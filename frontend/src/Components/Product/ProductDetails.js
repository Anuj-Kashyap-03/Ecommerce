import React, { useEffect, useState } from "react";
import "./ProductDetails.scss";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import ReviewCard from "./Reviews.js";
import MetaData from "../layout/MetaData";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { addItemsToCart } from "../../Redux/Actions/cartAction";
import {
  newReview,
  getProductDetails,
} from "../../Redux/Actions/ProductActions";
import { useNavigate, useParams } from "react-router-dom";
import ProductImages from "./ProductImages";
import Loader from "../Loader/Loader";
import { ShowAlert } from "../../Redux/Actions/AlertAction";
import Error from "../Error/Error";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const { loading, data, error } = UseFetch(`/api/v1/product/${id}`);
  // const product = data ? data.product : null;

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const [reload, setreload] = useState(true)

  const isAuthenticated = useSelector((state) => state.User.isAuthenticated);

  const [quantity, setQuantity] = useState(1);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      dispatch(ShowAlert(`You can't add more then available stock ${product.Stock} in cart`, false));

      return
    };

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    // alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    setOpen(!open);
    setRating(0);
    setComment("");
  };

  const reviewSubmitHandler = () => {
    if (isAuthenticated) {
      dispatch(newReview({ rating, comment, productId: id }));
    } else {
      dispatch(ShowAlert("Please Login for rate the product", false));
      navigate("/login");
    }
    setOpen(false);
    setRating(0);
    setComment("");
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id, reload]);

  return (
    <div className="Product container-xxl">
      {loading && <Loader />}
      {product && (
        <>
          <MetaData title={`${product.name ? product.name : ""} `} />
          <div className="ProductDetails">
            <div>
              {product.images && <ProductImages images={product.images} />}
            </div>
            <div className="details">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating
                  size="large"
                  value={product.ratings}
                  readOnly={true}
                  precision={0.5}
                />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>

                <p>
                  Status :
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>

                <div className="detailsBlock-4">
                  Description : <p>{product.description}</p>
                </div>
                <div className="detailsBlock-3-1">
                  <div className="quantity">
                    <IconButton
                      onClick={decreaseQuantity}
                      aria-label="delete"
                      color="primary"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <input readOnly type="number" value={quantity} />
                    <IconButton
                      aria-label="delete"
                      onClick={increaseQuantity}
                      color="primary"
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                </div>
                <div className="add_to_card">
                  <Button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                    variant="contained"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="reviews">
            <div className="reviewheader">
              <h3 className="reviewsHeading">Ratings & Reviews</h3>
              <Button onClick={submitReviewToggle} variant="outlined">
                Rate Product
              </Button>
            </div>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent>
                <div className="submit_Dialog">
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                  <TextField
                    multiline={true}
                    rows={5}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <div className="submit_Dialog_button">
                    <Button
                      onClick={submitReviewToggle}
                      variant="contained"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={reviewSubmitHandler}
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
              <div className="review">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </div>
        </>
      )}

      {error && (
        <Error prev_state={reload} setprev_state={setreload} />
      )}
    </div>
  );
};

export default ProductDetails;
