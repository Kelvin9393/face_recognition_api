const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'kelvinlingshengsiang',
    password: '',
    database: 'smart-brain'
  }
})

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('It is working')
})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, knex) })
app.put('/image', (req, res) => { image.handleImage(req, res, knex) })
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})

console.log(PORT)