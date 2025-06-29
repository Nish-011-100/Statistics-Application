import React, { useState, useContext, useEffect } from "react";
import AddSupplierModal from "../Supplier/AddSupplierModal";
import EditSupplierModal from "../Supplier/EditSupplierModal";
import DeleteSupplierModal from "./DeleteSupplierModal";
import { Context } from "../../context/Context";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";

export default function Supplier() {
  const { host } = useContext(Context);

  const [suppliers, setSuppliers] = useState([]);
  const [clickedSupplier, setClickedSupplier] = useState({ id: "0", name: "" });

  useEffect(() => {
    getSuppliers();
  }, []);

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
        setSuppliers(json.suppliers); // Update state with fetched suppliers
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const [deleteSupplierOpen, setDeleteSupplierOpen] = useState(false);
  const handleDeleteSupplierOpen = (sup) => {
    setClickedSupplier(sup);
    setDeleteSupplierOpen(true);
  };
  const handleDeleteSupplierClose = () => setDeleteSupplierOpen(false);

  const [editSupplierOpen, setEditSupplierOpen] = useState(false);
  const handleEditSupplierOpen = (sup) => {
    setClickedSupplier(sup);
    setEditSupplierOpen(true);
  };
  const handleEditSupplierClose = () => setEditSupplierOpen(false);

  const [addSupplierOpen, setAddSupplierOpen] = useState(false);
  const handleAddSupplierOpen = () => {
    setAddSupplierOpen(true);
  };
  const handleAddSupplierClose = () => setAddSupplierOpen(false);

  return (
    <>
      <div className="mx-4">
        <h5 className="text-4xl mt-4">Suppliers</h5>
        <hr className="h-px my-6 mx-auto bg-gray-400 border-0 dark:bg-gray-700"></hr>
      </div>
      <div className="flex justify-center mx-4 py-2">
        <TableContainer component={Paper} color="success" sx={{ width: "100%" }}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow hover>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: 15,
                    backgroundColor: "#1976D2",
                    color: "#FFFFFF",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: 15,
                    backgroundColor: "#1976D2",
                    color: "#FFFFFF",
                  }}
                  align="left"
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: 15,
                    backgroundColor: "#1976D2",
                    color: "#FFFFFF",
                  }}
                  align="center"
                >
                  Manage
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow
                  hover
                  key={supplier.ID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ backgroundColor: "#f7f7f7" }}
                  >
                    {supplier.ID}
                  </TableCell>
                  <TableCell align="left" sx={{ backgroundColor: "#f7f7f7" }}>
                    {supplier.Name}
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: "#f7f7f7" }}>
                    <Button
                      variant="outlined"
                      sx={{ margin: 2 }}
                      color="warning"
                      onClick={() => handleEditSupplierOpen(supplier)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ margin: 2 }}
                      color="error"
                      onClick={() => handleDeleteSupplierOpen(supplier)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "fixed", bottom: 30, right: 30 }}
          icon={<SpeedDialIcon />}
          onClick={handleAddSupplierOpen}
        />

        <DeleteSupplierModal
          id={clickedSupplier.ID}
          handleClose={handleDeleteSupplierClose}
          open={deleteSupplierOpen}
          getSuppliers={getSuppliers}
        />

        <EditSupplierModal
          handleClose={handleEditSupplierClose}
          open={editSupplierOpen}
          id={clickedSupplier.ID}
          name={clickedSupplier.Name}
          getSuppliers={getSuppliers}
        />

        <AddSupplierModal
          handleClose={handleAddSupplierClose}
          open={addSupplierOpen}
          getSuppliers={getSuppliers}
        />
      </div>
    </>
  );
}
