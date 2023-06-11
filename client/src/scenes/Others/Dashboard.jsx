import React from "react";
import Topbar from "../Globals/Topbar";
import SideBar from "../Globals/SideBar";
import {useState,useEffect} from "react"; 
import axios from "../../api/axios";
export default function Dashboard() {
  const [allStockData, setAllStockData]=useState([]);
  const [allBillData,setAllBillData]=useState([]);
    useEffect(()=>{
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
    },[])
    let totalValue=0;
    for(let i=0;i<allStockData.length;i++){
      totalValue+=Number(allStockData[i].quantity)*Number(allStockData[i].mrp);
    }
    let totalProfit=0;
    const profitPerPc=10;
    for(let i=0;i<allBillData.length;i++){
      totalProfit+=Number(allBillData[i].quantity)*10;
    }
  return (
    <>
      <SideBar />
      <main className="content">
        <Topbar />
      <h2>Curr Stock value ₹{totalValue}</h2>
      
      <h2>Total profit till now is ₹{totalProfit}</h2>
      </main>
    </>
  );
}
