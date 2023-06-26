import { Box, Typography } from "@mui/material";
import React from "react";

const InventoryItem = (props) => {
//   console.log(props);
  return (
    <Box borderRadius={2} border="1px solid #808080" style={{  margin: "20px",  display:"flex",justifyContent:"space-around", backgroundColor:"#2f2f2f",height:"40px"}}>
      <div style={{width:"40%",display:"flex",alignItems:"center", justifyContent:"center"}}><Typography variant="h5">{props.productname}</Typography></div>
      <div style={{width:"10%",display:"flex",alignItems:"center", justifyContent:"center"}}><Typography variant="h5">{props.unit}</Typography></div>
      <div style={{width:"20%",display:"flex",alignItems:"center", justifyContent:"center"}}><Typography variant="h5">{props.currentstock}</Typography></div>
      <div style={{width:"10%",display:"flex",alignItems:"center", justifyContent:"center"}}><Typography variant="h5">{props.mrp}</Typography></div>
    </Box>
  );
};

export default InventoryItem;
