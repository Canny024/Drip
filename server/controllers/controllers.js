const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Stock = require("../model/stock");
const TotalStock = require("../model/totalStock");
const Bill = require("../model/bill");
const ImageM = require("../model/imageModel");
const CreditM = require("../model/credit");
//excel data reading
let XLSX = require("xlsx");
let workbook = XLSX.readFile("./medData.xls");
let workSheet = workbook.Sheets[workbook.SheetNames[0]];
let nameList = [];
let purchasePriceList = [];
let batchList = [];
let expList = [];
for (let index = 5; index < 10; index++) {
  const name = workSheet[`B${index}`].v;
  const purchasePrice = workSheet[`K${index}`].v;
  const batch = workSheet[`P${index}`].v;
  const exp = workSheet[`R${index}`].v;
  // console.log(name," ",purchasePrice," ", batch, " ", exp);
  nameList.push(name);
  purchasePriceList.push(purchasePrice);
  batchList.push(batch);
  expList.push(exp);
}
//
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
  const creditAmount =
    Number(req.body.newStockData.quantity) * Number(req.body.newStockData.mrp);
  const creditData = new CreditM({
    userId: req.body.newStockData.userId,
    distributorName: req.body.newStockData.distributorName,
    creditAmount: creditAmount,
    isPaid: false,
  });
  try {
    //curr stock
    await StockData.save();
    console.log("curr stock data inserted");
    //total stock
    await TotalStockData.save();
    console.log("total stock data inserted");
    //Add bill for credit loan
    if (req.body.newStockData.paymentType === "credit") {
      await creditData.save();
      console.log("loan data inserted");
    }
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
  console.log(req.query.userId);
  const currMedBill = await Stock.find({
    userId: req.query.userId,
    name: req.body.name,
    exp: req.body.exp,
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
      const filter = {
        userId: req.query.userId,
        name: req.body.name,
        exp: req.body.exp,
      };
      let finalQuantity =
        Number(currMedBill[0].quantity) - Number(req.body.quantity);
      const update = { quantity: finalQuantity.toString() };
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
const expiryBufferTime = 3 * 24 * 60 * 60; //3days
const findSoonExpiryStockData = async (req, res) => {
  const currUserStockData = await Stock.find({
    userId: req.query.userId,
  });
  let expiryStockData = [];
  for (let i = 0; i < currUserStockData.length; i++) {
    let t =
      (new Date(currUserStockData[i].exp).getTime() - new Date().getTime()) /
      1000;
    if (t <= expiryBufferTime) {
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
const findMedData = async (req, res) => {
  const medData = [nameList, purchasePriceList, batchList, expList];
  res.send(medData);
};
const uploadImageFunc = async (req, res) => {
  // console.log(req.file, req.body);
  const imageUrl = req.file.path;
  if (!imageUrl) {
    return res.send({ code: 400, message: "bad request" });
  }
  const newImage = new ImageM({
    imageUrl: imageUrl,
    userId: req.query.userId,
  });
  let result = await newImage.save();
  if (result) {
    console.log("photo uploaded");
  }
};
const imageData = async (req, res) => {
  const imgData = await ImageM.find({ userId: req.query.userId });
  res.send(imgData[0].imageUrl);
};
const creditData = async (req, res) => {
  const creditInfo = await CreditM.find({ userId: req.query.userId });
  res.send(creditInfo);
};
const uploadDataFileFunc = async (req, res) => {
  try {
    const path = req.file.path;
    let workbook = XLSX.readFile(path);
    let sheet_name_list = workbook.SheetNames;
    let jsonData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );
    for(let i=0;i<jsonData.length;i++){
      jsonData[i].userId=req.query.userId
    }
    // console.log(jsonData);//array of objects
    let savedData = await Stock.create(jsonData);
    return res.status(201).json({
      success: true,
      message: savedData.length + " rows added to the database",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
module.exports = {
  addStockFunc,
  findStockData,
  addBillFunc,
  findLessStockData,
  findSoonExpiryStockData,
  findBill,
  findMedData,
  uploadImageFunc,
  imageData,
  creditData,
  uploadDataFileFunc,
};
