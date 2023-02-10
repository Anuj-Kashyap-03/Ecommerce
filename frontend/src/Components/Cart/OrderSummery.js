import React from "react";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./OrderSummery.scss";
import { Button, Divider } from "@mui/material";
import MetaData from "../layout/MetaData";

export default function OrderSummery({ activateStep }) {

  const { cartItems } = useSelector((state) => state.cart);
  const { name, address, city, state, pincode, phone } = useSelector(
    (state) => state.cart.shippingInfo
  );

  const price = () => {
    let price = 0;
    cartItems.forEach((element) => {
      price += element.price * element.quantity;
    });
    return price;
  };

  const Price = price();

  return (
    <>
      <MetaData title="Order Summery" />
      <div className="confirm_order">
        <div className="address">
          <h3>Address</h3>
          <address>
            {name}
            <br />
            {address}
            <br />
            {city}
            <br />
            {state}
            <br />
            {pincode}
            <br />
            {phone}
          </address>
        </div>
        <div className="card_items">
          {cartItems.map((item, i) => (
            <div key={i + "hj"} className="card_item">
              <Link to={`/product/item.product}`}>
                <div className="image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="description">
                  <div className="name">
                    <p>{item.name}</p>
                  </div>
                  <div className="price">
                    <span>{`Price : ₹${item.price}`}</span>
                    <span>{`Quantity : ${item.quantity}`}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="price_details">
          <h2>Price Details</h2>
          <Divider variant="middle" />
          <div className="price">
            <span>Price ({cartItems.length} items)</span>
            <span>₹ {Price}</span>
          </div>
          <div className="Delivery_Charges">
            <span>Delivery Charges</span>
            <span>{Price > 1000 ? "Free" : "₹ 200"}</span>
          </div>
          <Divider variant="middle" />
          <div className="total">
            <span>Total</span>
            <span>₹ {Price > 1000 ? Price : Price + 200}</span>
          </div>
        </div>
        <div className="buttons_">
          <div className="prev">
            <Button variant="contained" onClick={() => activateStep(0)}>
              Back
            </Button>
          </div>
          <div className="continue">
            <Button variant="contained" onClick={() => activateStep(2)}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
