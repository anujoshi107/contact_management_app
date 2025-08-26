const mongoose = require("mongoose");
const userschema = mongoose.Schema({
    username : {
        type : "String",
        required : [true,"pls add the username"]
    },
    email : {
        type : "String",
        required : [true,"pls add the contact name"],
        unique : [true,"the account has already taken"]
    },
    password : {
        type : "String",
        required : [true,"pls add the password"],
    }
    
},
    {
        timestamps : true,
    });
module.exports = mongoose.model("User", userschema);