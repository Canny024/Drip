import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Debt() {
    const [creditData, setCreditData] = useState([]);
    useEffect(() => {
        axios
          .get("https://dripapp-main.azurewebsites.net/getCreditData", {
            params: { userId: localStorage.getItem("userName") },
          })
          .then((response) => {
            setCreditData(response.data);
          });
      }, []);
  return (
    <div>
    <h1>Credit History</h1>
    {creditData.map((d) => {
      return (
        <>
          <h3>{d.distributorName}</h3> <h2>Rs.{d.creditAmount}</h2>{" "}
          <h2>isPaid? {d.isPaid === false ? "false" : "true"}</h2>
        </>
      );
    })}
  </div>
  )
}
