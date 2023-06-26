import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function NotificationPopupBox(props) {

    let bgcolor="purple";
    if(props.type==="EXPIRY"){
        bgcolor="red";
    }
  return (
    <Box
      width="100%"
      height="auto"
      bgcolor="#171718"
      borderRadius="10px"
      mt={1}
      p={1}
    >
      <Button
        variant="contained"
        style={{ width: "auto", height: "25px", backgroundColor:`${bgcolor}` }}
      >
        {props.type}
      </Button>
      <Box width="100%" px={1} py={0.7}>
        <Typography variant="h5">{props.name}</Typography>
      </Box>
      <Box width="100%" px={1} py={0}>
        <Typography variant="h5">{props.type==="EXPIRY"?`Expires on: ${props.data}`:` Current Stock: ${props.data}`}</Typography>
      </Box>
    </Box>
  );
}
