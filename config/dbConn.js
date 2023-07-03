const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://drip_login:u7ita5FOqEJe2KgX@ac-obzmmqx-shard-00-00.scakc63.mongodb.net:27017,ac-obzmmqx-shard-00-01.scakc63.mongodb.net:27017,ac-obzmmqx-shard-00-02.scakc63.mongodb.net:27017/?ssl=true&replicaSet=atlas-5cm5l3-shard-0&authSource=admin&retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
