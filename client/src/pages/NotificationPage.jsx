import React, { useState, useEffect } from "react";
import axios from "../api/axios";
const Notifications = () => {
  const [allStockData, setAllStockData] = useState([]);
  const [lessStock, setLessStock] = useState([]);
  const [soonExpiryStock,setSoonExpiryStock]=useState([]);
  useEffect(() => {
    let res = axios
      .get("http://localhost:3500/lessStockData", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        // console.log(response.data);
        setLessStock(response.data);
      });

      let resp = axios
      .get("http://localhost:3500/soonExpiryStock", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        console.log(response.data);
        setSoonExpiryStock(response.data);
      });
  }, []);
  return (
    <div>
      <h1>Less Stock </h1>
      {lessStock.map((stock) => {
        return (
          <div >
            <h2>
              {stock.name}
              {" " + stock.quantity}
            </h2>
          </div>
        );
      })}
      <h1>Expiry soon</h1>
      {soonExpiryStock.map((stock) => {
        return (
          <>
            <h2>
              {stock.name}
              {"  " +"  expiry on   "+ stock.exp}
            </h2>
          </>
        );
      })}
    </div>
  );
};

export default Notifications;
