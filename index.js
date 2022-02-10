const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const ObjectId = require('mongodb').ObjectId;
app.use(express.json());

const usertestRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");





mongoose.connect(process.env.MONGO_URL)
    .then(() => (console.log('database connected')))
    .catch((err) => {
        console.log(err);
    });


//useername: test
//password : x9kUmgaLvway4z52


app.use("/api/users", usertestRoute);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})