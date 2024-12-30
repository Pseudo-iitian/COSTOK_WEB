const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vermaabhimanyu593:MniLtQC4XZ84rIDE@costok.mcz6c.mongodb.net/BMS")
.then(()=>{
    console.log("mongoDB connected");
})
.catch((e)=>{
    console.log("failed to connect");
    console.error(e)
})
