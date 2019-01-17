const mongoose = require("mongoose");

mongoose.connect("mongodb://Ugur:15751575A@ds119802.mlab.com:19802/carsell",{useNewUrlParser:true})
    .then(() => {
        console.log("Veritabanına bağlantı başarıyla sağlandı");
    })
    .catch((hata) => {
        console.log(hata);
    });

module.exports = mongoose;