const jwt = require('jsonwebtoken')
require('dotenv').config()

// creating a middleware to check if the user has a token, and verify the token
function auth (req, res, next){

  // i just retrieved the token from the req
  const token = req.header('x-auth-token')

  // checking if the token is valid
  if(!token) return res.status(401).json({mgs : 'invalid token'})

 try {
    // but if the peron is authorised, i have to decode it
  const decode = jwt.verify(token, process.env.PHONEBOOK_SECRET)

  // i really don't understand, maybe this means that i can asign any variable to a req
  req.user = decode

  next()

 } catch (error) {
   return res.status(400).json({mgs : 'not authorised'})
 }

}

module.exports = auth