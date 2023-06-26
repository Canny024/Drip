import React from "react";

const InventoryItem = (props) => {
//   console.log(props);
  return (
    <div style={{  margin: "20px",  display:"flex",justifyContent:"space-around", backgroundColor:"#888888",height:"40px"}}>
      <div style={{width:"33vw",display:"flex",alignItems:"center"}}>{props.productname}</div>
      <div style={{width:".25vw",display:"flex",alignItems:"center"}}>{props.unit}</div>
      <div style={{width:".25vw",display:"flex",alignItems:"center"}}>{props.currentstock}</div>
      <div style={{width:".25vw",display:"flex",alignItems:"center"}}>{props.mrp}</div>
    </div>
  );
};

export default InventoryItem;
