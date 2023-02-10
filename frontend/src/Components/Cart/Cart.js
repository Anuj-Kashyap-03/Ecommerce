import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link, useNavigate } from "react-router-dom";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../Redux/Actions/cartAction";
import "./Card.scss";
import { Button, Divider, IconButton } from "@mui/material";
import MetaData from "../layout/MetaData";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const price = () => {
    let price = 0;
    cartItems.forEach((element) => {
      price += element.price * element.quantity;
    });
    return price;
  };

  const Price = price();

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const PlaceOrder = () => {
    navigate("/order");
  };

  return (
    <div className="cart_page">
      <MetaData title="My Cart" />
      <div className="card_items">
        {cartItems.map((item, i) => (
          <div key={i + "jkd"} className="card_item">
            <Link to={`/product/${item.product}`}>
              <div className="image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="description">
                <div className="name">
                  <p>{item.name}</p>
                </div>
                <div className="price">
                  <span>{`₹${item.price}`}</span>
                </div>
              </div>
            </Link>
            <div className="item_control">
              <div className="quantity">
                <IconButton
                  onClick={() => decreaseQuantity(item.product, item.quantity)}
                  aria-label="delete"
                  color="primary"
                >
                  <RemoveIcon />
                </IconButton>
                <input readOnly type="number" value={item.quantity} />
                <IconButton
                  aria-label="delete"
                  onClick={() =>
                    increaseQuantity(item.product, item.quantity, item.stock)
                  }
                  color="primary"
                >
                  <AddIcon />
                </IconButton>
              </div>
              <div className="remove_from_card">
                <Button
                  onClick={() => deleteCartItems(item.product)}
                  variant="contained"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cartItems.length > 0 ? (
        <>
          <div className="price_details">
            <h2>Price Details</h2>
            <Divider variant="middle" />
            <div className="price">
              <span>Price ({cartItems.length} items)</span>
              <span>₹ {Price}</span>
            </div>
            <div className="Delivery_Charges">
              <span>Delivery Charges</span>
              <span style={{ color: "green" }}>Free</span>
            </div>
            <Divider variant="middle" />
            <div className="total">
              <span>Total</span>
              <span>₹ {Price > 1000 ? Price : Price + 200}</span>
            </div>
          </div>
          <div className="place_order">
            <Button onClick={PlaceOrder} color="primary" variant="contained">
              Checkout
            </Button>
          </div>
        </>
      ) : (
        <div style={{textAlign:"center"}}>No Product in cart yet</div>
      )}
    </div>
  );
}
