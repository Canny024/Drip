import React, { useEffect, useState } from "react";
import axios from "../api/axios";
const InventoryPage = () => {
  const [allStockData, setAllStockData] = useState([]);
  const [allMedData, setAllMedData] = useState([]);
  const [creditData,setCreditData]=useState([]);
  useEffect(() => {
    let res = axios
      .get("http://localhost:3500/getAllMedData", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        setAllMedData(response.data);
        // console.log(allMedData);
      });
  }, []);
  useEffect(() => {
    let res = axios
      .get("http://localhost:3500/getAllStockData", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        // console.log(response.data);
        setAllStockData(response.data);
      });
  }, []);
  // console.log(allMedData)
  useEffect(() => {
    let res = axios
      .get("http://localhost:3500/getCreditData", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        // console.log(response.data);
        setCreditData(response.data);
      });
  }, []);
  // console.log(creditData)
  return (
    <div>
      <h1>inventory</h1>
      <div>
        {allMedData.length>0 && <h3>name: {allMedData[0][0]}, purchasePrice: {allMedData[1][0]}, batch: {allMedData[2][0]}, exp: {allMedData[3][0]}</h3> }
      </div>
      <div>
        <h1>Credit History</h1>
        {creditData.map((d)=>{return (<><h3>{d.distributorName}</h3> <h2>Rs.{d.creditAmount}</h2> <h2>isPaid? {d.isPaid===false? 'false':'true'}</h2></>)})}
      </div>
    </div>
  );
};

export default InventoryPage;
