const connection = require("../../database");
const express = require("express");
const router = express.Router();

router.get("/getTopProducts/:type", function (req, res) {
  const type = req.params.type;
  const sql =
    "SELECT Product.*, SUM(Orders.TotalBill) AS TotalBill, SUM(Orders.Quantity) AS TotalQuantity FROM Orders JOIN Product ON Orders.ProductId = Product.ID GROUP BY Orders.ProductId ORDER BY " +
    type +
    " DESC LIMIT 5;";
  const values = [type];

  connection.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(200).json({ result });
  });
});

router.get("/getTopSuppliers/:type", function (req, res) {
  const type = req.params.type;
  const sql =
    "SELECT SupplierId, Supplier.Name, SUM(Quantity) AS TotalQuantity, SUM(TotalBill) AS TotalBill FROM Orders JOIN Supplier ON Orders.SupplierId = Supplier.ID GROUP BY (SupplierId) ORDER BY " +
    type +
    " DESC LIMIT 10;";
  const values = [type];

  connection.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(200).json({ result });
  });
});

router.get("/getCostByMonth", function (req, res) {
  const sql =
    "SELECT MONTH(Date) AS Month, YEAR(DATE) AS Year, SUM(TotalBill) AS Cost FROM Orders GROUP BY MONTH(Date), YEAR(Date) ORDER BY Month, Year;";

  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(200).json({ result });
  });
});

router.get("/getProductDetail/:productId", function (req, res) {
  const productId = req.params.productId;
  const sql =
    "SELECT Orders.*, Product.Name AS ProductName, Supplier.Name AS SupplierName FROM Orders JOIN Product ON Orders.ProductId = Product.ID JOIN Supplier ON Orders.SupplierId = Supplier.ID WHERE ProductId = ? ORDER BY Orders.Date DESC;";
  const values = [productId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(200).json({ result });
  });
});

router.get("/getSupplierDetail/:supplierId", function (req, res) {
  const supplierId = req.params.supplierId;
  const sql =
    "SELECT Orders.*, Product.Name AS ProductName, Supplier.Name AS SupplierName FROM Orders JOIN Product ON Orders.ProductId = Product.ID JOIN Supplier ON Orders.SupplierId = Supplier.ID WHERE SupplierId = ? ORDER BY Orders.Date DESC;";
  const values = [supplierId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(200).json({ result });
  });
});

module.exports = router;
