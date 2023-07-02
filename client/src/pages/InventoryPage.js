import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
const InventoryPage = () => {
  const [allMedData, setAllMedData] = useState([]);
  useEffect(() => {
    axios
      .get("https://dripapp-main.azurewebsites.net/getCurrstock", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        response.data.forEach((value, index) => {
          value.id = index;
        });
        setAllMedData(response.data);
      });
  }, []);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "mrp",
      headerName: "MRP",
      type: "Number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "msp",
      headerName: "MSP",
      type: "Number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "exp",
      headerName: "Expiry Date",
      flex: 1,
    },
    {
      field: "mfg",
      headerName: "MFG Date",
      flex: 1,
    },
    {
      field: "batchNo",
      headerName: "Batch Number",
      flex: 1,
    },
    {
      field: "companyDiscount",
      headerName: "Company Discount",
      type: "Number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
  ];

  return (
    <div>
      <Box m="20px">
        <Header title="YOUR INVENTORY" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid checkboxSelection rows={allMedData} columns={columns} />
        </Box>
      </Box>
    </div>
  );
};

export default InventoryPage;
