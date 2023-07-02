import React from "react";
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

const AddStockPage = () => {
  const Navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("userName"));
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [scheme, setScheme] = useState("");
  const [type, setType] = useState("");
  const [pack, setPack] = useState("");
  const [mrp, setMrp] = useState("");
  const [msp, setMsp] = useState("");
  const [hsn, setHsn] = useState("");
  const [rate, setRate] = useState("");
  const [exp, setExp] = useState("");
  const [mfg, setMfg] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [schedule, setSchedule] = useState("");
  const [salt, setSalt] = useState("");
  const [temperature, setTemperature] = useState("");
  const [medicineTime, setMedicineTime] = useState("");
  const [companyDiscount, setCompanyDiscount] = useState("");
  const [customerDiscount, setCustomerDiscount] = useState("");
  const [gst, setGst] = useState("");
  const [paymentType, setPaymentType] = useState("paid");
  const [distributorName, setDistributorName] = useState("");
  const [checkPage, setCheckPage] = useState(false);
  const STOCKPOST_URL = "/addStockPost";
  const [dataFile, setDataFile] = useState("");

  // Import Data code
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("dataFile", dataFile);
    await axios.post("https://dripapp-main.azurewebsites.net/uploadImportData", formData, {
      params: { userid: localStorage.getItem("userName") },
    }).then((res)=>{
      console.log(res);
      if(res.status==200){
        console.log("Done");
        Navigate("/inventory");
      }
    });
  };

  // Add manual data Code

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const quantityChangeHandler = (e) => {
    setQuantity(e.target.value);
  };
  const schemeChangeHandler = (e) => {
    setScheme(e.target.value);
  };
  const typeChangeHandler = (e) => {
    setType(e.target.value);
  };
  const packChangeHandler = (e) => {
    setPack(e.target.value);
  };
  const mrpChangeHandler = (e) => {
    setMrp(e.target.value);
  };
  const mspChangeHandler = (e) => {
    setMsp(e.target.value);
  };
  const hsnChangeHandler = (e) => {
    setHsn(e.target.value);
  };
  const rateChangeHandler = (e) => {
    setRate(e.target.value);
  };
  const expChangeHandler = (e) => {
    setExp(e.target.value);
  };
  const mfgChangeHandler = (e) => {
    setMfg(e.target.value);
  };
  const batchNoChangeHandler = (e) => {
    setBatchNo(e.target.value);
  };
  const scheduleChangeHandler = (e) => {
    setSchedule(e.target.value);
  };
  const saltChangeHandler = (e) => {
    setSalt(e.target.value);
  };
  const temperatureChangeHandler = (e) => {
    setTemperature(e.target.value);
  };
  const medicineTimeChangeHandler = (e) => {
    setMedicineTime(e.target.value);
  };
  const companyDiscountChangeHandler = (e) => {
    setCompanyDiscount(e.target.value);
  };
  const customerDiscountChangeHandler = (e) => {
    setCustomerDiscount(e.target.value);
  };
  const gstChangeHandler = (e) => {
    setGst(e.target.value);
  };
  const paymentTypeChangeHandler = (e) => {
    setPaymentType(e.target.value);
  };
  const distributorNameChangeHandler = (e) => {
    setDistributorName(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    // Navigate("/login");
    const newStockData = {
      userId: userId,
      name: name,
      quantity: quantity,
      scheme: scheme,
      type: type,
      pack: pack,
      mrp: mrp,
      msp: msp,
      hsn: hsn,
      rate: rate,
      exp: exp,
      mfg: mfg,
      batchNo: batchNo,
      schedule: schedule,
      salt: salt,
      temperature: temperature,
      medicineTime: medicineTime,
      companyDiscount: companyDiscount,
      customerDiscount: customerDiscount,
      gst: gst,
      paymentType: paymentType,
      distributorName: distributorName,
    };
    // console.log(newStockData);
    try {
      const response = await axios.post(
        STOCKPOST_URL,
        JSON.stringify({ newStockData }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(response);

      //clear state and controlled inputs
      //need value attrib on inputs for this
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
      {!checkPage && (
        
          <section>
            <form action="" onSubmit={submitHandler}>
              <label>Name</label>
              <input type="text" onChange={nameChangeHandler} value={name} />
              <label>Quantity</label>
              <input
                type="text"
                onChange={quantityChangeHandler}
                value={quantity}
              />
              <label>Scheme</label>
              <input
                type="text"
                onChange={schemeChangeHandler}
                value={scheme}
              />
              <label>Type</label>
              <input type="text" onChange={typeChangeHandler} value={type} />
              <label>Pack</label>
              <input type="text" onChange={packChangeHandler} value={pack} />
              <label>MRP</label>
              <input type="text" onChange={mrpChangeHandler} value={mrp} />
              <label>MSP</label>
              <input type="text" onChange={mspChangeHandler} value={msp} />
              <label>HSN</label>
              <input type="text" onChange={hsnChangeHandler} value={hsn} />
              <label>Rate</label>
              <input type="text" onChange={rateChangeHandler} value={rate} />
              <label>Exp</label>
              <input type="text" onChange={expChangeHandler} value={exp} />
              <label>MFG</label>
              <input type="text" onChange={mfgChangeHandler} value={mfg} />
              <label>BatchNo</label>
              <input
                type="text"
                onChange={batchNoChangeHandler}
                value={batchNo}
              />
              <label>Schedule</label>
              <input
                type="text"
                onChange={scheduleChangeHandler}
                value={schedule}
              />
              <label>Salt</label>
              <input type="text" onChange={saltChangeHandler} value={salt} />
              <label>Temperature</label>
              <input
                type="text"
                onChange={temperatureChangeHandler}
                value={temperature}
              />
              <label>MedicineTime</label>
              <input
                type="text"
                onChange={medicineTimeChangeHandler}
                value={medicineTime}
              />

              <label>CompanyDiscount</label>
              <input
                type="text"
                onChange={companyDiscountChangeHandler}
                value={companyDiscount}
              />
              <label>CustomerDiscount</label>
              <input
                type="text"
                onChange={customerDiscountChangeHandler}
                value={customerDiscount}
              />
              <label>GST</label>
              <input type="text" onChange={gstChangeHandler} value={gst} />
              <label>Payment Type</label>
              <select
                name="paymentType"
                onChange={paymentTypeChangeHandler}
                value={paymentType}
              >
                <option value="paid">Paid</option>
                <option value="credit">On Credit</option>
              </select>
              <label>Distributor Name</label>
              <input
                type="text"
                onChange={distributorNameChangeHandler}
                value={distributorName}
              />
              <button type="submit">Add</button>
            </form>
          </section>
        
      )}
      </Box>
    </>
  );
};

export default AddStockPage;
