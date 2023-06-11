import React from "react";
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AddStockPage = () => {
  const Navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem('userName'));
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

  const STOCKPOST_URL = '/addStockPost';


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
      msp: msp,
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
    };
    // console.log(newStockData);
    try {
      // Axios ka import dekh KAHAN SE KIYA HAI
      const response = await axios.post(STOCKPOST_URL,
          JSON.stringify({ newStockData}),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
      // console.log(response);

      //clear state and controlled inputs
      //need value attrib on inputs for this

  } catch (err) {
    
      console.log(err.message);
  }
    // const res = await axios.post(
    //   "http://localhost:3500/addStockPost",
    //   newStockData
    // );
  };
  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <label>Name</label>
        <input type="text" onChange={nameChangeHandler} value={name} />
        <label>quantity</label>
        <input type="text" onChange={quantityChangeHandler} value={quantity} />
        <label>scheme</label>
        <input type="text" onChange={schemeChangeHandler} value={scheme} />
        <label>type</label>
        <input type="text" onChange={typeChangeHandler} value={type} />
        <label>pack</label>
        <input type="text" onChange={packChangeHandler} value={pack} />
        <label>mrp</label>
        <input type="text" onChange={mrpChangeHandler} value={mrp} />
        <label>msp</label>
        <input type="text" onChange={mspChangeHandler} value={msp} />
        <label>hsn</label>
        <input type="text" onChange={hsnChangeHandler} value={hsn} />
        <label>rate</label>
        <input type="text" onChange={rateChangeHandler} value={rate} />
        <label>exp</label>
        <input type="text" onChange={expChangeHandler} value={exp} />
        <label>mfg</label>
        <input type="text" onChange={mfgChangeHandler} value={mfg} />
        <label>batchNo</label>
        <input type="text" onChange={batchNoChangeHandler} value={batchNo} />
        <label>schedule</label>
        <input type="text" onChange={scheduleChangeHandler} value={schedule} />
        <label>salt</label>
        <input type="text" onChange={saltChangeHandler} value={salt} />
        <label>temperature</label>
        <input
          type="text"
          onChange={temperatureChangeHandler}
          value={temperature}
        />
        <label>medicineTime</label>
        <input
          type="text"
          onChange={medicineTimeChangeHandler}
          value={medicineTime}
        />
        
        <label>companyDiscount</label>
        <input
          type="text"
          onChange={companyDiscountChangeHandler}
          value={companyDiscount}
        />
        <label>customerDiscount</label>
        <input
          type="text"
          onChange={customerDiscountChangeHandler}
          value={customerDiscount}
        />
        <label>gst</label>
        <input type="text" onChange={gstChangeHandler} value={gst} />

        {/*
        <label>Branch</label>
        <select name="branch" onChange={branchChangeHandler} value={branch}>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECHANICAL">MECHANICAL</option>
          <option value="METALLURGY">METALLURGY</option>
          <option value="CIVIL">CIVIL</option>
          <option value="BIOTECH">BIOTECH</option>
          <option value="OTHER">OTHER</option>
        </select>
        */}
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddStockPage;
