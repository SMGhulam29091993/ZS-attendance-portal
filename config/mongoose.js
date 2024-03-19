const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URL);
// mongoose.connect("mongodb://127.0.0.1:27017/attendance_portal");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting with the database".bgRed));

db.once("open", ()=>{
    console.log(`Connection with the database is established`.bgYellow);
});

module.exports = db;
