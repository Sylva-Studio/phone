const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// express app
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// use routes
const phoneBookRouter = require('./routes/phonebook')
const userRouter = require('./routes/users')
const authRouter = require('./routes/auths')

app.use('/Contact', phoneBookRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)

// connect to mongoose
const db = process.env.PHONEBOOK_DB

mongoose.connect(db, {useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true})

const connection = mongoose.connection
connection.once('open', ()=>{
  console.log('connected to db successfully')
})

// listening to a port
const port = process.env.PORT || 5000

app.listen(port, ()=>{
  console.log(`listening on port : ${port}`)
})