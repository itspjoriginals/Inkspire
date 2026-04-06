const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;
const connectDB = () => {
  mongoose.connect(DB_URL).then(() => {
    console.log(`Connected to Database successfully`);
  }).catch((err) => {
    console.error(`Error while connecting to DB  ${err}`);
    
  });
};

module.exports = connectDB;