// import the require packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// custom packages of connection and and routes
const connect = require('./config/connect')
const userRouter = require('./route/userRoute')

const app = express();
app.use(cors());
app.use(express.json());

// app.use(express.static (__dirname + '/images'))

// add the user route
app.use('/api/user' , userRouter)

const PORT = process.env.PORT || 5050;

// Start the server
app.listen(PORT, () => {

    try 
    {
        console.log(`Server is running on port ${PORT}`);
        connect()
    } 
    catch (error) {
         console.log(`Error in server running!`);
    }
})