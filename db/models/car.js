const mongoose = require("../db");

var carSchema = new mongoose.Schema(
    {
        year:{type:Number,required:true},
        price:{type:Number,required:true},
        km:{type:Number,required:true},
        brand:{type:String,required:true},
        provence:{type:String,required:true},
        sellerNum:{type:Number,required:true},
        creator:{type:String},
        imagePath:{type:String}
    }
);

module.exports = mongoose.model("car",carSchema);
