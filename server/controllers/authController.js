const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Stock = require("../model/stock");
const Bill = require("../model/bill");
const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    console.log(roles);

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user
    res.json({ roles, accessToken });
  } else {
    res.sendStatus(401);
  }
};
const addStockFunc = async (req, res) => {
  const StockData = new Stock({
    userId: "hello@gmail.com",
    name: req.body.name,
    quantity: req.body.quantity,
    scheme: req.body.scheme,
    type: req.body.type,
    pack: req.body.pack,
    mrp: req.body.mrp,
    msp: req.body.msp,
    hsn: req.body.hsn,
    rate: req.body.rate,
    msp: req.body.msp,
    exp: req.body.exp,
    mfg: req.body.mfg,
    batchNo: req.body.batchNo,
    schedule: req.body.schedule,
    salt: req.body.salt,
    temperature: req.body.temperature,
    medicineTime: req.body.medicineTime,
    companyDiscount: req.body.companyDiscount,
    customerDiscount: req.body.customerDiscount,
    gst: req.body.gst,
  });
  try {
    await StockData.save();
    console.log("data inserted");
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
  } catch (err) {
    console.log(err);
    res.send("bill already exist");
  }
};

module.exports = { handleLogin, addStockFunc, findStockData, addBillFunc };
