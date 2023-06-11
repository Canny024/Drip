import React, { useEffect,useState } from 'react';
import axios from '../api/axios';
const InventoryPage = () => {
    const [allStockData, setAllStockData]=useState([]);
    useEffect(()=>{
        let res = axios
        .get("http://localhost:3500/getAllStockData", {
          params: { userId: localStorage.getItem("userName") },
        })
        .then((response) => {
            console.log(response.data);
          setAllStockData(response.data);
        });
    },[])
  return (
    <div>
      <h1>inventory</h1>
      <div>
        
      </div>
    </div>
  );
}

export default InventoryPage;
