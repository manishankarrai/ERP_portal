const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL)
.then(()=> console.log("connetion successfull"))
.catch((err)=>console.log(err));