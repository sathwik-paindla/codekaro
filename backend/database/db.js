const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DBConnection = async () => {
    //MongoDB connection 
    const MONGO_URL = process.env.MONGODB_URL;
    //console.log(MONGO_URL);
    
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting to the database:", error.message);
    }
};

module.exports = { DBConnection };