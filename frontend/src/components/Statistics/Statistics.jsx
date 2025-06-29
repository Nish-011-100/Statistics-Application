import React, { useEffect, useState, useContext } from "react";
import TopSection from "./TopSection";
import Detail from "./Detail";
import { Context } from "../../context/Context";
import { LineChart } from "@mui/x-charts/LineChart";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Statistics() {
  const { host } = useContext(Context);
  const [cost, setCost] = useState([]);

  const getCost = async () => {
    try {
      const url = `${host}/Statistics/getCostByMonth`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response);
      } else {
        const json = await response.json();
        setCost(json.result);
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  useEffect(() => {
    getCost();
  }, []);

  function getMonthName(monthNumber) {
    const date = new Date(Date.UTC(2000, monthNumber - 1, 1));
    return date.toLocaleString("en", { month: "long" });
  }

  const xAxisData = cost.map((entry) => getMonthName(entry.Month));
  const seriesData = cost.map((entry) => parseInt(entry.Cost));

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="mx-4">
        <h5 className="text-4xl mt-4">Statistics</h5>
        <hr className="h-px my-6 mx-auto bg-gray-400 border-0 dark:bg-gray-700"></hr>
      </div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Detail" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <TopSection />
          <LineChart
            xAxis={[{ data: xAxisData, scaleType: "point" }]}
            series={[{ data: seriesData, label: "Cost" }]}
            height={400}
            yAxis={[{ min: 0 }]}
            // width={600}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Detail />
        </CustomTabPanel>
      </Box>
    </>
  );
}
