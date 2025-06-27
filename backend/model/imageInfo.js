const mongoose = require('mongoose');

// Define images as a Mongoose sub-schema
const fileInfo = new mongoose.Schema({
  fieldname: String,
  originalname: String,
  encoding:String,
  mimetype:String,
  destination:String,
  filename: String,
  path: String,
  size: Number
}, { _id: false }); // _id: false to avoid generating _id for each file object


// Define Comment section as a Mongoose sub-schema
const myComment = new mongoose.Schema({
  
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comment: {
      type: String,
      required: true
    }
    
} , {timestamps: true} )

module.exports = { fileInfo , myComment };