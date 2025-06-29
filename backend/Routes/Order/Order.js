const connection = require("../../database");
const express = require("express");
const router = express.Router();

router.get("/getOrders", function (req, res) {
    const sql = "SELECT O.*, P.Name AS ProductName, S.Name AS SupplierName FROM Orders O JOIN Product P ON O.ProductId = P.ID JOIN Supplier S ON O.SupplierId = S.ID";
    
    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }

      const transformedResult = result.map(order => ({
        ID: order.ID,
        product: order.ProductName,
        supplier: order.SupplierName,
        date: new Date(order.Date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }),
        quantity: order.Quantity,
        price: order.TotalBill,
        detail: [
          {
            productId: order.ProductId,
            supplierId: order.SupplierId,
          },
        ]
      }));
      
      // Send the transformed result back in the response
      return res.status(200).json({ result: transformedResult });
    });
  });  

router.post("/addOrder", function (req, res) {
  const sql = "INSERT INTO Orders (ProductId, SupplierId, Date, Quantity, TotalBill) VALUES (?, ?, ?, ?, ?)";
  const values = [req.body.ProductId, req.body.SupplierId, req.body.Date, req.body.Quantity, req.body.TotalBill];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding Order:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    const newOrder = {
      id: result.insertId,
      name: req.body.name,
      description: req.body.description,
    };
    return res
      .status(200)
      .json({ message: "Order added successfully", Order: newOrder });
  });
});

router.post("/editOrder", function (req, res) {
  const sql = "UPDATE Orders SET ProductId = ?, SupplierId = ?, Date = ?, Quantity = ?, TotalBill = ? WHERE ID = ?";
  const values = [req.body.ProductId, req.body.SupplierId, req.body.Date, req.body.Quantity, req.body.TotalBill, req.body.orderId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating Order:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({ message: "Order updated successfully" });
  });
});

router.post("/deleteOrder", function (req, res) {
  const sql = "DELETE FROM Orders WHERE ID = ?";
  const values = [req.body.id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating Order:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });
  });
});

module.exports = router;
