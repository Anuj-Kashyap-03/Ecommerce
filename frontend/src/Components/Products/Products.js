import React, { useEffect, useState } from "react";
import "./Products.scss";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/Actions/ProductActions";
import ProductCard from "./Product";
import TuneIcon from "@mui/icons-material/Tune";
import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ShowAlert } from "../../Redux/Actions/AlertAction";
import Error from "../Error/Error";

const categories = ["Laptops", "Phones","Tv", "Refrigerators", "Washing Machines"];
const min_Price_list = [0, 10000, 20000, 50000];
const max_Price_list = [10000, 20000, 50000, 100000];

function Products() {
  const dispatch = useDispatch();

  const [try_to_change_page, settry_to_change_page] = useState(1);
  const [runEffect, setrunEffect] = useState(true);

  const { loading, error, products, filteredProductsCount } = useSelector(
    (state) => state.products
  );

  const [timeoutid, settimeoutid] = useState(null);
  const [page, setpage] = useState(1);

  const [search_for, setsearch_for] = useState("");
  const [search, setsearch] = useState("");

  const [show_filter_side, setshow_filter_side] = useState(false);
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(100000);
  const [category, setcategory] = useState("");
  const [filters, setfilters] = useState();
  const [isfilters_applied, setisfilters_applied] = useState(false);

  const clear_filters = () => {
    setfilters(null);
    setcategory(null);
    setisfilters_applied(false);
    setshow_filter_side(false);
    setpage(1);
    dispatch(ShowAlert("Cleared all filters Successfully"));
  };

  const Search_field_is_changed = (e) => {
    if (timeoutid) {
      clearTimeout(timeoutid);
      // console.log("timeoutid: ", timeoutid);
    }
    if (e.target.value.trim() === "" && !(search_for === "")) {
      // console.log(search);
      setpage(1);
      setsearch_for("");
    }
    setsearch(e.target.value);
    let Timeout = setTimeout(() => {
      setsearch_for(e.target.value);
      setpage(1);
    }, 1000);
    settimeoutid(Timeout);
  };

  const filter = () => {
    if (min >= max) {
      dispatch(ShowAlert("Please Select the valid range", false));
      return;
    }
    setisfilters_applied(true);
    if (category) {
      setfilters([`${category}`, `Price Range (${min} to ${max})`]);
    } else {
      setfilters([`Price Range (${min} to ${max})`]);
    }
    setpage(1);
    setshow_filter_side(false);
    setrunEffect(!runEffect);
    dispatch(ShowAlert("Filters Applied Successfully"));
  };

  const clicked_on_clear_field_button = () => {
    setsearch("");
    setsearch_for("");
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      // console.log("return");
      return;
    }
    // console.log("handlescroll");
    settry_to_change_page(!try_to_change_page);
  };

  useEffect(() => {
    if (isfilters_applied) {
      // console.log("isfilters_applied");
      dispatch(getProducts(search_for, page, [min, max], category || ""));
    } else {
      // console.log("isfilters_applied not");
      dispatch(getProducts(search_for, page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search_for, isfilters_applied, dispatch, runEffect]);

  useEffect(() => {
    // console.log("settry_to_change_page");
    if (!loading && !(try_to_change_page === 1)) {
      // console.log("loading: ", loading);
      if (filteredProductsCount > page * 8) {
        setpage(page + 1);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [try_to_change_page]);

  return (
    <div className="products container-xxl">
      <MetaData title="Products" />
      <div className="filters_and_products">
        <div
          className={
            "filters" + (show_filter_side ? " shadow showfilters" : "")
          }
        >
          <div className="close_side_filters">
            <IconButton onClick={() => setshow_filter_side(false)}>
              <ClearIcon />
            </IconButton>
          </div>
          <div className="applied_filters">
            <h3>Applied Filters</h3>
            <div className="filters_list">
              {!filters && <div>No filter is applied</div>}
              {filters &&
                filters.map((item, index) => (
                  <div key={index + "hkj"} className="filter_name">
                    {item}
                  </div>
                ))}
            </div>
            <div>
              <Button
                onClick={clear_filters}
                variant="outlined"
                className="clearfilters"
              >
                clear filters
              </Button>
            </div>
          </div>
          <div className="categories">
            <h3>Categories</h3>

            <ToggleButtonGroup
              orientation="vertical"
              value={category}
              exclusive
              onChange={(event, value) => {
                setcategory(value);
              }}
            >
              {categories.map((item, index) => (
                <ToggleButton key={index + "hj"} value={item} aria-label="list">
                  {item}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
          <div className="range">
            <h3>Price</h3>
            <div>
              <TextField
                select
                value={min}
                onChange={(event) => setmin(event.target.value)}
                size="small"
                variant="filled"
              >
                {min_Price_list.map((item, index) => (
                  <MenuItem key={index + "jvn"} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
              <p>to</p>
              <TextField
                select
                value={max}
                onChange={(event) => setmax(event.target.value)}
                size="small"
                variant="filled"
              >
                {max_Price_list.map((item, index) => (
                  <MenuItem key={index + "jvn"} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <div className="apply">
            <Button variant="contained" onClick={filter}>
              Apply filters
            </Button>
          </div>
          <div></div>
        </div>
        <div className="products_">
          <div className="topdiv">
            <IconButton
              onClick={() => setshow_filter_side(true)}
              className="show_filter_button"
              color="secondary"
            >
              <TuneIcon />
            </IconButton>
            <form className="search-form">
              <TextField
                className="search-field"
                placeholder="Search for a product"
                value={search}
                onChange={Search_field_is_changed}
              />
              <div className="form_control">
                {!(search.trim === "") && (
                  <IconButton onClick={clicked_on_clear_field_button}>
                    <ClearIcon />
                  </IconButton>
                )}
              </div>
            </form>
          </div>
          {products &&
            products.map((product) => (
              <div key={product._id + "jkh"}>
                <ProductCard product={product} />
              </div>
            ))}
          {!error && (loading || filteredProductsCount > products.length) && (
            <div className="loader2">
              <CircularProgress />
            </div>
          )}
          {!error && !loading && (!products || products.length === 0) && (
            <div style={{ textAlign: "center" }}> No Product Found </div>
          )}
          {error && (
            <Error prev_state={runEffect} setprev_state={setrunEffect} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
