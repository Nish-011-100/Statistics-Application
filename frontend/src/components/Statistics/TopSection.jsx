import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../context/Context";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import NumbersIcon from "@mui/icons-material/Numbers";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Tooltip from "@mui/material/Tooltip";

export default function TopSection() {
  const { host } = useContext(Context);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [type, setType] = useState("TotalBill");
  const [loading, setLoading] = useState(true); // Add loading state for products
  const [loadingSuppliers, setLoadingSuppliers] = useState(true); // Add loading state for suppliers

  useEffect(() => {
    fetchData();
  }, [type]);

  const fetchData = async () => {
    setLoading(true); // Set loading to true when fetching products
    setLoadingSuppliers(true); // Set loading to true when fetching suppliers
    try {
      const productsResponse = await fetchTopData("Products");
      const suppliersResponse = await fetchTopData("Suppliers");

      if (productsResponse.ok && suppliersResponse.ok) {
        const productsJson = await productsResponse.json();
        const suppliersJson = await suppliersResponse.json();
        setProducts(productsJson.result);
        setSuppliers(suppliersJson.result);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log("Error occurred:", error);
    } finally {
      setLoading(false); // Set loading to false when data is fetched
      setLoadingSuppliers(false); // Set loading to false when data is fetched
    }
  };

  const fetchTopData = async (data) => {
    const url = `${host}/Statistics/getTop${data}/${type}`;
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <ToggleButtonGroup
        value={type}
        exclusive
        aria-label="text alignment"
        sx={{ margin: 2 }}
      >
        <Tooltip title="Cost">
          <ToggleButton
            value="TotalBill"
            aria-label="left aligned"
            onClick={() => setType("TotalBill")}
          >
            <AttachMoneyIcon />
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Quantity">
          <ToggleButton
            value="TotalQuantity"
            aria-label="centered"
            onClick={() => setType("TotalQuantity")}
          >
            <NumbersIcon />
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
      {loading || loadingSuppliers ? ( // Render loading message if data is being fetched
        <p className="text-2xl">Loading...</p>
      ) : (
        <div className="flex justify-between">
          <div className="">
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: suppliers.map((supplier) => supplier.Name),
                },
              ]}
              series={[
                {
                  data: suppliers.map((supplier) =>
                    type === "TotalBill"
                      ? parseFloat(supplier.TotalBill)
                      : parseInt(supplier.TotalQuantity)
                  ),
                },
              ]}
              width={800}
              height={300}
            />
          </div>
          <div>
            <PieChart
              series={[
                {
                  data: products.map((product, index) => ({
                    id: index,
                    value:
                      type === "TotalBill"
                        ? parseFloat(product.TotalBill)
                        : parseInt(product.TotalQuantity),
                    label: product.Name,
                  })),
                  innerRadius: 20,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                  margin: { bottom: 20, left: 20, right: 20, top: 20 },
                  cx: 120,
                  outerRadius: 100,
                },
              ]}
              width={400}
              height={200}
            />
          </div>
        </div>
      )}
    </>
  );
}
