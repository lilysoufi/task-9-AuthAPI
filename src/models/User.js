const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },

    email : {
        type : String, 
        required : true,
        unique : [true , "Email already exists"],
        trim : true
    },

    password : {
        type : String,
        required : true,
        trim : true
    },

    role : {
        type : String, 
        required : true,
        enum : ["user", "admin"],
        default : "user"
    }
    
}, { 
    toJSON: {
        virtuals: true
    },
    timestamps: true 
})

const User = mongoose.model("User", UserSchema);
module.exports = User;