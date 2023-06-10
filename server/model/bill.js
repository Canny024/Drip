const mongoose = require("mongoose");

const ReactBillDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required:true
  },
  name: {
    type: String,
    required:true
  },
  type: {
    type: String,
    required:true,
  },
  pack: {
    type: String,
    required:true
  },
  quantity: {
    type: String,
    required:true
  },
  mrp: {
    type: String,
    required:true
  },
  finalDiscount: {
    type: String,
    required:true
  },
  gst: {
    type: String,
    required:true
  },
  batchNo: {
    type: String,
    required:true
  },
  exp: {
    type: String,
    required:true
  },
  customerName: {
    type: String,
    required:true
  },
  customerNumber: {
    type: String,
    required:true
  },
  customerLocation: {
    type: String,
    required:true
  },
  saleDate: {
    type: String,
    required:true
  },
  diseaseType: {
    type: String,
    required:true
  },
  loyaltyPoints: {
    type: String,
    required:true
  },
  refillReminder: {
    type: String,
    required:true
  },
  isPrescribed: {
    type: String,
    required:true
  },
  billPreferance: {
    type: String,
    required:true
  },
  doctorName: {
    type: String,
    required:true
  },
  invoiceNumber: {
    type: String,
    required:true
  },
  address: {
    type: String,
    required:true
  },
  doctorDiscount: {
    type: String,
    required:true
  },
});

const bill = mongoose.model("bill", ReactBillDataSchema);
module.exports = bill;
