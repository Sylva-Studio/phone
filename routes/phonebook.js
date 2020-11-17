const express = require('express')
const Contact = require('../model/phonebook')
const auth = require('../routes/middleware/auth')

// express router 
const router = express.Router()

// get router
router.get('/', async (req, res)=>{
  try {
    const item = await Contact.find()
    res.json(item)
  } catch (error) {
    res.status(400).json(`error : ${error}`)
  }
})

// get router for single item
router.get('/:id', async(req, res)=>{
  try {
    const fetch_id = await Contact.findById(req.params.id)
    res.json(fetch_id)
  } catch (error) {
    res.status(400).json(`error : ${error}`)
  }
})


// post router for adding Contact
router.post('/add', auth, async (req, res)=>{
  const new_item = await new Contact({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    company : req.body.company,
    phone : req.body.phone,
    email : req.body.email,
    url : req.body.url,
    address : req.body.address,
    birthday : req.body.birthday,
    date : req.body.date,
    socialProfile : req.body.socialProfile,
    note : req.body.note
  })

  try {
    const saved = await new_item.save()
    res.json(`${saved} : added`)
  } catch (error) {
    res.status(400).json(`error : ${error}`)
  }
})

// post router for editing
router.post('/edit/:id', async (req, res)=>{
  try {
    const fetch_id = await Contact.findById(req.params.id)
    fetch_id.firstName = req.body.firstName
    fetch_id.lastName = req.body.lastName
    fetch_id.company = req.body.company
    fetch_id.phone = req.body.phone
    fetch_id.email = req.body.email
    fetch_id.url = req.body.url
    fetch_id.address = req.body.address
    fetch_id.birthday = req.body.birthday
    fetch_id.date = req.body.date
    fetch_id.socialProfile = req.body.socialProfile
    fetch_id.note = req.body.note

    const saved = fetch_id.save()
    res.json('Contact edited')
  } catch (error) {
    res.status(400).json(`error : ${error}`)
  }
})

// delete router
router.delete('/:id', auth, async(req, res)=>{
  try {
    const delItem = await Contact.findByIdAndDelete(req.params.id)
    res.json('Contact deleted')
  } catch (error) {
    res.status(400).json(`error : ${error}`)
  }
})

// exporting router
module.exports = router