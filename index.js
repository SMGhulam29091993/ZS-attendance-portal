const express = require('express');
require('colors');
require("dotenv").config();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 8000;

const db = require("./config/mongoose.js");
const errHandlerMiddlware = require("./config/errorHanderMiddleware.js");

const allowOrigin = ["http://localhost:3000"]
app.use(cors({
    origin :allowOrigin,
    credentials : true
}));

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("uploads"))
app.use('/uploads', express.static(__dirname +'/uploads'));
app.use(errHandlerMiddlware);


app.use("/", require("./routes"));


app.listen(PORT, ()=>{
    console.log(`THe server is up and running on port : ${PORT}`.bgGreen);
})