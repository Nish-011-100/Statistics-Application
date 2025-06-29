import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

export default function EditOrderModal(props) {
  const [formData, setFormData] = useState({
    quantity: props.quantity,
    totalPrice: 1,
    date: dayjs(Date.now()).format("YYYY-MM-DD"),
  });
  const { host } = useContext(Context);

  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(props.productId);
  const [selectedSupplier, setSelectedSupplier] = useState(props.supplierId);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleChangeProduct = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleChangeSupplier = (e) => {
    setSelectedSupplier(e.target.value);
  };

  const handleChangeQuantity = (e) => {
    const quantity = parseInt(e.target.value) || 0;
    setFormData({ ...formData, quantity });
  };

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setFormData({ ...formData, date: formattedDate });
  };

  const handleChangeTotalPrice = (e) => {
    const value = parseFloat(e.target.value);
    setFormData({
      ...formData,
      totalPrice: value,
    });
  };

  const editOrder = async () => {
    try {
      const url = `${host}/Order/editOrder`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProductId: selectedProduct,
          SupplierId: selectedSupplier,
          Date: formData.date,
          Quantity: formData.quantity,
          TotalBill: formData.totalPrice,
          orderId: props.orderId,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        const json = await response.json();
        return json;
      }
    } catch (error) {
      console.log("Error occurred:", error);
      return [];
    }
  };

  const getProducts = async () => {
    try {
      const url = `${host}/Product/getProducts`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        const json = await response.json();
        setProducts(json.products);
        setSelectedProduct(props.productId);
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const getSuppliers = async () => {
    try {
      const url = `${host}/Supplier/getSuppliers`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        const json = await response.json();
        setSuppliers(json.suppliers);
        setSelectedSupplier(props.supplierId);
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editOrder();
    await props.getOrders();
    props.handleClose();
  };

  useEffect(() => {
    getProducts();
    getSuppliers();

    const formattedDate = dayjs(props.date, "MMM DD, YYYY").format(
      "YYYY-MM-DD"
    );
    
    setFormData((prevState) => ({
      ...prevState,
      quantity: props.quantity,
      totalPrice: props.totalPrice,
      date: formattedDate,
    }));
    
  }, [props]);

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl fullWidth>
            <InputLabel id="product-select-label">Product ID</InputLabel>
            <Select
              labelId="product-select-label"
              id="product-select"
              value={selectedProduct}
              label="Product ID"
              onChange={handleChangeProduct}
            >
              {products.map((product) => (
                <MenuItem key={product.ID} value={product.ID}>
                  {product.ID + " " + product.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="supplier-select-label">Supplier ID</InputLabel>
            <Select
              labelId="supplier-select-label"
              id="supplier-select"
              value={selectedSupplier}
              label="Supplier ID"
              onChange={handleChangeSupplier}
            >
              {suppliers.map((supplier) => (
                <MenuItem key={supplier.ID} value={supplier.ID}>
                  {supplier.ID + " " + supplier.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField
              id="quantity-input"
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChangeQuantity}
              inputProps={{ min: 1 }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <TextField
              id="total-price-input"
              label="Total Price"
              type="number"
              value={formData.totalPrice}
              onChange={handleChangeTotalPrice}
              inputProps={{ min: 1 }}
              name="totalPrice"
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={dayjs(formData.date)}
                onChange={handleDateChange}
                view="day"
              />
            </LocalizationProvider>
          </FormControl>
          <div className="flex pt-2 justify-end">
            <Button variant="contained" onClick={handleSubmit}>
              Edit
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
