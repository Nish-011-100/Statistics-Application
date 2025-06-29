const connection = require("../../database");
const express = require("express");
const router = express.Router();


router.get("/getProducts", function (req, res) {
  const sql = "SELECT * FROM Product";
  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(200).json({ products: result }); // Corrected response
  });
});

router.post("/addproduct", function (req, res) {
  const sql = "INSERT INTO Product (Name, Description) VALUES (?, ?)";
  const values = [req.body.name, req.body.description];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding product:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    return res
      .status(200)
      .json({ message: "Product added successfully"});
  });
});

router.post("/editproduct", function (req, res) {
  const sql = "UPDATE Product SET Name = ?, Description = ? WHERE ID = ?";
  const values = [req.body.name, req.body.description, req.body.id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating product:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({ message: "Product updated successfully" });
  });
});

router.post("/deleteproduct", function (req, res) {
  const sql = "DELETE FROM Product WHERE ID = ?";
  const values = [req.body.id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating product:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  });
});

module.exports = router;