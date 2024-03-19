const mongoose = require("mongoose");


// mongoose.connect("mongodb+srv://smghulamghausfaiyaz19:Ghul%40m29091993gh%40u%24@habbit-tracker.8klhauo.mongodb.net/followup-reminder");
mongoose.connect("mongodb://127.0.0.1:27017/attendance_portal");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting with the database".bgRed));

db.once("open", ()=>{
    console.log(`Connection with the database is established`.bgYellow);
});

module.exports = db;
