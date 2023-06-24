import React from "react";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { Box, Typography, grid2Classes, useTheme } from "@mui/material";
import { green, red } from "@mui/material/colors";
import logo from "../Globals/logo.png";
import { tokens } from "../../theme"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import IndexBox from "../../components/IndexBox";
import StatBox from "../../components/StatBox";
export default function Dashboard() {
  const [allStockData, setAllStockData] = useState([]);
  const [allBillData, setAllBillData] = useState([]);
  const [notification, setNotification] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
     axios
      .get("http://localhost:3500/getCurrStock", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        setAllStockData(response.data);
      });
      axios
      .get("http://localhost:3500/getAllBillData", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        // console.log(response.data);
        setAllBillData(response.data);
      });

      axios
      .get("http://localhost:3500/lessStockData", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        // console.log(response.data);
        if(response.data.length>0){
          setNotification(true);
        }
      });

      axios
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
    if (allStockData[i].msp === null || allStockData[i].msp === "") {
      totalValue += 0;
    } else {
      totalValue += Number(allStockData[i].msp || 0);
    }
  }
  let totalProfit = 0;
  const profitPerPc = 10;
  for (let i = 0; i < allBillData.length; i++) {
    totalProfit += Number(allBillData[i].quantity) * 10;
  }
  return (
    <Box px={7} py={3}>
      {/* <h2>Curr Stock value ₹{totalValue}</h2>

      <h2>Total profit till now is ₹{totalProfit}</h2>
      {notification && <h2>notification activated</h2>} */}

      <Typography
            variant="h6"
            fontWeight={500}
            color={colors.primary[200]}
            pb={2}
          >
            Shop Opened At 8:45 AM IST
          </Typography>

      <Box
        display="grid"
        gridTemplateColumns=" 1.9fr 1fr"
        gridTemplateRows="auto auto auto auto"
        gap="20px  20px"
      >
        <Box gridArea="1 / 1 / 2 / 2" >
          <Typography
            variant="h4"
            fontWeight={500}
            color={colors.primary[200]}
            pb={2}
          >
            Index
          </Typography>
          <Box display={"flex"} gap={5}>
            <IndexBox title="Sale" subtitle={`₹${totalValue}`} />
            <IndexBox title="Profit" subtitle={`₹${totalProfit}`} />
            <IndexBox title="Margin" />
          </Box>
        </Box>


        <Box gridArea="2 / 1 / 3 / 2">
          {" "}
          <Typography
            variant="h4"
            fontWeight={500}
            color={colors.primary[200]}
            pb={2}
          >
            Most Bought From Store
          </Typography>
          <Box display={"flex"} gap={4}>
            <StatBox />
            <StatBox />
            <StatBox />
          </Box>
        </Box>
        <Box gridArea="3 / 1 / 5 / 2">
          {" "}
          <Typography
            variant="h4"
            fontWeight={500}
            color={colors.primary[200]}
            pb={2}
          >
            Trends
          </Typography>
          <Typography
            variant="h4"
            fontWeight={500}
            color={colors.primary[100]}
            pb={2}
          >
            Coming soon...
          </Typography>
          
        </Box>
        <Box gridArea="1 / 2 / 4 / 3">
          {/* <img src={logo} width="100%" height="100%"></img> */}
        </Box>
        <Box gridArea="4 / 2 / 5 / 3">
          <Box display={"flex"} color={"white"} gap={6} width="100%">
          <Box alignItems={"center"}>
            <Typography fontSize="5vh" textAlign={"center"}>23</Typography>
            <Typography textAlign={"center"}>Order</Typography>
          </Box>
          <Box alignItems={"center"}>
            <Typography fontSize="5vh" textAlign={"center"}>4546.56</Typography>
            <Typography textAlign={"center"} >INR</Typography>
          </Box>
          <Box alignItems={"center"}>
            <Typography fontSize="5vh" textAlign={"center"}>5</Typography>
            <Typography textAlign={"center"}>Product</Typography>
          </Box>
          </Box>
          
        </Box>
        
      </Box>
    </Box>
  );
}
