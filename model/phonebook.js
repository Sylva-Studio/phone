const mongoose = require('mongoose')

// create schema
const schema = mongoose.Schema

// new schema

const phoneBookSchema = new schema({
  firstName : {
    type:String,
    required: true,
    trim:true
  },
  lastName : {
    type:String,
    required: true,
    trim:true
  },
  company : {
    type:String,
    trim:true
  },
  phone : {
    type:Number,
    required: true,
    trim:true
  },
  email : {
    type:String,
    trim:true
  },
  url : {
    type:String,
    trim:true
  },
  address : {
    type:String,
    trim:true
  },
  birthday : {
    type:String,
    trim:true
  },
  date : {
    type:String,
    trim:true
  },
  socialProfile : {
    type:String,
    trim:true
  },
  note : {
    type:String,
    trim:true
  },

})

const phonebook = mongoose.model('phoneBook', phoneBookSchema)
module.exports = phonebook