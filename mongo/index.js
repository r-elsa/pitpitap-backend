
const mongoose = require('mongoose');



/* mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/pitpitap_db",  { useNewUrlParser: true, useUnifiedTopology: true}, (error)=>{ */


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/pitpitap_db",  { useNewUrlParser: true, useUnifiedTopology: true}, (error)=>{
/* 
    "mongodb://heroku_mr3wq527:fqltbg57u09svaetgt3g33amgr@ds135946.mlab.com:35946/heroku_mr3wq527" */
    
    if(!error){
        console.log('Success connecting to mongo db database')  
  
    }
    else{
        console.log("Error connecting to Mongo db database");
        
    }

})

const QA = require("./qandas")

const Slides = require("./slides")
