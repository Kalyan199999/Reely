// Data base connection

const mongoose = require("mongoose");

const connect = async () => {
    try 
    {
        // Connect the mongoose database
        const conn = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`Database connected successfully! ${conn.connection.host}:${process.env.PORT}`);
        
    } 
    catch (error) 
    {
        console.log(`Database connection failed! ${error}`);
        
    }
}

module.exports = connect;