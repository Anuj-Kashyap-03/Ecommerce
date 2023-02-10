import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import "./payment.scss";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../Redux/Actions/orderAction";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";


const paymentSchema = Yup.object({
  cardNumber: Yup.string()
    .required("Card number is required")
    .matches(/^[0-9]{16}$/, "Card number must be 16 digits"),
  expiryDate: Yup.string()
    .required("Expiry date is required")
    .matches(/^[0-9]{2}\/[0-9]{2}$/, "Expiry date must be in MM/YY format"),
  cvc: Yup.string()
    .required("CVC is required")
    .matches(/^[0-9]{3}$/, "CVC must be 3 digits"),
  nameOnCard: Yup.string().required("Name on card is required"),
});

export default function PaymentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [payment_method, setpayment_method] = useState(1);

  const User = useSelector((state) => state.User.details._id);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const newOrder = useSelector((state) => state.newOrder);

  const payment_method_is_changed = (e) => {
    setpayment_method(e.target.value);
  };

  const Place_Order = () => {
    if (newOrder.loading){
      return
    }
    let price = 0 ;
    cartItems.forEach((element) => {
      price += element.price * element.quantity;
    });
    // console.log(User);
    dispatch(
      createOrder({
        shippingInfo,
        orderItems: cartItems,
        user: User,
        itemsPrice: price,
        totalPrice: price,
      })
    );
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      nameOnCard: "",
    },
    validationSchema: paymentSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // submit the payment here
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    },
  });


  useEffect(() => {
    if (cartItems.length===0) {
      navigate("/orders")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems.length]);

  return (
    <RadioGroup
      className="payment_method"
      name="controlled-radio-buttons-group"
      value={payment_method}
      onChange={payment_method_is_changed}
    >
      <MetaData title="Confirm payment" />

      <FormControlLabel
        value="Cash ON Delivery"
        control={<Radio />}
        label="Cash ON Delivery"
      />
      <FormControlLabel
        disabled={true}
        value="Online"
        control={<Radio />}
        label="Online"
      />

      {payment_method === "Online" && (
        <form className="payment_form" onSubmit={handleSubmit}>
          <TextField
            name="nameOnCard"
            label="Name On Card"
            type="text"
            value={values.nameOnCard}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            error={Boolean(errors.nameOnCard && touched.nameOnCard)}
            helperText={touched.nameOnCard ? errors.nameOnCard : ""}
          />
          <TextField
            name="cardNumber"
            label="Card number"
            type="number"
            value={values.cardNumber}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            error={Boolean(errors.cardNumber && touched.cardNumber)}
            helperText={touched.cardNumber ? errors.cardNumber : ""}
          />
          <div className="expiry_and_cvc">
            <TextField
              name="expiryDate"
              label="Expiry date (MM/YY)"
              type="text"
              value={values.expiryDate}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              error={Boolean(errors.expiryDate && touched.expiryDate)}
              helperText={touched.expiryDate ? errors.expiryDate : ""}
            />
            <TextField
              name="cvc"
              label="CVC"
              type="number"
              value={values.cvc}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              error={Boolean(errors.cvc && touched.cvc)}
              helperText={touched.cvc ? errors.cvc : ""}
            />
          </div>
          <Button color="primary" variant="contained" type="submit">
            Make Payment
          </Button>
        </form>
      )}
      {payment_method === "Cash ON Delivery" && (
        <Button
          color="primary"
          disabled={newOrder.loading ? true : false}
          onClick={Place_Order}
          variant="contained"
        >
          Place Order
        </Button>
      )}
    </RadioGroup>
  );
}
