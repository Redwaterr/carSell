const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const apiRoutes = require("./api_routes/routes/car");
const userRoutes = require("./api_routes/routes/user");

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())

app.use("/api",apiRoutes);
app.use("/",userRoutes);
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.listen(port,(hata) => {
    if(hata) 
        console.log("Başarısız");
    else
        console.log("Başarılı");
});