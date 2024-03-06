const mongoose = require("mongoose")
const connectDB=async ()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI,{
          
        })



        console.log(`MongoDb connected ${connection.connection.host}`.cyan.underline)
    }


    catch(error){
          console.log(`errro is ${error}`)
    }
}
module.exports = connectDB;