import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "../../api/axios";

import { FormControl } from "@mui/material";

export default function BillPopUp() {
  const singleData = {
    userid: localStorage.getItem("userName"),
    customername: "",
    phonenumber: "",
    medicinename: "",
    quantity: "",
    price: "",
    date: "",
    exp: "",
  };
  const [billData, setBillData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [exp, setExp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [total, setTotal] = useState(0);

  const addMedicine = () => {
    const currData = {
      userid: localStorage.getItem("userName"),
      customername: "",
      phonenumber: "",
      medicinename: "",
      quantity: "",
      price: "",
      date: "",
      exp: "",
    };
    setTotal(total+(Number(price)*Number(quantity)));
    currData.customername = customerName;
    currData.phonenumber = phoneNumber;
    currData.date = Date.now().toLocaleString();
    currData.medicinename = name;
    currData.phonenumber = phoneNumber;
    currData.exp = exp;
    currData.price = price;
    currData.quantity = quantity;

    console.log(currData);
    billData.push(currData);
    setName("");
    setQuantity("");
    setExp("");
    setPrice("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(billData);

    await axios.post(
      "http://localhost:3500/addBillPost",
      billData,
      {
        params: { userId: localStorage.getItem("userName") },
      }
      
    );
    setBillData([]);
  };

  return (
    <Box
      width="40vw"
      height="80vh"
      position={"absolute"}
      zIndex={12}
      left="7%"
      top="18%"
      borderRadius="20px"
      bgcolor="black"
      border="1px solid #333333"
      p={2}
    >
      <Box height="38%">
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          width="100%"
        >
          <Typography variant="h3">BILLING FORM</Typography>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-around"}
          width="100%"
          py={1}
        >
          <FormControl required>
            <TextField
              color="secondary"
              size="small"
              id="customername"
              label="Coustomer Name"
              variant="outlined"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{ width: "100%" }}
            />
          </FormControl>
          <FormControl required>
            <TextField
              color="secondary"
              size="small"
              id="phonenumber"
              label="Phone No."
              value={phoneNumber}
              variant="outlined"
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{ width: "100%" }}
            />
          </FormControl>
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width="100%"
        >
          <Typography variant="h4">ADD NEW MEDICINE</Typography>
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={addMedicine}
          >
            ADD
          </Button>
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-around"}
          width="100%"
          py={1}
        >
          <FormControl required>
            <TextField
              color="secondary"
              size="small"
              id="medicinename"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </FormControl>
          <FormControl required>
            <TextField
              color="secondary"
              size="small"
              id="quantity"
              label="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </FormControl>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-around"}
          width="100%"
          pb={1}
        >
          <FormControl required>
            <TextField
              color="secondary"
              size="small"
              id="price"
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </FormControl>
          <FormControl required>
            <TextField
              color="secondary"
              size="small"
              id="exp"
              value={exp}
              onChange={(e) => setExp(e.target.value)}
              label="Exp. Date"
              variant="outlined"
              style={{ width: "100%" }}
            />
          </FormControl>
        </Box>
      </Box>

      <Box height="52%" overflow="scroll" bgcolor="#2c2c2c">
        <Box
          height="15%"
          bgcolor="#1c1c1c"
          display={"flex"}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" width="40%" textAlign="center">
            Name
          </Typography>
          <Typography variant="h4" width="15%" textAlign="center">
            Quantity
          </Typography>
          <Typography variant="h4" width="15%" textAlign="center">
            Price
          </Typography>
          <Typography variant="h4" width="30%" textAlign="center">
            Exp Date
          </Typography>
        </Box>
        <Box width="100" height="1px" bgcolor="#333333"></Box>
        {billData.map((item) => {
          return (
            <Box
              height="12%"
              bgcolor="#4a4a4a"
              display={"flex"}
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h4" width="40%" textAlign="center">
                {item.medicinename}
              </Typography>
              <Typography variant="h4" width="15%" textAlign="center">
                {item.quantity}
              </Typography>
              <Typography variant="h4" width="15%" textAlign="center">
                {item.price}
              </Typography>
              <Typography variant="h4" width="30%" textAlign="center">
                {item.exp}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box height="8%" bgcolor="#1c1c1c" display={"flex"} alignItems={"center"} justifyContent={"space-around"}>
        <Typography variant="h4">TOTAL:{total}</Typography>
        <Button style={{ backgroundColor: "purple", color: "white" }} onClick={submitHandler}>
          MAKE BILL
        </Button>
      </Box>
    </Box>
  );
}
