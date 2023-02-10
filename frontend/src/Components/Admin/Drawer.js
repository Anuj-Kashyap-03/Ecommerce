import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton, ListItemIcon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import "./Drawer.scss";
import { useEffect } from "react";

const Drawer = styled(MuiDrawer)(({ open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    transition: "width 0.5s",
    width: "250px",
    maxWidth: "100vw",
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      width: "0px",
    }),
  },
}));

export default function Drawer_({ opendrawer, handleshow }) {
  const [open, setOpen] = React.useState(false);
  const [activate, setactivate] = React.useState(2);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(opendrawer);
  }, [opendrawer]);

  return (
    <Drawer variant="permanent" className="drawermain" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav" sx={{ height: "auto" }}>
        <ListItemButton
          className={activate === 1 ? "activate" : ""}
          onClick={() => {
            handleshow(1);
            setactivate(1);
          }}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="New Product" />
        </ListItemButton>
        <ListItemButton
          className={activate === 2 ? "activate" : ""}
          onClick={() => {
            handleshow(2);
            setactivate(2);
          }}
        >
          <ListItemIcon>
            <ShoppingBasketIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>
        <ListItemButton
          className={activate === 3 ? "activate" : ""}
          onClick={() => {
            handleshow(3);
            setactivate(3);
          }}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton
          className={activate === 4 ? "activate" : ""}
          onClick={() => {
            handleshow(4);
            setactivate(4);
          }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
