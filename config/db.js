const mongoose = require('mongoose')

const connDB = async () =>{
    try{
       const conn = await mongoose.connect(process.env.MONGO_URI)
       console.log(`Connected to ${conn.connection.host}`)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connDB