const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { post } = require('./users')
require('dotenv').config()

// auth middleware
const auth = require('./middleware/auth')

// we need to import the user model because we will be authenticating the user's information using findOne()
const User = require('../model/users')

// create express router 
const router = express.Router()

// post router for authenticating a user
router.post('/', (req, res) => {

  // retrieve the input given by the user using req.boby
  const {email, password} = req.body

  // checking if the information given by the user is correct by grabing the already existing user email from database
  User.findOne({email})
  .then(user => {

    // check if the retrieved user email is not valid
    if(!user) return res.status(400).json({msg:'Email, doesn\' exist'})

    // since the email is valid, we will now compare the password recieved with the one we got from the database
    
    //p.s remember that interpreted language goes from up to do, so that's why we still went ahead with the option of compare wether is true ou not, if is wrong a status of bad request is sent and the program is stopped, else it doesnt go into the if condition 
    bcrypt.compare(password, user.password)
    .then(isMatch => {

      // if not a match, we will send a bad request and the program will stop
      if(!isMatch) return res.status(400).json({msg : "Sorry, the password didn't match"})

      // else, the password matched and now we can send a response that contains the usertoken. 
      //We have to sign the response so we can get a token that contains the token
      jwt.sign(
        {id : user.id},
        process.env.PHONEBOOK_SECRET,
        // jwt.sign() gives us a callback function we contains the signed token, we will send our response to the logined in user within here ( the jwt.sign() callback)
        (err, token) => {
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

// another route for geting the user's data
router.get('/user', auth, (req, res) =>{
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router
