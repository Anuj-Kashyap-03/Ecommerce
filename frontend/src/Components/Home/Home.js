import React, { useEffect, useState } from "react";
import "./Home.scss";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/Actions/ProductActions";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";


const Home = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  const [reload, setreload] = useState(true)

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, reload]);

  return (
    <div className="home container-xxl">
      <MetaData title="AK Electronics" />
      <div className="heading">
        <h2>Top Selling Products</h2>
      </div>
      <div className="products">
        {loading && <Loader />}
        {!loading && products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

      </div>
      {error && (
            <Error prev_state={reload} setprev_state={setreload} />
      )}
    </div>
  );
};

export default Home;
