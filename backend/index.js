const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require("cookie-parser");
require("dotenv").config();
const port = 3008
const { userRouter, cartRouter, productRouter, orderRouter } = require('./routers')
const db = require("./models")
app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json())
app.use('/', userRouter)
app.use('/', cartRouter)
app.use('/products', productRouter)
app.use('/', orderRouter)

db.sequelize.sync({ force: false }).then(function () {
  app.listen(port, function () {
    console.log("server is successfully running!");
  });
});