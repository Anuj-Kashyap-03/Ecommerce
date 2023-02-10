import React from "react";
import Divider from "@mui/material/Divider";
import dateFormat from "dateformat";
import "./Order.scss";

const Product = ({ item }) => {
  return (
    <div className="odered_product">
      <div className="product_description">
        <div className="image">
          <img src={item.image} alt={item.name}></img>
        </div>
        <div className="name">{item.name}</div>
      </div>
      <div className="product_price">
        <div className="price"> ₹  {item.price} </div>
        <div className="quantity">Qty : {item.quantity}</div>
      </div>
    </div>
  );
};

export default function Order({order}) {


  return (
    <div className="order_details">

      <div className="id_and_status">
        <div className="id">
          <h5>Order Id : {order._id}</h5>
        </div>
        <div>
          <div className="date">
            <span>Order Date :</span> {dateFormat(order.createdAt, "fullDate")}
          </div>
          <div className="status">{order.orderStatus}</div>
        </div>
      </div>
      <Divider variant="fullWidth" />

      <div className="ordered_products">
        {order.orderItems.map((item, i) => (
          <Product key={"an"+i} item={item} />
        ))}
        <div className="charges" >
          <span className="charges_left">+ delivery charges</span>{" "}
          <span style={{ color: "green" }}> Free </span>
        </div>
      </div>
      <Divider variant="fullWidth" />
      <div className="total"> ₹ { order.totalPrice}</div>
      <Divider variant="fullWidth" />

      <div className="other_details">
        <div className="payment">
          <h3>Payment</h3>
          <div>
            <span>Cash On Delivery</span>
          </div>
        </div>
        <div className="delivery">
          <h3>Delivery</h3>
          <div>
            <address>
              {order.shippingInfo.address},
              <br />
              {order.shippingInfo.city},
              <br />
              {order.shippingInfo.state},
              <br />
              {order.shippingInfo.pincode},
              <br />
              {order.shippingInfo.phone},
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}
