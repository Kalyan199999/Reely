const mongoose = require('mongoose');

const { fileInfo } = require('./imageInfo')

const userSchema = new mongoose.Schema({

    username :{
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    name: {
        type: String
    },
    
    
    phone: {
        type: String,

        validate: {

          validator: function (v) {
            return /^\d{10}$/.test(v); // 10 digits only
          },

          message: props => `${props.value} is not a valid 10-digit phone number!`
        }
    },

    profile_photo: 
    {
        type: fileInfo
    } 
    
} , {timestamps: true} )


const User = mongoose.model('User', userSchema);

module.exports = User;