const connection = require("../../database");
const express = require("express");
const router = express.Router();

router.get("/getSuppliers", function (req, res) {
  const sql = "SELECT * FROM Supplier";
  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(200).json({ suppliers: result }); // Corrected response
  });
});

router.post("/addSupplier", function (req, res) {
  const sql = "INSERT INTO Supplier (Name) VALUES (?)";
  const values = [req.body.name];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error adding Supplier:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    
    return res
      .status(200)
      .json({ message: "Supplier added successfully"});
  });
});

router.post("/editSuppliers", function (req, res) {
  const sql = "UPDATE Supplier SET Name = ? WHERE ID = ?";
  const values = [req.body.name, req.body.id];
console.log(req.body)
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating Supplier:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({ message: "Supplier updated successfully" });
  });
});

router.post("/deleteSuppliers", function (req, res) {
  const sql = "DELETE FROM Supplier WHERE ID = ?";
  const values = [req.body.id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating Supplier:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json({ message: "Supplier deleted successfully" });
  });
});

module.exports = router;
