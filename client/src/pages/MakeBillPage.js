import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";


const MakeBillPage = () => {
  const Navigate = useNavigate();
  const [allMedData,setAllMedData]=useState([]);
  useEffect(()=>{
    let res = axios
      .get("https://dripapp-main.azurewebsites.net/getAllMedData", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        setAllMedData(response.data);
        console.log(allMedData);
      });
  },[])
  const today = new Date();

  const [userId, setUserId] = useState(localStorage.getItem("userName"));
  const [name, setName] = useState("");
  const [type, setType] = useState();
  const [pack, setPack] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mrp, setMrp] = useState("");
  const [finalDiscount, setFinalDiscount] = useState("");
  const [gst, setGst] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [exp, setExp] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [customerLocation, setCustomerLocation] = useState("");
  const [saleDate, setSaleDate] = useState(today);
  const [diseaseType, setDiseaseType] = useState("");
  const [loyaltyPoints, setLoyaltyPoints] = useState("");
  const [refillReminder, setRefillReminder] = useState("");
  const [isPrescribed, setIsPrescribed] = useState("");
  const [billPreferance, setbillPreferance] = useState("");

  const [doctorName, setDoctorName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [address, setAddress] = useState("");
  const [doctorDiscount, setDoctorDiscount] = useState("");

  const nameChangeHandler = (e) => {
    setName(e.target.value);
    for(let i=0;i<allMedData[0].length;i++){
      if(allMedData[0][i]===e.target.value){
        setMrp(allMedData[1][i]);
        setBatchNo(allMedData[2][i]);
        setExp(allMedData[3][i]);
        break;
      }
    }
  };
  const typeChangeHandler = (e) => {
    setType(e.target.value);
  };
  const packChangeHandler = (e) => {
    setPack(e.target.value);
  };
  const quantityChangeHandler = (e) => {
    setQuantity(e.target.value);
  };
  const mrpChangeHandler = (e) => {
    setMrp(e.target.value);
  };
  const finalDiscountChangeHandler = (e) => {
    setFinalDiscount(e.target.value);
  };
  const gstChangeHandler = (e) => {
    setGst(e.target.value);
  };
  const batchNoChangeHandler = (e) => {
    setBatchNo(e.target.value);
  };
  const expChangeHandler = (e) => {
    setExp(e.target.value);
  };

  const customerNameChangeHandler = (e) => {
    setCustomerName(e.target.value);
  };
  const customerNumberChangeHandler = (e) => {
    setCustomerNumber(e.target.value);
  };
  const customerLocationChangeHandler = (e) => {
    setCustomerLocation(e.target.value);
  };
  const saleDateChangeHandler = (e) => {
    setSaleDate(e.target.value);
  };
  const diseaseTypeChangeHandler = (e) => {
    setDiseaseType(e.target.value);
  };
  const loyaltyPointsChangeHandler = (e) => {
    setLoyaltyPoints(e.target.value);
  };
  const refillReminderChangeHandler = (e) => {
    setRefillReminder(e.target.value);
  };
  const isPrescribedChangeHandler = (e) => {
    setIsPrescribed(e.target.value);
  };
  const billPreferanceChangeHandler = (e) => {
    setbillPreferance(e.target.value);
  };
  const doctorNameChangeHandler = (e) => {
    setDoctorName(e.target.value);
  };
  const invoiceNumberChangeHandler = (e) => {
    setInvoiceNumber(e.target.value);
  };
  const addressChangeHandler = (e) => {
    setAddress(e.target.value);
  };
  const doctorDiscountChangeHandler = (e) => {
    setDoctorDiscount(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    // Navigate("/login");
    const newBillData = {
      userId: userId,
      name: name,
      type: type,
      pack: pack,
      quantity: quantity,
      mrp: mrp,
      finalDiscount: finalDiscount,
      gst: gst,
      batchNo: batchNo,
      exp: exp,
      customerName: customerName,
      customerNumber: customerNumber,
      customerLocation: customerLocation,
      saleDate: saleDate,
      diseaseType: diseaseType,
      loyaltyPoints: loyaltyPoints,
      refillReminder: refillReminder,
      isPrescribed: isPrescribed,
      billPreferance: billPreferance,
      doctorName: doctorName,
      invoiceNumber: invoiceNumber,
      address: address,
      doctorDiscount: doctorDiscount,
    };
    const res = await axios.post(
      "https://dripapp-main.azurewebsites.net/addBillPost",
      newBillData,
      {
        params: { userId: localStorage.getItem("userName") },
      }
      // newBillData
    );
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" >
    <section style={{width:"75%"}}>
      <form action="" onSubmit={submitHandler}>
        <label>Name</label>
        <input type="text" onChange={nameChangeHandler} value={name} />
        <label>Type</label>
        <input type="text" onChange={typeChangeHandler} value={type} />
        <label>Pack</label>
        <input type="text" onChange={packChangeHandler} value={pack} />
        <label>Quantity</label>
        <input type="text" onChange={quantityChangeHandler} value={quantity} />
        <label>Mrp</label>
        <input type="text" onChange={mrpChangeHandler} value={mrp} />
        <label>FinalDiscount</label>
        <input
          type="text"
          onChange={finalDiscountChangeHandler}
          value={finalDiscount}
        />
        <label>GST</label>
        <input type="text" onChange={gstChangeHandler} value={gst} />
        <label>BatchNo</label>
        <input type="text" onChange={batchNoChangeHandler} value={batchNo} />
        <label>Exp</label>
        <input type="text" onChange={expChangeHandler} value={exp} />
        <label>CustomerName</label>
        <input
          type="text"
          onChange={customerNameChangeHandler}
          value={customerName}
        />
        <label>CustomerNumber</label>
        <input
          type="text"
          onChange={customerNumberChangeHandler}
          value={customerNumber}
        />
        <label>CustomerLocation</label>
        <input
          type="text"
          onChange={customerLocationChangeHandler}
          value={customerLocation}
        />
        <label>SaleDate</label>
        <input type="text" onChange={saleDateChangeHandler} value={saleDate} />
        <label>DiseaseType</label>
        <input
          type="text"
          onChange={diseaseTypeChangeHandler}
          value={diseaseType}
        />
        <label>LoyaltyPoints</label>
        <input
          type="text"
          onChange={loyaltyPointsChangeHandler}
          value={loyaltyPoints}
        />
        <label>RefillReminder</label>
        <input
          type="text"
          onChange={refillReminderChangeHandler}
          value={refillReminder}
        />
        <label>IsPrescribed</label>
        <input
          type="text"
          onChange={isPrescribedChangeHandler}
          value={isPrescribed}
        />
        <label>BillPreferance</label>
        <input
          type="text"
          onChange={billPreferanceChangeHandler}
          value={billPreferance}
        />
        <label>DoctorName</label>
        <input
          type="text"
          onChange={doctorNameChangeHandler}
          value={doctorName}
        />
        <label>InvoiceNumber</label>
        <input
          type="text"
          onChange={invoiceNumberChangeHandler}
          value={invoiceNumber}
        />
        <label>Address</label>
        <input type="text" onChange={addressChangeHandler} value={address} />
        <label>DoctorDiscount</label>
        <input
          type="text"
          onChange={doctorDiscountChangeHandler}
          value={doctorDiscount}
        />
        <button type="submit">Make Bill</button>
      </form>
    </section>
    </Box>
  );
};

export default MakeBillPage;
