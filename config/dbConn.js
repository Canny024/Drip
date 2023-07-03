const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://driperp-server:8D7hD9TFoGe4cRuE2j6z4450tWqBx5cmoSnvtWMNxPhtVn1k69ELvLlnM8tu66dCagxPzmZeNkTFACDbsyULkw==@driperp-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@driperp-server@', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
