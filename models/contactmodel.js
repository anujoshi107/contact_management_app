const mongoose = require("mongoose");
const contactschema = mongoose.Schema({
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name : {
        type : "String",
        required : [true,"pls add the contact name"]
    },
    email : {
        type : "String",
        required : [true,"pls add the contact name"]
    },
    phone : {
        type : "String",
        required : [true,"pls add the contact name"]
    }
});
module.exports = mongoose.model("Contact", contactschema);