import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import InventoryItem from "./InventoryItem";
const NewInventoryPage = () => {
  const [allStockData, setAllStockData] = useState([]);
  useEffect(() => {
    let res = axios
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
      <div
        style={{
          border: "2px solid gray",
          width: "20%",
          height: "300px",
          margin: "20px",
        }}
      >
        <h3 style={{display:"inline",margin:"0px 170px 0px 10px"}}>Filters</h3>
        <button style={{color:"white",backgroundColor:"#111112",border:"0px"}}><h3>Clear</h3></button>
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
            <div
              style={{ width: "33vw", display: "flex", alignItems: "center" }}
            >
              Product Name
            </div>
            <div
              style={{ width: ".25vw", display: "flex", alignItems: "center" }}
            >
              Unit
            </div>
            <div
              style={{ width: ".25vw", display: "flex", alignItems: "center" }}
            >
              Current Stock
            </div>
            <div
              style={{ width: ".25vw", display: "flex", alignItems: "center" }}
            >
              M.R.P
            </div>
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
