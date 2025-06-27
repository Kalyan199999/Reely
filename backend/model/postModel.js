const mongoose = require('mongoose');

const {fileInfo,myComment} = require('./imageInfo')

const postSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  description: {
    type: String,
    required: true,
    maxlength:[ 150, 'Description should not be more than 150 characters']
  },

  post:{
    type:[fileInfo],
    required: true
  },

  like: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  comment: [ myComment ],

  share: {
    type: Number,
    default: 0
  }
  
} , {timestamps:true});

module.exports = mongoose.model('Post', postSchema);
