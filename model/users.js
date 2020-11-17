const mongoose = require('mongoose')

// create a schema for user
const schema = mongoose.Schema

const userSchema = new schema({
  username : {
    type:String,
    unique:true,
    required:true
  },
  email : {
    type:String,
    unique:true,
    required:true
  },
  password : String,
  
  registered_date : {
    type : Date,
    default : Date.now()
  }

})

const user = mongoose.model('user', userSchema)
module.exports = user