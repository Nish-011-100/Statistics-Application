import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import AddOrderModal from "./AddOrderModal";
import EditOrderModal from "./EditOrderModal";
import DeleteOrderModal from "./DeleteOrderModal";

import PropTypes from "prop-types";
import IconButton from "@mui/joy/IconButton";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

export default function Order() {
  const [clickedOrder, setClickedOrder] = useState({});

  const [addOrderOpen, setAddOrderOpen] = useState(false);
  const handleAddOrderOpen = () => {
    setAddOrderOpen(true);
  };
  const handleAddOrderClose = () => setAddOrderOpen(false);

  const [editOrderOpen, setEditOrderOpen] = useState(false);
  const handleEditOrderOpen = () => {
    setEditOrderOpen(true);
  };
  const handleEditOrderClose = () => setEditOrderOpen(false);

  const [deleteOrderOpen, setDeleteOrderOpen] = useState(false);
  const handleDeleteOrderOpen = () => {
    setDeleteOrderOpen(true);
  };
  const handleDeleteOrderClose = () => setDeleteOrderOpen(false);

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(props.initialOpen || false);

    return (
      <React.Fragment>
        <tr>
          <td>
            <IconButton
              aria-label="expand row"
              variant="plain"
              color="neutral"
              size="sm"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </td>
          <th scope="row">{row.ID}</th>
          <td>{row.product}</td>
          <td>{row.supplier}</td>
          <td>{row.quantity}</td>
          <td>{row.price}</td>
        </tr>
        <tr>
          <td style={{ height: 0, padding: 0 }} colSpan={6}>
            {open && (
              <Sheet
                variant="soft"
                sx={{
                  p: 1,
                  pl: 6,
                  boxShadow: "inset 0 3px 6px 0 rgba(0 0 0 / 0.08)",
                }}
              >
                <Typography level="body-lg" component="div">
                  Detail
                </Typography>
                <Table
                  borderAxis="bothBetween"
                  size="sm"
                  aria-label="purchases"
                  sx={{
                    "& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)":
                      { textAlign: "center" },
                    "--TableCell-paddingX": "0.5rem",
                  }}
                >
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Supplier ID</th>
                      <th>Date</th>
                      <th>Unit Price</th>
                      <th>Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {row.detail.map((detailRow) => (
                      <tr key={detailRow.date}>
                        <th scope="row">{detailRow.productId}</th>
                        <td>{detailRow.supplierId}</td>
                        <td>{row.date}</td>
                        <td>{(row.price / row.quantity).toFixed(2)}</td>
                        <td>
                          <Button
                            size="small"
                            color="warning"
                            variant="outlined"
                            sx={{ marginLeft: 2 }}
                            onClick={() => {
                              setClickedOrder(row);
                              handleEditOrderOpen();
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            sx={{ marginLeft: 2 }}
                            onClick={() => {
                              setClickedOrder(row);
                              handleDeleteOrderOpen();
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Sheet>
            )}
          </td>
        </tr>
      </React.Fragment>
    );
  }

  Row.propTypes = {
    initialOpen: PropTypes.bool,
    row: PropTypes.shape({
      orderID: PropTypes.string.isRequired,
      product: PropTypes.number.isRequired,
      supplier: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      detail: PropTypes.arrayOf(
        PropTypes.shape({
          productId: PropTypes.string.isRequired,
          supplierId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  };

  const { host } = useContext(Context);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const url = `${host}/Order/getOrders`;
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
        setOrders(json.result);
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  return (
    <>
      <div className="mx-4">
        <h5 className="text-4xl mt-4">Orders</h5>
        <hr className="h-px my-6 mx-auto bg-gray-400 border-0 dark:bg-gray-700"></hr>
      </div>
      <div className="mx-auto my-10 shadow-2xl">
        <Sheet>
          <Table
            aria-label="collapsible table"
            sx={{
              "& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)":
                { textAlign: "center" },
              '& > tbody > tr:nth-child(odd) > td, & > tbody > tr:nth-child(odd) > th[scope="row"]':
                {
                  borderBottom: 0,
                },
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    width: 40,
                    backgroundColor: "#1976D2",
                    color: "#FFFFFF",
                  }}
                  aria-label="empty"
                />
                <th
                  style={{
                    width: "20%",
                    backgroundColor: "#1976D2",
                    color: "#FFFFFF",
                  }}
                >
                  Order ID
                </th>
                <th style={{ backgroundColor: "#1976D2", color: "#FFFFFF" }}>
                  Product
                </th>
                <th style={{ backgroundColor: "#1976D2", color: "#FFFFFF" }}>
                  Supplier
                </th>
                <th style={{ backgroundColor: "#1976D2", color: "#FFFFFF" }}>
                  Quantity
                </th>
                <th style={{ backgroundColor: "#1976D2", color: "#FFFFFF" }}>
                  Total Price (Rs.)
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <Row key={order.ID} row={order} />
              ))}
            </tbody>
          </Table>
        </Sheet>
      </div>

      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 30, right: 30 }}
        icon={<SpeedDialIcon />}
        onClick={handleAddOrderOpen}
      />

      <AddOrderModal
        handleClose={handleAddOrderClose}
        open={addOrderOpen}
        getOrders={getOrders}
      />
      <EditOrderModal
        handleClose={handleEditOrderClose}
        open={editOrderOpen}
        getOrders={getOrders}
        productId={clickedOrder.detail ? clickedOrder.detail[0].productId : ""}
        supplierId={
          clickedOrder.detail ? clickedOrder.detail[0].supplierId : ""
        }
        quantity={clickedOrder.quantity ? clickedOrder.quantity : ""}
        totalPrice={clickedOrder.price ? clickedOrder.price : ""}
        date={clickedOrder.date ? clickedOrder.date : ""}
        orderId={clickedOrder.ID ? clickedOrder.ID : ""}
      />
      <DeleteOrderModal
        id={clickedOrder.ID}
        handleClose={handleDeleteOrderClose}
        open={deleteOrderOpen}
        getOrders={getOrders}
      />
    </>
  );
}
