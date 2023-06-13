import React from "react";
import Topbar from "../Globals/Topbar";
import SideBar from "../Globals/SideBar";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
export default function Dashboard(props) {
  const [allStockData, setAllStockData] = useState([]);
  const [allBillData, setAllBillData] = useState([]);
  const [notification,setNotification]=useState(false);
  useEffect(() => {
    let res = axios
      .get("http://localhost:3500/getAllStockData", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        // console.log(response.data);
        setAllStockData(response.data);
      });
    let resp = axios
      .get("http://localhost:3500/getAllBillData", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        // console.log(response.data);
        setAllBillData(response.data);
      });


      let ress = axios
      .get("http://localhost:3500/lessStockData", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        // console.log(response.data);
        if(response.data.length>0){
          setNotification(true);
        }
      });

      let ressp = axios
      .get("http://localhost:3500/soonExpiryStock", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        // console.log(response.data);
        if(response.data.length>0){
          setNotification(true);
        }
      });

  }, []);
  let totalValue = 0;
  for (let i = 0; i < allStockData.length; i++) {
    totalValue +=
      Number(allStockData[i].quantity) * Number(allStockData[i].mrp);
  }
  let totalProfit = 0;
  const profitPerPc = 10;
  for (let i = 0; i < allBillData.length; i++) {
    totalProfit += Number(allBillData[i].quantity) * 10;
  }
  return (
    <>
      <h2>Curr Stock value ₹{totalValue}</h2>

      <h2>Total profit till now is ₹{totalProfit}</h2>
      {notification && <h2>notification activated</h2>}
    </>
  );
}
