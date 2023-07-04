import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import InventoryItem from "./InventoryItem";
import { Box, Typography } from "@mui/material";
const NewInventoryPage = () => {
  const [allStockData, setAllStockData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3500/currStockData", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        // console.log(response.data);
        setAllStockData(response.data);
      });
  }, []);
  console.log(allStockData);
  return (
    <div style={{ display: "flex" }}>

    {/* Filter Box */}
      <div
        style={{
          border: "2px solid gray",
          width: "20%",
          height: "300px",
          margin: "20px",
        }}
      >
        <h3 style={{ display: "inline", margin: "0px 170px 0px 10px" }}>
          Filters
        </h3>
        <button
          style={{ color: "white", backgroundColor: "#111112", border: "0px" }}
        >
          <h3>Clear</h3>
        </button>
        <hr />
        <div>
          <ul>
            Units
            <li>
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">MPCS</label>
              <br />
            </li>
            <li>
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />
              <label for="vehicle1">Pack</label>
              <br />
            </li>
          </ul>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          border: "2px solid gray",
          width: "70%",
          backgroundColor: "#202020",
          overflow: "scroll",
          height: "550px",
          marginTop: "20px",
        }}
      >
        <div style={{ border: "2px solid gray", margin: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Box
              py={2}
              style={{
                width: "40%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h3"> Product Name</Typography>
            </Box>
            <Box
              py={2}
              style={{
                width: "10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h3"> Unit</Typography>
            </Box>
            <Box
              py={2}
              style={{
                width: "20%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h3"> Curr Stock</Typography>
            </Box>
            <Box
              py={2}
              style={{
                width: "10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h3"> M.R.P.</Typography>
            </Box>
          </div>
        </div>
        {allStockData.length > 0 &&
          allStockData.map((stockData) => {
            return (
              <InventoryItem
                productname={stockData.productname}
                unit={stockData.unit}
                currentstock={stockData.currentstock}
                mrp={stockData.mrp}
              />
            );
          })}
      </div>
    </div>
  );
};

export default NewInventoryPage;
