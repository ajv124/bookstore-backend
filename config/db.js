const mongoose=require('mongoose')
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const connectionString=process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("Database Connection Successful")
}).catch(error=>{
    console.log("Database Connection failed")
    console.log(error)
})