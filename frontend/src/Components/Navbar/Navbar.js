import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PersonIcon from "@mui/icons-material/Person";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [active, setactive] = useState(0);

  const navigate_to_link = (link) => {
    navigate(link);
  };

  const handleClick = (link, activate, event) => {
    navigate_to_link(link);
    // console.log("event: ", event);
    setactive(activate);
  };

  useEffect(() => {
    // console.log(location);
    if (location.pathname === "/") {
      setactive(1);
    }
    else if (location.pathname === "/products") {
      setactive(2);
    }
    else if (["/cart", "/order"].includes(location.pathname)) {
      setactive(3);
    }
    else if (
      ["/profile", "/login", "/admin", "/orders"].includes(location.pathname)
    ) {
      setactive(4);
    }
  }, [location]);
  return (
    <div className="my_navbar">
      <div className="navbar_items">
        <div className={ active === 1 ? `item  active` : "item  "}>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button onClick={(e) => handleClick("/", 1, e)}>
              <div>
                <HomeIcon />
              </div>
              <span>Home</span>
            </Button>
          </motion.div>
        </div>

        <div className={active === 2 ? `item  active` : "item  "}>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button onClick={(e) => handleClick("/products", 2, e)}>
              <div>
                <ShoppingBasketIcon />
              </div>
              <span>Products</span>
            </Button>
          </motion.div>
        </div>

        <div className={active === 3 ? `item active` : "item  "}>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button onClick={(e) => handleClick("/cart", 3, e)}>
              <div>
                <LocalGroceryStoreIcon />
              </div>
              <span>Cart</span>
            </Button>
          </motion.div>
        </div>

        <div className={active === 4 ? `item  active` : "item  "}>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button onClick={(e) => handleClick("/profile", 4, e)}>
              <div>
                <PersonIcon />
              </div>
              <span>Me</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
