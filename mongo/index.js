
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/pitpitap_db",  { useNewUrlParser: true, useUnifiedTopology: true}, (error)=>{

    if(!error){
        console.log('Success connecting to mongo db database')  
  
    }
    else{
        console.log("Error connecting to Mongo db database");
        
    }

})

const QA = require("./qandas")

const Slides = require("./slides")
