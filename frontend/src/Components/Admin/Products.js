import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import "./products.scss";


const Products = ({ products_ }) => {
  const { data, loading, error } = products_;
  const [products, setproducts] = useState(null)

  const edit_product = (id) => {

  }

  const delete_product = (id, index) => {
    if (window.confirm("Are you sure you want to delete product\nPlease confirm the product id : " + id)) {
      const products_copy=[...products]
      products_copy.splice(index,1)
      setproducts(products_copy)
      // console.log("products_copy",products_copy)
      // console.log("index",index)
    }
  }

  useEffect(() => {
    // console.log("products", data);
    if (data) {
      setproducts(data.products)
    }
  }, [data]);

  return (
    <div className="products">
      <div className="heading">
        <h1>All Products</h1>
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
                <TableCell>Crated On</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Product Id</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Created by</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products && products.map((item, index) => (
                <TableRow key={index + "aa"}>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{"Rs. " + item.price}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.Stock}</TableCell>
                  <TableCell>{item.user}</TableCell>
                  <TableCell>
                    <div className="edit_or_delete">
                      <IconButton
                        aria-label="delete"
                        className="edit"
                        size="large"
                        onClick={() => edit_product(item._id, index)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        className="delete"
                        size="large"
                        onClick={() => delete_product(item._id,index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Products;
