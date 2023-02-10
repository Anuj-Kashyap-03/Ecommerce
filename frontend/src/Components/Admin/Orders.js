import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import MenuItem from "@mui/material/MenuItem";
import ClearIcon from "@mui/icons-material/Clear";
import TableCell from "@mui/material/TableCell";
import UpdateIcon from "@mui/icons-material/Update";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { ShowAlert } from "../../Redux/Actions/AlertAction";
import Select from "@mui/material/Select";
import "./Orders.scss";
import axios from "axios";

const TableDataRow = ({ item_ }) => {
  const dispatch = useDispatch();

  const [item, setitem] = useState(item_);
  const [status, setstatus] = useState("default");
  const [select, setselect] = useState({ value: "" });
  const [request, setrequest] = useState({
    make: false,
    success: true,
    loading: false,
  });

  const edit_order = async () => {
    setstatus("edit");
  };

  const update_product = () => {
    setrequest({ ...request, make: true });
  };

  const cancel = () => {
    setrequest({ ...request, make: false });
    setstatus("default");
  };

  const send_request_for_edit = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (!(select.value.trim() === "")) {
        await axios.put(
          `/api/v1/admin/order/${item._id}`,
          { status : select.value },
          config
        );
      } else {
        // setstatus("default");
        setrequest({ make: false, loading: false, success: true });
        dispatch(ShowAlert("Please Select the valid status", false));
        return;
      }
      setrequest({ make: false, loading: false, success: true });
      setitem({ ...item, orderStatus: select.value });
      dispatch(ShowAlert("Order status is updated successfully"));
      setstatus("default");
    } catch (error) {
      dispatch(ShowAlert("Order status is not updated", false));
      setrequest({ ...request, make: false, loading: false, success: false });
    }
  };
  useEffect(() => {
    if (request.make) {
      setrequest({ ...request, loading: true });
      send_request_for_edit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request.make]);
  return (
    <>
      <TableCell>{item.createdAt}</TableCell>
      <TableCell>{item.user}</TableCell>
      <TableCell>{item._id}</TableCell>
      <TableCell>{item.paymentInfo.status}</TableCell>
      <TableCell>{"Rs. " + item.totalPrice}</TableCell>
      {status === "default" && (
        <>
          <TableCell>{item.orderStatus}</TableCell>
          <TableCell>
            <div className="edit_or_delete">
              <IconButton
                aria-label="delete"
                className="edit"
                size="large"
                onClick={() => edit_order(item._id)}
              >
                <EditIcon />
              </IconButton>
            </div>
          </TableCell>
        </>
      )}
      {status === "edit" && (
        <>
          <TableCell>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={select.value}
              onChange={(e) => setselect({ ...select, value: e.target.value })}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Shipped">
                <em>Shipped</em>
              </MenuItem>
              <MenuItem value="Delivered">
                <em>Delivered</em>
              </MenuItem>
            </Select>
          </TableCell>

          <TableCell>
            <div className="edit_or_delete" style={{ display: "flex" }}>
              <IconButton
                aria-label="delete"
                className="edit"
                size="large"
                onClick={() => update_product()}
              >
                <UpdateIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                className="delete"
                size="large"
                onClick={() => cancel()}
              >
                <ClearIcon />
              </IconButton>
            </div>
          </TableCell>
        </>
      )}
    </>
  );
};

const Orders = ({ orders_ }) => {
  const { data, loading, error } = orders_;
  const [orders, setorders] = useState(null);

  useEffect(() => {
    if (data) {
      setorders(data.orders);
    }
  }, [data]);

  return (
    <div className="orders">
      <div className="heading">
        <h1>All Orders</h1>
      </div>
      {loading && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
      {!loading && data && !error && (
        <div className="mytable">
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Placed On</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Order Id</TableCell>
                <TableCell>Payment </TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Status</TableCell>
                {/* <TableCell>Stock</TableCell>
                <TableCell>Created by</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((item, index) => (
                  <TableRow key={index + "akl"}>
                    <TableDataRow item_={item} />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Orders;
