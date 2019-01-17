const mongoose = require("../db");
const uniqueValidator = require("mongoose-unique-validator")

Schema = mongoose.Schema;

var userSchema = Schema( 
    {
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true}
    }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User",userSchema);