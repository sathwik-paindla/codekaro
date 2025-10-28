const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // User's first name
    firstname: {
        type: String,
        required:true,
    },

    lastname: {
        type: String,
        required:true,
    },
    
    // Unique email address
    email: {
        type: String,
        required: true,
        unique: true,
    },
    
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);