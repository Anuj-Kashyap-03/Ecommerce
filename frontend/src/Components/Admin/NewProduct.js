import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./NewProduct.scss";
import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import { AddNewProduct } from "../../Redux/Actions/ProductActions";
import { useDispatch } from "react-redux";

const NewProduct = () => {
  const dispatch=useDispatch()
  const [opencate, setopencate] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const closeCategeries = () => {
    setopencate(false);
  };

  const openCategeries = () => {
    setopencate(true);
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(AddNewProduct(myForm))
  };

  const imageisloaded = async (res) => {
    setImagesPreview((old) => [...old, ...imagesPreview, res]);
    setImages((old) => [...old, ...images, res]);
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageisloaded(reader.result);
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <div className="heading">
        <h1>Add New Product</h1>
      </div>
      <form
        className="newproduct"
        encType="multipart/form-data"
        onSubmit={createProductSubmitHandler}
      >
        <div className="createproduct">
          <div className="left">
            <div className="formitem">
              <label>Product Name</label>
              <TextField
                // disabled={!EditForm || disableButtonsofaccountsetting}
                fullWidth={true}
                type="text"
                name="productname"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="formitem">
              <label>Price (in Rs.)</label>
              <TextField
                // disabled={!EditForm || disableButtonsofaccountsetting}
                fullWidth={true}
                type="number"
                name="price"
                required
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="formitem">
              <label>Stock</label>
              <TextField
                // disabled={!EditForm || disableButtonsofaccountsetting}
                fullWidth={true}
                type="number"
                name="stock"
                required
                value={Stock}
                onChange={(e) => {
                  setStock(e.target.value);
                }}
              />
            </div>
            <div className="formitem">
              <label>Description</label>
              <TextField
                // disabled={!EditForm || disableButtonsofaccountsetting}
                fullWidth={true}
                type="text"
                name="description"
                required
                value={description}
                multiline={true}
                rows={3}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="formitem">
              <label>Category</label>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={opencate}
                onClose={closeCategeries}
                required
                onOpen={openCategeries}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((item, index) => (
                  <MenuItem key={index + "m"} value={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="right">
            <div className="formitem files">
              <label> Images</label>
              <input
                type="file"
                id="files"
                required
                name="files"
                accept="image/*"
                onClick={createProductImagesChange}
                multiple
              />
              <label> See preview below </label>
            </div>
            <div className="images">
              {imagesPreview.map((image, index) => (
                <div key={index}>
                  <img src={image} alt="Product Preview" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="formcontrol">
          <Button
            type="submit"
            // disabled={disableButtonsofaccountsetting}
            variant="contained"
          >
            Create Product
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default NewProduct;
