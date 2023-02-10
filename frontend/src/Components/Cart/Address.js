import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Address.scss";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../Redux/Actions/cartAction";
import MetaData from "../layout/MetaData";

const addressSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .required("Name is required"),
  address: Yup.string()
    .min(2, "Address is too short")
    .max(100, "Address is too long")
    .required("Address is required"),
  city: Yup.string()
    .min(2, "City name is too short")
    .max(50, "City name is too long")
    .required("City name is required"),
  state: Yup.string()
    .min(2, "State name is too short")
    .max(50, "State name is too long")
    .required("State name is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pin code must be a 6-digit number")
    .required("Pin code is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be a 10-digit number")
    .required("Phone number is required"),
});

export default function AddressForm({ activateStep }) {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const { values, touched, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: shippingInfo.name || "",
      address: shippingInfo.address || "",
      city: shippingInfo.city || "",
      state: shippingInfo.state || "",
      pincode: shippingInfo.pincode || "",
      phone: shippingInfo.phone || "",
    },
    validationSchema: addressSchema,
    onSubmit: (values) => {
      dispatch(saveShippingInfo(values));
      activateStep(1);
    },
  });
  return (
    <>
      <MetaData title="Confirm Address" />
      <form className="address_form" onSubmit={handleSubmit}>

        <div className="name_and_phone">
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            value={values.name}
            onChange={handleChange}
            fullWidth
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            name="phone"
            label="Phone"
            type="number"
            variant="outlined"
            value={values.phone}
            onChange={handleChange}
            fullWidth
            error={touched.phone && Boolean(errors.phone)}
            helperText={touched.phone && errors.phone}
          />
        </div>
        <TextField
          name="address"
          label="Address"
          multiline={true}
          rows={3}
          value={values.address}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          error={touched.address && Boolean(errors.address)}
          helperText={touched.address && errors.address}
        />
        <div className="city_and_state">
          <TextField
            name="city"
            label="City "
            value={values.city}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            error={touched.city && Boolean(errors.city)}
            helperText={touched.city && errors.city}
          />
          <TextField
            name="state"
            label="State "
            value={values.state}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            error={touched.state && Boolean(errors.state)}
            helperText={touched.state && errors.state}
          />
        </div>

        <TextField
          name="pincode"
          label="Pin code"
          className="pincode"
          type="number"
          value={values.pincode}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          error={touched.pincode && Boolean(errors.pincode)}
          helperText={touched.pincode && errors.pincode}
        />
        <div className="confirm_address">
          <Button color="primary" variant="contained" type="submit">
            Confirm Address
          </Button>
        </div>
      </form>
    </>
  );
}
