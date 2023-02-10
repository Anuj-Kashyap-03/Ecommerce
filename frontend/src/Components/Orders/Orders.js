import React, { useEffect, useState } from "react";
import { myOrders } from "../../Redux/Actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import Order from "./Order";
import MetaData from "../layout/MetaData";
import Error from "../Error/Error";

export default function Orders() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.myOrders);

  const [reload, setreload] = useState(true);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch, reload]);
  return (
    <div>
      <MetaData title="Orders" />
      {loading && <Loader />}
      {orders &&
        orders.map((item, index) => (
          <div key={index + "1ind"}>
            <Order order={item} />
          </div>
        ))}
      {orders && orders.length === 0 && (
        <div style={{ textAlign: "center" }}>No Order Yet</div>
      )}
      {error && <Error prev_state={reload} setprev_state={setreload} />}
    </div>
  );
}
