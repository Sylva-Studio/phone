
const express = require('express')
const User = require('../model/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// creating express router
const router = express.Router()

// user post router for recieving the user input
router.post('/', (req, res) =>{

  // recieve the input given by user and destructure it
  const {username, email, password} = req.body

  // simple validation if the user input is empty
  if(!username || !email || !password){
    return res.status(400).json({msg:'Input can\'t be empty'})
  }

  // check if the email given by the user already exist in the database using mongo's findOne()
  User.findOne({email})
  .then(user => {
    if(user){
      return res.status(400).json({msg:'A user with this email already exist'})
    }

  // create the a new user for the user that has given value since the email is not in the database
  const newUser = new User({
    email,
    username,
    password

  })

  // generate a salt and hash the password before saving the new item
  bcrypt.genSalt(10, (Error, salt) =>{
    if(Error) throw Error

    bcrypt.hash(newUser.password, salt, (Error, hash) => {
      if(Error) throw Error

      newUser.password = hash

    // we can now finally save the new user since we have hashed the password successfully
      newUser.save()  

      // saving a new user always return a promise which contains the items we have save, so here, we will return it as a json
      .then(user =>{
        
        jwt.sign(
          {id:user.id},
          process.env.PHONEBOOK_SECRET,
          (err, token) =>{
            if(err) throw err

            res.json({
              token,
              id:user.id,
              username:user.username,
              email:user.email
            })
          }
          )
      })
    })
  })

  })

})

module.exports = router