import React, {  useState } from "react";
import Drawer from "./Drawer";
import Products from "./Products";
import Orders from './Orders'
import Menu from "@mui/icons-material/Menu";
import "./Admin.scss";
import NewProduct from "./NewProduct";
import UseFetch from "../../Requests/UseFetch";
import UsersComponent from "./Users";
import MetaData from "../layout/MetaData";


const Admin = () => {
  const [opendrawer, setopendrawer] = useState(false);
  const [show, setshow] = useState(2);

  const products = UseFetch("/api/v1/admin/products");
  const users = UseFetch("/api/v1/admin/users");
  const orders = UseFetch("/api/v1/admin/orders");


  const handleshow = (show) => {
    setshow(show);
    setopendrawer(false);
  };

  return (
    <>
    <MetaData title="Admin Dashboard" />
      <div className="menu">
        <Menu onClick={() => setopendrawer(!opendrawer)} />
      </div>
      <div className="options">
        <Drawer opendrawer={opendrawer} handleshow={handleshow} />
      </div>
      <div className="admin container-xxl">
        {show === 1 && <NewProduct />}
        {show === 2 && <Products products_={products} />}
        {show === 3 && <Orders orders_={orders} />}
        {show === 4 && <UsersComponent Users={users} />}
      </div>
    </>
  );
};

export default Admin;
