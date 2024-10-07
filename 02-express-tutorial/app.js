const express = require('express')
const app = express()

const people = require('./routes/people') //route declared for people
const auth = require('./routes/auth')

// static assets
app.use(express.static('./methods-public')) //middleware to serve static files
// parse form data
app.use(express.urlencoded({ extended: false })) //middleware to parse form data
// parse json
app.use(express.json()) //middleware to parse json, this is used to parse the json data sent by the client

app.use('/api/people', people) //middleware to handle routes for people
app.use('/login', auth) //middleware to handle routes for auth

app.listen(3000, () => {
  console.log('Server is listening on port 3000....')
})
