import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import  CircularProgress  from "@mui/material/CircularProgress";
import TableRow from "@mui/material/TableRow";
import "./Users.scss";


const Users = ({ Users }) => {
  const { data, loading, error } = Users;
  return (
    <div className="products">
      <div className="heading">
        <h1>All Products</h1>
      </div>
      {loading && <div className="loader">
      <CircularProgress  />
      </div>}
      {!loading && data && !error && (
        <div className="mytable">
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Joined On</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.users.map((element, index) => (
                <TableRow key={index + "ghf"}>
                  <TableCell>{element.createdAt}</TableCell>
                  <TableCell>
                    {element.firstname + " " + element.lastname}
                  </TableCell>
                  <TableCell>{element.email}</TableCell>
                  <TableCell>{element.phone}</TableCell>
                  <TableCell>{`$${element.role}`}</TableCell>
                  <TableCell>
                    <div className="edit_or_delete">
                      <IconButton
                        aria-label="delete"
                        className="edit"
                        size="large"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        className="delete"
                        size="large"
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
      )}{" "}
    </div>
  );
};

export default Users;
