import React, { useState } from "react";
import axios from "../api/axios";
import { Box, Button, Typography } from "@mui/material";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import { useNavigate } from "react-router-dom";
const Upload = () => {
  const [dataFile, setDataFile] = useState("");
  const Navigate = useNavigate();

  const submitStock = async () => {
    const formData = new FormData();
    formData.append("dataFile", dataFile);
    await axios
      .post("https://dripapp-main.azurewebsites.net/uploadImportData", formData, {
        params: { userid: localStorage.getItem("userName") },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("Done");
          Navigate("/inventory");
        }
      });
  };

  const submitBillData = async () => {
    const formData = new FormData();
    formData.append("dataFile", dataFile);
    await axios
      .post("https://dripapp-main.azurewebsites.net/uploadBillData", formData, {
        params: { userid: localStorage.getItem("userName") },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("Done");
          
          Navigate("/dashboard");
        }
      });
  };

  return (
    <Box
      width="100%"
      height="70vh"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={6}
    >
      <Box
        width="30%"
        height="50%"
        border="1px solid #333333"
        bgcolor={"black"}
        borderRadius={4}
      >
        <Box
          width="100%"
          height="30%"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h2">STOCK DATA</Typography>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height="70%"
        >
          <input
            onChange={(e) => {
              setDataFile(e.target.files[0]);
            }}
            type="file"
          />
          <Button
            variant="contained"
            style={{ fontSize: "1.5rem", backgroundColor: "#292929" }}
            color="primary"
            onClick={submitStock}
            startIcon={<UploadRoundedIcon color="white" />}
          >
            Upload
          </Button>
        </Box>
      </Box>

      
      <Box
        width="30%"
        height="50%"
        border="1px solid #333333"
        bgcolor={"black"}
        borderRadius={4}
      >
        <Box
          width="100%"
          height="30%"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h2">SALES DATA</Typography>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height="70%"
        >
          <input
            onChange={(e) => {
              setDataFile(e.target.files[0]);
            }}
            type="file"
          />
          <Button
            variant="contained"
            style={{ fontSize: "1.5rem", backgroundColor: "#292929" }}
            color="primary"
            onClick={submitBillData}
            startIcon={<UploadRoundedIcon color="white" />}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Upload;
