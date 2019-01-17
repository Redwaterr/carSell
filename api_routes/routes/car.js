const express = require("express");
const router = express.Router();

const carCtrl = require("../controllers/carController");
const authCtrl = require("../middleware/check-auth");


router.get("/",carCtrl.getCars);
router.get("/user/:id",carCtrl.getUserCars);
router.get("/car/:id",carCtrl.getCar);
router.post("/",authCtrl,carCtrl.addCar);
router.put("/:id",authCtrl,carCtrl.updateCar);
router.delete("/:id",authCtrl,carCtrl.deleteCar);

module.exports = router;