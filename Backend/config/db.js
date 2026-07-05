const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect(process.env.MONGO_URI,
        console.log("Connected To MongoDB")
    );
};

module.exports = connectDB;