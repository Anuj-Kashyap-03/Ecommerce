import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { PutRequest } from "../../Requests/Requests";
import { UpdateUser } from "../../Redux/Actions/UserAction";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { ShowAlert } from "../../Redux/Actions/AlertAction";
import * as Yup from "yup";

const UserInforFormSchema = Yup.object({
  firstname: Yup.string()
    .max(15, "Must be 15 characters or less")
    .min(3, "Must be 3 characters or more")
    .required("Required"),
  lastname: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be a valid number")
    .required("Required"),
});

export default function UserInforForm() {
  const dispatch = useDispatch();

  const { details } = useSelector((state) => state.User);

  const UserInforForm = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    },
    validationSchema: UserInforFormSchema,
    onSubmit: (values) => {
      AccountSettingFormSubmitted(values);
    },
  });

  const [runEffect, setrunEffect] = useState(true);

  const [EditForm, setEditForm] = useState(false);
  const [showLoadinginUpdae, setshowLoadinginUpdae] = useState(false);

  const AccountSettingFormSubmitted = async (values) => {
    setshowLoadinginUpdae(true);
    const result = await PutRequest("/api/v1/me/update", false, values);
    if (result.success === true) {
      setEditForm(false);
      dispatch(UpdateUser({ details: result.data.user }));
      dispatch(ShowAlert("Your details  updated Successfully"));
    } else {
      dispatch(ShowAlert("Your details not updated. Please try again", false));
    }
    setshowLoadinginUpdae(false);
  };

  const CancelButtonhandler = () => {
    setrunEffect(!runEffect);
    setEditForm(false);
  };

  /**
   * When the user clicks the edit button, the edit form will appear.
   */
  const EditAccountSetting = () => {
    setEditForm(true);
  };

  useEffect(() => {
    UserInforForm.setValues({
      firstname: details.firstname ? details.firstname : "",
      lastname: details.lastname ? details.lastname : "",
      email: details.email ? details.email : "",
      phone: details.phone ? details.phone : "",
    });
    UserInforForm.setErrors({});
    UserInforForm.setTouched({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runEffect]);

  return (
    <div className="bg-white shadow rounded-lg d-block d-sm-flex">
      <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
        <div role="tabpanel" aria-labelledby="account-tab">
          <h3 className="mb-4">Account Settings</h3>

          <form onSubmit={UserInforForm.handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>First Name</label>
                  <TextField
                    disabled={!EditForm || showLoadinginUpdae}
                    fullWidth={true}
                    type="text"
                    name="firstname"
                    error={Boolean(
                      UserInforForm.errors.firstname &&
                        UserInforForm.touched.firstname
                    )}
                    helperText={
                      UserInforForm.touched.firstname &&
                      UserInforForm.errors.firstname
                    }
                    onChange={UserInforForm.handleChange}
                    onBlur={UserInforForm.handleBlur}
                    value={UserInforForm.values.firstname}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Last Name</label>
                  <TextField
                    disabled={!EditForm || showLoadinginUpdae}
                    fullWidth={true}
                    type="text"
                    name="lastname"
                    error={Boolean(
                      UserInforForm.errors.lastname &&
                        UserInforForm.touched.lastname
                    )}
                    helperText={
                      UserInforForm.touched.lastname &&
                      UserInforForm.errors.lastname
                    }
                    onChange={UserInforForm.handleChange}
                    onBlur={UserInforForm.handleBlur}
                    value={UserInforForm.values.lastname}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Email</label>
                  <TextField
                    disabled={!EditForm || showLoadinginUpdae}
                    fullWidth={true}
                    type="text"
                    name="email"
                    error={Boolean(
                      UserInforForm.errors.email && UserInforForm.touched.email
                    )}
                    helperText={
                      UserInforForm.touched.email && UserInforForm.errors.email
                    }
                    onChange={UserInforForm.handleChange}
                    onBlur={UserInforForm.handleBlur}
                    value={UserInforForm.values.email}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Phone number</label>
                  <TextField
                    disabled={!EditForm || showLoadinginUpdae}
                    fullWidth={true}
                    type="text"
                    name="phone"
                    error={Boolean(
                      UserInforForm.errors.phone && UserInforForm.touched.phone
                    )}
                    helperText={
                      UserInforForm.touched.phone && UserInforForm.errors.phone
                    }
                    onChange={UserInforForm.handleChange}
                    onBlur={UserInforForm.handleBlur}
                    value={UserInforForm.values.phone}
                  />
                </div>
              </div>
            </div>
            <div className="form_buttons">
              {EditForm && (
                <Button
                  disabled={showLoadinginUpdae}
                  type="submit"
                  variant="contained"
                >
                  <span>{showLoadinginUpdae ? "Updating..." : "Update"}</span>
                  {showLoadinginUpdae && (
                    <CircularProgress
                      sx={{ color: "white", marginLeft: "30px" }}
                      size={20}
                      disableShrink
                    />
                  )}
                </Button>
              )}
            </div>
          </form>
          {!EditForm && (
            <Button
              type="text"
              disabled={showLoadinginUpdae}
              variant="contained"
              onClick={EditAccountSetting}
            >
              Edit
            </Button>
          )}
          {EditForm && !showLoadinginUpdae && (
            <Button
              className="cancelbutton"
              type="text"
              disabled={showLoadinginUpdae}
              color="error"
              variant="contained"
              onClick={CancelButtonhandler}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
