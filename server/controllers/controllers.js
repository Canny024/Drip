const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Stock = require("../model/stock");
const TotalStock = require("../model/totalStock");
const Bill = require("../model/bill");

const addStockFunc = async (req, res) => {
  //curr stock
  const StockData = new Stock({
    userId: req.body.newStockData.userId,
    name: req.body.newStockData.name,
    quantity: req.body.newStockData.quantity,
    scheme: req.body.newStockData.scheme,
    type: req.body.newStockData.type,
    pack: req.body.newStockData.pack,
    mrp: req.body.newStockData.mrp,
    msp: req.body.newStockData.msp,
    hsn: req.body.newStockData.hsn,
    rate: req.body.newStockData.rate,
    msp: req.body.newStockData.msp,
    exp: req.body.newStockData.exp,
    mfg: req.body.newStockData.mfg,
    batchNo: req.body.newStockData.batchNo,
    schedule: req.body.newStockData.schedule,
    salt: req.body.newStockData.salt,
    temperature: req.body.newStockData.temperature,
    medicineTime: req.body.newStockData.medicineTime,
    companyDiscount: req.body.newStockData.companyDiscount,
    customerDiscount: req.body.newStockData.customerDiscount,
    gst: req.body.newStockData.gst,
  });
  const TotalStockData = new TotalStock({
    userId: req.body.newStockData.userId,
    name: req.body.newStockData.name,
    quantity: req.body.newStockData.quantity,
    scheme: req.body.newStockData.scheme,
    type: req.body.newStockData.type,
    pack: req.body.newStockData.pack,
    mrp: req.body.newStockData.mrp,
    msp: req.body.newStockData.msp,
    hsn: req.body.newStockData.hsn,
    rate: req.body.newStockData.rate,
    msp: req.body.newStockData.msp,
    exp: req.body.newStockData.exp,
    mfg: req.body.newStockData.mfg,
    batchNo: req.body.newStockData.batchNo,
    schedule: req.body.newStockData.schedule,
    salt: req.body.newStockData.salt,
    temperature: req.body.newStockData.temperature,
    medicineTime: req.body.newStockData.medicineTime,
    companyDiscount: req.body.newStockData.companyDiscount,
    customerDiscount: req.body.newStockData.customerDiscount,
    gst: req.body.newStockData.gst,
  });
  try {
    //curr stock
    await StockData.save();
    console.log("curr stock data inserted");
    //total stock
    await TotalStockData.save();
    console.log("total stock data inserted");
    res.send("Data Inserted");
  } catch (err) {
    console.log(err);
    res.send("userName already exist");
  }
};

const findStockData = async (req, res) => {
  console.log(req.query.userId);
  const currUserStockData = await Stock.find({
    userId: req.query.userId,
  });
  if (currUserStockData) res.send(currUserStockData);
  else {
    res.send("no user found");
  }
};

const addBillFunc = async (req, res) => {
  console.log(req.query.userId)
  const currMedBill = await Stock.find({
    userId: req.query.userId,
    name:req.body.name,
    exp: req.body.exp
  }); 
  console.log(currMedBill);
  if (Number(currMedBill[0].quantity) > Number(req.body.quantity)) {
    const BillData = new Bill({
      userId: req.body.userId,
      name: req.body.name,
      type: req.body.type,
      pack: req.body.pack,
      quantity: req.body.quantity,
      mrp: req.body.mrp,
      finalDiscount: req.body.finalDiscount,
      gst: req.body.gst,
      batchNo: req.body.batchNo,
      exp: req.body.exp,
      customerName: req.body.customerName,
      customerNumber: req.body.customerNumber,
      customerLocation: req.body.customerLocation,
      saleDate: req.body.saleDate,
      diseaseType: req.body.diseaseType,
      loyaltyPoints: req.body.loyaltyPoints,
      refillReminder: req.body.refillReminder,
      isPrescribed: req.body.isPrescribed,
      billPreferance: req.body.billPreferance,
      doctorName: req.body.doctorName,
      invoiceNumber: req.body.invoiceNumber,
      address: req.body.address,
      doctorDiscount: req.body.doctorDiscount,
    });
    try {
      await BillData.save();
      console.log("data inserted");
      const filter = { userId:  req.query.userId,name:req.body.name, exp:req.body.exp};
      let finalQuantity=Number(currMedBill[0].quantity)-Number(req.body.quantity)
      const update = { quantity:  finalQuantity.toString()};
      let doc = await Stock.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log("stock Updated");
    } catch (err) {
      console.log(err);
      res.send("bill already exist");
    }
  } else {
    res.send("not enough quantity");
  }
};
const lessQuantity = 100;
const findLessStockData = async (req, res) => {
  const currUserStockData = await Stock.find({
    userId: req.query.userId,
  });
  let lessStockData = [];
  for (let i = 0; i < currUserStockData.length; i++) {
    if (Number(currUserStockData[i].quantity) <= lessQuantity) {
      lessStockData.push(currUserStockData[i]);
    }
  }

  res.send(lessStockData);
};
const expiryBufferTime = 3 * 24 * 3600; //3days
const findSoonExpiryStockData = async (req, res) => {
  const currUserStockData = await Stock.find({
    userId: req.query.userId,
  });
  let expiryStockData = [];
  for (let i = 0; i < currUserStockData.length; i++) {
    if (
      new Date(currUserStockData[i].exp).getHours() - new Date().getHours() <=
      expiryBufferTime
    ) {
      expiryStockData.push(currUserStockData[i]);
    }
  }
  res.send(expiryStockData);
};
const findBill = async (req, res) => {
  const currUserBillData = await Bill.find({
    userId: req.query.userId,
  });
  if (currUserBillData) res.send(currUserBillData);
  else {
    res.send("no bill data found");
  }
};
module.exports = {
  addStockFunc,
  findStockData,
  addBillFunc,
  findLessStockData,
  findSoonExpiryStockData,
  findBill,
};
