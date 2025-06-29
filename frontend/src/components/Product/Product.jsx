import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import ProductCard from "./ProductCard";
import AddProductModal from "./AddProductModal";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Box from "@mui/material/Box";

export default function Product() {
  const {host} = useContext(Context);

  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addProductOpen, setAddProductOpen] = useState(false);
  const handleAddProductOpen = () => setAddProductOpen(true);
  const handleAddProductClose = () => setAddProductOpen(false);

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
        setSearchResult(json.products);
        setLoading(false); // Set loading to false after data is fetched
        return json;
      }
    } catch (error) {
      console.log("Error occurred:", error);
      setLoading(false); // Set loading to false in case of error
      return [];
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Box
        sx={{
          height: 320,
          transform: "translateZ(0px)",
          flexGrow: 1,
        }}
      >
        <div className="m-4">
          <div className="mx-4">
            <h5 className="text-4xl mt-4">Products</h5>
            <hr className="h-px my-6 mx-auto bg-gray-400 border-0 dark:bg-gray-700"></hr>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {/* Map over the products array and render ProductCard components */}
              {searchResult.map((product) => (
                <ProductCard
                  key={product.ID}
                  id={product.ID}
                  name={product.Name}
                  description={product.Description}
                  getProducts={getProducts}
                />
              ))}
            </div>
          )}
        </div>

        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "sticky", bottom: 30, right: 30, float: "right" }}
          icon={<SpeedDialIcon />}
          onClick={handleAddProductOpen}
        ></SpeedDial>

        <AddProductModal
          handleClose={handleAddProductClose}
          open={addProductOpen}
          getProducts={getProducts}
        />
      </Box>
    </>
  );
}
