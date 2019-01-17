const Car = require("../../db/models/car");
const multer = require("multer");


var addCar = (req,res) => {
    var car = new Car(req.body);
    car.save()
        .then(car => {
            res.status(200).json({message:"Başarılı",car:car});
        })
        .catch((err) => {
            res.status(404).json({message:err});
        });
};

var getCars = (req,res) => {
    Car.find()
        .then(cars => {
            if(!cars) 
                res.status(404).json({message:"Kayıt bulunamadı"});
            else
                res.send(cars);
        })
        .catch((err) => {
            res.send(err);
        });
};

var getUserCars = (req,res) => {
    var id = req.params.id;
    if(!id) { 
        res.status(404).json({message:"ID is required"});
    }
    Car.find({creator:id})
        .then(car => {
            if(car) 
                res.status(200).send(car);

            else
                res.status(404).json({message:"NO CAR"});
        })
        .catch((err) => {
            res.status(404).json({message:err});
        });
};

var getCar = (req,res) => {
    var id = req.params.id;
    Car.findById(id)
        .then(car => {
            if(!car) {
                res.status(404).json({message:"Araç yok"});
            }
            console.log(car);
            res.status(200).send(car);
        })
        .catch(error => {
            res.send(error);
        })
}

var updateCar = (req,res) => {
    var id = req.params.id;
    if(!id) {
        res.status(404).json({message:"ID bulunamadi"});
    }
    Car.findById(id)
        .then(car => {
            if(!car) {
                res.send.status(404).json({message:"Bu id ile bir kayıt yok"});
            };
            car.year = req.body.year;
            car.price = req.body.price;
            car.km = req.body.km;
            car.brand = req.body.brand;
            car.provence = req.body.provence;
            car.sellerNum = req.body.sellerNum;

            car.save()
                .then(car => {
                    res.status(200).json({message:"Başarıyla güncellendi",car:car});
                })
                .catch((err) => {
                    res.status(401).json({message:"Başarısız",err:err});
                });
        })
        .catch((err) => {
            res.status(404).json({message:"Bir hata var",err:err});
        });
};

var deleteCar = (req,res) => {
    var id = req.params.id;
    Car.findById(id).then(car => {
        if(!car) {
            res.status(404).json({message:"Kayıt bulunamadı"});
        }
        else {
            Car.findByIdAndRemove(id)
            .then(() => {
                res.status(200).json({message:"Başarılı kayıt silindi"});
            })
            .catch((err) => {
                res.status(404).json({message:"Kayıt silinemedi bir hata var",err:err});
            });
        }
    });
};

module.exports = {addCar,getCars,getUserCars,getCar,updateCar,deleteCar};